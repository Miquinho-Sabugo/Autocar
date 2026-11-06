# Preparacao para hospedagem

O projeto foi preparado para servir o site e a API pela mesma origem e para
conectar a um PostgreSQL remoto usando variaveis de ambiente. A hospedagem ainda
nao deve ser aberta ao publico ate que os bloqueios de seguranca abaixo sejam
corrigidos.

## Bloqueios antes de publicar

- As senhas de usuarios sao armazenadas em texto puro.
- O painel esconde o acesso no navegador, mas as rotas administrativas da API
  nao validam uma sessao nem a permissao de administrador no servidor.
- Dados de conta enviados pelo navegador usam o ID do usuario, sem autenticacao
  assinada no backend.
- Imagens sao guardadas em base64 no banco, o que pode aumentar rapidamente o
  tamanho do banco.

Nao use dados reais nem permita cadastros publicos antes de corrigir esses
itens. A infraestrutura de hospedagem, sozinha, nao os resolve.

## Variaveis de ambiente

Configure no servico do backend:

- `HOST=0.0.0.0`
- `PORT` e fornecida automaticamente pelo Render.
- `DATABASE_URL` com a URL PostgreSQL do Supabase. Use a conexao recomendada
  pelo Supabase para o ambiente de hospedagem e mantenha SSL habilitado.
- `CORS_ORIGIN` so e necessaria se o frontend vier de outro dominio; quando
  frontend e API estao juntos, deixe-a vazia.

Nao envie `config.json` ao repositorio. Ele e destinado apenas a configuracao
local e esta listado no `.gitignore`.

## Depois dos bloqueios de seguranca

1. Crie o projeto Supabase e aplique `schema_supabase.sql` no SQL Editor.
2. Crie um servico web no Render apontando para este repositorio.
3. Use `pip install -r requirements.txt` como comando de build e `python
   server.py` como comando de inicio.
4. Configure as variaveis de ambiente acima e valide login, contas, estoque,
   favoritos, imagens e painel antes de conectar um dominio.
5. Configure o dominio e HTTPS no Render depois dos testes.

O deploy requer acesso do proprietario as contas do Render e Supabase. Nao
coloque senhas de banco, chaves ou URLs com credenciais em arquivos versionados.
