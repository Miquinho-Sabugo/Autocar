# AutoCar Seminovos — Plataforma Digital para Revenda de Carros

Plataforma web para vitrine de veículos seminovos, comparação de modelos, simulação de financiamento, propostas de troca, garagem de reservas e painel administrativo de estoque.

---

## Melhorias de Acessibilidade, Heurísticas e Usabilidade Implementadas

Com base na avaliação heurística do projeto (**Atividade 05 – Heurísticas, Testes e Design Cognitivo**), foram implementados os seguintes recursos em `index.html`, `admin.html` e `css/styles.css`:

### 1. Acessibilidade (Item 25)
- **Tradução em Libras (VLibras – Governo Federal)**: widget oficial (`https://vlibras.gov.br/app/vlibras-plugin.js`) integrado na loja (`index.html`) e no painel administrativo (`admin.html`).
- **Menu Discreto de Acessibilidade (`#a11y-menu-btn`)**:
  - **Ajuste de tamanho de fonte (`A-`, `100%`, `A+`)**: escala proporcional de `87.5%` até `125%`, salva em `localStorage`.
  - **Modo de Alto Contraste**: tema de alto contraste para baixa visão (fundo `#000000`, textos `#ffffff`, destaques e bordas em `#facc15`, barra de rolagem adaptada).
  - **Leitura por Voz integrada**: síntese de voz em português (`pt-BR`) via Web Speech API com suporte a modais (captura de eventos), `<select>` (lê o item selecionado), células de tabelas, tooltips `(i)` e normalização de valores (`R$`, `km`, `a.m.`).
- **Modo Escuro (`#dark-mode-btn`)**: tema escuro confortável (`#0b1120` / `#111827`) sincronizado entre loja e painel admin via `localStorage`, com `color-scheme: dark` e alternância automática com o Alto Contraste.
- **Leitores de Tela e Teclado**: `alt` descritivo em todas as fotos (`getCarAltText`), região `aria-live="polite"`, link `"Pular para o catálogo de veículos"` e atalhos `Alt + 1/2/3`.

### 2. Clareza de Linguagem, Ajuda e Credibilidade (Itens 2, 10, 26, 28 e 32)
- **Tooltips informativos `(i)`**: explicações acessíveis (por hover, clique e teclado) para *Entrada*, *Prazo*, *Taxa Mensal (média estimada de 1,49% a.m.)*, *Tipos de Carroceria (Hatch, Sedan, SUV e Picape)*, *Estado de conservação* e *Laudo Cautelar Dekra*.
- **FAQ e Horários Padronizados**: atualização da resposta sobre taxa média estimada no FAQ e alinhamento do horário de atendimento em todo o site (`Seg–Sex 09h–18h · Sáb 09h–14h`).

### 3. Prevenção e Recuperação de Erros (Itens 1, 5, 9 e 20)
- **Validação em tempo real no Simulador de Financiamento**: alerta imediato enquanto o usuário digita caso a entrada seja negativa ou maior/igual ao preço do carro, com bloqueio explicativo do botão de cálculo.
- **Máscaras de entrada**: formatação automática de telefone/WhatsApp, CPF e placa no Simulador de Troca, Vender Carro, Checkout de Reserva e Painel Admin.

### 4. Comparação, Reconhecimento e Memória (Itens 6, 7, 21, 30 e 31)
- **Comparação de Veículos Lado a Lado**: seleção de até 3 veículos na vitrine com barra flutuante (`#compare-bar`) e tabela comparativa (`#compare-modal`) destacando automaticamente *Menor preço*, *Mais novo* e *Menor km*.
- **Carros Vistos Recentemente (`#recently-viewed-section`)**: histórico dos últimos 4 veículos visualizados exibido em destaque abaixo dos filtros.
- **Contexto no Simulador**: miniatura com foto, modelo, ano e preço (`Simulando para: ...`) exibida no Simulador de Financiamento.

### 5. Consistência Visual, Animações e Performance (Itens 4, 8, 33, 37 e 39)
- **CSS modularizado (`css/styles.css`)**: extração dos estilos customizados do `index.html`.
- **Consistência de interface**: cabeçalhos e rodapés de modais padronizados, botões com altura uniforme, remoção de textos/botões redundantes e ícones intuitivos.
- **Animações e Carregamento Progressivo**: título principal animado palavra por palavra (`.hero-word`), skeleton cards animados e renderização progressiva do catálogo em lotes de 6 veículos (`IntersectionObserver` + botão manual), respeitando `prefers-reduced-motion`.

### 6. Encontrável / SEO (Item 24)
- Meta tags de SEO (`description`, `keywords`, `robots`), Open Graph (`og:*`), Twitter Cards e dados estruturados `Schema.org` (`AutoDealer`) no `index.html`.
- Proteção `noindex, nofollow` em `admin.html` e criação dos arquivos `robots.txt` e `sitemap.xml`.

---

## Estrutura Principal do Projeto

- `index.html` — Loja principal (vitrine, filtros, comparação, simuladores, garagem, conta de usuário e acessibilidade).
- `css/styles.css` — Estilos customizados, temas (Claro, Escuro e Alto Contraste), tooltips e animações.
- `admin.html` — Painel administrativo para cadastro/edição de veículos e seleção do carrossel.
- `server.py` — Servidor HTTP em Python com API REST integrada ao PostgreSQL (`pg8000`).
- `robots.txt` e `sitemap.xml` — Configurações de indexação para mecanismos de busca.
- `schema_postgres_local.sql` / `schema_supabase.sql` / `sql.sql` — Scripts de estrutura do banco de dados.
- `requirements.txt` — Dependências Python (`pg8000`).
- `DEPLOYMENT.md` — Instruções de deploy.

---

## Como Executar Localmente

1. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
2. Configure o banco PostgreSQL usando `config.example.json` (copiando para `config.json`) ou a variável de ambiente `DATABASE_URL`.
3. Inicie o servidor:
   ```bash
   python3 server.py
   ```
4. Acesse no navegador `http://localhost:8000` (ou a porta configurada).
