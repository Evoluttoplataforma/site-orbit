# 🔐 Sistema de autenticação

## Stack

- **Provider:** Supabase Auth (GoTrue)
- **Método:** Email + senha
- **Token:** JWT salvo em `localStorage["orbit_session"]`
- **Auto-refresh:** sim, transparente

## Estrutura da sessão

```javascript
// localStorage["orbit_session"]
{
  access_token: "eyJhbGc...",     // JWT que expira em 1h
  refresh_token: "v3KuY...",       // Refresh token longo
  expires_at: 1775500000,          // Unix timestamp
  user: {
    id: "uuid",
    email: "admin@orbit.com",
    name: "Admin",                 // vindo de cms_admins
    role: "admin"                  // 'admin' ou 'editor'
  }
}
```

## Fluxo de login (`/acesso`)

```javascript
// Pseudocódigo do que está em src/app/acesso/html.ts
async function login(email, password) {
  // 1. Autentica via Supabase
  const res = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=password', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY 
    },
    body: JSON.stringify({ email, password })
  });
  
  if (!res.ok) {
    showError('Email ou senha incorretos');
    return;
  }
  
  const data = await res.json();
  // data = { access_token, refresh_token, expires_in, user }
  
  // 2. Verifica se o user existe em cms_admins
  const adminRes = await fetch(
    SUPABASE_URL + '/rest/v1/cms_admins?id=eq.' + data.user.id,
    { headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + data.access_token }}
  );
  const admins = await adminRes.json();
  
  if (!admins.length) {
    showError('Sem permissão para acessar o painel');
    return;
  }
  
  const admin = admins[0];
  
  // 3. Salva sessão completa
  saveSession({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
    user: {
      id: data.user.id,
      email: data.user.email,
      name: admin.name,
      role: admin.role
    }
  });
  
  // 4. Redirect
  window.location.href = '/acesso/painel';
}

function saveSession(s) {
  localStorage.setItem('orbit_session', JSON.stringify(s));
}

function getSession() {
  try { return JSON.parse(localStorage.getItem('orbit_session')); }
  catch(e) { return null; }
}
```

## Auto-refresh do JWT (no painel)

O JWT do Supabase expira em **1 hora**. Pra evitar "Sessão expirada" toda hora, o painel implementa refresh automático:

```javascript
async function refreshAccessToken() {
  const session = getSession();
  if (!session?.refresh_token) return null;
  
  const res = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=refresh_token', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY
    },
    body: JSON.stringify({ refresh_token: session.refresh_token })
  });
  
  if (!res.ok) return null;
  
  const data = await res.json();
  const newSession = {
    ...session,
    access_token: data.access_token,
    refresh_token: data.refresh_token, // Supabase rotaciona o refresh também
    expires_at: Math.floor(Date.now() / 1000) + data.expires_in
  };
  saveSession(newSession);
  return newSession;
}

// Wrapper que usa pra qualquer chamada autenticada
async function supaFetch(url, options = {}) {
  let session = getSession();
  if (!session) { 
    window.location.href = '/acesso'; 
    return null; 
  }
  
  // Verifica se token expirou (com 5 min de margem)
  const now = Math.floor(Date.now() / 1000);
  if (session.expires_at - 300 < now) {
    session = await refreshAccessToken();
    if (!session) {
      window.location.href = '/acesso';
      return null;
    }
  }
  
  // Faz a chamada
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + session.access_token,
    ...(options.headers || {})
  };
  
  let res = await fetch(url, { ...options, headers });
  
  // Se ainda assim deu 401, tenta refresh + retry uma vez
  if (res.status === 401) {
    session = await refreshAccessToken();
    if (!session) {
      window.location.href = '/acesso';
      return null;
    }
    res = await fetch(url, { 
      ...options, 
      headers: { ...headers, 'Authorization': 'Bearer ' + session.access_token } 
    });
  }
  
  return res;
}
```

## Logout

```javascript
async function logout() {
  const session = getSession();
  if (session?.access_token) {
    // Revoga o token no Supabase
    await fetch(SUPABASE_URL + '/auth/v1/logout', {
      method: 'POST',
      headers: { 
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + session.access_token 
      }
    });
  }
  localStorage.removeItem('orbit_session');
  window.location.href = '/acesso';
}
```

## Roles e permissões

Tabela `cms_admins.role` tem 2 valores:

- **`admin`** — vê tudo, incluindo a tela "Usuários" pra criar/editar outros admins
- **`editor`** — vê tudo EXCETO "Usuários"

A diferenciação é feita no JS após carregar a sessão:

```javascript
function applyRolePermissions(role) {
  if (role !== 'admin') {
    document.getElementById('navUsers').style.display = 'none';
  }
}
```

**⚠️ Isso é UI-only.** A segurança real está nas RLS policies. Um editor mal-intencionado pode usar curl + o token dele pra modificar `cms_admins` direto. Pra evitar isso, mude a policy de `cms_admins` pra exigir role admin:

```sql
DROP POLICY "authenticated_full_access" ON cms_admins;

CREATE POLICY "Only admins can modify cms_admins"
  ON cms_admins FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM cms_admins WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM cms_admins WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated can read cms_admins"
  ON cms_admins FOR SELECT TO authenticated
  USING (true);
```

## Criar admin novo (via painel)

A tela "Usuários" do painel faz isto:

```javascript
async function createAdmin(email, password, name, role) {
  // 1. Cria user no Supabase Auth
  const authRes = await fetch(SUPABASE_URL + '/auth/v1/signup', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY 
    },
    body: JSON.stringify({ email, password })
  });
  const authData = await authRes.json();
  
  if (authData.error) {
    alert('Erro: ' + authData.error.message);
    return;
  }
  
  // 2. Insere em cms_admins com o mesmo ID
  await supaFetch(SUPABASE_URL + '/rest/v1/cms_admins', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body: JSON.stringify({
      id: authData.user.id,
      email,
      name,
      role
    })
  });
  
  alert('Admin criado!');
  loadUsers();
}
```

**⚠️ Pré-requisito:** Settings → Auth → "Enable email confirmations" deve estar **OFF**, senão o user precisa clicar num link de confirmação no email antes de poder logar.
