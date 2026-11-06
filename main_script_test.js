
    /* ==========================================================================
       1. BANCO DE DADOS DE CARROS COM FOTOS REAIS E VALORES DE MERCADO
       ========================================================================== */

    function formatMoney(val) {
      return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Gerador de imagens de placeholder vetoriais de alta resolução para fallback de carros
    function createCarPlaceholder(modelName, category, color1, color2) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" width="100%" height="100%">
        <defs>
          <linearGradient id="bg-${category}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${color1}"/>
            <stop offset="100%" stop-color="${color2}"/>
          </linearGradient>
          <linearGradient id="carBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#cbd5e1"/>
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#0284c7"/>
          </linearGradient>
        </defs>
        <rect width="500" height="300" fill="url(#bg-${category})"/>
        <circle cx="250" cy="150" r="130" fill="#ffffff" fill-opacity="0.08"/>
        <ellipse cx="250" cy="235" rx="190" ry="14" fill="#0f172a" fill-opacity="0.45"/>
        <g transform="translate(45, 60)">
          <path d="M 50 140 C 60 115, 90 95, 140 90 L 190 50 C 210 40, 270 40, 310 55 L 350 90 C 380 95, 400 115, 405 135 L 405 150 C 405 155, 395 160, 385 160 L 360 160 C 355 140, 335 125, 310 125 C 285 125, 265 140, 260 160 L 155 160 C 150 140, 130 125, 105 125 C 80 125, 60 140, 55 160 L 20 160 C 10 160, 5 150, 10 142 Z" fill="url(#carBody)" stroke="#475569" stroke-width="2"/>
          <path d="M 145 90 L 192 56 C 205 48, 255 48, 265 52 L 265 90 Z" fill="url(#glassGrad)" fill-opacity="0.85"/>
          <path d="M 275 53 C 285 54, 305 60, 315 68 L 340 90 L 275 90 Z" fill="url(#glassGrad)" fill-opacity="0.85"/>
          <polygon points="395,120 405,125 400,135 385,130" fill="#fef08a"/>
          <polygon points="12,130 25,125 22,138 10,136" fill="#f87171"/>
          <circle cx="310" cy="160" r="28" fill="#1e293b" stroke="#64748b" stroke-width="4"/>
          <circle cx="310" cy="160" r="14" fill="#94a3b8"/>
          <circle cx="310" cy="160" r="6" fill="#0f172a"/>
          <circle cx="105" cy="160" r="28" fill="#1e293b" stroke="#64748b" stroke-width="4"/>
          <circle cx="105" cy="160" r="14" fill="#94a3b8"/>
          <circle cx="105" cy="160" r="6" fill="#0f172a"/>
        </g>
        <rect x="25" y="248" width="450" height="38" rx="8" fill="#0f172a" fill-opacity="0.75"/>
        <text x="250" y="267" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" letter-spacing="1.5">
          ${category.toUpperCase()} • AUTOCAR CERTIFICADO
        </text>
        <text x="250" y="280" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#34d399">
          VEÍCULO PERICIADO COM LAUDO APROVADO
        </text>
      </svg>`;
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }

    const CARS_DATABASE = [
      {
        id: 1,
        title: "Toyota Corolla XEi 2.0 Dynamic Force Flex",
        category: "Sedan",
        price: 148900,
        year: 2023,
        km: 24000,
        transmission: "Automático",
        fuel: "Flex",
        plate: "BRA2E19",
        rating: 4.9,
        reviewsCount: 84,
        badge: "Mais Procurado",
        color: "Prata Lunar",
        description: "Sedan médio sinônimo de confiabilidade e valor de revenda. Equipado com motor 2.0 de 177cv, câmbio Direct Shift de 10 marchas virtuais, 7 airbags e pacote Toyota Safety Sense com frenagem autônoma de emergência.",
        features: ["Ar-condicionado digital automático", "Central multimídia de 9 polegadas com Apple CarPlay e Android Auto", "Controle de cruzeiro adaptativo (ACC)", "Bancos em couro premium preto"],
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 2,
        title: "Jeep Compass Longitude 1.3 Turbo T270",
        category: "SUV",
        price: 164900,
        year: 2023,
        km: 19500,
        transmission: "Automático",
        fuel: "Flex",
        plate: "JEP4A77",
        rating: 4.8,
        reviewsCount: 112,
        badge: "Destaque",
        color: "Cinza Granite",
        description: "O SUV mais vendido do segmento médio no Brasil. Motor Turbo Flex de 185 cv com torque vigoroso desde baixas rotações, acabamento refinado com soft touch e excelente isolamento acústico.",
        features: ["Painel de instrumentos digital TFT", "Faróis Full LED com assinatura exclusiva", "Modo Sport com troca por borboletas no volante", "Câmera de ré com linhas dinâmicas de guia"],
        image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 3,
        title: "Volkswagen Golf GTI 2.0 TSI Performance",
        category: "Esportivo",
        price: 218000,
        year: 2022,
        km: 31000,
        transmission: "Automático",
        fuel: "Flex",
        plate: "GTI3X88",
        rating: 5.0,
        reviewsCount: 95,
        badge: "Performance",
        color: "Vermelho Tornado",
        description: "Ícone automotivo de esportividade mundial. Motor EA888 de 230 cv, câmbio automatizado de dupla embreagem banhado a óleo DSG, bloqueio de diferencial eletrônico e suspensão esportiva multilink.",
        features: ["Bancos xadrez esportivos Clark", "Teto solar panorâmico elétrico", "Escape esportivo com ponteiras duplas cromadas", "Seleção de modos de condução com Launch Control"],
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 4,
        title: "Chevrolet Onix Premier 1.0 Turbo AT",
        category: "Hatch",
        price: 96500,
        year: 2024,
        km: 12000,
        transmission: "Automático",
        fuel: "Flex",
        plate: "ONX1P20",
        rating: 4.7,
        reviewsCount: 76,
        badge: "Econômico",
        color: "Azul Seeker",
        description: "Hatch compacto completo e extremamente econômico. Conta com alerta de ponto cego, assistente de estacionamento semi-autônomo Park Assist e Wi-Fi nativo a bordo.",
        features: ["Wi-Fi embarcado com conexão para 7 celulares", "Assistente de estacionamento automático", "Carregador de celular sem fio por indução", "6 airbags e controle de estabilidade"],
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 5,
        title: "Ford Ranger Limited 3.2 4x4 Diesel Automática",
        category: "Pickup",
        price: 229900,
        year: 2022,
        km: 42000,
        transmission: "Automático",
        fuel: "Diesel",
        plate: "RNG9K55",
        rating: 4.8,
        reviewsCount: 63,
        badge: "Tração 4x4",
        color: "Branco Ártico",
        description: "Picape média bruta com robustez para o campo e conforto executivo para a estrada. Motor Duratorq 3.2 Turbo Diesel de 200 cv com tração 4x4 e reduzida.",
        features: ["Capacidade de carga superior a 1 tonelada", "Assistente de descida e tração eletrônica", "Capota marítima e protetor de caçamba original", "Alerta de colisão com detecção de pedestres"],
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 6,
        title: "BYD Dolphin 100% Elétrico EV 44.9 kWh",
        category: "Elétrico",
        price: 144800,
        year: 2024,
        km: 8500,
        transmission: "Automático",
        fuel: "Elétrico",
        plate: "EVB8D01",
        rating: 4.9,
        reviewsCount: 52,
        badge: "Zero Emissão",
        color: "Cinza Afterglow",
        description: "A revolução da mobilidade 100% elétrica. Bateria Blade ultra segura, autonomia de até 291 km pelo padrão Inmetro e custo por quilômetro rodado 5 vezes menor que a gasolina.",
        features: ["Tela multimídia giratória de 12.8 polegadas", "Bateria Blade de fosfato de ferro-lítio", "Sistema VtoL para alimentar eletrodomésticos", "Garantia de 8 anos na bateria de tração"],
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 7,
        title: "Honda Civic Touring 1.5 Turbo CVT",
        category: "Sedan",
        price: 159000,
        year: 2022,
        km: 35000,
        transmission: "Automático",
        fuel: "Flex",
        plate: "CIV7H99",
        rating: 4.9,
        reviewsCount: 91,
        badge: "Refinado",
        color: "Preto Cristal",
        description: "Versão topo de linha do Civic geração 10. Motor 1.5 Turbo com injeção direta de 173 cv, teto solar elétrico e câmera LaneWatch no retrovisor direito.",
        features: ["Câmera de redução de ponto cego LaneWatch", "Teto solar elétrico de um toque", "Sistema de som premium com 452W e subwoofer", "Partida remota do motor pela chave com pré-resfriamento"],
        image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 8,
        title: "Hyundai Creta Ultimate 2.0 SmartSense",
        category: "SUV",
        price: 149900,
        year: 2023,
        km: 28000,
        transmission: "Automático",
        fuel: "Flex",
        plate: "CRT5U43",
        rating: 4.8,
        reviewsCount: 79,
        badge: "Espaçoso",
        color: "Prata Sand",
        description: "SUV moderno com pacote avançado de direção semi-autônoma Hyundai SmartSense, teto solar panorâmico e bancos dianteiros com ventilação de ar.",
        features: ["Bancos dianteiros com ventilação e refrigeração", "Teto solar panorâmico com abertura elétrica", "Câmeras 360 graus para manobras fáceis", "Frenagem autônoma para cruzamentos"],
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 9,
        title: "Porsche 911 Carrera S Coupe 3.0 Bi-Turbo",
        category: "Esportivo",
        price: 895000,
        year: 2021,
        km: 15000,
        transmission: "Automático",
        fuel: "Gasolina",
        plate: "POR9S11",
        rating: 5.0,
        reviewsCount: 140,
        badge: "Super Carro",
        color: "Amarelo Racing",
        description: "O ápice da engenharia esportiva de Stuttgart. Motor boxer 6 cilindros bi-turbo de 450 cv, aceleração de 0 a 100 km/h em 3,5 segundos com pacote Sport Chrono e câmbio PDK de 8 marchas.",
        features: ["Pacote Sport Chrono com seletor de modos no volante", "Freios de alto rendimento com pinças vermelhas de 6 pistões", "Interior em couro total preto com costuras especiais", "Sistema de escape esportivo com ronco configurável"],
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 10,
        title: "Fiat Toro Volcano 1.3 Turbo T270 Automática",
        category: "Pickup",
        price: 138900,
        year: 2023,
        km: 22000,
        transmission: "Automático",
        fuel: "Flex",
        plate: "TOR3V80",
        rating: 4.7,
        reviewsCount: 88,
        badge: "Versátil",
        color: "Vermelho Colorado",
        description: "Picape urbana com dirigibilidade de SUV e caçamba versátil com tampa bipartida. Excelente conforto para 5 passageiros e ótimo espaço para bagagem.",
        features: ["Tampa da caçamba bipartida com abertura lateral", "Central multimídia vertical de 10.1 polegadas", "Sensor de chuva e acendimento automático dos faróis", "Painel 100% digital de 7 polegadas"],
        image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 11,
        title: "Volvo XC40 Recharge Pure Electric P8 AWD",
        category: "Elétrico",
        price: 299950,
        year: 2023,
        km: 14000,
        transmission: "Automático",
        fuel: "Elétrico",
        plate: "VLV8P40",
        rating: 4.9,
        reviewsCount: 47,
        badge: "Segurança Máxima",
        color: "Azul Fjord",
        description: "SUV elétrico sueco com tração integral AWD e potência de 408 cv. 0 a 100 km/h em 4,9 segundos com a renomada estrutura de segurança de célula Volvo.",
        features: ["Dois motores elétricos com tração integral contínua", "Sistema operacional Google nativo no painel", "Piloto automático adaptativo com condução assistida Pilot Assist", "Interior sustentável livre de couro animal"],
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 12,
        title: "Peugeot 208 Griffe 1.0 Turbo CVT",
        category: "Hatch",
        price: 98990,
        year: 2024,
        km: 10200,
        transmission: "Automático",
        fuel: "Flex",
        plate: "PEU2T08",
        rating: 4.8,
        reviewsCount: 65,
        badge: "Design Premiado",
        color: "Amarelo Faro",
        description: "Hatch de estilo europeu arrojado com faróis dente de sabre Full LED, teto solar panorâmico envidraçado e volante esportivo compacto no conceito i-Cockpit 3D.",
        features: ["Quadro de instrumentos com projeção holográfica 3D", "Faróis com assinatura em formato de garra de leão", "Teto panorâmico com cortina de fechamento", "Câmera de ré com visualização VisioPark 180°"],
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
      }
    ];

    /* ==========================================================================
       2. ESTADO GLOBAL DA APLICAÇÃO
       ========================================================================== */
    let cart = [];
    let wishlist = [];
    let activeCategory = 'Todos';
    let activeTransmission = 'Todas';
    let activeFuel = 'Todos';
    let searchQuery = '';
    let sortMethod = 'featured';
    let appliedCoupon = null;
    let lastRemovedCar = null; // Para suporte à ação Desfazer
    const API_BASE = 'http://localhost:5000/api';
    let currentUser = null;
    let isBackendConnected = false;

    /* ==========================================================================
       3. INICIALIZAÇÃO DA APLICAÇÃO
       ========================================================================== */
    window.addEventListener('DOMContentLoaded', () => {
      // Carregar do localStorage se existir
      try {
        const savedCart = localStorage.getItem('autocar_cart') || localStorage.getItem('aura_cart');
        if (savedCart) cart = JSON.parse(savedCart);
        const savedWishlist = localStorage.getItem('autocar_wishlist') || localStorage.getItem('aura_wishlist');
        if (savedWishlist) wishlist = JSON.parse(savedWishlist);
        const savedUser = localStorage.getItem('autocar_user') || localStorage.getItem('aura_user');
        if (savedUser) currentUser = JSON.parse(savedUser);
      } catch (e) {
        console.warn('LocalStorage inacessível, operando em memória.');
      }

      updateUserHeaderUI();
      checkBackendStatus();
      renderCatalog();
      updateCartUI();
      updateWishlistUI();
      populateTradeCarSelect();

      // Fechar dropdown do usuário ao clicar fora
      document.addEventListener('click', (e) => {
        const container = document.getElementById('user-account-container');
        if (container && !container.contains(e.target)) {
          document.getElementById('user-dropdown-menu')?.classList.add('hidden');
        }
      });

      // Atalhos de teclado ('/' para buscar e ESC para fechar modais)
      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
          e.preventDefault();
          const searchInput = document.getElementById('search-input');
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          }
        }
        if (e.key === 'Escape') {
          closeAllModals();
        }
      });
    });

    /* ==========================================================================
       3.1 SISTEMA DE CONTAS E INTEGRAÇÃO POSTGRESQL LOCAL (PYTHON BACKEND)
       ========================================================================== */
    async function checkBackendStatus() {
      const badge = document.getElementById('db-status-badge');
      if (!badge) return;

      try {
        const resp = await fetch(`${API_BASE}/status`, { method: 'GET' });
        if (resp.ok) {
          isBackendConnected = true;
          badge.className = "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
          badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span> PostgreSQL Ativo`;
          return;
        }
      } catch (e) {}

      isBackendConnected = false;
      badge.className = "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-700";
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-slate-500 mr-1.5"></span> Modo Local (Navegador)`;
    }

    function updateUserHeaderUI() {
      const loggedOutBox = document.getElementById('user-logged-out');
      const loggedInBox = document.getElementById('user-logged-in');
      const displayName = document.getElementById('user-display-name');
      const fullName = document.getElementById('user-dropdown-full-name');
      const emailText = document.getElementById('user-dropdown-email');
      const initials = document.getElementById('user-avatar-initials');

      if (!loggedOutBox || !loggedInBox) return;

      if (currentUser) {
        loggedOutBox.classList.add('hidden');
        loggedInBox.classList.remove('hidden');

        const firstName = currentUser.nome ? currentUser.nome.split(' ')[0] : 'Cliente';
        if (displayName) displayName.textContent = firstName;
        if (fullName) fullName.textContent = currentUser.nome;
        if (emailText) emailText.textContent = currentUser.email;
        if (initials) initials.textContent = firstName.charAt(0).toUpperCase();

        const custName = document.getElementById('cust-name');
        const custCpf = document.getElementById('cust-cpf');
        const custPhone = document.getElementById('cust-phone');
        if (custName && !custName.value) custName.value = currentUser.nome || '';
        if (custCpf && !custCpf.value) custCpf.value = currentUser.cpf || '';
        if (custPhone && !custPhone.value) custPhone.value = currentUser.telefone || '';
      } else {
        loggedOutBox.classList.remove('hidden');
        loggedInBox.classList.add('hidden');
      }
    }

    function openAuthModal(tab = 'login') {
      document.getElementById('auth-modal').classList.remove('hidden');
      switchAuthTab(tab);
    }

    function closeAuthModal() {
      document.getElementById('auth-modal').classList.add('hidden');
    }

    function switchAuthTab(tab) {
      const loginBtn = document.getElementById('tab-login-btn');
      const regBtn = document.getElementById('tab-register-btn');
      const loginForm = document.getElementById('login-form');
      const regForm = document.getElementById('register-form');

      document.getElementById('login-error-msg')?.classList.add('hidden');
      document.getElementById('reg-error-msg')?.classList.add('hidden');

      if (tab === 'login') {
        loginBtn.className = "py-3.5 border-b-2 border-blue-600 text-blue-700 bg-white transition-all";
        regBtn.className = "py-3.5 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition-all";
        loginForm.classList.remove('hidden');
        regForm.classList.add('hidden');
      } else {
        regBtn.className = "py-3.5 border-b-2 border-blue-600 text-blue-700 bg-white transition-all";
        loginBtn.className = "py-3.5 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition-all";
        regForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
      }
    }

    function toggleUserDropdown() {
      const menu = document.getElementById('user-dropdown-menu');
      if (menu) menu.classList.toggle('hidden');
    }

    async function handleLoginSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const senha = document.getElementById('login-password').value;
      const errorMsg = document.getElementById('login-error-msg');
      const submitBtn = document.getElementById('login-submit-btn');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Verificando...</span>';

      try {
        const resp = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha })
        });
        const data = await resp.json();

        if (resp.ok && data.sucesso) {
          currentUser = data.usuario;
          localStorage.setItem('aura_user', JSON.stringify(currentUser));
          updateUserHeaderUI();
          closeAuthModal();
          showToast(`Bem-vindo de volta, ${currentUser.nome}!`, 'success');
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Entrar na Minha Conta</span>';
          return;
        } else {
          errorMsg.textContent = data.erro || 'E-mail ou senha inválidos.';
          errorMsg.classList.remove('hidden');
        }
      } catch (err) {
        // Fallback local se o servidor python estiver desconectado
        const localUsers = JSON.parse(localStorage.getItem('aura_users_db') || '[]');
        const found = localUsers.find(u => u.email === email && u.senha === senha);
        if (found) {
          currentUser = found;
          localStorage.setItem('aura_user', JSON.stringify(currentUser));
          updateUserHeaderUI();
          closeAuthModal();
          showToast(`Bem-vindo, ${currentUser.nome}! (Modo Local)`, 'success');
        } else if (email === 'admin@autocar.com' && senha === 'admin123') {
          currentUser = { id: 1, nome: 'Administrador AutoCar', email: 'admin@autocar.com', tipo: 'administrador' };
          localStorage.setItem('aura_user', JSON.stringify(currentUser));
          updateUserHeaderUI();
          closeAuthModal();
          showToast(`Bem-vindo, Administrador!`, 'success');
        } else {
          errorMsg.textContent = 'Não foi possível autenticar. Verifique seus dados ou execute "python server.py".';
          errorMsg.classList.remove('hidden');
        }
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Entrar na Minha Conta</span>';
    }

    async function handleRegisterSubmit(e) {
      e.preventDefault();
      const nome = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const cpf = document.getElementById('reg-cpf').value.trim();
      const telefone = document.getElementById('reg-phone').value.trim();
      const senha = document.getElementById('reg-password').value;
      const errorMsg = document.getElementById('reg-error-msg');
      const submitBtn = document.getElementById('reg-submit-btn');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Cadastrando...</span>';

      try {
        const resp = await fetch(`${API_BASE}/cadastrar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, cpf, telefone, senha })
        });
        const data = await resp.json();

        if (resp.ok && data.sucesso) {
          currentUser = data.usuario;
          localStorage.setItem('aura_user', JSON.stringify(currentUser));
          updateUserHeaderUI();
          closeAuthModal();
          showToast(`Conta criada com sucesso no PostgreSQL! Olá, ${currentUser.nome}!`, 'success');
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Finalizar Cadastro</span>';
          return;
        } else {
          errorMsg.textContent = data.erro || 'Erro ao realizar cadastro.';
          errorMsg.classList.remove('hidden');
        }
      } catch (err) {
        // Fallback local
        const localUsers = JSON.parse(localStorage.getItem('aura_users_db') || '[]');
        const newUser = { id: Date.now(), nome, email, cpf, telefone, senha, tipo: 'cliente' };
        localUsers.push(newUser);
        localStorage.setItem('aura_users_db', JSON.stringify(localUsers));

        currentUser = newUser;
        localStorage.setItem('aura_user', JSON.stringify(currentUser));
        updateUserHeaderUI();
        closeAuthModal();
        showToast(`Conta cadastrada com sucesso! (Modo Local)`, 'success');
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Finalizar Cadastro</span>';
    }

    function handleLogout() {
      currentUser = null;
      localStorage.removeItem('aura_user');
      updateUserHeaderUI();
      document.getElementById('user-dropdown-menu')?.classList.add('hidden');
      showToast('Você saiu da sua conta.', 'info');
    }

    async function openUserPanel(tab = 'reservas') {
      document.getElementById('user-dropdown-menu')?.classList.add('hidden');
      document.getElementById('user-panel-modal').classList.remove('hidden');
      switchPanelTab(tab);
    }

    function closeUserPanel() {
      document.getElementById('user-panel-modal').classList.add('hidden');
    }

    async function switchPanelTab(tab) {
      const resBtn = document.getElementById('panel-tab-reservas-btn');
      const troBtn = document.getElementById('panel-tab-trocas-btn');
      const resContent = document.getElementById('panel-reservas-content');
      const troContent = document.getElementById('panel-trocas-content');

      if (tab === 'reservas') {
        resBtn.className = "py-3 border-b-2 border-blue-600 text-blue-700 bg-white";
        troBtn.className = "py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800";
        resContent.classList.remove('hidden');
        troContent.classList.add('hidden');
        await loadMyReservations();
      } else {
        troBtn.className = "py-3 border-b-2 border-blue-600 text-blue-700 bg-white";
        resBtn.className = "py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800";
        troContent.classList.remove('hidden');
        resContent.classList.add('hidden');
        await loadMyTrades();
      }
    }

    async function loadMyReservations() {
      const container = document.getElementById('panel-reservas-content');
      container.innerHTML = '<p class="text-xs text-slate-500">Carregando reservas do banco de dados...</p>';

      let reservas = [];
      try {
        const url = currentUser ? `${API_BASE}/minhas-reservas?usuario_id=${currentUser.id}` : `${API_BASE}/minhas-reservas`;
        const resp = await fetch(url);
        if (resp.ok) reservas = await resp.json();
      } catch (e) {
        reservas = JSON.parse(localStorage.getItem('aura_local_reservas') || '[]');
      }

      if (reservas.length === 0) {
        container.innerHTML = `
          <div class="text-center py-8 text-slate-400">
            <svg class="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <p class="font-bold text-slate-700 text-xs">Nenhuma reserva encontrada</p>
            <p class="text-[11px] text-slate-500 mt-0.5">Adicione carros à garagem e conclua a reserva para visualizá-los aqui.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = reservas.map(r => `
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
          <div>
            <span class="font-mono font-bold text-blue-700 block text-xs">${r.codigo || '#AUR-9921'}</span>
            <h5 class="font-bold text-slate-900 mt-0.5">${r.veiculo || 'Veículo em Estoque'}</h5>
            <span class="text-[10px] text-slate-500">Pagamento: ${(r.metodo || 'pix').toUpperCase()} • Valor: ${r.valor ? formatMoney(r.valor) : 'Confirmado'}</span>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            ${r.status || 'Aprovado'}
          </span>
        </div>
      `).join('');
    }

    async function loadMyTrades() {
      const container = document.getElementById('panel-trocas-content');
      container.innerHTML = '<p class="text-xs text-slate-500">Carregando propostas de troca do banco...</p>';

      let trocas = [];
      try {
        const url = currentUser ? `${API_BASE}/minhas-trocas?usuario_id=${currentUser.id}` : `${API_BASE}/minhas-trocas`;
        const resp = await fetch(url);
        if (resp.ok) trocas = await resp.json();
      } catch (e) {
        trocas = JSON.parse(localStorage.getItem('aura_local_trocas') || '[]');
      }

      if (trocas.length === 0) {
        container.innerHTML = `
          <div class="text-center py-8 text-slate-400">
            <svg class="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
            <p class="font-bold text-slate-700 text-xs">Nenhuma proposta de troca enviada</p>
            <p class="text-[11px] text-slate-500 mt-0.5">Simule a troca do seu carro usado para acompanhar a análise aqui.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = trocas.map(t => `
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
          <div>
            <h5 class="font-bold text-slate-900">${t.meu_carro} (${t.ano})</h5>
            <p class="text-[11px] text-slate-600 mt-0.5">Troca pelo veículo: <strong>${t.carro_desejado || 'Carro Escolhido'}</strong></p>
            <span class="text-[10px] text-slate-500">Avaliação do seu usado: ${t.valor ? formatMoney(t.valor) : 'Em análise pela equipe'}</span>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
            ${t.status === 'em_analise' ? 'Em Análise' : t.status}
          </span>
        </div>
      `).join('');
    }

    /* ==========================================================================
       4. RENDERIZAÇÃO DO CATÁLOGO DE CARROS
       ========================================================================== */
    function renderCatalog() {
      const grid = document.getElementById('cars-grid');
      const emptyState = document.getElementById('empty-state');
      const countLabel = document.getElementById('cars-count-label');
      if (!grid) return;

      // Filtragem
      let filtered = CARS_DATABASE.filter(car => {
        // Categoria
        if (activeCategory !== 'Todos' && car.category !== activeCategory) return false;
        // Transmissão
        if (activeTransmission !== 'Todas' && car.transmission !== activeTransmission) return false;
        // Combustível
        if (activeFuel !== 'Todos' && car.fuel !== activeFuel) return false;
        // Busca textual
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchesTitle = car.title.toLowerCase().includes(q);
          const matchesCategory = car.category.toLowerCase().includes(q);
          const matchesColor = car.color.toLowerCase().includes(q);
          const matchesYear = car.year.toString().includes(q);
          if (!matchesTitle && !matchesCategory && !matchesColor && !matchesYear) return false;
        }
        return true;
      });

      // Ordenação
      if (sortMethod === 'year-desc') filtered.sort((a, b) => b.year - a.year);
      else if (sortMethod === 'km-asc') filtered.sort((a, b) => a.km - b.km);
      else if (sortMethod === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);
      else if (sortMethod === 'name-asc') filtered.sort((a, b) => a.title.localeCompare(b.title));

      countLabel.textContent = filtered.length;

      if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
      }
      emptyState.classList.add('hidden');

      grid.innerHTML = filtered.map(car => {
        const isFavorite = wishlist.includes(car.id);
        const inCart = cart.some(item => item.id === car.id);

        // Cores de badges por categoria
        const categoryBadgeColors = {
          'SUV': 'bg-blue-700 text-white',
          'Sedan': 'bg-slate-800 text-white',
          'Hatch': 'bg-indigo-700 text-white',
          'Pickup': 'bg-amber-700 text-white',
          'Esportivo': 'bg-purple-700 text-white',
          'Elétrico': 'bg-emerald-700 text-white'
        };
        const catBadge = categoryBadgeColors[car.category] || 'bg-slate-900 text-white';

        // Estimativa de parcela mensal em 36x com 30% de entrada (taxa 1.49% a.m.)
        const finValor = car.price * 0.70;
        const finTaxa = 0.0149;
        const finFator = Math.pow(1 + finTaxa, 36);
        const finParcela = finValor * (finTaxa * finFator) / (finFator - 1);

        return `
          <article class="car-card bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between group">
            
            <!-- Imagem Vetorial Placeholder com Badges -->
            <div class="relative bg-slate-100 aspect-16/10 overflow-hidden cursor-pointer" onclick="openCarDetails(${car.id})">
              <img src="${car.image}" alt="${car.title}" loading="lazy" onerror="this.onerror=null;this.src=createCarPlaceholder('${car.title.replace(/'/g, "\\'")}', '${car.category}', '#1e293b', '#0f172a');" class="w-full h-48 object-cover group-hover:scale-102 transition-transform duration-300">
              
              <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span class="px-2.5 py-1 rounded-md text-[11px] font-bold ${catBadge} shadow-xs">
                  ${car.category}
                </span>
                <span class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/90 text-white shadow-xs">
                  ${car.badge}
                </span>
              </div>

              <!-- Botão Favoritar -->
              <button 
                onclick="event.stopPropagation(); toggleWishlist(${car.id})" 
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-colors ${isFavorite ? 'text-rose-500' : ''}"
                title="${isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}"
              >
                <svg class="w-4 h-4 ${isFavorite ? 'fill-current text-rose-500' : 'stroke-current'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>

            <!-- Dados do Veículo -->
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <!-- Avaliações e Ano -->
                <div class="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span class="font-semibold text-slate-700">${car.year} • ${car.km.toLocaleString('pt-BR')} km</span>
                  <div class="flex items-center gap-1 text-amber-500 font-bold">
                    <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <span>${car.rating} (${car.reviewsCount})</span>
                  </div>
                </div>

                <!-- Título -->
                <h3 class="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer" onclick="openCarDetails(${car.id})">
                  ${car.title}
                </h3>

                <!-- Tags Técnicas Rápidas -->
                <div class="flex flex-wrap gap-1 mt-2.5">
                  <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">${car.transmission}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">${car.fuel}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Laudo 100% OK</span>
                </div>
              </div>

              <!-- Preço do Veículo e Botões de Ação -->
              <div class="mt-4 pt-3 border-t border-slate-100">
                <div class="flex items-baseline justify-between mb-2">
                  <div>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Preço à Vista</span>
                    <span class="text-xl font-extrabold text-emerald-600">
                      ${formatMoney(car.price)}
                    </span>
                  </div>
                  <div class="text-right">
                    <span class="text-[10px] font-bold text-violet-600 uppercase tracking-wider block">Financiamento 36x</span>
                    <span class="text-xs font-bold text-slate-700">a partir de <strong>${formatMoney(finParcela)}</strong>/mês</span>
                  </div>
                </div>

                <!-- Botões de Ação (Trocar, Financiar, Reservar) -->
                <div class="grid grid-cols-3 gap-1.5 pt-1">
                  <button 
                    onclick="openTradeForCar(${car.id})"
                    class="py-2 px-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[11px] transition-colors flex items-center justify-center gap-1 shadow-2xs"
                    title="Simular dar meu carro usado na troca deste"
                  >
                    <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                    Trocar
                  </button>

                  <button 
                    onclick="openFinancingModal(${car.id})"
                    class="py-2 px-1.5 rounded-lg border border-violet-200 bg-violet-50 hover:bg-violet-100 text-violet-800 font-bold text-[11px] transition-colors flex items-center justify-center gap-1 shadow-2xs"
                    title="Simular financiamento para este veículo"
                  >
                    <svg class="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                    Financiar
                  </button>

                  <button 
                    onclick="toggleAddToCart(${car.id})"
                    class="py-2 px-1.5 rounded-lg ${inCart ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1 shadow-xs"
                    title="Reservar e adicionar à minha garagem"
                  >
                    ${inCart ? `
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                      Reservado
                    ` : `
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                      Reservar
                    `}
                  </button>
                </div>

              </div>

            </div>

          </article>
        `;
      }).join('');

      renderActiveFilterChips();
    }

    /* ==========================================
       5. GESTÃO DE FILTROS E BUSCA
       ========================================== */
    function setCategoryFilter(category) {
      activeCategory = category;
      document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.dataset.category === category) {
          btn.className = "category-btn px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white transition-all shadow-sm";
        } else {
          btn.className = "category-btn px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all";
        }
      });
      renderCatalog();
    }

    function setTransmissionFilter(value) {
      activeTransmission = value;
      renderCatalog();
    }

    function setFuelFilter(value) {
      activeFuel = value;
      renderCatalog();
    }

    function handleSearch(val) {
      searchQuery = val;
      const clearBtn = document.getElementById('clear-search-btn');
      if (clearBtn) {
        if (val.trim() !== '') clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
      }
      renderCatalog();
    }

    function clearSearch() {
      const input = document.getElementById('search-input');
      const inputMobile = document.getElementById('search-input-mobile');
      if (input) input.value = '';
      if (inputMobile) inputMobile.value = '';
      searchQuery = '';
      document.getElementById('clear-search-btn')?.classList.add('hidden');
      renderCatalog();
    }

    function handleSort(method) {
      sortMethod = method;
      renderCatalog();
    }

    function renderActiveFilterChips() {
      const container = document.getElementById('active-filters-container');
      const chipsBox = document.getElementById('active-filter-chips');
      if (!container || !chipsBox) return;

      const chips = [];
      if (activeCategory !== 'Todos') {
        chips.push({ label: `Carroçaria: ${activeCategory}`, onRemove: "setCategoryFilter('Todos')" });
      }
      if (activeTransmission !== 'Todas') {
        chips.push({ label: `Câmbio: ${activeTransmission}`, onRemove: "setTransmissionFilter('Todas'); document.querySelector('input[name=transmissao][value=Todas]').checked=true;" });
      }
      if (activeFuel !== 'Todos') {
        chips.push({ label: `Combustível: ${activeFuel}`, onRemove: "setFuelFilter('Todos'); document.querySelector('input[name=combustivel][value=Todos]').checked=true;" });
      }
      if (searchQuery.trim() !== '') {
        chips.push({ label: `Busca: "${searchQuery}"`, onRemove: "clearSearch()" });
      }

      if (chips.length === 0) {
        container.classList.add('hidden');
        return;
      }

      container.classList.remove('hidden');
      chipsBox.innerHTML = `
        <span class="text-xs font-semibold text-blue-900 mr-1">Filtros ativos:</span>
        ${chips.map(chip => `
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white text-blue-800 border border-blue-300 shadow-2xs">
            ${chip.label}
            <button onclick="${chip.onRemove}" class="hover:text-red-600 focus:outline-none">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </span>
        `).join('')}
      `;
    }

    function resetAllFilters() {
      activeCategory = 'Todos';
      activeTransmission = 'Todas';
      activeFuel = 'Todos';
      searchQuery = '';
      clearSearch();
      document.querySelectorAll('input[name=transmissao]').forEach(r => r.checked = (r.value === 'Todas'));
      document.querySelectorAll('input[name=combustivel]').forEach(r => r.checked = (r.value === 'Todos'));
      setCategoryFilter('Todos');
      showToast('Todos os filtros foram restaurados.', 'info');
    }

    /* ==========================================
       6. CARRINHO / GARAGEM DE COMPRAS
       ========================================== */
    function toggleAddToCart(carId) {
      const car = CARS_DATABASE.find(c => c.id === carId);
      if (!car) return;

      const index = cart.findIndex(item => item.id === carId);
      if (index > -1) {
        // Já está no carrinho, abre a garagem
        openCartDrawer();
      } else {
        cart.push({ ...car, quantity: 1 });
        saveCartState();
        updateCartUI();
        renderCatalog();
        showToast(`${car.title} adicionado à sua garagem!`, 'success');
      }
    }

    function removeFromCart(carId) {
      const index = cart.findIndex(item => item.id === carId);
      if (index > -1) {
        lastRemovedCar = cart[index];
        cart.splice(index, 1);
        saveCartState();
        updateCartUI();
        renderCatalog();

        // Suporte à ação de desfazer imediata
        showToastWithAction(
          `Carro removido da garagem.`,
          'Desfazer',
          () => {
            if (lastRemovedCar) {
              cart.push(lastRemovedCar);
              saveCartState();
              updateCartUI();
              renderCatalog();
              lastRemovedCar = null;
              showToast('Item restaurado com sucesso!', 'success');
            }
          }
        );
      }
    }

    function confirmClearCart() {
      if (cart.length === 0) {
        showToast('Sua garagem já está vazia.', 'info');
        return;
      }
      document.getElementById('confirm-modal').classList.remove('hidden');
    }

    function closeConfirmModal() {
      document.getElementById('confirm-modal').classList.add('hidden');
    }

    function executeClearCart() {
      cart = [];
      appliedCoupon = null;
      saveCartState();
      updateCartUI();
      renderCatalog();
      closeConfirmModal();
      showToast('Sua garagem foi esvaziada.', 'info');
    }

    function saveCartState() {
      try {
        localStorage.setItem('aura_cart', JSON.stringify(cart));
      } catch (e) {}
    }

    function updateCartUI() {
      const counter = document.getElementById('cart-counter');
      const itemsList = document.getElementById('cart-items-list');
      const countText = document.getElementById('cart-items-count-text');
      const subtotalEl = document.getElementById('cart-subtotal');
      const totalEl = document.getElementById('cart-total');
      const discountRow = document.getElementById('coupon-discount-row');
      const discountEl = document.getElementById('cart-discount');
      const checkoutBtn = document.getElementById('checkout-btn');

      if (counter) {
        counter.textContent = cart.length;
        counter.classList.add('cart-badge-bounce');
        setTimeout(() => counter.classList.remove('cart-badge-bounce'), 450);
      }
      if (countText) countText.textContent = `${cart.length} veículos selecionados`;

      // Cálculos baseados nos preços reais dos veículos na garagem
      const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
      let discount = 0;
      if (appliedCoupon && appliedCoupon.discountPercent) {
        discount = (subtotal * appliedCoupon.discountPercent) / 100;
      }
      const total = Math.max(0, subtotal - discount);

      if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
      if (totalEl) totalEl.textContent = formatMoney(total);

      if (discountRow && discountEl) {
        if (discount > 0) {
          discountRow.style.display = 'flex';
          discountEl.textContent = `- ${formatMoney(discount)}`;
        } else {
          discountRow.style.display = 'none';
        }
      }

      if (checkoutBtn) {
        checkoutBtn.disabled = (cart.length === 0);
        if (cart.length === 0) checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
        else checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }

      // Renderizar itens no drawer
      if (itemsList) {
        if (cart.length === 0) {
          itemsList.innerHTML = `
            <div class="h-64 flex flex-col items-center justify-center text-center text-slate-400 p-6">
              <svg class="w-12 h-12 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              <p class="font-bold text-slate-700 text-sm">Sua garagem está vazia</p>
              <p class="text-xs text-slate-500 mt-1 max-w-xs">Navegue pelos nossos carros em estoque e adicione seus veículos preferidos para compra ou proposta de troca.</p>
              <button onclick="closeCartDrawer()" class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">
                Explorar Carros
              </button>
            </div>
          `;
          return;
        }

        itemsList.innerHTML = cart.map(item => `
          <div class="p-3 bg-white border border-slate-200 rounded-xl flex gap-3 items-center shadow-2xs">
            <img src="${item.image}" alt="${item.title}" class="w-20 h-16 object-cover rounded-lg bg-slate-100 flex-shrink-0" onerror="this.onerror=null;this.src=createCarPlaceholder('${item.title.replace(/'/g, "\\'")}', '${item.category}', '#1e293b', '#0f172a');">
            <div class="flex-1 min-w-0">
              <span class="text-[10px] font-bold text-blue-600 uppercase">${item.category} • ${item.year}</span>
              <h4 class="text-xs font-bold text-slate-900 truncate">${item.title}</h4>
              <div class="flex items-center justify-between mt-1">
                <span class="text-xs font-extrabold text-emerald-600">${formatMoney(item.price)}</span>
                <button onclick="removeFromCart(${item.id})" class="text-xs text-red-500 hover:text-red-700 font-semibold p-1" title="Remover da garagem">
                  Remover
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    function openCartDrawer() {
      document.getElementById('cart-drawer-container').classList.remove('hidden');
    }

    function closeCartDrawer() {
      document.getElementById('cart-drawer-container').classList.add('hidden');
    }

    /* ==========================================
       7. CUPOM DE DESCONTO
       ========================================== */
    function applyCoupon() {
      const input = document.getElementById('coupon-input');
      const msg = document.getElementById('coupon-message');
      if (!input || !msg) return;

      const code = input.value.trim().toUpperCase();
      msg.classList.remove('hidden');

      if (code === '') {
        msg.className = "text-[11px] font-semibold text-red-600";
        msg.textContent = "Por favor, digite o código do cupom.";
        return;
      }

      if (code === 'AUTOCAR10') {
        appliedCoupon = { code: 'AUTOCAR10', discountPercent: 10 };
        msg.className = "text-[11px] font-semibold text-emerald-600";
        msg.textContent = "✓ Cupom AUTOCAR10 aplicado! 10% de desconto concedido.";
        updateCartUI();
        showToast('Desconto de 10% aplicado!', 'success');
      } else if (code === 'BEMVINDO') {
        appliedCoupon = { code: 'BEMVINDO', discountPercent: 15 };
        msg.className = "text-[11px] font-semibold text-emerald-600";
        msg.textContent = "✓ Cupom BEMVINDO aplicado! 15% de desconto de boas-vindas.";
        updateCartUI();
        showToast('Desconto de 15% aplicado!', 'success');
      } else {
        msg.className = "text-[11px] font-semibold text-red-600";
        msg.textContent = "Código inválido. Dica: Experimente usar o cupom AUTOCAR10 ou BEMVINDO.";
      }
    }

    /* ==========================================
       8. CHECKOUT MULTI-STEP
       ========================================== */
    function openCheckoutModal() {
      if (cart.length === 0) {
        showToast('Adicione ao menos um carro à garagem para prosseguir.', 'info');
        return;
      }
      closeCartDrawer();
      document.getElementById('checkout-modal').classList.remove('hidden');
      goToCheckoutStep1();
    }

    function closeCheckoutModal() {
      document.getElementById('checkout-modal').classList.add('hidden');
    }

    function goToCheckoutStep1() {
      document.getElementById('checkout-step-1').classList.remove('hidden');
      document.getElementById('checkout-step-2').classList.add('hidden');
      document.getElementById('checkout-step-3').classList.add('hidden');

      document.getElementById('step-indicator-1').innerHTML = `<span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span><span class="text-blue-700">Seus Dados</span>`;
      document.getElementById('step-indicator-2').innerHTML = `<span class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">2</span><span class="text-slate-500">Pagamento</span>`;
      document.getElementById('step-indicator-3').innerHTML = `<span class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">3</span><span class="text-slate-500">Confirmação</span>`;
    }

    function goToCheckoutStep2() {
      const name = document.getElementById('cust-name').value.trim();
      const cpf = document.getElementById('cust-cpf').value.trim();
      const phone = document.getElementById('cust-phone').value.trim();

      if (!name || !cpf || !phone) {
        showToast('Por favor, preencha nome, CPF e telefone para prosseguir.', 'error');
        return;
      }

      document.getElementById('checkout-step-1').classList.add('hidden');
      document.getElementById('checkout-step-2').classList.remove('hidden');
      document.getElementById('checkout-step-3').classList.add('hidden');

      document.getElementById('step-indicator-1').innerHTML = `<span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</span><span class="text-emerald-700">Identificado</span>`;
      document.getElementById('step-indicator-2').innerHTML = `<span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span><span class="text-blue-700">Pagamento</span>`;

      // Atualiza o total no passo 2
      const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
      let discount = 0;
      if (appliedCoupon && appliedCoupon.discountPercent) {
        discount = (subtotal * appliedCoupon.discountPercent) / 100;
      }
      const total = Math.max(0, subtotal - discount);
      document.getElementById('step2-total-price').textContent = `Total a Pagar: ${formatMoney(total)}`;
    }

    function selectPaymentMethod(method) {
      const pixTab = document.getElementById('pay-tab-pix');
      const cardTab = document.getElementById('pay-tab-card');
      const boletoTab = document.getElementById('pay-tab-boleto');
      const pixContent = document.getElementById('payment-pix-content');
      const cardContent = document.getElementById('payment-card-content');
      const boletoContent = document.getElementById('payment-boleto-content');

      [pixTab, cardTab, boletoTab].forEach(t => t.className = "py-2.5 px-3 rounded-lg border border-slate-300 bg-white font-semibold text-xs text-slate-700 flex flex-col items-center gap-1 transition-all");
      [pixContent, cardContent, boletoContent].forEach(c => c.classList.add('hidden'));

      if (method === 'pix') {
        pixTab.className = "py-2.5 px-3 rounded-lg border-2 border-blue-600 bg-blue-50 font-bold text-xs text-blue-700 flex flex-col items-center gap-1 transition-all";
        pixContent.classList.remove('hidden');
      } else if (method === 'card') {
        cardTab.className = "py-2.5 px-3 rounded-lg border-2 border-blue-600 bg-blue-50 font-bold text-xs text-blue-700 flex flex-col items-center gap-1 transition-all";
        cardContent.classList.remove('hidden');
      } else if (method === 'boleto') {
        boletoTab.className = "py-2.5 px-3 rounded-lg border-2 border-blue-600 bg-blue-50 font-bold text-xs text-blue-700 flex flex-col items-center gap-1 transition-all";
        boletoContent.classList.remove('hidden');
      }
    }

    function copyPixCode() {
      navigator.clipboard?.writeText("00020126580014br.gov.bcb.pix0136autocar-reserva-oficial");
      showToast('Código PIX copiado com sucesso!', 'success');
    }

    async function finishCheckoutOrder() {
      // Gera pedido e move para o passo 3
      const orderId = '#ATC-' + Math.floor(10000 + Math.random() * 90000);
      const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
      let discount = 0;
      if (appliedCoupon && appliedCoupon.discountPercent) {
        discount = (subtotal * appliedCoupon.discountPercent) / 100;
      }
      const total = Math.max(0, subtotal - discount);

      document.getElementById('receipt-order-id').textContent = orderId;
      document.getElementById('receipt-total-value').textContent = formatMoney(total);

      document.getElementById('checkout-step-2').classList.add('hidden');
      document.getElementById('checkout-step-3').classList.remove('hidden');

      document.getElementById('step-indicator-2').innerHTML = `<span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</span><span class="text-emerald-700">Pago</span>`;
      document.getElementById('step-indicator-3').innerHTML = `<span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</span><span class="text-emerald-700">Concluído</span>`;

      // Persistir reserva no banco PostgreSQL ou LocalStorage
      const custName = document.getElementById('cust-name').value.trim() || (currentUser?.nome || 'Cliente');
      const custCpf = document.getElementById('cust-cpf').value.trim() || (currentUser?.cpf || '');
      const custPhone = document.getElementById('cust-phone').value.trim() || (currentUser?.telefone || '');
      const cepEntrega = document.getElementById('cust-cep')?.value.trim() || '';
      const tipoRetirada = document.getElementById('cust-delivery-type')?.value || 'store';
      
      for (const item of cart) {
        try {
          await fetch(`${API_BASE}/reservas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              codigo_reserva: orderId,
              usuario_id: currentUser ? currentUser.id : null,
              nome_cliente: custName,
              cpf_cliente: custCpf,
              telefone_cliente: custPhone,
              cep_entrega: cepEntrega,
              tipo_retirada: tipoRetirada,
              veiculo_id: item.id,
              valor_reserva: item.price,
              metodo_pagamento: 'pix'
            })
          });
        } catch (e) {
          // Salva no LocalStorage se offline
          const localRes = JSON.parse(localStorage.getItem('aura_local_reservas') || '[]');
          localRes.push({
            id: Date.now(),
            codigo: orderId,
            valor: item.price,
            metodo: 'PIX',
            status: 'Aprovado',
            data: new Date().toLocaleDateString('pt-BR'),
            veiculo: item.title,
            usuario_id: currentUser?.id
          });
          localStorage.setItem('aura_local_reservas', JSON.stringify(localRes));
        }
      }

      // Limpa carrinho após reserva concluída
      cart = [];
      saveCartState();
      updateCartUI();
      renderCatalog();
      showToast('Parabéns! Sua reserva foi salva no banco de dados!', 'success');
    }

    /* ==========================================
       9. MODAL DE DETALHES DO CARRO / FICHA TÉCNICA
       ========================================== */
    function openCarDetails(carId) {
      const car = CARS_DATABASE.find(c => c.id === carId);
      if (!car) return;

      const body = document.getElementById('car-details-body');
      body.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img src="${car.image}" alt="${car.title}" class="w-full rounded-xl bg-slate-100 object-cover shadow-sm">
            <div class="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
              <span class="font-bold flex items-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Laudo Cautelar Dekra 100% Aprovado
              </span>
              <p class="text-slate-600">Sem registros de leilão, sem sinistros estruturais e com quilometragem atestada.</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                ${car.category} • Placa ${car.plate}
              </span>
              <h2 class="text-xl font-extrabold text-slate-900 mt-1">${car.title}</h2>
              <div class="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <span class="font-semibold text-slate-700">${car.year}</span> • 
                <span>${car.km.toLocaleString('pt-BR')} km</span> • 
                <span>Cor ${car.color}</span>
              </div>
            </div>

            <!-- Preço de Tabela do Veículo -->
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span class="text-xs text-slate-500 font-semibold block">Preço de Tabela do Veículo:</span>
              <span class="text-2xl font-black text-emerald-600">${formatMoney(car.price)}</span>
              <span class="block text-[11px] text-slate-400">Garantia total de procedência inclusa</span>
            </div>

            <p class="text-xs text-slate-600 leading-relaxed">${car.description}</p>

            <div>
              <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Principais Equipamentos</h4>
              <ul class="text-xs text-slate-600 space-y-1.5">
                ${car.features.map(f => `
                  <li class="flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>${f}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <div class="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button onclick="openTradeForCar(${car.id}); closeCarDetailsModal();" class="py-2.5 px-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs">
                <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                Dar na Troca
              </button>
              <button onclick="openFinancingModal(${car.id}); closeCarDetailsModal();" class="py-2.5 px-3 rounded-xl border border-violet-200 bg-violet-50 hover:bg-violet-100 text-violet-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs">
                <svg class="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                Financiar
              </button>
              <button onclick="toggleAddToCart(${car.id}); closeCarDetailsModal();" class="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                Reservar Carro
              </button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('car-details-modal').classList.remove('hidden');
    }

    function closeCarDetailsModal() {
      document.getElementById('car-details-modal').classList.add('hidden');
    }

    /* ==========================================
       10. FUNCIONALIDADE DE TROCA DE CARROS
       ========================================== */
    function populateTradeCarSelect() {
      const select = document.getElementById('trade-target-car');
      if (!select) return;
      select.innerHTML = CARS_DATABASE.map(c => `
        <option value="${c.id}">${c.title} (${c.year}) - ${formatMoney(c.price)}</option>
      `).join('');
    }

    function openTradeModal() {
      populateTradeCarSelect();
      document.getElementById('trade-modal').classList.remove('hidden');
    }

    function openTradeForCar(carId) {
      openTradeModal();
      const select = document.getElementById('trade-target-car');
      if (select) select.value = carId;
    }

    function closeTradeModal() {
      document.getElementById('trade-modal').classList.add('hidden');
      document.getElementById('trade-result').classList.add('hidden');
    }

    async function handleTradeSubmit(e) {
      e.preventDefault();
      const targetCarId = parseInt(document.getElementById('trade-target-car').value);
      const targetCar = CARS_DATABASE.find(c => c.id === targetCarId);
      const userCar = document.getElementById('trade-car-name').value.trim();
      const userYear = parseInt(document.getElementById('trade-car-year').value) || 2020;
      const userKm = parseInt(document.getElementById('trade-car-km').value) || 45000;
      const condition = document.getElementById('trade-car-condition').value;

      const submitBtn = e.target.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Calculando via Python...'; }

      let baseEstimate = 0;
      let diff = 0;
      let targetTitle = targetCar ? targetCar.title : 'Veículo Selecionado';
      let targetPrice = targetCar ? targetCar.price : 100000;
      let processedBy = 'Python Backend';

      try {
        const resp = await fetch(`${API_BASE}/simular-troca`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            veiculo_desejado_id: targetCarId,
            meu_carro_modelo: userCar,
            meu_carro_ano: userYear,
            meu_carro_km: userKm,
            estado_conservacao: condition
          })
        });

        if (resp.ok) {
          const data = await resp.json();
          baseEstimate = data.valor_estimado_usado;
          diff = data.diferenca;
          targetTitle = data.carro_desejado_titulo || targetTitle;
          targetPrice = data.carro_desejado_preco || targetPrice;
        } else {
          throw new Error('Falha no endpoint Python');
        }
      } catch (_) {
        // Fallback local se o backend estiver desconectado
        processedBy = 'Cliente (Offline)';
        const mult = { 'Excelente': 1.0, 'Bom': 0.92, 'Regular': 0.80 }[condition] || 0.92;
        const yearDiff = Math.max(0, 2026 - userYear);
        baseEstimate = Math.max(18000, Math.round((targetPrice * 0.60 - yearDiff * 4500 - userKm * 0.12) * mult));
        diff = targetPrice - baseEstimate;
      }

      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText || 'Calcular Proposta de Troca'; }

      const resultBox = document.getElementById('trade-result');
      resultBox.classList.remove('hidden');
      resultBox.innerHTML = `
        <div class="flex items-start gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div class="flex-1 space-y-2">
            <div class="flex items-center justify-between flex-wrap gap-1">
              <h5 class="font-extrabold text-amber-950 text-sm">Proposta de Troca Calculada com Sucesso!</h5>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300">
                ⚡ Processado via ${processedBy}
              </span>
            </div>
            <p class="text-slate-700 text-xs">
              Avaliamos seu <strong>${userCar} (${userYear})</strong> no valor estimado de <strong>${formatMoney(baseEstimate)}</strong> para abatimento no <strong>${targetTitle}</strong>.
            </p>
            <div class="p-3 bg-white rounded-xl border border-amber-300 text-xs space-y-1 shadow-2xs">
              <div class="flex justify-between">
                <span class="text-slate-500">Valor do Carro Desejado:</span>
                <strong class="text-slate-800">${formatMoney(targetPrice)}</strong>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Avaliação do seu Usado:</span>
                <strong class="text-emerald-700 font-bold">- ${formatMoney(baseEstimate)}</strong>
              </div>
              <div class="border-t border-slate-100 pt-1.5 flex justify-between items-baseline">
                <span class="font-bold text-slate-800">${diff >= 0 ? 'Diferença a Pagar / Financiar:' : 'Troco a Receber via PIX:'}</span>
                <strong class="text-base font-black text-amber-700">${formatMoney(Math.abs(diff))}</strong>
              </div>
            </div>
            <div class="flex items-center gap-2 pt-1">
              <button type="button" onclick="acceptTradeProposal(${targetCarId}, ${baseEstimate})" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs shadow-xs transition-colors flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Aceitar e Bloquear Carro no Estoque
              </button>
            </div>
          </div>
        </div>
      `;
    }

    async function acceptTradeProposal(carId, estimatedValue) {
      const userCar = document.getElementById('trade-car-name').value;
      const userYear = document.getElementById('trade-car-year').value;
      const userKm = document.getElementById('trade-car-km').value;
      const userPlate = document.getElementById('trade-plate').value;
      const targetCar = CARS_DATABASE.find(c => c.id === carId);

      try {
        await fetch(`${API_BASE}/trocas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuario_id: currentUser ? currentUser.id : null,
            nome_cliente: currentUser ? currentUser.nome : 'Cliente Interessado',
            telefone_cliente: currentUser ? currentUser.telefone : '',
            veiculo_desejado_id: carId,
            meu_carro_modelo: userCar,
            meu_carro_placa: userPlate,
            meu_carro_ano: userYear,
            meu_carro_km: userKm,
            estado_conservacao: document.getElementById('trade-car-condition').value,
            valor_proposta: estimatedValue || 65000
          })
        });
      } catch (e) {
        const localTrocas = JSON.parse(localStorage.getItem('aura_local_trocas') || '[]');
        localTrocas.push({
          id: Date.now(),
          meu_carro: userCar,
          ano: userYear,
          km: userKm,
          valor: estimatedValue || 65000,
          status: 'em_analise',
          carro_desejado: targetCar ? targetCar.title : 'Veículo Selecionado',
          usuario_id: currentUser?.id
        });
        localStorage.setItem('aura_local_trocas', JSON.stringify(localTrocas));
      }

      toggleAddToCart(carId);
      closeTradeModal();
      showToast('Proposta de troca salva no banco e anexada à sua reserva!', 'success');
    }

    /* ==========================================
       11. FUNCIONALIDADE DE VENDER SEU CARRO
       ========================================== */
    function openSellCarModal() {
      document.getElementById('sell-car-modal').classList.remove('hidden');
    }

    function closeSellCarModal() {
      document.getElementById('sell-car-modal').classList.add('hidden');
    }

    function handleSellSubmit(e) {
      e.preventDefault();
      const model = document.getElementById('sell-model').value;
      closeSellCarModal();
      showToast(`Recebemos a proposta do seu ${model}! Nossa equipe entrará em contato via WhatsApp.`, 'success');
    }

    /* ==========================================
       12. FAVORITOS / WISHLIST
       ========================================== */
    function toggleWishlist(carId) {
      const index = wishlist.indexOf(carId);
      const car = CARS_DATABASE.find(c => c.id === carId);

      if (index > -1) {
        wishlist.splice(index, 1);
        showToast(`${car.title} removido dos favoritos.`, 'info');
      } else {
        wishlist.push(carId);
        showToast(`${car.title} salvo nos favoritos!`, 'success');
      }

      try {
        localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
      } catch (e) {}

      updateWishlistUI();
      renderCatalog();
    }

    function updateWishlistUI() {
      const badge = document.getElementById('wishlist-badge');
      const icon = document.getElementById('wishlist-header-icon');
      if (badge) {
        if (wishlist.length > 0) {
          badge.textContent = wishlist.length;
          badge.classList.remove('hidden');
          icon.classList.add('text-red-500', 'fill-current');
        } else {
          badge.classList.add('hidden');
          icon.classList.remove('text-red-500', 'fill-current');
        }
      }
    }

    let isShowingWishlistOnly = false;
    function toggleWishlistFilter() {
      if (wishlist.length === 0) {
        showToast('Você ainda não favoritou nenhum carro.', 'info');
        return;
      }
      isShowingWishlistOnly = !isShowingWishlistOnly;
      if (isShowingWishlistOnly) {
        const grid = document.getElementById('cars-grid');
        const favCars = CARS_DATABASE.filter(c => wishlist.includes(c.id));
        document.getElementById('cars-count-label').textContent = favCars.length;
        renderActiveFilterChips();
        showToast(`Exibindo ${favCars.length} carros favoritados.`, 'info');
      } else {
        renderCatalog();
      }
    }


    /* ==========================================
       13. SISTEMA DE TOASTS
       ========================================== */
    function showToast(message, type = 'info') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      const colors = {
        success: 'bg-emerald-800 text-white border-emerald-700',
        error: 'bg-red-800 text-white border-red-700',
        info: 'bg-slate-900 text-white border-slate-800'
      };

      toast.className = `p-3.5 rounded-xl shadow-xl border text-xs font-medium flex items-center justify-between gap-3 pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0 ${colors[type] || colors.info}`;
      toast.innerHTML = `
        <div class="flex items-center gap-2">
          ${type === 'success' ? '<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : ''}
          ${type === 'error' ? '<svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>' : ''}
          ${type === 'info' ? '<svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' : ''}
          <span>${message}</span>
        </div>
      `;

      container.appendChild(toast);
      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
      });

      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }

    function showToastWithAction(message, actionLabel, actionCallback) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'p-3.5 rounded-xl shadow-2xl border border-slate-700 bg-slate-900 text-white text-xs font-medium flex items-center justify-between gap-3 pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0';
      toast.innerHTML = `
        <span>${message}</span>
        <button class="undo-btn px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold text-[11px] uppercase tracking-wide transition-colors">
          ${actionLabel}
        </button>
      `;

      const btn = toast.querySelector('.undo-btn');
      btn.onclick = () => {
        actionCallback();
        toast.remove();
      };

      container.appendChild(toast);
      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
      });

      setTimeout(() => {
        if (toast.parentElement) {
          toast.classList.add('opacity-0', 'translate-y-2');
          setTimeout(() => toast.remove(), 300);
        }
      }, 5000);
    }

    /* ==========================================
       14. MÁSCARAS E PREVENÇÃO DE ERROS
       ========================================== */
    function formatPlate(el) {
      el.value = el.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 7);
    }

    function formatCPF(el) {
      let v = el.value.replace(/\D/g, '').slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      el.value = v;
    }

    function formatCEP(el) {
      let v = el.value.replace(/\D/g, '').slice(0, 8);
      v = v.replace(/(\d{5})(\d)/, '$1-$2');
      el.value = v;
    }

    function formatCardNumber(el) {
      let v = el.value.replace(/\D/g, '').slice(0, 16);
      v = v.replace(/(\d{4})(\d)/g, '$1 $2').trim();
      el.value = v;
    }

    function closeAllModals() {
      closeCartDrawer();
      closeCarDetailsModal();
      closeTradeModal();
      closeSellCarModal();
      closeCheckoutModal();
      closeConfirmModal();
      closeFinancingModal();
    }

    /* ==========================================
       15. SIMULADOR DE TROCA — RESET
       ========================================== */
    function resetTradeForm() {
      document.getElementById('trade-form').reset();
      const result = document.getElementById('trade-result');
      if (result) result.classList.add('hidden');
    }

    /* ==========================================
       16. SIMULADOR DE FINANCIAMENTO — RESET E FUNÇÕES
       ========================================== */
    function resetFinancingForm() {
      document.getElementById('financing-form').reset();
      const result = document.getElementById('financing-result');
      if (result) result.classList.add('hidden');
      updateFinancingVehiclePrice();
    }
    function openFinancingModal(carId) {
      const modal = document.getElementById('financing-modal');
      modal.classList.remove('hidden');
      // Limpar resultado anterior
      document.getElementById('financing-result').classList.add('hidden');
      document.getElementById('financing-form').reset();
      // Popular select de veículos
      populateFinancingCarSelect();
      // Se carId for passado, pré-seleciona
      if (carId) {
        const sel = document.getElementById('financing-vehicle-id');
        if (sel) sel.value = carId;
        updateFinancingVehiclePrice();
      }
    }

    function closeFinancingModal() {
      const modal = document.getElementById('financing-modal');
      if (modal) modal.classList.add('hidden');
    }

    function populateFinancingCarSelect() {
      const select = document.getElementById('financing-vehicle-id');
      if (!select) return;
      select.innerHTML = CARS_DATABASE.map(c =>
        `<option value="${c.id}" data-price="${c.price}">${c.title} (${c.year}) — ${formatMoney(c.price)}</option>`
      ).join('');
      updateFinancingVehiclePrice();
    }

    function updateFinancingVehiclePrice() {
      const sel = document.getElementById('financing-vehicle-id');
      if (!sel) return;
      const opt = sel.options[sel.selectedIndex];
      const price = parseFloat(opt?.dataset?.price || 0);
      const priceEl = document.getElementById('financing-vehicle-price');
      if (priceEl) priceEl.textContent = formatMoney(price);
      // Limpar resultado ao trocar veículo
      const result = document.getElementById('financing-result');
      if (result) result.classList.add('hidden');
    }

    async function handleFinancingSubmit(e) {
      e.preventDefault();
      const vehicleId = parseInt(document.getElementById('financing-vehicle-id').value);
      const entrada = parseFloat(document.getElementById('financing-entrada').value) || 0;
      const prazo = parseInt(document.getElementById('financing-prazo').value);
      const taxaAnual = parseFloat(document.getElementById('financing-taxa').value) || 1.49;
      const taxaMensal = taxaAnual / 100;
      const vehicle = CARS_DATABASE.find(c => c.id === vehicleId);
      if (!vehicle) return;
      const preco = vehicle.price;
      const valorFinanciado = preco - entrada;

      if (valorFinanciado <= 0) {
        showToast('O valor de entrada não pode ser maior ou igual ao preço do veículo.', 'error');
        return;
      }
      if (entrada < 0) {
        showToast('Valor de entrada inválido.', 'error');
        return;
      }

      const btn = document.getElementById('financing-calc-btn');
      if (btn) { btn.disabled = true; btn.textContent = 'Calculando...'; }

      let parcela, totalPago, totalJuros;

      // Tenta calcular via backend Python
      try {
        const resp = await fetch(`${API_BASE}/simular-financiamento`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ veiculo_id: vehicleId, entrada, prazo_meses: prazo, taxa_juros_mensal: taxaMensal })
        });
        if (resp.ok) {
          const data = await resp.json();
          parcela = data.parcela;
          totalPago = data.total_pago;
          totalJuros = data.total_juros;
        } else {
          throw new Error('backend error');
        }
      } catch (_) {
        // Fallback JS: fórmula PMT
        if (taxaMensal === 0) {
          parcela = valorFinanciado / prazo;
        } else {
          const fator = Math.pow(1 + taxaMensal, prazo);
          parcela = valorFinanciado * (taxaMensal * fator) / (fator - 1);
        }
        totalPago = parcela * prazo + entrada;
        totalJuros = totalPago - preco;
      }

      if (btn) { btn.disabled = false; btn.textContent = 'Calcular Financiamento'; }

      // Renderizar resultado
      const resultBox = document.getElementById('financing-result');
      resultBox.classList.remove('hidden');
      resultBox.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h5 class="font-bold text-slate-900 text-sm">Simulação de Financiamento</h5>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-white rounded-lg p-2.5 border border-violet-100">
              <span class="text-slate-500 block">Valor do Veículo</span>
              <strong class="text-slate-800">${formatMoney(preco)}</strong>
            </div>
            <div class="bg-white rounded-lg p-2.5 border border-violet-100">
              <span class="text-slate-500 block">Entrada</span>
              <strong class="text-slate-800">${formatMoney(entrada)}</strong>
            </div>
            <div class="bg-white rounded-lg p-2.5 border border-violet-100">
              <span class="text-slate-500 block">Valor Financiado</span>
              <strong class="text-slate-800">${formatMoney(valorFinanciado)}</strong>
            </div>
            <div class="bg-white rounded-lg p-2.5 border border-violet-100">
              <span class="text-slate-500 block">Taxa Mensal</span>
              <strong class="text-slate-800">${taxaMensal.toFixed(2)}% a.m.</strong>
            </div>
          </div>
          <div class="bg-violet-600 text-white rounded-xl p-3 text-center">
            <span class="text-xs text-violet-200 block">Parcela Mensal (${prazo}x)</span>
            <strong class="text-2xl font-extrabold">${formatMoney(parcela)}</strong>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-white rounded-lg p-2.5 border border-slate-200 text-center">
              <span class="text-slate-500 block">Total a Pagar</span>
              <strong class="text-slate-800">${formatMoney(totalPago)}</strong>
            </div>
            <div class="bg-white rounded-lg p-2.5 border border-slate-200 text-center">
              <span class="text-slate-500 block">Total de Juros</span>
              <strong class="text-rose-600">${formatMoney(totalJuros)}</strong>
            </div>
          </div>
          <p class="text-[11px] text-slate-400 text-center">*Simulação meramente informativa. Sujeita a análise de crédito.</p>
        </div>
      `;
    }
  