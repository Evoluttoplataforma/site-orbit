/**
 * Orbit CMS — Data Layer
 * Provides unified API for localStorage and Supabase
 *
 * Usage:
 *   await OrbitDB.init();
 *   var articles = await OrbitDB.articles.list({ status: 'published' });
 *   await OrbitDB.articles.create({ title: '...', content: '...' });
 *   await OrbitDB.articles.update(id, { title: 'new title' });
 *   await OrbitDB.articles.delete(id);
 *   var article = await OrbitDB.articles.getBySlug('meu-artigo');
 *
 *   await OrbitDB.auth.login(email, password);
 *   await OrbitDB.auth.logout();
 *   OrbitDB.auth.getSession();
 */

var OrbitDB = (function() {
    var _supabase = null;
    var _config = typeof DB_CONFIG !== 'undefined' ? DB_CONFIG : { USE_SUPABASE: false, LOCAL_STORAGE_KEY: 'orbit_cms', AUTH_SALT: '_orbit_salt_2024', SESSION_KEY: 'orbit_session' };

    // ═══ HELPERS ═══
    function generateId(prefix) {
        return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    }

    function generateSlug(title) {
        return title
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase().trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    async function hashPassword(password) {
        var data = new TextEncoder().encode(password + _config.AUTH_SALT);
        var hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash)).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    }

    // ═══ LOCAL STORAGE BACKEND ═══
    var LocalBackend = {
        _getDB: function() {
            try {
                return JSON.parse(localStorage.getItem(_config.LOCAL_STORAGE_KEY)) || LocalBackend._defaultDB();
            } catch(e) {
                return LocalBackend._defaultDB();
            }
        },
        _saveDB: function(db) {
            localStorage.setItem(_config.LOCAL_STORAGE_KEY, JSON.stringify(db));
        },
        _defaultDB: function() {
            return { version: 1, users: [], articles: [], leadMagnets: [], customerStories: [] };
        },

        // Articles
        articles: {
            list: function(filters) {
                var db = LocalBackend._getDB();
                var list = db.articles || [];
                if (filters) {
                    if (filters.status) list = list.filter(function(a) { return a.status === filters.status; });
                    if (filters.category) list = list.filter(function(a) { return a.category === filters.category; });
                }
                return Promise.resolve(list.sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); }));
            },
            get: function(id) {
                var db = LocalBackend._getDB();
                return Promise.resolve(db.articles.find(function(a) { return a.id === id; }) || null);
            },
            getBySlug: function(slug) {
                var db = LocalBackend._getDB();
                return Promise.resolve(db.articles.find(function(a) { return a.slug === slug; }) || null);
            },
            create: function(data) {
                var db = LocalBackend._getDB();
                data.id = generateId('art');
                data.slug = data.slug || generateSlug(data.title);
                data.createdAt = data.createdAt || new Date().toISOString();
                data.updatedAt = new Date().toISOString();
                db.articles.push(data);
                LocalBackend._saveDB(db);
                return Promise.resolve(data);
            },
            update: function(id, data) {
                var db = LocalBackend._getDB();
                var idx = db.articles.findIndex(function(a) { return a.id === id; });
                if (idx === -1) return Promise.reject(new Error('Article not found'));
                data.updatedAt = new Date().toISOString();
                if (data.title && !data.slug) data.slug = generateSlug(data.title);
                Object.assign(db.articles[idx], data);
                LocalBackend._saveDB(db);
                return Promise.resolve(db.articles[idx]);
            },
            delete: function(id) {
                var db = LocalBackend._getDB();
                db.articles = db.articles.filter(function(a) { return a.id !== id; });
                LocalBackend._saveDB(db);
                return Promise.resolve(true);
            }
        },

        // Lead Magnets
        leadMagnets: {
            list: function() {
                var db = LocalBackend._getDB();
                return Promise.resolve(db.leadMagnets || []);
            },
            get: function(id) {
                var db = LocalBackend._getDB();
                return Promise.resolve((db.leadMagnets || []).find(function(l) { return l.id === id; }) || null);
            },
            create: function(data) {
                var db = LocalBackend._getDB();
                data.id = generateId('lm');
                if (!db.leadMagnets) db.leadMagnets = [];
                db.leadMagnets.push(data);
                LocalBackend._saveDB(db);
                return Promise.resolve(data);
            },
            update: function(id, data) {
                var db = LocalBackend._getDB();
                var idx = (db.leadMagnets || []).findIndex(function(l) { return l.id === id; });
                if (idx === -1) return Promise.reject(new Error('Lead magnet not found'));
                Object.assign(db.leadMagnets[idx], data);
                LocalBackend._saveDB(db);
                return Promise.resolve(db.leadMagnets[idx]);
            },
            delete: function(id) {
                var db = LocalBackend._getDB();
                db.leadMagnets = (db.leadMagnets || []).filter(function(l) { return l.id !== id; });
                LocalBackend._saveDB(db);
                return Promise.resolve(true);
            }
        },

        // Customer Stories
        stories: {
            list: function(filters) {
                var db = LocalBackend._getDB();
                var list = db.customerStories || [];
                if (filters && filters.status) list = list.filter(function(s) { return s.status === filters.status; });
                return Promise.resolve(list.sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); }));
            },
            get: function(id) {
                var db = LocalBackend._getDB();
                return Promise.resolve((db.customerStories || []).find(function(s) { return s.id === id; }) || null);
            },
            getBySlug: function(slug) {
                var db = LocalBackend._getDB();
                return Promise.resolve((db.customerStories || []).find(function(s) { return s.slug === slug; }) || null);
            },
            create: function(data) {
                var db = LocalBackend._getDB();
                data.id = generateId('story');
                data.createdAt = new Date().toISOString();
                if (!db.customerStories) db.customerStories = [];
                db.customerStories.push(data);
                LocalBackend._saveDB(db);
                return Promise.resolve(data);
            },
            update: function(id, data) {
                var db = LocalBackend._getDB();
                var idx = (db.customerStories || []).findIndex(function(s) { return s.id === id; });
                if (idx === -1) return Promise.reject(new Error('Story not found'));
                Object.assign(db.customerStories[idx], data);
                LocalBackend._saveDB(db);
                return Promise.resolve(db.customerStories[idx]);
            },
            delete: function(id) {
                var db = LocalBackend._getDB();
                db.customerStories = (db.customerStories || []).filter(function(s) { return s.id !== id; });
                LocalBackend._saveDB(db);
                return Promise.resolve(true);
            }
        },

        // Users
        users: {
            list: function() {
                var db = LocalBackend._getDB();
                return Promise.resolve((db.users || []).map(function(u) {
                    var copy = Object.assign({}, u);
                    delete copy.password;
                    return copy;
                }));
            },
            create: function(data) {
                var db = LocalBackend._getDB();
                data.id = generateId('usr');
                data.createdAt = new Date().toISOString();
                db.users.push(data);
                LocalBackend._saveDB(db);
                return Promise.resolve(data);
            },
            delete: function(id) {
                var db = LocalBackend._getDB();
                db.users = db.users.filter(function(u) { return u.id !== id; });
                LocalBackend._saveDB(db);
                return Promise.resolve(true);
            }
        },

        // Auth
        auth: {
            login: async function(email, password) {
                var db = LocalBackend._getDB();
                var hashed = await hashPassword(password);
                var user = db.users.find(function(u) { return u.email === email && u.password === hashed; });
                if (!user) throw new Error('Credenciais inválidas');
                var session = { userId: user.id, name: user.name, email: user.email, role: user.role };
                sessionStorage.setItem(_config.SESSION_KEY, JSON.stringify(session));
                return session;
            },
            logout: function() {
                sessionStorage.removeItem(_config.SESSION_KEY);
                return Promise.resolve();
            },
            getSession: function() {
                try {
                    return JSON.parse(sessionStorage.getItem(_config.SESSION_KEY));
                } catch(e) {
                    return null;
                }
            },
            hashPassword: hashPassword
        }
    };

    // ═══ SUPABASE BACKEND (activates when DB_CONFIG.USE_SUPABASE = true) ═══
    var SupabaseBackend = {
        _init: function() {
            if (!_config.SUPABASE_URL || !_config.SUPABASE_ANON_KEY) {
                console.error('[OrbitDB] Supabase credentials missing in db-config.js');
                return false;
            }
            // Supabase client will be loaded from CDN
            if (typeof supabase === 'undefined') {
                console.error('[OrbitDB] Supabase JS library not loaded. Add: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
                return false;
            }
            _supabase = supabase.createClient(_config.SUPABASE_URL, _config.SUPABASE_ANON_KEY);
            return true;
        },

        articles: {
            list: async function(filters) {
                var query = _supabase.from('articles').select('*');
                if (filters && filters.status) query = query.eq('status', filters.status);
                if (filters && filters.category) query = query.eq('category', filters.category);
                query = query.order('created_at', { ascending: false });
                var result = await query;
                if (result.error) throw result.error;
                return result.data.map(SupabaseBackend._mapArticle);
            },
            get: async function(id) {
                var result = await _supabase.from('articles').select('*').eq('id', id).single();
                if (result.error) return null;
                return SupabaseBackend._mapArticle(result.data);
            },
            getBySlug: async function(slug) {
                var result = await _supabase.from('articles').select('*').eq('slug', slug).single();
                if (result.error) return null;
                return SupabaseBackend._mapArticle(result.data);
            },
            create: async function(data) {
                var row = SupabaseBackend._toRow(data);
                row.slug = row.slug || generateSlug(data.title);
                var result = await _supabase.from('articles').insert(row).select().single();
                if (result.error) throw result.error;
                return SupabaseBackend._mapArticle(result.data);
            },
            update: async function(id, data) {
                var row = SupabaseBackend._toRow(data);
                row.updated_at = new Date().toISOString();
                var result = await _supabase.from('articles').update(row).eq('id', id).select().single();
                if (result.error) throw result.error;
                return SupabaseBackend._mapArticle(result.data);
            },
            delete: async function(id) {
                var result = await _supabase.from('articles').delete().eq('id', id);
                if (result.error) throw result.error;
                return true;
            }
        },

        // Map Supabase snake_case to JS camelCase
        _mapArticle: function(row) {
            if (!row) return null;
            return {
                id: row.id,
                title: row.title,
                slug: row.slug,
                content: row.content,
                category: row.category,
                author: row.author,
                authorId: row.author_id,
                readTime: row.read_time,
                metaDesc: row.meta_desc,
                imageUrl: row.image_url,
                imageData: row.image_data,
                seoTitle: row.seo_title,
                seoCanonical: row.seo_canonical,
                seoKeyword: row.seo_keyword,
                seoOgImage: row.seo_og_image,
                leadMagnetId: row.lead_magnet_id,
                ctaBannerEnabled: row.cta_banner_enabled,
                ctaBannerTitle: row.cta_banner_title,
                ctaBannerDesc: row.cta_banner_desc,
                ctaBannerCtaText: row.cta_banner_cta_text,
                ctaBannerCtaUrl: row.cta_banner_cta_url,
                ctaBannerImage: row.cta_banner_image,
                status: row.status,
                createdAt: row.created_at,
                updatedAt: row.updated_at
            };
        },
        _toRow: function(data) {
            var row = {};
            if (data.title !== undefined) row.title = data.title;
            if (data.slug !== undefined) row.slug = data.slug;
            if (data.content !== undefined) row.content = data.content;
            if (data.category !== undefined) row.category = data.category;
            if (data.author !== undefined) row.author = data.author;
            if (data.authorId !== undefined) row.author_id = data.authorId;
            if (data.readTime !== undefined) row.read_time = data.readTime;
            if (data.metaDesc !== undefined) row.meta_desc = data.metaDesc;
            if (data.imageUrl !== undefined) row.image_url = data.imageUrl;
            if (data.imageData !== undefined) row.image_data = data.imageData;
            if (data.status !== undefined) row.status = data.status;
            if (data.leadMagnetId !== undefined) row.lead_magnet_id = data.leadMagnetId;
            return row;
        },

        // Supabase Auth
        auth: {
            login: async function(email, password) {
                var result = await _supabase.auth.signInWithPassword({ email: email, password: password });
                if (result.error) throw new Error(result.error.message);
                // Get user profile from users table
                var profile = await _supabase.from('users').select('*').eq('email', email).single();
                var session = {
                    userId: result.data.user.id,
                    name: profile.data ? profile.data.name : email,
                    email: email,
                    role: profile.data ? profile.data.role : 'editor'
                };
                sessionStorage.setItem(_config.SESSION_KEY, JSON.stringify(session));
                return session;
            },
            logout: async function() {
                await _supabase.auth.signOut();
                sessionStorage.removeItem(_config.SESSION_KEY);
            },
            getSession: function() {
                try {
                    return JSON.parse(sessionStorage.getItem(_config.SESSION_KEY));
                } catch(e) {
                    return null;
                }
            }
        },

        // Placeholder for other collections (implement same pattern)
        leadMagnets: LocalBackend.leadMagnets, // fallback to local for now
        stories: LocalBackend.stories,
        users: LocalBackend.users
    };

    // ═══ PUBLIC API ═══
    return {
        init: function() {
            if (_config.USE_SUPABASE) {
                var ok = SupabaseBackend._init();
                if (!ok) {
                    console.warn('[OrbitDB] Supabase init failed, falling back to localStorage');
                    return Promise.resolve('localStorage');
                }
                console.log('[OrbitDB] Using Supabase backend');
                return Promise.resolve('supabase');
            }
            console.log('[OrbitDB] Using localStorage backend');
            return Promise.resolve('localStorage');
        },

        get articles() {
            return _config.USE_SUPABASE && _supabase ? SupabaseBackend.articles : LocalBackend.articles;
        },
        get leadMagnets() {
            return _config.USE_SUPABASE && _supabase ? SupabaseBackend.leadMagnets : LocalBackend.leadMagnets;
        },
        get stories() {
            return _config.USE_SUPABASE && _supabase ? SupabaseBackend.stories : LocalBackend.stories;
        },
        get users() {
            return _config.USE_SUPABASE && _supabase ? SupabaseBackend.users : LocalBackend.users;
        },
        get auth() {
            return _config.USE_SUPABASE && _supabase ? SupabaseBackend.auth : LocalBackend.auth;
        },

        // Utilities
        generateId: generateId,
        generateSlug: generateSlug,
        hashPassword: hashPassword
    };
})();
