// Auto-generated from site/acesso/index.html
export const pageHTML = `
    <div class="login-bg">
        <div class="login-bg__glow login-bg__glow--1"></div>
        <div class="login-bg__glow login-bg__glow--2"></div>
    </div>

    <div class="login-card">
        <div class="login-logo">
            <img src="/images/logo-orbit-white.png" alt="Orbit Gestão">
            <p>Painel de Conteudo</p>
        </div>

        <div class="login-error" id="loginError"></div>

        <form id="loginForm">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" placeholder="seu@email.com" required autocomplete="email">
            </div>
            <div class="form-group">
                <label for="password">Senha</label>
                <div class="password-wrapper">
                    <input type="password" id="password" placeholder="Sua senha" required autocomplete="current-password">
                    <button type="button" class="password-toggle" onclick="togglePassword()">
                        <i class="fas fa-eye" id="eyeIcon"></i>
                    </button>
                </div>
            </div>
            <button type="submit" class="btn-login" id="btnLogin">
                Entrar
            </button>
        </form>

        <div class="login-footer">
            <a href="/"><i class="fas fa-arrow-left"></i> Voltar ao site</a>
        </div>
    </div>

    <script>
    // ── Orbit CMS Auth ──
    const ORBIT_STORAGE_KEY = 'orbit_cms';

    function getDB() {
        try {
            return JSON.parse(localStorage.getItem(ORBIT_STORAGE_KEY)) || null;
        } catch { return null; }
    }

    function setDB(data) {
        localStorage.setItem(ORBIT_STORAGE_KEY, JSON.stringify(data));
    }

    // Hash password with SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + '_orbit_salt_2024');
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Initialize DB with default admin
    async function initDB() {
        let db = getDB();
        if (!db) {
            const adminHash = await hashPassword('orbit@2024');
            db = {
                users: [
                    {
                        id: 'usr_' + Date.now(),
                        email: 'rodrigoosouzaamarketing@gmail.com',
                        name: 'Rodrigo Souza',
                        password: adminHash,
                        role: 'admin',
                        createdAt: new Date().toISOString(),
                        active: true
                    }
                ],
                articles: [],
                version: 1
            };
            setDB(db);
        }
        return db;
    }

    // Check if already logged in
    function getSession() {
        try {
            return JSON.parse(sessionStorage.getItem('orbit_session')) || null;
        } catch { return null; }
    }

    // Redirect if already logged in
    const session = getSession();
    if (session) {
        window.location.href = '/acesso/painel';
    }

    // Toggle password visibility
    function togglePassword() {
        const input = document.getElementById('password');
        const icon = document.getElementById('eyeIcon');
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    // Login
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const errorEl = document.getElementById('loginError');
        const btn = document.getElementById('btnLogin');
        errorEl.style.display = 'none';

        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            errorEl.textContent = 'Preencha todos os campos.';
            errorEl.style.display = 'block';
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Entrando...';

        try {
            const db = await initDB();
            const hash = await hashPassword(password);
            const user = db.users.find(u => u.email === email && u.password === hash && u.active);

            if (!user) {
                errorEl.textContent = 'E-mail ou senha incorretos.';
                errorEl.style.display = 'block';
                btn.disabled = false;
                btn.textContent = 'Entrar';
                return;
            }

            // Save session
            sessionStorage.setItem('orbit_session', JSON.stringify({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                loginAt: new Date().toISOString()
            }));

            window.location.href = '/acesso/painel';
        } catch (err) {
            errorEl.textContent = 'Erro ao fazer login. Tente novamente.';
            errorEl.style.display = 'block';
            btn.disabled = false;
            btn.textContent = 'Entrar';
        }
    });

    // Init DB on load
    initDB();
    </script>
`;
