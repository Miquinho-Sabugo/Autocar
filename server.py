import os
import sys
import json
import base64
import binascii
import re
import ssl
import urllib.parse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import pg8000.native

# ============================================================================
# CONFIGURAÇÕES DO BANCO POSTGRESQL LOCAL
# Altere a senha abaixo caso tenha definido outra senha no seu pgAdmin 4!
# ============================================================================
DB_CONFIG = {
    "host": os.environ.get("DB_HOST", "localhost"),
    "port": int(os.environ.get("DB_PORT", "5432")),
    "database": os.environ.get("DB_NAME", "auramotors"),
    "user": os.environ.get("DB_USER", "postgres"),
    "password": os.environ.get("DB_PASSWORD", ""),
}
DB_TIMEOUT_SECONDS = 10
EMAIL_PATTERN = re.compile(
    r"[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@"
    r"(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+"
    r"[A-Za-z]{2,}"
)

# Carregar senha do config.json se existir
if os.path.exists("config.json"):
    try:
        with open("config.json", "r", encoding="utf-8") as f:
            cfg = json.load(f)
            if "password" in cfg and cfg["password"] != "sua_senha_aqui":
                DB_CONFIG["password"] = cfg["password"]
    except (OSError, json.JSONDecodeError) as error:
        raise RuntimeError(f"Nao foi possivel ler config.json: {error}") from error

database_url = os.environ.get("DATABASE_URL")
if database_url:
    parsed_database_url = urllib.parse.urlsplit(database_url)
    if parsed_database_url.scheme not in ("postgres", "postgresql") or not parsed_database_url.hostname:
        raise RuntimeError("DATABASE_URL precisa ser uma URL PostgreSQL valida.")
    database_query = urllib.parse.parse_qs(parsed_database_url.query)
    DB_CONFIG.update({
        "host": parsed_database_url.hostname,
        "port": parsed_database_url.port or 5432,
        "database": urllib.parse.unquote(parsed_database_url.path.lstrip("/")),
        "user": urllib.parse.unquote(parsed_database_url.username or ""),
        "password": urllib.parse.unquote(parsed_database_url.password or ""),
        "ssl_context": None if database_query.get("sslmode", [os.environ.get("DB_SSLMODE", "require")])[0] == "disable" else ssl.create_default_context(),
    })
else:
    DB_CONFIG.update({
        "host": os.environ.get("DB_HOST", DB_CONFIG["host"]),
        "port": int(os.environ.get("DB_PORT", str(DB_CONFIG["port"]))),
        "database": os.environ.get("DB_NAME", DB_CONFIG["database"]),
        "user": os.environ.get("DB_USER", DB_CONFIG["user"]),
        "password": os.environ.get("DB_PASSWORD", DB_CONFIG["password"]),
        "ssl_context": None,
    })

def get_connection():
    try:
        return pg8000.native.Connection(
            user=DB_CONFIG["user"],
            host=DB_CONFIG["host"],
            port=DB_CONFIG["port"],
            database=DB_CONFIG["database"],
            timeout=DB_TIMEOUT_SECONDS,
            ssl_context=DB_CONFIG.get("ssl_context"),
            password=DB_CONFIG["password"]
        )
    except Exception as e:
        safe_err = str(e).encode('ascii', errors='replace').decode('ascii')
        print(f"[ERRO DE BANCO] Nao foi possivel conectar: {safe_err}")
        return None

def is_valid_email(email):
    if not isinstance(email, str) or len(email) > 254 or not EMAIL_PATTERN.fullmatch(email):
        return False
    local_part, domain = email.split('@')
    return (
        '.' in domain
        and '..' not in email
        and not local_part.startswith('.')
        and not local_part.endswith('.')
        and '..' not in domain
    )

def ensure_image_table(con):
    con.run("""
        CREATE TABLE IF NOT EXISTS veiculos_imagens (
            id BIGSERIAL PRIMARY KEY,
            veiculo_id BIGINT REFERENCES veiculos(id) ON DELETE CASCADE,
            imagem_dado TEXT NOT NULL,
            criado_em TIMESTAMPTZ DEFAULT now()
        );
    """)

def ensure_user_image_table(con):
    con.run("""
        CREATE TABLE IF NOT EXISTS usuarios_imagens (
            usuario_id BIGINT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
            imagem_dado TEXT NOT NULL,
            atualizado_em TIMESTAMPTZ DEFAULT now() NOT NULL
        );
    """)

def ensure_carousel_table(con):
    con.run("""
        CREATE TABLE IF NOT EXISTS veiculos_carrossel (
            veiculo_id BIGINT PRIMARY KEY REFERENCES veiculos(id) ON DELETE CASCADE,
            ordem SMALLINT NOT NULL UNIQUE CHECK (ordem BETWEEN 1 AND 10)
        );
    """)

def init_db():
    con = get_connection()
    if not con:
        return False
    try:
        ensure_image_table(con)
        ensure_user_image_table(con)
        con.run("""
            CREATE TABLE IF NOT EXISTS favoritos (
                id BIGSERIAL PRIMARY KEY,
                usuario_id BIGINT REFERENCES usuarios(id) ON DELETE CASCADE NOT NULL,
                veiculo_id BIGINT REFERENCES veiculos(id) ON DELETE CASCADE NOT NULL,
                criado_em TIMESTAMPTZ DEFAULT now() NOT NULL,
                UNIQUE(usuario_id, veiculo_id)
            );
        """)
        ensure_carousel_table(con)
        con.run("""
            UPDATE veiculos SET preco = CASE placa
                WHEN 'BRA2E19' THEN 148900.00
                WHEN 'JEP4A77' THEN 164900.00
                WHEN 'GTI3X88' THEN 218000.00
                WHEN 'ONX1P20' THEN 96500.00
                WHEN 'RNG9K55' THEN 229900.00
                WHEN 'EVB8D01' THEN 144800.00
                WHEN 'CIV7H99' THEN 159000.00
                WHEN 'CRT5U43' THEN 149900.00
                WHEN 'POR9S11' THEN 895000.00
                WHEN 'TOR3V80' THEN 138900.00
                WHEN 'VLV8P40' THEN 299950.00
                WHEN 'PEU2T08' THEN 98990.00
            END
            WHERE preco = 67.67
              AND placa IN ('BRA2E19', 'JEP4A77', 'GTI3X88', 'ONX1P20', 'RNG9K55', 'EVB8D01',
                            'CIV7H99', 'CRT5U43', 'POR9S11', 'TOR3V80', 'VLV8P40', 'PEU2T08');
        """)
        con.run("COMMIT")
        print("[BANCO] Tabelas de favoritos e imagens verificadas; valores antigos revisados.")
        return True
    except Exception as e:
        try:
            con.run("ROLLBACK")
        except Exception as rollback_error:
            print(f"[BANCO] Falha ao desfazer inicializacao: {rollback_error}")
        raise RuntimeError(f"Falha ao preparar tabelas do AutoCar: {e}") from e
    finally:
        con.close()

# ============================================================================
# SERVIDOR HTTP REST API
# ============================================================================
class AuraAPIHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

    def end_headers(self):
        allowed_origin = os.environ.get("CORS_ORIGIN")
        if allowed_origin and self.headers.get("Origin") == allowed_origin:
            self.send_header('Access-Control-Allow-Origin', allowed_origin)
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Vary', 'Origin')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_PATCH(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # PATCH /api/veiculos/<id>/status  — Mudar status do veículo
        if path.endswith('/status') and '/api/veiculos/' in path:
            parts = path.split('/')
            if len(parts) >= 4 and parts[3].isdigit():
                veiculo_id = int(parts[3])
                try:
                    body = self.get_post_body()
                except Exception:
                    self.send_json(400, {"erro": "JSON invalido"})
                    return
                novo_status = body.get('status')
                if novo_status not in ('disponivel', 'reservado', 'vendido'):
                    self.send_json(400, {"erro": "Status invalido. Use: disponivel, reservado ou vendido"})
                    return
                con = get_connection()
                if not con:
                    self.send_json(500, {"erro": "Sem conexao com PostgreSQL"})
                    return
                try:
                    con.run("UPDATE veiculos SET status = :s WHERE id = :vid", s=novo_status, vid=veiculo_id)
                    con.close()
                    self.send_json(200, {"sucesso": True, "status": novo_status})
                except Exception as e:
                    con.close()
                    self.send_json(500, {"erro": str(e)})
                return

        self.send_json(404, {"erro": "Rota nao encontrada"})

    def send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps(data, default=str).encode('utf-8'))

    def get_post_body(self):
        length = int(self.headers.get('Content-Length', 0))
        if length > 0:
            raw = self.rfile.read(length).decode('utf-8')
            return json.loads(raw)
        return {}

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # Serves uploaded images as binary data instead of embedding large data URLs in the catalog.
        image_path = path.split('/')
        if (
            len(image_path) == 5
            and image_path[1:3] == ['api', 'veiculos']
            and image_path[4] == 'imagem'
            and image_path[3].isdigit()
        ):
            vehicle_id = int(image_path[3])
            con = get_connection()
            if not con:
                self.send_json(500, {"erro": "Sem conexao com PostgreSQL"})
                return
            try:
                ensure_image_table(con)
                con.run("COMMIT")
                rows = con.run(
                    "SELECT imagem_dado FROM veiculos_imagens "
                    "WHERE veiculo_id = :vid ORDER BY id DESC LIMIT 1",
                    vid=vehicle_id
                )
                if rows:
                    image_data = rows[0][0]
                else:
                    rows = con.run(
                        "SELECT imagem_url FROM veiculos WHERE id = :vid",
                        vid=vehicle_id
                    )
                    image_data = rows[0][0] if rows else None
                con.close()
                con = None

                if not image_data or not isinstance(image_data, str):
                    self.send_json(404, {"erro": "Imagem nao encontrada"})
                    return

                mime_type, separator, encoded_image = image_data.partition(';base64,')
                if not separator or mime_type not in (
                    'data:image/jpeg', 'data:image/png',
                    'data:image/webp', 'data:image/gif'
                ):
                    self.send_json(404, {"erro": "Imagem nao encontrada"})
                    return

                image_bytes = base64.b64decode(encoded_image, validate=True)
                self.send_response(200)
                self.send_header('Content-Type', mime_type.replace('data:', ''))
                self.send_header('Content-Length', str(len(image_bytes)))
                self.send_header('Cache-Control', 'public, max-age=3600')
                self.end_headers()
                self.wfile.write(image_bytes)
            except (ValueError, binascii.Error) as e:
                if con:
                    con.close()
                self.send_json(500, {"erro": f"Imagem armazenada invalida: {e}"})
            except Exception as e:
                if con:
                    con.close()
                self.send_json(500, {"erro": str(e)})
            return

        # 1. Status da Conexão
        if path == '/api/status':
            con = get_connection()
            if con:
                con.close()
                self.send_json(200, {
                    "status": "ok",
                    "api_version": 3,
                    "image_upload_supported": True,
                    "vehicle_edit_supported": True,
                    "mensagem": "Conectado ao PostgreSQL com sucesso!"
                })
            else:
                self.send_json(500, {"status": "erro", "mensagem": "Falha na senha ou conexao do PostgreSQL."})
            return

        # Lista ordenada de veículos escolhidos para o carrossel da loja.
        if path == '/api/carrossel':
            con = get_connection()
            if not con:
                self.send_json(500, {"erro": "Sem conexao com PostgreSQL"})
                return
            try:
                rows = con.run("SELECT veiculo_id FROM veiculos_carrossel ORDER BY ordem ASC")
                con.close()
                self.send_json(200, [row[0] for row in rows])
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": str(e)})
            return

        # 2. Listar Veículos
        elif path == '/api/veiculos':
            con = get_connection()
            if not con:
                self.send_json(500, {"erro": "Sem conexao com PostgreSQL"})
                return
            try:
                ensure_image_table(con)
                con.run("COMMIT")
                vehicle_query = """
                    SELECT v.id, v.titulo, v.categoria, v.preco, v.ano, v.km, v.cambio,
                           v.combustivel, v.placa, v.cor, v.badge, v.rating, v.reviews_count,
                           v.descricao, v.status, v.imagem_url,
                           EXISTS (
                               SELECT 1 FROM veiculos_imagens vi WHERE vi.veiculo_id = v.id
                           ) AS has_uploaded_image
                    FROM veiculos v
                """
                if query.get('todos', [''])[0] == '1':
                    rows = con.run(vehicle_query + " ORDER BY v.id ASC")
                else:
                    rows = con.run(vehicle_query + " WHERE v.status = 'disponivel' ORDER BY v.id ASC")
                veiculos = []
                for r in rows:
                    veiculos.append({
                        "id": r[0], "title": r[1], "category": r[2], "price": float(r[3]),
                        "year": r[4], "km": r[5], "transmission": r[6], "fuel": r[7],
                        "plate": r[8], "color": r[9], "badge": r[10], "rating": float(r[11]),
                        "reviewsCount": r[12], "description": r[13], "status": r[14],
                        "image": (
                            f"/api/veiculos/{r[0]}/imagem"
                            if r[16] or (isinstance(r[15], str) and r[15].startswith('data:image/'))
                            else r[15]
                        )
                    })
                con.close()
                self.send_json(200, veiculos)
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": str(e)})
            return

        # 3. Listar Reservas do Usuário
        elif path == '/api/minhas-reservas':
            user_id = query.get('usuario_id', [None])[0]
            con = get_connection()
            if not con:
                self.send_json(500, {"erro": "Sem conexao com PostgreSQL"})
                return
            try:
                if user_id:
                    rows = con.run("""
                        SELECT r.id, r.codigo_reserva, r.valor_reserva, r.metodo_pagamento, r.status_pagamento, r.criado_em, v.titulo
                        FROM reservas r
                        LEFT JOIN veiculos v ON r.veiculo_id = v.id
                        WHERE r.usuario_id = :uid
                        ORDER BY r.criado_em DESC
                    """, uid=int(user_id))
                else:
                    rows = con.run("""
                        SELECT r.id, r.codigo_reserva, r.valor_reserva, r.metodo_pagamento, r.status_pagamento, r.criado_em, v.titulo
                        FROM reservas r
                        LEFT JOIN veiculos v ON r.veiculo_id = v.id
                        ORDER BY r.criado_em DESC
                    """)
                reservas = []
                for r in rows:
                    reservas.append({
                        "id": r[0], "codigo": r[1], "valor": float(r[2]), "metodo": r[3],
                        "status": r[4], "data": str(r[5]), "veiculo": r[6]
                    })
                con.close()
                self.send_json(200, reservas)
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": str(e)})
            return

        # 4. Listar Propostas de Troca
        elif path == '/api/minhas-trocas':
            user_id = query.get('usuario_id', [None])[0]
            con = get_connection()
            if not con:
                self.send_json(500, {"erro": "Sem conexao com PostgreSQL"})
                return
            try:
                if user_id:
                    rows = con.run("""
                        SELECT t.id, t.meu_carro_modelo, t.meu_carro_ano, t.meu_carro_km, t.valor_proposta, t.status, v.titulo
                        FROM propostas_troca t
                        LEFT JOIN veiculos v ON t.veiculo_desejado_id = v.id
                        WHERE t.usuario_id = :uid
                        ORDER BY t.criado_em DESC
                    """, uid=int(user_id))
                else:
                    rows = con.run("""
                        SELECT t.id, t.meu_carro_modelo, t.meu_carro_ano, t.meu_carro_km, t.valor_proposta, t.status, v.titulo
                        FROM propostas_troca t
                        LEFT JOIN veiculos v ON t.veiculo_desejado_id = v.id
                        ORDER BY t.criado_em DESC
                    """)
                trocas = []
                for t in rows:
                    trocas.append({
                        "id": t[0], "meu_carro": t[1], "ano": t[2], "km": t[3],
                        "valor": float(t[4]), "status": t[5], "carro_desejado": t[6]
                    })
                con.close()
                self.send_json(200, trocas)
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": str(e)})
            return

        # 5. Listar Favoritos do Usuário (GET /api/favoritos?usuario_id=X)
        elif path == '/api/favoritos':
            user_id = query.get('usuario_id', [None])[0]
            if not user_id:
                self.send_json(200, [])
                return
            con = get_connection()
            if not con:
                self.send_json(500, {"erro": "Sem conexao com PostgreSQL"})
                return
            try:
                rows = con.run("SELECT veiculo_id FROM favoritos WHERE usuario_id = :uid", uid=int(user_id))
                fav_ids = [r[0] for r in rows]
                con.close()
                self.send_json(200, fav_ids)
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": str(e)})
            return

        # Servir os arquivos estáticos do site.
        return super().do_GET()

    def do_PUT(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/carrossel':
            try:
                body = self.get_post_body()
            except Exception:
                self.send_json(400, {"erro": "JSON invalido"})
                return

            vehicle_ids = body.get('vehicle_ids')
            if (
                not isinstance(vehicle_ids, list)
                or not vehicle_ids
                or len(vehicle_ids) > 10
                or any(not isinstance(vehicle_id, int) or isinstance(vehicle_id, bool) for vehicle_id in vehicle_ids)
                or len(set(vehicle_ids)) != len(vehicle_ids)
            ):
                self.send_json(400, {"erro": "Selecione de 1 a 10 veiculos diferentes."})
                return

            con = get_connection()
            if not con:
                self.send_json(500, {"erro": "Sem conexao com PostgreSQL"})
                return
            try:
                existing = con.run(
                    "SELECT id FROM veiculos WHERE id IN (" + ", ".join(
                        f":vehicle_{index}" for index in range(len(vehicle_ids))
                    ) + ")",
                    **{f"vehicle_{index}": vehicle_id for index, vehicle_id in enumerate(vehicle_ids)}
                )
                if len(existing) != len(vehicle_ids):
                    con.close()
                    self.send_json(400, {"erro": "Um ou mais veiculos selecionados nao existem."})
                    return

                con.run("BEGIN")
                con.run("DELETE FROM veiculos_carrossel")
                for position, vehicle_id in enumerate(vehicle_ids, start=1):
                    con.run(
                        "INSERT INTO veiculos_carrossel (veiculo_id, ordem) VALUES (:vid, :ordem)",
                        vid=vehicle_id, ordem=position
                    )
                con.run("COMMIT")
                con.close()
                self.send_json(200, {"sucesso": True, "vehicle_ids": vehicle_ids})
            except Exception as e:
                try:
                    con.run("ROLLBACK")
                except Exception as rollback_error:
                    print(f"[BANCO] Falha ao desfazer selecao do carrossel: {rollback_error}")
                finally:
                    con.close()
                self.send_json(500, {"erro": str(e)})
            return

        parts = parsed.path.split('/')
        if len(parts) != 4 or parts[1:3] != ['api', 'veiculos'] or not parts[3].isdigit():
            self.send_json(404, {"erro": "Rota nao encontrada"})
            return

        try:
            body = self.get_post_body()
        except Exception:
            self.send_json(400, {"erro": "JSON invalido"})
            return

        vehicle_id = int(parts[3])
        titulo = body.get('titulo', '').strip()
        categoria = body.get('categoria', 'Sedan')
        preco = body.get('preco')
        ano = body.get('ano')
        km = body.get('km', 0)
        cambio = body.get('cambio', 'Automatico')
        combustivel = body.get('combustivel', 'Flex')
        placa = body.get('placa', '').strip().upper()
        cor = body.get('cor', '').strip()
        badge = body.get('badge', 'Destaque')
        descricao = body.get('descricao', '').strip()
        imagem_url = body.get('imagem_url', '').strip()
        imagem_dado = body.get('imagem_dado', '')
        categorias_validas = ('Sedan', 'SUV', 'Hatch', 'Pickup', 'Esportivo', 'Eletrico', 'Elétrico')

        if not titulo or not preco or not ano or not placa:
            self.send_json(400, {"erro": "Campos obrigatorios: titulo, preco, ano, placa."})
            return
        if categoria not in categorias_validas:
            self.send_json(400, {"erro": "Categoria invalida."})
            return
        if imagem_dado and not isinstance(imagem_dado, str):
            self.send_json(400, {"erro": "Imagem invalida."})
            return
        if imagem_dado:
            try:
                mime_type, encoded_image = imagem_dado.split(';base64,', 1)
                if mime_type not in ('data:image/jpeg', 'data:image/png', 'data:image/webp', 'data:image/gif'):
                    raise ValueError()
                decoded_image = base64.b64decode(encoded_image, validate=True)
                if len(decoded_image) > 5 * 1024 * 1024:
                    raise ValueError()
            except (ValueError, binascii.Error):
                self.send_json(400, {"erro": "Imagem invalida ou maior que 5 MB."})
                return

        con = get_connection()
        if not con:
            self.send_json(500, {"erro": "Sem conexao com PostgreSQL"})
            return
        try:
            ensure_image_table(con)
            con.run("COMMIT")
            con.run("BEGIN")
            exists = con.run("SELECT id FROM veiculos WHERE id = :vid", vid=vehicle_id)
            if not exists:
                con.run("ROLLBACK")
                con.close()
                self.send_json(404, {"erro": "Veiculo nao encontrado."})
                return
            duplicate = con.run(
                "SELECT id FROM veiculos WHERE placa = :placa AND id <> :vid",
                placa=placa, vid=vehicle_id
            )
            if duplicate:
                con.run("ROLLBACK")
                con.close()
                self.send_json(400, {"erro": "Ja existe outro veiculo com essa placa."})
                return

            con.run("""
                UPDATE veiculos
                SET titulo = :titulo, categoria = :categoria, preco = :preco,
                    ano = :ano, km = :km, cambio = :cambio, combustivel = :combustivel,
                    placa = :placa, cor = :cor, badge = :badge, descricao = :descricao
                WHERE id = :vid
            """, titulo=titulo, categoria=categoria, preco=float(preco), ano=int(ano),
                 km=int(km), cambio=cambio, combustivel=combustivel, placa=placa,
                 cor=cor, badge=badge, descricao=descricao, vid=vehicle_id)

            if imagem_dado:
                con.run("DELETE FROM veiculos_imagens WHERE veiculo_id = :vid", vid=vehicle_id)
                con.run(
                    "INSERT INTO veiculos_imagens (veiculo_id, imagem_dado) VALUES (:vid, :img)",
                    vid=vehicle_id, img=imagem_dado
                )
                con.run(
                    "UPDATE veiculos SET imagem_url = :img WHERE id = :vid",
                    img=imagem_dado, vid=vehicle_id
                )
            elif imagem_url:
                con.run("DELETE FROM veiculos_imagens WHERE veiculo_id = :vid", vid=vehicle_id)
                con.run(
                    "UPDATE veiculos SET imagem_url = :img WHERE id = :vid",
                    img=imagem_url, vid=vehicle_id
                )

            con.run("COMMIT")
            con.close()
            self.send_json(200, {
                "sucesso": True,
                "id": vehicle_id,
                "imagem_salva": bool(imagem_dado),
                "mensagem": "Veiculo atualizado com sucesso."
            })
        except Exception as e:
            try:
                con.run("ROLLBACK")
            except Exception as rollback_error:
                print(f"[BANCO] Falha ao desfazer edicao de veiculo: {rollback_error}")
            finally:
                con.close()
            self.send_json(500, {"erro": f"Erro ao atualizar veiculo: {str(e)}"})

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # DELETE /api/veiculos/<id>  — Remover veículo do estoque
        if path.startswith('/api/veiculos/'):
            parts = path.split('/')
            if len(parts) == 4 and parts[3].isdigit():
                veiculo_id = int(parts[3])
                con = get_connection()
                if not con:
                    self.send_json(500, {"erro": "Sem conexao com PostgreSQL"})
                    return
                try:
                    con.run("DELETE FROM veiculos WHERE id = :vid", vid=veiculo_id)
                    con.close()
                    self.send_json(200, {"sucesso": True, "mensagem": f"Veiculo {veiculo_id} removido."})
                except Exception as e:
                    con.close()
                    self.send_json(500, {"erro": str(e)})
                return

        self.send_json(404, {"erro": "Rota nao encontrada"})

    def do_POST(self):
        path = urllib.parse.urlparse(self.path).path
        try:
            body = self.get_post_body()
        except Exception:
            self.send_json(400, {"erro": "JSON invalido"})
            return

        con = get_connection()
        if not con:
            self.send_json(500, {"erro": "Sem conexao com o PostgreSQL local"})
            return

        # Atualização dos dados básicos da conta, validada pela senha atual.
        if path == '/api/conta/atualizar':
            user_id = body.get('usuario_id')
            nome = body.get('nome')
            telefone = body.get('telefone', '')
            senha_atual = body.get('senha_atual')
            nova_senha = body.get('nova_senha', '')
            imagem_perfil = body.get('imagem_perfil')

            if isinstance(user_id, bool) or not isinstance(user_id, int) or user_id <= 0:
                self.send_json(400, {"erro": "Conta inválida."})
                con.close()
                return
            if not isinstance(nome, str) or not nome.strip() or len(nome.strip()) > 120:
                self.send_json(400, {"erro": "Informe um nome válido com até 120 caracteres."})
                con.close()
                return
            if not isinstance(telefone, str):
                self.send_json(400, {"erro": "Telefone inválido."})
                con.close()
                return
            telefone = telefone.strip()
            telefone_digitos = re.sub(r'\D', '', telefone)
            if telefone_digitos and len(telefone_digitos) not in (10, 11):
                self.send_json(400, {"erro": "Informe um telefone com DDD e 8 ou 9 dígitos."})
                con.close()
                return
            if not isinstance(senha_atual, str) or not senha_atual:
                self.send_json(400, {"erro": "Informe sua senha atual para confirmar as alterações."})
                con.close()
                return
            if not isinstance(nova_senha, str) or (nova_senha and len(nova_senha) < 4):
                self.send_json(400, {"erro": "A nova senha precisa ter pelo menos 4 caracteres."})
                con.close()
                return
            if imagem_perfil is not None:
                try:
                    mime_type, encoded_image = imagem_perfil.split(';base64,', 1)
                    if mime_type not in ('data:image/jpeg', 'data:image/png', 'data:image/webp'):
                        raise ValueError()
                    decoded_image = base64.b64decode(encoded_image, validate=True)
                    if not decoded_image or len(decoded_image) > 2 * 1024 * 1024:
                        raise ValueError()
                except (AttributeError, ValueError, binascii.Error):
                    self.send_json(400, {"erro": "A foto deve ser JPG, PNG ou WebP e ter no máximo 2 MB."})
                    con.close()
                    return

            try:
                verified_user = con.run(
                    "SELECT id FROM usuarios WHERE id = :uid AND senha = :senha",
                    uid=user_id,
                    senha=senha_atual
                )
                if not verified_user:
                    con.close()
                    self.send_json(401, {"erro": "Senha atual incorreta."})
                    return

                if imagem_perfil is not None:
                    con.run("""
                        INSERT INTO usuarios_imagens (usuario_id, imagem_dado)
                        VALUES (:uid, :imagem)
                        ON CONFLICT (usuario_id) DO UPDATE
                        SET imagem_dado = EXCLUDED.imagem_dado,
                            atualizado_em = now()
                    """, uid=user_id, imagem=imagem_perfil)

                rows = con.run("""
                    UPDATE usuarios
                    SET nome = :nome,
                        telefone = :telefone,
                        senha = CASE WHEN :nova_senha = '' THEN senha ELSE :nova_senha END
                    WHERE id = :uid
                    RETURNING id, nome, email, cpf, telefone, tipo
                """, nome=nome.strip(), telefone=telefone, nova_senha=nova_senha, uid=user_id)
                image_rows = con.run(
                    "SELECT imagem_dado FROM usuarios_imagens WHERE usuario_id = :uid",
                    uid=user_id
                )
                con.run("COMMIT")
                row = rows[0]
                user = {
                    "id": row[0],
                    "nome": row[1],
                    "email": row[2],
                    "cpf": row[3],
                    "telefone": row[4],
                    "tipo": row[5],
                    "imagem_perfil": image_rows[0][0] if image_rows else None
                }
                con.close()
                self.send_json(200, {"sucesso": True, "usuario": user})
            except Exception as e:
                try:
                    con.run("ROLLBACK")
                except Exception as rollback_error:
                    print(f"[BANCO] Falha ao desfazer atualizacao de conta: {rollback_error}")
                finally:
                    con.close()
                self.send_json(500, {"erro": f"Erro ao atualizar conta: {e}"})
            return

        # 0. Rota de Cadastro de Veículo (Painel Admin)
        if path == '/api/veiculos':
            try:
                ensure_image_table(con)
                con.run("COMMIT")
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": f"Falha ao criar tabela de imagens: {e}"})
                return

            titulo = body.get('titulo', '').strip()
            categoria = body.get('categoria', 'Sedan')
            preco = body.get('preco')
            ano = body.get('ano')
            km = body.get('km', 0)
            cambio = body.get('cambio', 'Automatico')
            combustivel = body.get('combustivel', 'Flex')
            placa = body.get('placa', '').strip().upper()
            cor = body.get('cor', '').strip()
            badge = body.get('badge', 'Destaque')
            descricao = body.get('descricao', '').strip()
            imagem_url = body.get('imagem_url', '').strip()
            imagem_dado = body.get('imagem_dado', '')
            rating = float(body.get('rating', 4.8))
            reviews_count = int(body.get('reviews_count', 50))

            if not titulo or not preco or not ano or not placa:
                self.send_json(400, {"erro": "Campos obrigatorios: titulo, preco, ano, placa."})
                con.close()
                return

            if imagem_dado and not isinstance(imagem_dado, str):
                self.send_json(400, {"erro": "Imagem invalida."})
                con.close()
                return

            if imagem_dado:
                try:
                    mime_type, encoded_image = imagem_dado.split(';base64,', 1)
                    if mime_type not in ('data:image/jpeg', 'data:image/png', 'data:image/webp', 'data:image/gif'):
                        raise ValueError()
                    decoded_image = base64.b64decode(encoded_image, validate=True)
                    if len(decoded_image) > 5 * 1024 * 1024:
                        raise ValueError()
                except (ValueError, binascii.Error):
                    self.send_json(400, {"erro": "Imagem invalida ou maior que 5 MB."})
                    con.close()
                    return

            categorias_validas = ('Sedan', 'SUV', 'Hatch', 'Pickup', 'Esportivo', 'Eletrico')
            if categoria not in categorias_validas and categoria != 'Elétrico':
                self.send_json(400, {"erro": f"Categoria invalida. Use: Sedan, SUV, Hatch, Pickup, Esportivo, Eletrico"})
                con.close()
                return

            try:
                con.run("BEGIN")
                existe = con.run("SELECT id FROM veiculos WHERE placa = :p", p=placa)
                if existe:
                    con.run("ROLLBACK")
                    self.send_json(400, {"erro": "Ja existe um veiculo com essa placa no estoque."})
                    con.close()
                    return

                res = con.run("""
                    INSERT INTO veiculos (titulo, categoria, preco, ano, km, cambio, combustivel, placa, cor, badge, rating, reviews_count, descricao, imagem_url, status)
                    VALUES (:titulo, :cat, :preco, :ano, :km, :cambio, :comb, :placa, :cor, :badge, :rating, :rev, :desc, :img, 'disponivel')
                    RETURNING id, titulo, preco
                """, titulo=titulo, cat=categoria, preco=float(preco), ano=int(ano), km=int(km),
                     cambio=cambio, comb=combustivel, placa=placa, cor=cor, badge=badge,
                     rating=rating, rev=reviews_count, desc=descricao, img=imagem_url)

                if imagem_dado:
                    con.run("""
                        INSERT INTO veiculos_imagens (veiculo_id, imagem_dado)
                        VALUES (:vid, :img)
                    """, vid=res[0][0], img=imagem_dado)
                    con.run("UPDATE veiculos SET imagem_url = :img WHERE id = :vid", img=imagem_dado, vid=res[0][0])

                con.run("COMMIT")
                con.close()
                self.send_json(201, {
                    "sucesso": True,
                    "id": res[0][0],
                    "titulo": res[0][1],
                    "imagem_salva": bool(imagem_dado),
                    "mensagem": f"Veiculo cadastrado com sucesso no estoque!"
                })
            except Exception as e:
                try:
                    con.run("ROLLBACK")
                except Exception as rollback_error:
                    print(f"[BANCO] Falha ao desfazer cadastro de veiculo: {rollback_error}")
                finally:
                    con.close()
                self.send_json(500, {"erro": f"Erro ao cadastrar veiculo: {str(e)}"})
            return

        # 1. Rota de Cadastro de Usuário
        if path == '/api/cadastrar':
            nome = body.get('nome')
            email = body.get('email')
            senha = body.get('senha')
            cpf = body.get('cpf', '')
            telefone = body.get('telefone', '')

            if not isinstance(nome, str) or not isinstance(email, str) or not isinstance(senha, str) or not nome.strip() or not email.strip() or not senha:
                self.send_json(400, {"erro": "Nome, e-mail e senha sao obrigatorios."})
                con.close()
                return
            nome = nome.strip()
            email = email.strip()
            if not is_valid_email(email):
                self.send_json(400, {"erro": "Informe um endereço de e-mail válido."})
                con.close()
                return
            if not isinstance(telefone, str):
                self.send_json(400, {"erro": "Telefone inválido."})
                con.close()
                return
            telefone = telefone.strip()
            telefone_digitos = re.sub(r'\D', '', telefone)
            if telefone_digitos and len(telefone_digitos) not in (10, 11):
                self.send_json(400, {"erro": "Informe um telefone com DDD e 8 ou 9 dígitos."})
                con.close()
                return

            try:
                existe = con.run("SELECT id FROM usuarios WHERE email = :e", e=email)
                if existe:
                    self.send_json(400, {"erro": "Este e-mail ja esta cadastrado no sistema."})
                    con.close()
                    return

                res = con.run("""
                    INSERT INTO usuarios (nome, email, senha, cpf, telefone, tipo)
                    VALUES (:n, :e, :s, :c, :t, 'cliente')
                    RETURNING id, nome, email, cpf, telefone, tipo
                """, n=nome, e=email, s=senha, c=cpf, t=telefone)
                
                user = {
                    "id": res[0][0], "nome": res[0][1], "email": res[0][2],
                    "cpf": res[0][3], "telefone": res[0][4], "tipo": res[0][5]
                }
                con.close()
                self.send_json(201, {"sucesso": True, "usuario": user})
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": f"Erro ao cadastrar: {e}"})
            return

        # 2. Rota de Login de Usuário
        elif path == '/api/login':
            email = body.get('email')
            senha = body.get('senha')

            if not email or not senha:
                self.send_json(400, {"erro": "Informe e-mail e senha."})
                con.close()
                return

            try:
                res = con.run("""
                    SELECT u.id, u.nome, u.email, u.cpf, u.telefone, u.tipo, ui.imagem_dado
                    FROM usuarios u
                    LEFT JOIN usuarios_imagens ui ON ui.usuario_id = u.id
                    WHERE u.email = :e AND u.senha = :s
                """, e=email, s=senha)

                if res:
                    user = {
                        "id": res[0][0], "nome": res[0][1], "email": res[0][2],
                        "cpf": res[0][3], "telefone": res[0][4], "tipo": res[0][5],
                        "imagem_perfil": res[0][6]
                    }
                    con.close()
                    self.send_json(200, {"sucesso": True, "usuario": user})
                else:
                    con.close()
                    self.send_json(401, {"erro": "E-mail ou senha incorretos."})
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": f"Erro no login: {e}"})
            return

        # 3. Rota de Registro de Reserva
        elif path == '/api/reservas':
            codigo_reserva = body.get('codigo_reserva')
            usuario_id = body.get('usuario_id')
            nome_cliente = body.get('nome_cliente')
            cpf_cliente = body.get('cpf_cliente')
            telefone_cliente = body.get('telefone_cliente')
            cep_entrega = body.get('cep_entrega')
            tipo_retirada = body.get('tipo_retirada', 'store')
            veiculo_id = body.get('veiculo_id')
            metodo_pagamento = body.get('metodo_pagamento', 'pix')
            valor_reserva = float(body.get('valor_reserva', 0))

            if valor_reserva <= 0:
                try:
                    c_row = con.run("SELECT preco FROM veiculos WHERE id = :vid", vid=veiculo_id)
                    if c_row:
                        valor_reserva = float(c_row[0][0])
                except Exception:
                    valor_reserva = 148900.00

            try:
                res = con.run("""
                    INSERT INTO reservas (codigo_reserva, usuario_id, nome_cliente, cpf_cliente, telefone_cliente, cep_entrega, tipo_retirada, veiculo_id, valor_reserva, metodo_pagamento, status_pagamento)
                    VALUES (:cod, :uid, :nc, :cc, :tc, :cep, :tr, :vid, :vr, :mp, 'aprovado')
                    RETURNING id, codigo_reserva, valor_reserva
                """, cod=codigo_reserva, uid=usuario_id, nc=nome_cliente, cc=cpf_cliente, tc=telefone_cliente, cep=cep_entrega, tr=tipo_retirada, vid=veiculo_id, vr=valor_reserva, mp=metodo_pagamento)
                
                con.close()
                self.send_json(201, {"sucesso": True, "reserva_id": res[0][0], "codigo": res[0][1]})
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": f"Erro ao criar reserva: {e}"})
            return

        # 4. Rota de Envio de Proposta de Troca
        elif path == '/api/trocas':
            usuario_id = body.get('usuario_id')
            nome_cliente = body.get('nome_cliente')
            telefone_cliente = body.get('telefone_cliente')
            veiculo_desejado_id = body.get('veiculo_desejado_id')
            meu_carro_modelo = body.get('meu_carro_modelo')
            meu_carro_placa = body.get('meu_carro_placa')
            meu_carro_ano = int(body.get('meu_carro_ano', 2020))
            meu_carro_km = int(body.get('meu_carro_km', 50000))
            estado_conservacao = body.get('estado_conservacao', 'Bom')
            valor_proposta = float(body.get('valor_proposta', 65000.00))

            try:
                res = con.run("""
                    INSERT INTO propostas_troca (usuario_id, nome_cliente, telefone_cliente, veiculo_desejado_id, meu_carro_modelo, meu_carro_placa, meu_carro_ano, meu_carro_km, estado_conservacao, valor_proposta)
                    VALUES (:uid, :nc, :tc, :vid, :mcm, :mcp, :mca, :mck, :ec, :vp)
                    RETURNING id, status
                """, uid=usuario_id, nc=nome_cliente, tc=telefone_cliente, vid=veiculo_desejado_id, mcm=meu_carro_modelo, mcp=meu_carro_placa, mca=meu_carro_ano, mck=meu_carro_km, ec=estado_conservacao, vp=valor_proposta)
                
                con.close()
                self.send_json(201, {"sucesso": True, "troca_id": res[0][0]})
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": f"Erro ao registrar troca: {e}"})
            return

        # 5. Simulador de Troca (Python)
        elif path == '/api/simular-troca':
            con.close()
            self.handle_simular_troca(body)
            return

        # 6. Simulador de Financiamento (Python)
        elif path == '/api/simular-financiamento':
            con.close()
            self.handle_simular_financiamento(body)
            return

        # 7. Alternar Favorito (POST /api/favoritos/toggle)
        elif path == '/api/favoritos/toggle':
            usuario_id = body.get('usuario_id')
            veiculo_id = body.get('veiculo_id')
            if not usuario_id or not veiculo_id:
                self.send_json(400, {"erro": "usuario_id e veiculo_id obrigatorios"})
                con.close()
                return
            try:
                exists = con.run("SELECT id FROM favoritos WHERE usuario_id = :uid AND veiculo_id = :vid", uid=int(usuario_id), vid=int(veiculo_id))
                if exists:
                    con.run("DELETE FROM favoritos WHERE usuario_id = :uid AND veiculo_id = :vid", uid=int(usuario_id), vid=int(veiculo_id))
                    favoritado = False
                else:
                    con.run("INSERT INTO favoritos (usuario_id, veiculo_id) VALUES (:uid, :vid)", uid=int(usuario_id), vid=int(veiculo_id))
                    favoritado = True
                
                rows = con.run("SELECT veiculo_id FROM favoritos WHERE usuario_id = :uid", uid=int(usuario_id))
                fav_ids = [r[0] for r in rows]
                con.close()
                self.send_json(200, {"sucesso": True, "favoritado": favoritado, "favoritos": fav_ids})
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": str(e)})
            return

        # 8. Upload de Imagem avulsa (POST /api/upload-imagem)
        elif path == '/api/upload-imagem':
            imagem_dado = body.get('imagem_dado')
            veiculo_id = body.get('veiculo_id') # opcional
            if not imagem_dado:
                self.send_json(400, {"erro": "imagem_dado obrigatoria"})
                con.close()
                return
            try:
                res = con.run("""
                    INSERT INTO veiculos_imagens (veiculo_id, imagem_dado)
                    VALUES (:vid, :img)
                    RETURNING id
                """, vid=int(veiculo_id) if veiculo_id else None, img=imagem_dado)
                con.close()
                self.send_json(201, {"sucesso": True, "imagem_id": res[0][0]})
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": str(e)})
            return

        con.close()
        self.send_json(404, {"erro": "Rota nao encontrada"})

    def handle_simular_troca(self, body):
        """POST /api/simular-troca — Calcula proposta de troca via Python"""
        veiculo_id = body.get('veiculo_desejado_id')
        meu_carro_modelo = body.get('meu_carro_modelo', 'Carro Usado')
        meu_carro_ano = int(body.get('meu_carro_ano', 2020))
        meu_carro_km = int(body.get('meu_carro_km', 50000))
        estado = body.get('estado_conservacao', 'Bom')

        con = get_connection()
        if con:
            try:
                row = con.run("SELECT titulo, preco FROM veiculos WHERE id = :vid", vid=veiculo_id)
                con.close()
                if row:
                    titulo = row[0][0]
                    preco = float(row[0][1])
                else:
                    self.send_json(404, {"erro": "Veículo nao encontrado"})
                    return
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": str(e)})
                return
        else:
            self.send_json(500, {"erro": "Sem conexao com banco de dados"})
            return

        # Fórmula de avaliação do usado
        multiplicador = {'Excelente': 1.0, 'Bom': 0.92, 'Regular': 0.80}.get(estado, 0.92)
        ano_diff = max(0, 2026 - meu_carro_ano)
        base_estimate = max(18000, round((preco * 0.60 - ano_diff * 4500 - meu_carro_km * 0.12) * multiplicador))
        diferenca = preco - base_estimate

        self.send_json(200, {
            "sucesso": True,
            "carro_desejado_titulo": titulo,
            "carro_desejado_preco": preco,
            "valor_estimado_usado": base_estimate,
            "diferenca": diferenca,
            "meu_carro_modelo": meu_carro_modelo,
            "meu_carro_ano": meu_carro_ano
        })

    def handle_simular_financiamento(self, body):
        """POST /api/simular-financiamento — Calcula parcelas via PMT"""
        veiculo_id = body.get('veiculo_id')
        entrada = float(body.get('entrada', 0))
        prazo = int(body.get('prazo_meses', 36))
        taxa_mensal = float(body.get('taxa_juros_mensal', 0.0149))  # ex: 0.0149 = 1.49%

        # Buscar preço do veículo
        con = get_connection()
        preco = None
        if con and veiculo_id:
            try:
                row = con.run("SELECT preco FROM veiculos WHERE id = :vid", vid=veiculo_id)
                con.close()
                if row:
                    preco = float(row[0][0])
            except Exception as e:
                con.close()
                self.send_json(500, {"erro": f"Erro ao consultar veiculo para financiamento: {e}"})
                return
        elif con:
            con.close()

        if preco is None:
            self.send_json(404, {"erro": "Veículo nao encontrado ou sem conexao com banco"})
            return

        valor_financiado = preco - entrada
        if valor_financiado <= 0:
            self.send_json(400, {"erro": "Entrada maior ou igual ao preco do veiculo"})
            return

        # Fórmula PMT
        if taxa_mensal == 0:
            parcela = valor_financiado / prazo
        else:
            fator = (1 + taxa_mensal) ** prazo
            parcela = valor_financiado * (taxa_mensal * fator) / (fator - 1)

        total_pago = parcela * prazo + entrada
        total_juros = total_pago - preco
        cet = round(((total_pago / preco) - 1) * 100, 2)

        self.send_json(200, {
            "sucesso": True,
            "preco_veiculo": preco,
            "entrada": entrada,
            "valor_financiado": round(valor_financiado, 2),
            "taxa_mensal": taxa_mensal,
            "prazo_meses": prazo,
            "parcela": round(parcela, 2),
            "total_pago": round(total_pago, 2),
            "total_juros": round(total_juros, 2),
            "cet_percent": cet
        })

# ============================================================================
# EXECUÇÃO DO SERVIDOR
# ============================================================================
class AuraThreadingHTTPServer(ThreadingHTTPServer):
    allow_reuse_address = True
    daemon_threads = True
    request_queue_size = 32


def run(port=None):
    port = port or int(os.environ.get("PORT", "5000"))
    host = os.environ.get("HOST", "127.0.0.1")
    print("=" * 70)
    print("[AUTOCAR] - SERVIDOR WEB (PYTHON + POSTGRESQL)")
    print("=" * 70)
    print(f"[CONEXAO] Conectando ao PostgreSQL ('{DB_CONFIG['database']}' em {DB_CONFIG['host']}:{DB_CONFIG['port']})...")

    try:
        database_ready = init_db()
    except RuntimeError as e:
        database_ready = False
        print(f"[ERRO] Falha ao inicializar o banco: {e}")

    if database_ready:
        print("[SUCESSO] PostgreSQL autenticado e tabelas verificadas.")
    else:
        print("[AVISO] Banco indisponivel ou configuracao de conexao incorreta.")
        print("   O servidor web continuara ativo; as rotas que usam o banco retornarao erro ate a conexao voltar.")

    print(f"\n[SERVIDOR] Ativo em {host}:{port}")
    print("   Pressione Ctrl + C no terminal para encerrar.")
    print("=" * 70)

    server = AuraThreadingHTTPServer((host, port), AuraAPIHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor finalizado.")
    finally:
        server.server_close()

if __name__ == '__main__':
    run(int(sys.argv[1]) if len(sys.argv) > 1 else None)
