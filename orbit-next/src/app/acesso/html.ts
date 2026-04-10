// Auto-generated from site/acesso/index.html
export const pageHTML = `
    <div class="login-bg">
        <div class="login-bg__glow login-bg__glow--1"></div>
        <div class="login-bg__glow login-bg__glow--2"></div>
    </div>

    <div class="login-card">
        <div class="login-logo">
            <img src="/images/logo-orbit-white.png" alt="Orbit Gestão" width="102" height="40">
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
    // ── Orbit CMS Auth (Supabase) ──
    var SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

    // Check if already logged in
    var existingSession = localStorage.getItem('orbit_supabase_session');
    if (existingSession) {
        try {
            var s = JSON.parse(existingSession);
            if (s.access_token) window.location.href = '/acesso/painel';
        } catch(e) {}
    }

    // Toggle password visibility
    function togglePassword() {
        var input = document.getElementById('password');
        var icon = document.getElementById('eyeIcon');
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    // Login via Supabase Auth
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        var errorEl = document.getElementById('loginError');
        var btn = document.getElementById('btnLogin');
        errorEl.style.display = 'none';

        var email = document.getElementById('email').value.trim().toLowerCase();
        var password = document.getElementById('password').value;

        if (!email || !password) {
            errorEl.textContent = 'Preencha todos os campos.';
            errorEl.style.display = 'block';
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Entrando...';

        try {
            var res = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY
                },
                body: JSON.stringify({ email: email, password: password })
            });

            var data = await res.json();

            if (!res.ok || !data.access_token) {
                errorEl.textContent = 'E-mail ou senha incorretos.';
                errorEl.style.display = 'block';
                btn.disabled = false;
                btn.textContent = 'Entrar';
                return;
            }

            // Fetch admin info
            var adminRes = await fetch(SUPABASE_URL + '/rest/v1/cms_admins?id=eq.' + data.user.id + '&limit=1', {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + data.access_token
                }
            });
            var admins = await adminRes.json();
            var admin = admins[0] || null;

            // Save session
            localStorage.setItem('orbit_supabase_session', JSON.stringify({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                user_id: data.user.id,
                email: data.user.email,
                name: admin ? admin.name : data.user.email.split('@')[0],
                role: admin ? admin.role : 'editor',
                loginAt: new Date().toISOString()
            }));

            window.location.href = '/acesso/painel';
        } catch (err) {
            console.error(err);
            errorEl.textContent = 'Erro ao fazer login. Tente novamente.';
            errorEl.style.display = 'block';
            btn.disabled = false;
            btn.textContent = 'Entrar';
        }
    });
    </script>
`;
