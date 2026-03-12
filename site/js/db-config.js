/**
 * Orbit CMS — Database Configuration
 *
 * MODO ATUAL: localStorage (dados no browser)
 * PARA ATIVAR SUPABASE: Preencha as credenciais abaixo e mude USE_SUPABASE para true
 */
var DB_CONFIG = {
    // Trocar para true quando tiver Supabase configurado
    USE_SUPABASE: false,

    // Credenciais Supabase (preencher quando disponível)
    SUPABASE_URL: '',      // Ex: https://xxxxx.supabase.co
    SUPABASE_ANON_KEY: '', // Ex: eyJhbGciOi...

    // localStorage config (atual)
    LOCAL_STORAGE_KEY: 'orbit_cms',
    AUTH_SALT: '_orbit_salt_2024',
    SESSION_KEY: 'orbit_session'
};
