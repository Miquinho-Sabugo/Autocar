# AutoCar Seminovos — Plataforma Digital para Revenda de Carros

Plataforma web para vitrine de veículos seminovos, simulação de financiamento, propostas de troca, garagem de reservas e painel administrativo de estoque.

---

## Melhorias de Acessibilidade e Usabilidade Implementadas

Com base na avaliação heurística do projeto (**Atividade 05 – Heurísticas, Testes e Design Cognitivo**, em especial o **Item 25 – Acessível**), foram implementados os seguintes recursos em `index.html` e `admin.html`:

### 1. Tradução em Libras (VLibras – Governo Federal)
- Integração do widget oficial e gratuito **VLibras** (`https://vlibras.gov.br/app/vlibras-plugin.js`) na loja (`index.html`) e no painel administrativo (`admin.html`), permitindo que usuários surdos traduzam os textos da interface para Língua Brasileira de Sinais com avatar 3D.

### 2. Menu Discreto de Acessibilidade no Cabeçalho
- Botão compacto com o símbolo universal de acessibilidade (`#a11y-menu-btn`) posicionado no cabeçalho, com borda de contraste reforçado (`border-slate-300`) e menu flutuante contendo:
  - **Ajuste de tamanho de fonte (`A-`, `100%`, `A+`)**: escala proporcionalmente os textos de `87.5%` até `125%`, salvando a preferência no `localStorage`.
  - **Modo de Alto Contraste**: paleta dedicada para baixa visão (fundo `#000000`, textos `#ffffff`, bordas e destaques em amarelo `#facc15` e foco visível reforçado).
  - **Leitura por Voz integrada**: síntese de voz em português (`pt-BR`) via Web Speech API que lê botões, links, campos de formulário e avisos ao clicar ou navegar com a tecla `Tab`, com normalização de valores monetários (`R$`), quilometragem (`km`) e taxas (`a.m.`).

### 3. Modo Escuro (Dark Mode)
- Botão dedicado no cabeçalho (`#dark-mode-btn`, ícone de lua/sol) na loja e no painel administrativo.
- Aplica tema escuro confortável (`#0b1120` / `#111827`) em toda a interface, formulários, cards e modais, com persistência em `localStorage` (`autocar_dark_mode`) e alternância automática caso o Alto Contraste esteja ativo.

### 4. Leitores de Tela, Semântica e Atalhos de Teclado
- **Texto alternativo (`alt`) descritivo**: função `getCarAltText(car)` aplicada às fotos dos veículos na vitrine, carrossel de destaque, modal de detalhes, garagem e painel administrativo (incluindo modelo, categoria, ano, cor, câmbio, combustível, quilometragem e preço).
- **Região `aria-live="polite"`**: notificações (*toasts*) e resultados da simulação de financiamento são anunciados automaticamente para leitores de tela (NVDA, VoiceOver, TalkBack).
- **Navegação por teclado**: link `"Pular para o catálogo de veículos"` (`.skip-to-content`) ao pressionar `Tab` e atalhos rápidos (`Alt + 1` para Estoque, `Alt + 2` para Simulador e `Alt + 3` para Contato).

---

## Estrutura Principal do Projeto

- `index.html` — Loja principal (vitrine, filtros, simulador de financiamento, troca, garagem, conta de usuário e acessibilidade).
- `admin.html` — Painel administrativo para cadastro/edição de veículos e seleção do carrossel.
- `server.py` — Servidor HTTP em Python com API REST integrada ao PostgreSQL (`pg8000`).
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
