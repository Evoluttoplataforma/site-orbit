// Auto-generated from site/acesso/painel.html
export const pageHTML = `

    <!-- SIDEBAR -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-logo">
            <img src="/images/logo-orbit-white.png" alt="Orbit">
            <span>CMS</span>
        </div>
        <nav class="sidebar-nav">
            <a href="#" class="active" data-view="dashboard" onclick="showView('dashboard')">
                <i class="fas fa-home"></i> Dashboard
            </a>
            <a href="#" data-view="articles" onclick="showView('articles')">
                <i class="fas fa-file-alt"></i> Artigos
            </a>
            <a href="#" data-view="editor" onclick="newArticle()">
                <i class="fas fa-pen-to-square"></i> Novo Artigo
            </a>
            <a href="#" data-view="leadmagnets" onclick="showView('leadmagnets')">
                <i class="fas fa-magnet"></i> Iscas Digitais
            </a>
            <a href="#" data-view="stories" onclick="showView('stories')">
                <i class="fas fa-star"></i> Histórias de Clientes
            </a>
            <a href="#" data-view="storyeditor" onclick="showView('storyeditor')">
                <i class="fas fa-pen-fancy"></i> Nova História
            </a>
            <a href="#" data-view="comments" onclick="showView('comments')">
                <i class="fas fa-comments"></i> Comentários
            </a>
            <a href="#" data-view="banners" onclick="showView('banners')">
                <i class="fas fa-bullhorn"></i> Banners
            </a>
            <div class="nav-divider"></div>
            <a href="#" data-view="users" onclick="showView('users')" id="navUsers" style="display:none;">
                <i class="fas fa-users-gear"></i> Usuarios
            </a>
            <a href="/blog" target="_blank">
                <i class="fas fa-external-link-alt"></i> Ver Blog
            </a>
            <a href="/historias" target="_blank">
                <i class="fas fa-external-link-alt"></i> Ver Histórias
            </a>
            <a href="/" target="_blank">
                <i class="fas fa-globe"></i> Ver Site
            </a>
        </nav>
        <div class="sidebar-user">
            <div class="sidebar-user__avatar" id="userAvatar">--</div>
            <div class="sidebar-user__info">
                <div class="sidebar-user__name" id="userName">--</div>
                <div class="sidebar-user__role" id="userRole">--</div>
            </div>
            <button class="sidebar-user__logout" onclick="logout()" title="Sair">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        </div>
    </aside>

    <!-- MAIN -->
    <div class="main">

        <!-- ══ NOTIFICATION BELL (global, fixed) ══ -->
        <div id="notifBellWrapper" style="position:fixed; top:14px; right:32px; z-index:999; pointer-events:none;">
            <button class="notif-bell" onclick="toggleNotifDropdown()" title="Notificações" style="pointer-events:auto;">
                <i class="fas fa-bell"></i>
                <span class="notif-bell__badge" id="notifBadge" data-count="0"></span>
            </button>
            <div class="notif-dropdown" id="notifDropdown" style="pointer-events:auto;">
                <div class="notif-dropdown__header">
                    <span>Notificações</span>
                    <span id="notifCount" style="color:var(--gray-400);font-size:0.8rem;"></span>
                </div>
                <div class="notif-dropdown__list" id="notifList"></div>
            </div>
        </div>

        <!-- ══ DASHBOARD VIEW ══ -->
        <div class="view active" id="view-dashboard">
            <div class="topbar">
                <h1>Dashboard</h1>
            </div>
            <div class="content">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-card__label">Total de artigos</div>
                        <div class="stat-card__value" id="statTotal">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__label">Publicados</div>
                        <div class="stat-card__value stat-card__value--primary" id="statPublished">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__label">Rascunhos</div>
                        <div class="stat-card__value" id="statDrafts">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__label">Usuarios</div>
                        <div class="stat-card__value" id="statUsers">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__label">Histórias pendentes</div>
                        <div class="stat-card__value" style="color:var(--warning);" id="statPendingStories">0</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3>Artigos recentes</h3>
                        <button class="btn btn-primary btn-sm" onclick="newArticle()">
                            <i class="fas fa-plus"></i> Novo Artigo
                        </button>
                    </div>
                    <div class="card-body" style="padding:0;">
                        <div class="table-wrapper">
                            <div class="table-responsive"><table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Categoria</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="dashboardArticles"></tbody>
                            </table></div>
                        </div>
                        <div class="empty-state" id="dashboardEmpty" style="display:none;">
                            <i class="fas fa-newspaper"></i>
                            <p>Nenhum artigo criado ainda</p>
                            <button class="btn btn-primary" onclick="newArticle()">
                                <i class="fas fa-plus"></i> Criar primeiro artigo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══ ARTICLES LIST VIEW ══ -->
        <div class="view" id="view-articles">
            <div class="topbar">
                <h1>Artigos</h1>
                <div class="topbar-actions">
                    <button class="btn btn-primary btn-sm" onclick="newArticle()">
                        <i class="fas fa-plus"></i> Novo Artigo
                    </button>
                </div>
            </div>
            <div class="content">
                <div class="card">
                    <div class="card-body" style="padding:0;">
                        <div class="table-wrapper">
                            <div class="table-responsive"><table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Autor</th>
                                        <th>Categoria</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                        <th>Acoes</th>
                                    </tr>
                                </thead>
                                <tbody id="articlesTableBody"></tbody>
                            </table></div>
                        </div>
                        <div class="empty-state" id="articlesEmpty" style="display:none;">
                            <i class="fas fa-newspaper"></i>
                            <p>Nenhum artigo encontrado</p>
                            <button class="btn btn-primary" onclick="newArticle()">
                                <i class="fas fa-plus"></i> Criar artigo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══ EDITOR VIEW ══ -->
        <div class="view" id="view-editor">
            <div class="topbar">
                <h1 id="editorTitle">Novo Artigo</h1>
                <div class="topbar-actions">
                    <button class="btn btn-secondary btn-sm" onclick="saveArticle('draft')">
                        <i class="fas fa-save"></i> Salvar rascunho
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="saveArticle('published')">
                        <i class="fas fa-paper-plane"></i> Publicar
                    </button>
                </div>
            </div>
            <div class="content">
                <div class="editor-grid">
                    <!-- Main editor column -->
                    <div>
                        <div class="card">
                            <div class="card-body">
                                <input type="hidden" id="articleId">

                                <div class="form-group">
                                    <label for="articleTitleInput">Titulo do artigo *</label>
                                    <input type="text" id="articleTitleInput" placeholder="Digite o titulo do artigo" oninput="generateSlug()">
                                </div>

                                <div class="form-group">
                                    <label>Slug (URL)</label>
                                    <input type="text" id="articleSlug" placeholder="titulo-do-artigo">
                                    <div class="slug-preview">
                                        /blog/<span id="slugPreview">titulo-do-artigo</span>.html
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Conteudo *</label>
                                    <div class="editor-toolbar">
                                        <button onclick="execCmd('formatBlock','<h2>')" title="Titulo H2"><b>H2</b></button>
                                        <button onclick="execCmd('formatBlock','<h3>')" title="Titulo H3"><b>H3</b></button>
                                        <button onclick="execCmd('formatBlock','<p>')" title="Paragrafo">P</button>
                                        <div class="toolbar-divider"></div>
                                        <button onclick="execCmd('bold')" title="Negrito"><i class="fas fa-bold"></i></button>
                                        <button onclick="execCmd('italic')" title="Italico"><i class="fas fa-italic"></i></button>
                                        <button onclick="execCmd('underline')" title="Sublinhado"><i class="fas fa-underline"></i></button>
                                        <div class="toolbar-divider"></div>
                                        <button onclick="execCmd('insertUnorderedList')" title="Lista"><i class="fas fa-list-ul"></i></button>
                                        <button onclick="execCmd('insertOrderedList')" title="Lista numerada"><i class="fas fa-list-ol"></i></button>
                                        <button onclick="insertBlockquote()" title="Citacao"><i class="fas fa-quote-left"></i></button>
                                        <div class="toolbar-divider"></div>
                                        <button onclick="insertLink()" title="Link"><i class="fas fa-link"></i></button>
                                        <button onclick="insertImageFromFile()" title="Upload imagem"><i class="fas fa-image"></i></button>
                                        <button onclick="insertImage()" title="Imagem por URL"><i class="fas fa-globe"></i></button>
                                        <div class="toolbar-divider"></div>
                                        <button onclick="execCmd('removeFormat')" title="Limpar formatacao"><i class="fas fa-eraser"></i></button>
                                    </div>
                                    <div class="rich-editor" id="richEditor" contenteditable="true"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar column -->
                    <div>
                        <div class="card" style="margin-bottom:20px;">
                            <div class="card-header">
                                <h3>Configuracoes</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="articleCategory">Categoria *</label>
                                    <select id="articleCategory" onchange="onCategoryChange(this)">
                                        <option value="">Selecione...</option>
                                        <option value="estrategica">Gestao Estrategica</option>
                                        <option value="planejamento-estrategico">Planejamento Estrategico</option>
                                        <option value="processos">Processos</option>
                                        <option value="indicadores">Indicadores</option>
                                        <option value="lideranca">Lideranca</option>
                                        <option value="ia">IA & Inovacao</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="growth">Growth</option>
                                        <option value="outros">Outros</option>
                                        <option value="__custom__">+ Nova categoria...</option>
                                    </select>
                                    <div id="customCategoryWrapper" style="display:none;margin-top:8px;">
                                        <input type="text" id="customCategoryInput" placeholder="Nome da categoria">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="articleAuthor">Autor</label>
                                    <input type="text" id="articleAuthor" placeholder="Equipe Orbit">
                                </div>

                                <div class="form-group">
                                    <label>Foto do autor</label>
                                    <div style="display:flex;align-items:center;gap:12px;">
                                        <div id="authorAvatarPreview" style="width:48px;height:48px;border-radius:50%;background:var(--gray-100);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;">
                                            <i class="fas fa-user" style="color:var(--gray-400);"></i>
                                        </div>
                                        <div style="flex:1;">
                                            <div class="image-upload-area" id="authorAvatarDropZone" style="min-height:auto;padding:10px;">
                                                <input type="file" id="authorAvatarInput" accept="image/*" onchange="handleAuthorAvatarUpload(event)">
                                                <span style="font-size:0.78rem;">Clique ou arraste (max 2MB)</span>
                                            </div>
                                        </div>
                                        <button class="btn btn-ghost btn-sm" onclick="removeAuthorAvatar()" title="Remover foto" style="flex-shrink:0;"><i class="fas fa-times" style="color:var(--error);"></i></button>
                                    </div>
                                    <input type="hidden" id="authorAvatarData">
                                </div>

                                <div class="form-group">
                                    <label>Tempo de leitura</label>
                                    <div id="articleReadTimeDisplay" style="padding:10px 14px;background:var(--gray-50);border-radius:8px;font-size:0.9rem;color:var(--gray-600);">
                                        <i class="fas fa-clock" style="color:var(--primary);margin-right:6px;"></i>
                                        <span id="articleReadTimeValue">0 min</span>
                                        <span style="color:var(--gray-400);margin-left:4px;">(<span id="articleWordCount">0</span> palavras)</span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="articleMetaDesc">Meta descricao</label>
                                    <textarea id="articleMetaDesc" rows="3" placeholder="Descricao para SEO (ate 160 caracteres)"></textarea>
                                    <div class="hint"><span id="metaCharCount">0</span>/160 caracteres</div>
                                </div>
                            </div>
                        </div>

                        <div class="card" style="margin-bottom:20px;">
                            <div class="card-header">
                                <h3>Imagem destaque</h3>
                            </div>
                            <div class="card-body">
                                <!-- AI Image Generation -->
                                <div style="margin-bottom:16px;padding:16px;background:rgba(255,186,26,0.06);border:1px solid rgba(255,186,26,0.15);border-radius:10px;">
                                    <label style="font-size:0.82rem;font-weight:600;color:var(--gray-700);margin-bottom:8px;display:flex;align-items:center;gap:6px;">
                                        <i class="fas fa-wand-magic-sparkles" style="color:var(--primary);"></i> Gerar com IA
                                    </label>
                                    <div style="display:flex;gap:8px;">
                                        <input type="text" id="aiImagePrompt" placeholder="Ex: CEO analyzing holographic data dashboard in dark office" style="flex:1;font-size:0.85rem;">
                                        <button class="btn btn-primary btn-sm" onclick="generateAIImage()" id="aiImageBtn" style="white-space:nowrap;">
                                            <i class="fas fa-sparkles"></i> Gerar
                                        </button>
                                    </div>
                                    <div style="display:flex;gap:8px;margin-top:8px;align-items:center;">
                                        <button class="btn btn-secondary btn-sm" onclick="autoGeneratePrompt()" style="font-size:0.75rem;">
                                            <i class="fas fa-robot"></i> Auto (baseado no título)
                                        </button>
                                        <select id="aiAspectRatio" style="font-size:0.78rem;padding:5px 10px;border-radius:6px;border:1px solid var(--gray-200);background:var(--white);cursor:pointer;">
                                            <option value="16:9">16:9 Blog/Vídeo</option>
                                            <option value="1:1">1:1 Feed</option>
                                            <option value="9:16">9:16 Stories</option>
                                        </select>
                                    </div>
                                    <div class="hint" style="margin-top:6px;">Descreva a cena ou clique "Auto" para gerar baseado no título</div>
                                    <div id="aiImageStatus" style="display:none;margin-top:8px;font-size:0.82rem;color:var(--gray-500);"></div>
                                </div>

                                <div class="image-tabs">
                                    <button class="image-tab active" onclick="switchImageTab('upload')">
                                        <i class="fas fa-upload"></i> Upload
                                    </button>
                                    <button class="image-tab" onclick="switchImageTab('url')">
                                        <i class="fas fa-link"></i> URL
                                    </button>
                                </div>

                                <div class="image-tab-content active" id="imageTabUpload">
                                    <div class="image-upload-area" id="imageDropZone">
                                        <input type="file" id="imageFileInput" accept="image/*" onchange="handleImageUpload(event)">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Arraste uma imagem ou clique para selecionar</p>
                                        <span class="upload-hint">JPG, PNG ou WebP (max 2MB)</span>
                                    </div>
                                </div>

                                <div class="image-tab-content" id="imageTabUrl">
                                    <div class="form-group" style="margin-bottom:0;">
                                        <input type="text" id="articleImageUrl" placeholder="https://..." oninput="previewFeaturedImage()">
                                    </div>
                                </div>

                                <div class="image-preview" id="featuredImagePreview"></div>
                                <input type="hidden" id="articleImageData">
                            </div>
                        </div>

                        <div class="card" style="margin-bottom:20px;">
                            <div class="card-header">
                                <h3><i class="fas fa-search" style="font-size:0.85rem;margin-right:6px;color:var(--primary);"></i> SEO & Schema</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="seoTitle">Titulo SEO</label>
                                    <input type="text" id="seoTitle" placeholder="Titulo para Google (ate 60 chars)" oninput="updateSeoScore()">
                                    <div class="hint"><span id="seoTitleCount">0</span>/60 caracteres</div>
                                </div>
                                <div class="form-group">
                                    <label for="seoCanonical">URL Canonica</label>
                                    <input type="text" id="seoCanonical" placeholder="https://orbitgestao.com.br/blog/slug">
                                    <div class="hint">URL oficial da pagina</div>
                                </div>
                                <div class="form-group">
                                    <label for="seoKeyword">Palavra-chave foco</label>
                                    <input type="text" id="seoKeyword" placeholder="ex: gestao estrategica" oninput="updateSeoScore()">
                                </div>
                                <div class="form-group">
                                    <label for="seoOgImage">Imagem OG (1200x630)</label>
                                    <input type="text" id="seoOgImage" placeholder="URL da imagem para redes sociais">
                                    <div class="hint">Deixe vazio para usar a imagem destaque</div>
                                </div>

                                <label style="font-size:0.82rem;font-weight:500;color:var(--gray-700);margin-bottom:8px;display:block;">Score SEO</label>
                                <div class="seo-score-bar">
                                    <div class="seo-score-fill" id="seoScoreFill" style="width:0%;background:var(--gray-400);"></div>
                                </div>
                                <ul class="seo-checklist" id="seoChecklist">
                                    <li><span class="seo-check fail" id="seoCheckTitle"><i class="fas fa-circle"></i></span> Titulo SEO preenchido</li>
                                    <li><span class="seo-check fail" id="seoCheckDesc"><i class="fas fa-circle"></i></span> Meta descricao (120-160 chars)</li>
                                    <li><span class="seo-check fail" id="seoCheckKeyword"><i class="fas fa-circle"></i></span> Palavra-chave definida</li>
                                    <li><span class="seo-check fail" id="seoCheckImage"><i class="fas fa-circle"></i></span> Imagem destaque</li>
                                    <li><span class="seo-check fail" id="seoCheckSlug"><i class="fas fa-circle"></i></span> Slug otimizado</li>
                                    <li><span class="seo-check fail" id="seoCheckContent"><i class="fas fa-circle"></i></span> Conteudo com +300 palavras</li>
                                </ul>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <h4 style="font-weight:600;margin-bottom:16px;"><i class="fas fa-magnet" style="color:var(--primary);margin-right:8px;"></i>Isca Digital (Lead Magnet)</h4>
                                <div class="form-group">
                                    <label>Selecionar isca</label>
                                    <div style="position:relative;">
                                        <select id="leadMagnetSelect" style="appearance:none;-webkit-appearance:none;padding-right:40px;cursor:pointer;">
                                            <option value="">-- Selecione uma isca --</option>
                                        </select>
                                        <i class="fas fa-chevron-down" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);color:var(--primary);font-size:0.75rem;pointer-events:none;"></i>
                                    </div>
                                    <div class="hint" style="margin-top:6px;">Cadastre iscas no menu <a href="#" onclick="event.preventDefault();showView('leadmagnets')" style="color:var(--primary);font-weight:600;text-decoration:underline;">Iscas Digitais</a></div>
                                </div>
                                <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:16px 0;">
                                <h5 style="font-weight:600;margin-bottom:12px;font-size:0.85rem;"><i class="fas fa-image" style="color:var(--primary);margin-right:6px;"></i>Banner CTA no meio do artigo</h5>
                                <div class="form-group">
                                    <label>Ativar banner CTA</label>
                                    <div style="position:relative;">
                                        <select id="ctaBannerEnabled" style="appearance:none;-webkit-appearance:none;padding-right:40px;cursor:pointer;">
                                            <option value="0">Desativado</option>
                                            <option value="1">Ativado</option>
                                        </select>
                                        <i class="fas fa-chevron-down" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);color:var(--primary);font-size:0.75rem;pointer-events:none;"></i>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="ctaBannerTitle">Titulo do banner</label>
                                    <input type="text" id="ctaBannerTitle" placeholder="Ex: Transforme sua gestão agora">
                                </div>
                                <div class="form-group">
                                    <label for="ctaBannerDesc">Descricao</label>
                                    <input type="text" id="ctaBannerDesc" placeholder="Texto persuasivo">
                                </div>
                                <div class="form-group">
                                    <label for="ctaBannerCtaText">Texto do botao</label>
                                    <input type="text" id="ctaBannerCtaText" placeholder="Agendar demonstração" value="Agendar demonstração">
                                </div>
                                <div class="form-group">
                                    <label for="ctaBannerCtaUrl">Link do botao</label>
                                    <input type="text" id="ctaBannerCtaUrl" placeholder="URL destino" value="/#contato-form">
                                </div>
                                <div class="form-group">
                                    <label>Imagem do banner</label>
                                    <div class="image-upload-area" id="ctaBannerImageDropZone" style="min-height:100px;">
                                        <input type="file" id="ctaBannerImageFileInput" accept="image/*" onchange="handleCtaBannerImageUpload(event)">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Arraste uma imagem ou clique</p>
                                        <span class="upload-hint">JPG, PNG ou WebP (max 2MB)</span>
                                    </div>
                                    <div class="image-preview" id="ctaBannerImagePreview" style="margin-top:8px;"></div>
                                    <input type="hidden" id="ctaBannerImageData">
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body" style="display:flex;flex-direction:column;gap:8px;">
                                <button class="btn btn-primary" onclick="saveArticle('published')" style="width:100%;">
                                    <i class="fas fa-paper-plane"></i> Publicar
                                </button>
                                <button class="btn btn-secondary" onclick="saveArticle('draft')" style="width:100%;">
                                    <i class="fas fa-save"></i> Salvar rascunho
                                </button>
                                <button class="btn btn-outline" onclick="previewArticle()" style="width:100%;">
                                    <i class="fas fa-eye"></i> Pre-visualizar
                                </button>
                                <button class="btn btn-outline" onclick="exportArticleHTML()" style="width:100%;">
                                    <i class="fas fa-download"></i> Exportar HTML
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══ LEAD MAGNETS VIEW ══ -->
        <div class="view" id="view-leadmagnets">
            <div class="topbar">
                <h1>Iscas Digitais</h1>
                <div class="topbar-actions">
                    <button class="btn btn-primary btn-sm" onclick="openLeadMagnetModal()">
                        <i class="fas fa-plus"></i> Nova Isca
                    </button>
                </div>
            </div>
            <div class="content">
                <div class="card">
                    <div class="card-body" style="padding:0;">
                        <div class="table-wrapper">
                            <div class="table-responsive"><table>
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Titulo</th>
                                        <th>Descricao</th>
                                        <th>CTA</th>
                                        <th style="width:120px;">Acoes</th>
                                    </tr>
                                </thead>
                                <tbody id="leadMagnetsTableBody"></tbody>
                            </table></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══ LEAD MAGNET MODAL ══ -->
        <div class="modal-overlay" id="leadMagnetModal" onclick="if(event.target===this)closeLeadMagnetModal()">
            <div class="modal" style="max-width:540px;">
                <div class="modal-header">
                    <h3 id="leadMagnetModalTitle">Nova Isca Digital</h3>
                    <button class="btn btn-ghost" onclick="closeLeadMagnetModal()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="lmId">
                    <div class="form-group">
                        <label for="lmType">Tipo</label>
                        <select id="lmType">
                            <option value="ebook">Ebook</option>
                            <option value="checklist">Checklist</option>
                            <option value="planilha">Planilha</option>
                            <option value="webinar">Webinar</option>
                            <option value="trial">Trial Gratuito</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="lmTitle">Titulo</label>
                        <input type="text" id="lmTitle" placeholder="Ex: Guia Completo de Gestão Estratégica">
                    </div>
                    <div class="form-group">
                        <label for="lmDesc">Descricao curta</label>
                        <input type="text" id="lmDesc" placeholder="Frase persuasiva para download">
                    </div>
                    <div class="form-group">
                        <label for="lmCta">Texto do botao</label>
                        <input type="text" id="lmCta" placeholder="Baixar agora" value="Baixar agora">
                    </div>
                    <div class="form-group">
                        <label for="lmUrl">Link do material (apos conversao)</label>
                        <input type="text" id="lmUrl" placeholder="URL de download ou thank you page">
                    </div>
                    <div class="form-group">
                        <label for="lmEvent">Evento RD Station</label>
                        <input type="text" id="lmEvent" placeholder="Ex: download-ebook-gestao-estrategica">
                        <div class="hint">Identificador do evento para integracao com RD Station</div>
                    </div>
                    <div class="form-group">
                        <label>Imagem da isca</label>
                        <div class="image-upload-area" id="lmImageDropZone" style="min-height:120px;">
                            <input type="file" id="lmImageFileInput" accept="image/*" onchange="handleLmImageUpload(event)">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Arraste uma imagem ou clique para selecionar</p>
                            <span class="upload-hint">JPG, PNG ou WebP (max 2MB)</span>
                        </div>
                        <div class="image-preview" id="lmImagePreview" style="margin-top:8px;"></div>
                        <input type="hidden" id="lmImageData">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeLeadMagnetModal()">Cancelar</button>
                    <button class="btn btn-primary" onclick="saveLeadMagnet()">Salvar</button>
                </div>
            </div>
        </div>

        <!-- ══ CUSTOMER STORIES VIEW ══ -->
        <div class="view" id="view-stories">
            <div class="topbar">
                <h1>Histórias de Clientes</h1>
                <div class="topbar-actions">
                    <button class="btn btn-primary btn-sm" onclick="clearStoryEditor();showView('storyeditor')">
                        <i class="fas fa-plus"></i> Nova História
                    </button>
                    <a href="/historias" target="_blank" class="btn btn-outline btn-sm">
                        <i class="fas fa-external-link-alt"></i> Ver no site
                    </a>
                </div>
            </div>
            <div class="content">
                <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));">
                    <div class="stat-card">
                        <div class="stat-card__label">Total</div>
                        <div class="stat-card__value" id="statStoriesTotal">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__label">Pendentes</div>
                        <div class="stat-card__value" style="color:var(--warning);" id="statStoriesPending">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__label">Publicadas</div>
                        <div class="stat-card__value stat-card__value--primary" id="statStoriesPublished">0</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body" style="padding:0;">
                        <div class="table-wrapper">
                            <div class="table-responsive"><table>
                                <thead>
                                    <tr>
                                        <th>Empresa</th>
                                        <th>Contato</th>
                                        <th>Título</th>
                                        <th>Segmento</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="storiesTableBody"></tbody>
                            </table></div>
                        </div>
                        <div class="empty-state" id="storiesEmpty" style="display:none;">
                            <i class="fas fa-star"></i>
                            <p>Nenhuma história enviada ainda</p>
                            <small>Compartilhe o link <strong>historias-enviar.html</strong> com seus clientes</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══ STORY EDITOR VIEW ══ -->
        <div class="view" id="view-storyeditor">
            <div class="topbar">
                <h1 id="storyEditorTitle">Nova História</h1>
                <div class="topbar-actions">
                    <button class="btn btn-secondary btn-sm" onclick="saveStoryFromEditor('pending')">
                        <i class="fas fa-save"></i> Salvar rascunho
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="saveStoryFromEditor('published')">
                        <i class="fas fa-paper-plane"></i> Publicar
                    </button>
                </div>
            </div>
            <div class="content">
                <div class="editor-grid">
                    <!-- Main column -->
                    <div>
                        <input type="hidden" id="storyEditId">

                        <div class="card" style="margin-bottom:20px;">
                            <div class="card-header"><h3><i class="fas fa-building" style="color:var(--primary);margin-right:8px;"></i>Dados da Empresa</h3></div>
                            <div class="card-body">
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                                    <div class="form-group">
                                        <label for="seEmpresa">Empresa *</label>
                                        <input type="text" id="seEmpresa" placeholder="Nome da empresa">
                                    </div>
                                    <div class="form-group">
                                        <label for="seSegmento">Segmento *</label>
                                        <select id="seSegmento">
                                            <option value="">Selecione...</option>
                                            <option value="industria">Indústria</option>
                                            <option value="servicos">Serviços</option>
                                            <option value="tecnologia">Tecnologia</option>
                                            <option value="saude">Saúde</option>
                                            <option value="educacao">Educação</option>
                                            <option value="varejo">Varejo</option>
                                            <option value="financeiro">Financeiro</option>
                                            <option value="agronegocio">Agronegócio</option>
                                            <option value="outro">Outro</option>
                                        </select>
                                    </div>
                                </div>
                                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
                                    <div class="form-group">
                                        <label for="seNome">Nome do contato *</label>
                                        <input type="text" id="seNome" placeholder="Nome completo">
                                    </div>
                                    <div class="form-group">
                                        <label for="seEmail">Email</label>
                                        <input type="email" id="seEmail" placeholder="email@empresa.com">
                                    </div>
                                    <div class="form-group">
                                        <label for="seCargo">Cargo</label>
                                        <input type="text" id="seCargo" placeholder="CEO, Diretor, etc.">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="seTelefone">Telefone</label>
                                    <input type="text" id="seTelefone" placeholder="(00) 00000-0000">
                                </div>
                            </div>
                        </div>

                        <div class="card" style="margin-bottom:20px;">
                            <div class="card-header"><h3><i class="fas fa-pen-nib" style="color:var(--primary);margin-right:8px;"></i>A História</h3></div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="seTitulo">Título da história *</label>
                                    <input type="text" id="seTitulo" placeholder="Ex: Como a Empresa X triplicou sua produtividade">
                                </div>
                                <div class="form-group">
                                    <label for="seDesafio">Qual era o desafio antes da Orbit? *</label>
                                    <textarea id="seDesafio" rows="4" placeholder="Descreva os problemas e desafios enfrentados..."></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="seSolucao">Como a Orbit ajudou a resolver? *</label>
                                    <textarea id="seSolucao" rows="4" placeholder="Descreva como a plataforma foi implementada e usada..."></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="seResultados">Quais resultados foram alcançados? *</label>
                                    <textarea id="seResultados" rows="4" placeholder="Métricas, ganhos, melhorias concretas..."></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="seDepoimento">Depoimento / Citação</label>
                                    <textarea id="seDepoimento" rows="3" placeholder="Uma frase marcante do cliente (opcional)"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar column -->
                    <div>
                        <div class="card" style="margin-bottom:20px;">
                            <div class="card-header"><h3>Logo da empresa</h3></div>
                            <div class="card-body">
                                <div class="image-upload-area" id="seLogoDropZone" style="min-height:100px;">
                                    <input type="file" id="seLogoInput" accept="image/*" onchange="handleStoryLogoUpload(event)">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Arraste ou clique</p>
                                    <span class="upload-hint">JPG, PNG ou WebP (max 2MB)</span>
                                </div>
                                <div class="image-preview" id="seLogoPreview" style="margin-top:8px;"></div>
                                <input type="hidden" id="seLogoData">
                            </div>
                        </div>

                        <div class="card" style="margin-bottom:20px;">
                            <div class="card-header"><h3>Módulos utilizados</h3></div>
                            <div class="card-body">
                                <div style="display:flex;flex-direction:column;gap:10px;">
                                    <label style="display:flex;align-items:center;gap:8px;font-size:0.88rem;cursor:pointer;">
                                        <input type="checkbox" class="se-modulo" value="Processos"> <i class="fas fa-sitemap" style="color:var(--primary);width:18px;"></i> Processos
                                    </label>
                                    <label style="display:flex;align-items:center;gap:8px;font-size:0.88rem;cursor:pointer;">
                                        <input type="checkbox" class="se-modulo" value="Indicadores"> <i class="fas fa-chart-line" style="color:var(--primary);width:18px;"></i> Indicadores
                                    </label>
                                    <label style="display:flex;align-items:center;gap:8px;font-size:0.88rem;cursor:pointer;">
                                        <input type="checkbox" class="se-modulo" value="Tarefas"> <i class="fas fa-tasks" style="color:var(--primary);width:18px;"></i> Tarefas
                                    </label>
                                    <label style="display:flex;align-items:center;gap:8px;font-size:0.88rem;cursor:pointer;">
                                        <input type="checkbox" class="se-modulo" value="Competências"> <i class="fas fa-users" style="color:var(--primary);width:18px;"></i> Competências
                                    </label>
                                    <label style="display:flex;align-items:center;gap:8px;font-size:0.88rem;cursor:pointer;">
                                        <input type="checkbox" class="se-modulo" value="Auditorias"> <i class="fas fa-clipboard-check" style="color:var(--primary);width:18px;"></i> Auditorias
                                    </label>
                                    <label style="display:flex;align-items:center;gap:8px;font-size:0.88rem;cursor:pointer;">
                                        <input type="checkbox" class="se-modulo" value="Orbit IA"> <i class="fas fa-robot" style="color:var(--primary);width:18px;"></i> Orbit IA
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="card" style="margin-bottom:20px;">
                            <div class="card-header"><h3>Redes Sociais</h3></div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="seLinkedin"><i class="fab fa-linkedin" style="color:#0077B5;margin-right:4px;"></i> LinkedIn</label>
                                    <input type="url" id="seLinkedin" placeholder="https://linkedin.com/in/...">
                                </div>
                                <div class="form-group">
                                    <label for="seInstagram"><i class="fab fa-instagram" style="color:#E4405F;margin-right:4px;"></i> Instagram</label>
                                    <input type="url" id="seInstagram" placeholder="https://instagram.com/...">
                                </div>
                                <div class="form-group">
                                    <label for="seWebsite"><i class="fas fa-globe" style="color:var(--info);margin-right:4px;"></i> Website</label>
                                    <input type="url" id="seWebsite" placeholder="https://empresa.com.br">
                                </div>
                            </div>
                        </div>

                        <div class="card" style="margin-bottom:20px;">
                            <div class="card-header"><h3>Fotos</h3></div>
                            <div class="card-body">
                                <div class="image-upload-area" id="sePhotosDropZone" style="min-height:80px;">
                                    <input type="file" id="sePhotosInput" accept="image/*" multiple onchange="handleStoryPhotosUpload(event)">
                                    <i class="fas fa-images"></i>
                                    <p>Até 5 fotos (max 2MB cada)</p>
                                </div>
                                <div id="sePhotosPreview" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;"></div>
                            </div>
                        </div>

                        <div class="card" style="margin-bottom:20px;">
                            <div class="card-header"><h3>Vídeo</h3></div>
                            <div class="card-body">
                                <div class="form-group" style="margin-bottom:0;">
                                    <label for="seVideoUrl">URL YouTube / Vimeo</label>
                                    <input type="url" id="seVideoUrl" placeholder="https://youtube.com/watch?v=...">
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body" style="display:flex;flex-direction:column;gap:8px;">
                                <button class="btn btn-primary" onclick="saveStoryFromEditor('published')" style="width:100%;">
                                    <i class="fas fa-paper-plane"></i> Publicar
                                </button>
                                <button class="btn btn-secondary" onclick="saveStoryFromEditor('pending')" style="width:100%;">
                                    <i class="fas fa-save"></i> Salvar rascunho
                                </button>
                                <button class="btn btn-outline" onclick="showView('stories')" style="width:100%;">
                                    <i class="fas fa-arrow-left"></i> Voltar para lista
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══ STORY DETAIL MODAL ══ -->
        <div class="modal-overlay" id="storyDetailModal" style="padding:20px;" onclick="if(event.target===this)closeStoryDetail()">
            <div class="modal" style="max-width:800px;max-height:90vh;overflow-y:auto;">
                <div class="modal-header">
                    <h3 id="storyDetailTitle">Detalhes da História</h3>
                    <button class="btn btn-ghost" onclick="closeStoryDetail()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" id="storyDetailContent" style="padding:24px 32px;"></div>
                <div class="modal-footer" id="storyDetailFooter"></div>
            </div>
        </div>

        <!-- ══ COMMENTS VIEW ══ -->
        <div class="view" id="view-comments">
            <div class="topbar">
                <h1>Comentários</h1>
            </div>
            <div class="content">
                <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));">
                    <div class="stat-card">
                        <div class="stat-card__label">Pendentes</div>
                        <div class="stat-card__value" style="color:var(--warning);" id="statCommentsPending">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__label">Aprovados</div>
                        <div class="stat-card__value stat-card__value--primary" id="statCommentsApproved">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__label">Rejeitados</div>
                        <div class="stat-card__value" id="statCommentsRejected">0</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body" style="padding:0;">
                        <div class="table-wrapper">
                            <div class="table-responsive"><table>
                                <thead>
                                    <tr>
                                        <th>Autor</th>
                                        <th>Comentário</th>
                                        <th>Artigo</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="commentsTableBody"></tbody>
                            </table></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══ BANNERS VIEW ══ -->
        <div class="view" id="view-banners">
            <div class="topbar">
                <h1>Banners do Site</h1>
                <div class="topbar-actions">
                    <button class="btn btn-primary btn-sm" onclick="openBannerModal()">
                        <i class="fas fa-plus"></i> Novo Banner
                    </button>
                </div>
            </div>
            <div class="content">
                <div class="card">
                    <div class="card-body" style="padding:0;">
                        <div class="table-wrapper">
                            <div class="table-responsive"><table>
                                <thead>
                                    <tr>
                                        <th style="width:70px;">Ativo</th>
                                        <th>Modo</th>
                                        <th>Posicao</th>
                                        <th>Titulo</th>
                                        <th>Periodo</th>
                                        <th style="width:100px;">Acoes</th>
                                    </tr>
                                </thead>
                                <tbody id="bannersTableBody"></tbody>
                            </table></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══ BANNER MODAL ══ -->
        <div class="modal-overlay" id="bannerModal" onclick="if(event.target===this)closeBannerModal()">
            <div class="modal" style="max-width:600px;max-height:90vh;overflow-y:auto;">
                <div class="modal-header">
                    <h3 id="bannerModalTitle">Novo Banner</h3>
                    <button class="btn btn-ghost" onclick="closeBannerModal()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="bnId">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                        <div class="form-group">
                            <label for="bnDisplayMode">Modo de exibicao</label>
                            <select id="bnDisplayMode">
                                <option value="bar">Barra (texto + botao)</option>
                                <option value="image">Imagem (banner visual)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="bnPosition">Posicao no site</label>
                            <select id="bnPosition">
                                <option value="above-header">Acima do header (fixo)</option>
                                <option value="below-header">Abaixo do header</option>
                                <option value="floating-bottom">Flutuante no rodape</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="bnTitle">Titulo</label>
                        <input type="text" id="bnTitle" placeholder="Ex: Live especial hoje as 19h!">
                    </div>
                    <div class="form-group">
                        <label for="bnDescription">Descricao (opcional)</label>
                        <input type="text" id="bnDescription" placeholder="Texto complementar curto">
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                        <div class="form-group">
                            <label for="bnCtaText">Texto do botao</label>
                            <input type="text" id="bnCtaText" placeholder="Ex: Assistir agora">
                        </div>
                        <div class="form-group">
                            <label for="bnCtaUrl">Link do botao</label>
                            <input type="text" id="bnCtaUrl" placeholder="https://...">
                        </div>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                        <div class="form-group">
                            <label for="bnBgColor">Cor de fundo</label>
                            <input type="color" id="bnBgColor" value="#ffba1a" style="width:100%;height:36px;border:1px solid var(--gray-200);border-radius:6px;cursor:pointer;">
                        </div>
                        <div class="form-group">
                            <label for="bnTextColor">Cor do texto</label>
                            <input type="color" id="bnTextColor" value="#0D1117" style="width:100%;height:36px;border:1px solid var(--gray-200);border-radius:6px;cursor:pointer;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="bnDismissible" checked style="margin-right:6px;">Visitante pode fechar o banner (X)</label>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                        <div class="form-group">
                            <label for="bnStartDate">Data inicio (opcional)</label>
                            <input type="datetime-local" id="bnStartDate">
                            <div class="hint">Vazio = ativo imediatamente</div>
                        </div>
                        <div class="form-group">
                            <label for="bnEndDate">Data fim (opcional)</label>
                            <input type="datetime-local" id="bnEndDate">
                            <div class="hint">Vazio = sem expiracao</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="bnPriority">Prioridade</label>
                        <input type="number" id="bnPriority" value="0" min="0" max="100">
                        <div class="hint">Maior numero = aparece primeiro</div>
                    </div>
                    <div class="form-group" id="bnImageGroup">
                        <label>Imagem do banner</label>
                        <div class="image-upload-area" id="bnImageDropZone" style="min-height:120px;">
                            <input type="file" id="bnImageFileInput" accept="image/*" onchange="handleBnImageUpload(event)">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Arraste uma imagem ou clique para selecionar</p>
                            <span class="upload-hint">JPG, PNG ou WebP (max 2MB)</span>
                        </div>
                        <div class="image-preview" id="bnImagePreview" style="margin-top:8px;"></div>
                        <input type="hidden" id="bnImageData">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeBannerModal()">Cancelar</button>
                    <button class="btn btn-primary" onclick="saveBanner()">Salvar</button>
                </div>
            </div>
        </div>

        <!-- ══ USERS VIEW (ADMIN ONLY) ══ -->
        <div class="view" id="view-users">
            <div class="topbar">
                <h1>Usuarios</h1>
                <div class="topbar-actions">
                    <button class="btn btn-primary btn-sm" onclick="openUserModal()">
                        <i class="fas fa-user-plus"></i> Novo Usuario
                    </button>
                </div>
            </div>
            <div class="content">
                <div class="card">
                    <div class="card-body" style="padding:0;">
                        <div class="table-wrapper">
                            <div class="table-responsive"><table>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>Perfil</th>
                                        <th>Status</th>
                                        <th>Acoes</th>
                                    </tr>
                                </thead>
                                <tbody id="usersTableBody"></tbody>
                            </table></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- MOBILE SIDEBAR TOGGLE -->
    <button class="mobile-sidebar-toggle" onclick="toggleSidebar()">
        <i class="fas fa-bars"></i>
    </button>

    <!-- USER MODAL -->
    <div class="modal-overlay" id="userModal">
        <div class="modal">
            <div class="modal-header">
                <h3 id="userModalTitle">Novo Usuario</h3>
                <button class="modal-close" onclick="closeUserModal()">&times;</button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="modalUserId">
                <div class="form-group">
                    <label for="modalUserName">Nome completo *</label>
                    <input type="text" id="modalUserName" placeholder="Nome do usuario">
                </div>
                <div class="form-group">
                    <label for="modalUserEmail">E-mail *</label>
                    <input type="email" id="modalUserEmail" placeholder="email@empresa.com">
                </div>
                <div class="form-group">
                    <label for="modalUserPassword">Senha *</label>
                    <input type="password" id="modalUserPassword" placeholder="Minimo 6 caracteres">
                    <div class="hint" id="passwordHint">Obrigatorio para novos usuarios</div>
                </div>
                <div class="form-group">
                    <label for="modalUserRole">Perfil *</label>
                    <select id="modalUserRole">
                        <option value="editor">Editor</option>
                        <option value="admin">Admin Full</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeUserModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="saveUser()">Salvar</button>
            </div>
        </div>
    </div>

    <!-- DELETE CONFIRM MODAL -->
    <div class="modal-overlay" id="deleteModal">
        <div class="modal">
            <div class="modal-header">
                <h3>Confirmar exclusao</h3>
                <button class="modal-close" onclick="closeDeleteModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p id="deleteMessage">Tem certeza que deseja excluir?</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeDeleteModal()">Cancelar</button>
                <button class="btn btn-danger" id="deleteConfirmBtn">Excluir</button>
            </div>
        </div>
    </div>

    <!-- PREVIEW MODAL -->
    <div class="modal-overlay" id="previewModal" style="padding:20px;">
        <div class="modal" style="max-width:800px;max-height:90vh;overflow-y:auto;">
            <div class="modal-header">
                <h3>Pre-visualizacao</h3>
                <button class="modal-close" onclick="document.getElementById('previewModal').classList.remove('active')">&times;</button>
            </div>
            <div class="modal-body" id="previewContent" style="padding:24px 32px;"></div>
        </div>
    </div>

    <!-- TOAST CONTAINER -->
    <div class="toast-container" id="toastContainer"></div>

    <script>
    // Mobile menu, header scroll, dropdowns handled by PageLayout.tsx

    // ═══════════════════════════════════════
    // ORBIT CMS - Admin Panel
    // ═══════════════════════════════════════

    const STORAGE_KEY = 'orbit_cms';
    const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';
    const CATEGORIES = {
        estrategica: 'Gestao Estrategica',
        'planejamento-estrategico': 'Planejamento Estrategico',
        processos: 'Processos',
        indicadores: 'Indicadores',
        lideranca: 'Lideranca',
        ia: 'IA & Inovacao',
        marketing: 'Marketing',
        growth: 'Growth',
        outros: 'Outros'
    };

    // ── Auth Check (Supabase) ──
    function getSession() {
        try { return JSON.parse(localStorage.getItem('orbit_supabase_session')) || null; }
        catch(e) { return null; }
    }

    function saveSession(s) {
        localStorage.setItem('orbit_supabase_session', JSON.stringify(s));
    }

    // Auto-refresh token if expired (Supabase JWT lasts 1h)
    async function refreshToken() {
        if (!session || !session.refresh_token) return false;
        try {
            var res = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=refresh_token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY },
                body: JSON.stringify({ refresh_token: session.refresh_token })
            });
            if (!res.ok) return false;
            var data = await res.json();
            if (data.access_token) {
                session.access_token = data.access_token;
                session.refresh_token = data.refresh_token || session.refresh_token;
                saveSession(session);
                return true;
            }
        } catch(e) { console.error('Token refresh failed:', e); }
        return false;
    }

    // Helper: make authenticated Supabase request with auto-refresh
    async function supaFetch(url, options) {
        var opts = Object.assign({}, options);
        opts.headers = Object.assign({}, opts.headers, {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + session.access_token
        });
        var res = await fetch(url, opts);
        if (res.status === 401 && session.refresh_token) {
            var refreshed = await refreshToken();
            if (refreshed) {
                opts.headers['Authorization'] = 'Bearer ' + session.access_token;
                res = await fetch(url, opts);
            }
        }
        return res;
    }

    var session = getSession();
    if (!session || !session.access_token) {
        window.location.href = '/acesso';
    }

    // Refresh token on load (proactive)
    if (session && session.refresh_token) {
        refreshToken();
    }

    // ── DB ──
    function getDB() {
        try {
            const db = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { users: [], articles: [], leadMagnets: [], customerStories: [], version: 1 };
            if (!db.leadMagnets) db.leadMagnets = [];
            if (!db.customerStories) db.customerStories = [];
            return db;
        }
        catch(e) { return { users: [], articles: [], leadMagnets: [], customerStories: [], version: 1 }; }
    }

    function setDB(db) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    }

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + '_orbit_salt_2024');
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // ── Init UI ──
    async function initUI() {
        if (!session) return;

        var initials = session.name.split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
        document.getElementById('userAvatar').textContent = initials;
        document.getElementById('userName').textContent = session.name;
        document.getElementById('userRole').textContent = session.role === 'admin' ? 'Admin Full' : 'Editor';

        // Show users nav for admins only
        if (session.role === 'admin') {
            document.getElementById('navUsers').style.display = 'flex';
        }

        // Load data from Supabase
        await refreshArticles();
        await refreshUsers();
        await refreshLeadMagnets();
        refreshStories();
        refreshDashboard();

        // Populate category dropdown with categories from existing articles
        var existingCats = {};
        supabaseArticles.forEach(function(a) {
            if (a.category && !CATEGORIES[a.category]) existingCats[a.category] = a.category;
        });
        var catSelect = document.getElementById('articleCategory');
        var customOpt = catSelect ? catSelect.querySelector('option[value="__custom__"]') : null;
        Object.keys(existingCats).forEach(function(cat) {
            CATEGORIES[cat] = cat.charAt(0).toUpperCase() + cat.slice(1);
            var opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = CATEGORIES[cat];
            if (customOpt) catSelect.insertBefore(opt, customOpt);
        });
    }

    // ── Navigation ──
    function showView(viewName) {
        // Check permission
        if (viewName === 'users' && session.role !== 'admin') {
            toast('Acesso restrito a administradores.', 'error');
            return;
        }

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));

        const view = document.getElementById('view-' + viewName);
        if (view) view.classList.add('active');

        const navLink = document.querySelector('.sidebar-nav a[data-view="' + viewName + '"]');
        if (navLink) navLink.classList.add('active');

        // Refresh data
        if (viewName === 'dashboard') refreshDashboard();
        if (viewName === 'articles') refreshArticles();
        if (viewName === 'users') refreshUsers();
        if (viewName === 'leadmagnets') refreshLeadMagnets();
        if (viewName === 'stories') refreshStories();
        if (viewName === 'comments') refreshComments();
        if (viewName === 'banners') refreshBanners();
        if (viewName === 'storyeditor') {
            if (!document.getElementById('storyEditId').value) {
                clearStoryEditor();
            }
        }
        if (viewName === 'editor') {
            populateLeadMagnetDropdown();
            // Only clear if not editing
            if (!document.getElementById('articleId').value) {
                clearEditor();
            }
        }

        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('open');
    }

    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
    }

    // ── Toast ──
    function toast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const el = document.createElement('div');
        el.className = 'toast toast--' + type;
        const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        el.innerHTML = '<i class="fas ' + icon + '" style="color:var(--' + type + ')"></i> ' + message;
        container.appendChild(el);
        setTimeout(() => { el.remove(); }, 3500);
    }

    // ── Logout ──
    function logout() {
        localStorage.removeItem('orbit_supabase_session');
        window.location.href = '/acesso';
    }

    // ═══ DASHBOARD ═══
    function refreshDashboard() {
        var articles = supabaseArticles || [];
        var published = articles.filter(function(a) { return a.published; });
        var drafts = articles.filter(function(a) { return !a.published; });

        document.getElementById('statTotal').textContent = articles.length;
        document.getElementById('statPublished').textContent = published.length;
        document.getElementById('statDrafts').textContent = drafts.length;
        document.getElementById('statUsers').textContent = (supabaseUsers || []).length;
        document.getElementById('statPendingStories').textContent = (supabaseStories || []).filter(function(s) { return s.status === 'pending'; }).length;

        var tbody = document.getElementById('dashboardArticles');
        var emptyEl = document.getElementById('dashboardEmpty');

        if (articles.length === 0) {
            tbody.innerHTML = '';
            emptyEl.style.display = 'block';
            return;
        }

        emptyEl.style.display = 'none';
        var recent = articles.slice(0, 5);

        tbody.innerHTML = recent.map(function(a) {
            var thumb = a.cover_url || 'https://placehold.co/48x36/0D1117/ffba1a?text=.';
            var statusLabel = a.published ? 'Publicado' : 'Rascunho';
            var statusClass = a.published ? 'published' : 'draft';
            return '<tr>' +
                '<td><div class="article-title-cell"><img class="article-thumb" src="' + escapeHtml(thumb) + '" alt=""><span>' + escapeHtml(a.title) + '</span></div></td>' +
                '<td>' + (CATEGORIES[a.category] || a.category) + '</td>' +
                '<td><span class="badge badge-' + statusClass + '">' + statusLabel + '</span></td>' +
                '<td>' + formatDate(a.updated_at) + '</td>' +
                '<td><div class="actions-cell">' +
                    '<button class="btn btn-secondary btn-icon btn-sm" onclick="viewArticle(' + a.id + ')" title="Visualizar"><i class="fas fa-eye"></i></button>' +
                    '<button class="btn btn-secondary btn-icon btn-sm" onclick="editArticle(' + a.id + ')" title="Editar"><i class="fas fa-edit"></i></button>' +
                '</div></td>' +
            '</tr>';
        }).join('');
    }

    // ═══ ARTICLES LIST ═══
    var supabaseArticles = [];
    var supabaseLeadMagnets = [];
    var supabaseStories = [];

    async function refreshArticles() {
        try {
            var res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles?order=updated_at.desc', {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token }
            });
            if (res.ok) supabaseArticles = await res.json();
        } catch(e) { supabaseArticles = []; }

        var tbody = document.getElementById('articlesTableBody');
        var emptyEl = document.getElementById('articlesEmpty');

        if (supabaseArticles.length === 0) {
            tbody.innerHTML = '';
            emptyEl.style.display = 'block';
            return;
        }

        emptyEl.style.display = 'none';

        tbody.innerHTML = supabaseArticles.map(function(a) {
            var thumb = a.cover_url || 'https://placehold.co/48x36/0D1117/ffba1a?text=.';
            var statusLabel = a.published ? 'Publicado' : 'Rascunho';
            var statusClass = a.published ? 'published' : 'draft';
            return '<tr>' +
                '<td><div class="article-title-cell"><img class="article-thumb" src="' + escapeHtml(thumb) + '" alt=""><span>' + escapeHtml(a.title) + '</span></div></td>' +
                '<td>' + escapeHtml(a.author) + '</td>' +
                '<td>' + (CATEGORIES[a.category] || a.category) + '</td>' +
                '<td><span class="badge badge-' + statusClass + '">' + statusLabel + '</span></td>' +
                '<td>' + formatDate(a.updated_at) + '</td>' +
                '<td><div class="actions-cell">' +
                    '<button class="btn btn-secondary btn-icon btn-sm" onclick="editArticle(' + a.id + ')" title="Editar"><i class="fas fa-edit"></i></button>' +
                    '<button class="btn btn-danger btn-icon btn-sm" onclick="confirmDeleteArticle(' + a.id + ')" title="Excluir"><i class="fas fa-trash"></i></button>' +
                '</div></td>' +
            '</tr>';
        }).join('');
    }

    // ═══ EDITOR ═══
    function newArticle() {
        document.getElementById('articleId').value = '';
        clearEditor();
        showView('editor');
    }

    function clearEditor() {
        document.getElementById('articleId').value = '';
        document.getElementById('articleTitleInput').value = '';
        document.getElementById('articleSlug').value = '';
        document.getElementById('slugPreview').textContent = 'titulo-do-artigo';
        document.getElementById('richEditor').innerHTML = '<p>Comece a escrever seu artigo aqui...</p>';
        document.getElementById('articleCategory').value = '';
        document.getElementById('articleAuthor').value = session.name;
        document.getElementById('authorAvatarData').value = '';
        document.getElementById('authorAvatarPreview').innerHTML = '<i class="fas fa-user" style="color:var(--gray-400);"></i>';
        updateReadTime();
        document.getElementById('articleMetaDesc').value = '';
        document.getElementById('metaCharCount').textContent = '0';
        document.getElementById('articleImageUrl').value = '';
        document.getElementById('articleImageData').value = '';
        document.getElementById('featuredImagePreview').innerHTML = '';
        document.getElementById('editorTitle').textContent = 'Novo Artigo';
        // SEO fields
        document.getElementById('seoTitle').value = '';
        document.getElementById('seoTitleCount').textContent = '0';
        document.getElementById('seoCanonical').value = '';
        document.getElementById('seoKeyword').value = '';
        document.getElementById('seoOgImage').value = '';
        populateLeadMagnetDropdown();
        document.getElementById('leadMagnetSelect').value = '';
        document.getElementById('ctaBannerEnabled').value = '0';
        document.getElementById('ctaBannerTitle').value = '';
        document.getElementById('ctaBannerDesc').value = '';
        document.getElementById('ctaBannerCtaText').value = 'Agendar demonstração';
        document.getElementById('ctaBannerCtaUrl').value = '/#contato-form';
        document.getElementById('ctaBannerImageData').value = '';
        document.getElementById('ctaBannerImagePreview').innerHTML = '';
        updateSeoScore();
    }

    function editArticle(id) {
        var article = supabaseArticles.find(function(a) { return a.id === id || a.id === Number(id); });
        if (!article) return;

        document.getElementById('articleId').value = article.id;
        document.getElementById('articleTitleInput').value = article.title;
        document.getElementById('articleSlug').value = article.slug;
        document.getElementById('slugPreview').textContent = article.slug;
        document.getElementById('richEditor').innerHTML = article.content || '';
        document.getElementById('articleCategory').value = article.category;
        document.getElementById('articleAuthor').value = article.author || '';
        document.getElementById('authorAvatarData').value = article.author_avatar || '';
        if (article.author_avatar) {
            document.getElementById('authorAvatarPreview').innerHTML = '<img src="' + article.author_avatar + '" style="width:100%;height:100%;object-fit:cover;">';
        } else {
            document.getElementById('authorAvatarPreview').innerHTML = '<i class="fas fa-user" style="color:var(--gray-400);"></i>';
        }
        updateReadTime();
        document.getElementById('articleMetaDesc').value = article.excerpt || '';
        document.getElementById('metaCharCount').textContent = (article.excerpt || '').length;
        document.getElementById('articleImageUrl').value = article.cover_url || '';
        document.getElementById('articleImageData').value = '';
        document.getElementById('editorTitle').textContent = 'Editar Artigo';
        // SEO fields (snake_case from Supabase)
        document.getElementById('seoTitle').value = article.seo_title || '';
        document.getElementById('seoTitleCount').textContent = (article.seo_title || '').length;
        document.getElementById('seoCanonical').value = article.seo_canonical || '';
        document.getElementById('seoKeyword').value = article.seo_keyword || '';
        document.getElementById('seoOgImage').value = article.seo_og_image || '';
        // Lead magnet dropdown
        populateLeadMagnetDropdown();
        document.getElementById('leadMagnetSelect').value = article.lead_magnet_id || '';
        // CTA banner (snake_case from Supabase)
        document.getElementById('ctaBannerEnabled').value = article.cta_banner_enabled ? '1' : '0';
        document.getElementById('ctaBannerTitle').value = article.cta_banner_title || '';
        document.getElementById('ctaBannerDesc').value = article.cta_banner_desc || '';
        document.getElementById('ctaBannerCtaText').value = article.cta_banner_cta_text || 'Agendar demonstração';
        document.getElementById('ctaBannerCtaUrl').value = article.cta_banner_cta_url || '/#contato-form';
        document.getElementById('ctaBannerImageData').value = article.cta_banner_image || '';
        if (article.cta_banner_image) {
            document.getElementById('ctaBannerImagePreview').innerHTML = '<img src="' + article.cta_banner_image + '" style="max-width:100%;border-radius:8px;">';
        } else {
            document.getElementById('ctaBannerImagePreview').innerHTML = '';
        }
        previewFeaturedImage();
        updateSeoScore();

        showView('editor');
    }

    async function duplicateArticle(id) {
        var article = supabaseArticles.find(function(a) { return a.id === id || a.id === Number(id); });
        if (!article) return;

        try {
            var res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + session.access_token,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    title: article.title + ' (copia)',
                    slug: article.slug + '-copia-' + Date.now(),
                    content: article.content,
                    excerpt: article.excerpt,
                    cover_url: article.cover_url,
                    category: article.category,
                    author: article.author,
                    published: false,
                    published_at: null
                })
            });
            if (res.ok) {
                await refreshArticles();
                refreshDashboard();
                toast('Artigo duplicado como rascunho.');
            } else { toast('Erro ao duplicar.', 'error'); }
        } catch(e) { toast('Erro ao duplicar.', 'error'); }
    }

    function generateSlug() {
        const title = document.getElementById('articleTitleInput').value;
        const slug = title
            .toLowerCase()
            .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
            .replace(/[^a-z0-9\\s-]/g, '')
            .replace(/\\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 200);
        document.getElementById('articleSlug').value = slug;
        document.getElementById('slugPreview').textContent = slug || 'titulo-do-artigo';
    }

    async function saveArticle(status) {
        var title = document.getElementById('articleTitleInput').value.trim();
        var slug = document.getElementById('articleSlug').value.trim();
        var content = document.getElementById('richEditor').innerHTML;
        var category = document.getElementById('articleCategory').value;
        if (category === '__custom__') {
            category = document.getElementById('customCategoryInput').value.trim().toLowerCase()
                .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            if (!category) { toast('Informe o nome da categoria.', 'error'); return; }
            // Add to CATEGORIES map and dropdown for future use
            var label = document.getElementById('customCategoryInput').value.trim();
            CATEGORIES[category] = label;
            var opt = document.createElement('option');
            opt.value = category;
            opt.textContent = label;
            document.getElementById('articleCategory').insertBefore(opt, document.querySelector('#articleCategory option[value="__custom__"]'));
            document.getElementById('articleCategory').value = category;
            document.getElementById('customCategoryWrapper').style.display = 'none';
        }
        var author = document.getElementById('articleAuthor').value.trim() || session.name;
        var metaDesc = document.getElementById('articleMetaDesc').value.trim();
        var imageUrl = document.getElementById('articleImageUrl').value.trim();
        var imageData = document.getElementById('articleImageData').value;
        var articleId = document.getElementById('articleId').value;

        if (!title) { toast('Informe o titulo do artigo.', 'error'); return; }
        if (!category) { toast('Selecione uma categoria.', 'error'); return; }
        if (!content || content === '<p>Comece a escrever seu artigo aqui...</p>') {
            toast('Escreva o conteudo do artigo.', 'error'); return;
        }

        var now = new Date().toISOString();
        var finalSlug = slug || generateSlugFromTitle(title);
        var coverUrl = imageData || imageUrl || '';
        var isPublished = status === 'published';

        var leadMagnetId = document.getElementById('leadMagnetSelect').value || null;
        var ctaBannerEnabled = document.getElementById('ctaBannerEnabled').value === '1';
        var ctaBannerTitle = document.getElementById('ctaBannerTitle').value.trim();
        var ctaBannerDesc = document.getElementById('ctaBannerDesc').value.trim();
        var ctaBannerCtaText = document.getElementById('ctaBannerCtaText').value.trim();
        var ctaBannerCtaUrl = document.getElementById('ctaBannerCtaUrl').value.trim();
        var ctaBannerImage = document.getElementById('ctaBannerImageData').value;
        var seoTitleVal = document.getElementById('seoTitle').value.trim();
        var seoCanonical = document.getElementById('seoCanonical').value.trim();
        var seoKeyword = document.getElementById('seoKeyword').value.trim();
        var seoOgImage = document.getElementById('seoOgImage').value.trim();

        var articleData = {
            title: title,
            slug: finalSlug,
            content: content,
            excerpt: metaDesc || null,
            cover_url: coverUrl || null,
            category: category,
            author: author,
            published: isPublished,
            published_at: isPublished ? now : null,
            updated_at: now,
            author_avatar: document.getElementById('authorAvatarData').value || null,
            lead_magnet_id: leadMagnetId ? Number(leadMagnetId) : null,
            cta_banner_enabled: ctaBannerEnabled,
            cta_banner_title: ctaBannerTitle || null,
            cta_banner_desc: ctaBannerDesc || null,
            cta_banner_cta_text: ctaBannerCtaText || 'Agendar demonstração',
            cta_banner_cta_url: ctaBannerCtaUrl || '/#contato-form',
            cta_banner_image: ctaBannerImage || null,
            seo_title: seoTitleVal || null,
            seo_canonical: seoCanonical || null,
            seo_keyword: seoKeyword || null,
            seo_og_image: seoOgImage || null
        };

        try {
            var res;
            if (articleId) {
                // Update existing
                res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles?id=eq.' + articleId, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
                    body: JSON.stringify(articleData)
                });
            } else {
                // Create new
                res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
                    body: JSON.stringify(articleData)
                });
            }

            if (!res.ok) {
                var err = await res.text();
                console.error('Supabase error:', res.status, err);
                if (res.status === 401 || res.status === 403) {
                    toast('Sessao expirada. Faca login novamente.', 'error');
                    setTimeout(function() { window.location.href = '/acesso'; }, 2000);
                } else {
                    toast('Erro ao salvar: ' + (err || res.status), 'error');
                }
                return;
            }

            toast(isPublished ? 'Artigo publicado!' : 'Rascunho salvo!');
            clearEditor();
            showView('articles');
        } catch(e) {
            console.error(e);
            toast('Erro ao salvar artigo.', 'error');
        }
    }

    function generateSlugFromTitle(title) {
        return title
            .toLowerCase()
            .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
            .replace(/[^a-z0-9\\s-]/g, '')
            .replace(/\\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 200);
    }

    // Rich text commands
    function execCmd(cmd, value) {
        document.getElementById('richEditor').focus();
        document.execCommand(cmd, false, value || null);
    }

    function insertBlockquote() {
        execCmd('formatBlock', '<blockquote>');
    }

    function insertLink() {
        const url = prompt('URL do link:');
        if (url) execCmd('createLink', url);
    }

    function insertImage() {
        const url = prompt('URL da imagem:');
        if (url) execCmd('insertImage', url);
    }

    function insertImageFromFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) {
                toast('Imagem muito grande. Max 2MB.', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onload = (ev) => {
                const editor = document.getElementById('richEditor');
                editor.focus();
                document.execCommand('insertImage', false, ev.target.result);
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    // ── Image Upload ──
    function switchImageTab(tab) {
        document.querySelectorAll('.image-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.image-tab-content').forEach(c => c.classList.remove('active'));
        if (tab === 'upload') {
            document.querySelector('.image-tab:first-child').classList.add('active');
            document.getElementById('imageTabUpload').classList.add('active');
        } else {
            document.querySelector('.image-tab:last-child').classList.add('active');
            document.getElementById('imageTabUrl').classList.add('active');
        }
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            toast('Imagem muito grande. Maximo 2MB.', 'error');
            return;
        }
        if (!file.type.startsWith('image/')) {
            toast('Selecione um arquivo de imagem.', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('articleImageData').value = e.target.result;
            showImagePreview(e.target.result);
            updateSeoScore();
        };
        reader.readAsDataURL(file);
    }

    // Drag & drop
    const dropZone = document.getElementById('imageDropZone');
    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                const fakeEvent = { target: { files: [file] } };
                handleImageUpload(fakeEvent);
            }
        });
    }

    function showImagePreview(src) {
        const container = document.getElementById('featuredImagePreview');
        container.innerHTML = '<img src="' + src + '" alt="Preview">' +
            '<button class="remove-image" onclick="removeImage()" title="Remover imagem">' +
                '<i class="fas fa-times"></i>' +
            '</button>';
    }

    function removeImage() {
        document.getElementById('articleImageData').value = '';
        document.getElementById('articleImageUrl').value = '';
        document.getElementById('featuredImagePreview').innerHTML = '';
        const fileInput = document.getElementById('imageFileInput');
        if (fileInput) fileInput.value = '';
        updateSeoScore();
    }

    function previewFeaturedImage() {
        const url = document.getElementById('articleImageUrl').value.trim();
        if (url) {
            document.getElementById('articleImageData').value = '';
            showImagePreview(url);
        } else {
            const data = document.getElementById('articleImageData').value;
            if (!data) document.getElementById('featuredImagePreview').innerHTML = '';
        }
        updateSeoScore();
    }

    // ══ LEAD MAGNETS CRUD ══
    const LEAD_TYPE_LABELS = { ebook: 'Ebook', checklist: 'Checklist', planilha: 'Planilha', webinar: 'Webinar', trial: 'Trial Gratuito' };

    async function refreshLeadMagnets() {
        try {
            var res = await supaFetch(SUPABASE_URL + '/rest/v1/lead_magnets?order=created_at.desc', {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token }
            });
            supabaseLeadMagnets = res.ok ? await res.json() : [];
        } catch(e) {
            supabaseLeadMagnets = [];
            console.error('Erro ao carregar lead magnets:', e);
        }

        var tbody = document.getElementById('leadMagnetsTableBody');
        if (!tbody) return;
        if (supabaseLeadMagnets.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--gray-500);">Nenhuma isca cadastrada. Clique em "Nova Isca" para criar.</td></tr>';
            return;
        }
        tbody.innerHTML = supabaseLeadMagnets.map(function(lm) {
            return '<tr>' +
                '<td><span style="background:rgba(255,186,26,0.15);color:var(--primary);padding:4px 10px;border-radius:20px;font-size:0.78rem;font-weight:500;">' + escapeHtml(LEAD_TYPE_LABELS[lm.type] || lm.type) + '</span></td>' +
                '<td><strong>' + escapeHtml(lm.title) + '</strong></td>' +
                '<td style="color:var(--gray-500);font-size:0.85rem;">' + escapeHtml(lm.description || '-') + '</td>' +
                '<td style="font-size:0.85rem;">' + escapeHtml(lm.cta_text || 'Baixar agora') + '</td>' +
                '<td>' +
                    '<div style="display:flex;gap:4px;">' +
                        '<button class="btn btn-secondary btn-icon btn-sm" onclick="editLeadMagnet(' + lm.id + ')" title="Editar"><i class="fas fa-pen"></i></button>' +
                        '<button class="btn btn-danger btn-icon btn-sm" onclick="deleteLeadMagnet(' + lm.id + ')" title="Excluir"><i class="fas fa-trash"></i></button>' +
                    '</div>' +
                '</td>' +
            '</tr>';
        }).join('');

        // Always update dropdown when lead magnets are refreshed
        populateLeadMagnetDropdown();
    }

    function openLeadMagnetModal(id) {
        document.getElementById('lmId').value = '';
        document.getElementById('lmType').value = 'ebook';
        document.getElementById('lmTitle').value = '';
        document.getElementById('lmDesc').value = '';
        document.getElementById('lmCta').value = 'Baixar agora';
        document.getElementById('lmUrl').value = '';
        document.getElementById('lmEvent').value = '';
        document.getElementById('lmImageData').value = '';
        document.getElementById('lmImagePreview').innerHTML = '';
        document.getElementById('leadMagnetModalTitle').textContent = 'Nova Isca Digital';
        document.getElementById('leadMagnetModal').classList.add('active');
    }

    function closeLeadMagnetModal() {
        document.getElementById('leadMagnetModal').classList.remove('active');
    }

    function editLeadMagnet(id) {
        var lm = supabaseLeadMagnets.find(function(l) { return l.id === id || l.id === Number(id); });
        if (!lm) return;
        document.getElementById('lmId').value = lm.id;
        document.getElementById('lmType').value = lm.type || 'ebook';
        document.getElementById('lmTitle').value = lm.title || '';
        document.getElementById('lmDesc').value = lm.description || '';
        document.getElementById('lmCta').value = lm.cta_text || 'Baixar agora';
        document.getElementById('lmUrl').value = lm.cta_url || '';
        document.getElementById('lmEvent').value = lm.file_url || '';
        document.getElementById('lmImageData').value = lm.cover_url || '';
        document.getElementById('lmImagePreview').innerHTML = lm.cover_url ? '<img src="' + escapeHtml(lm.cover_url) + '" style="max-width:100%;border-radius:8px;">' : '';
        document.getElementById('leadMagnetModalTitle').textContent = 'Editar Isca Digital';
        document.getElementById('leadMagnetModal').classList.add('active');
    }

    function saveLeadMagnet() {
        var title = document.getElementById('lmTitle').value.trim();
        if (!title) { toast('Informe o titulo da isca.', 'error'); return; }
        var id = document.getElementById('lmId').value;
        var payload = {
            type: document.getElementById('lmType').value,
            title: title,
            description: document.getElementById('lmDesc').value.trim(),
            cta_text: document.getElementById('lmCta').value.trim() || 'Baixar agora',
            cta_url: document.getElementById('lmUrl').value.trim(),
            file_url: document.getElementById('lmEvent').value.trim(),
            cover_url: document.getElementById('lmImageData').value,
            active: true,
            updated_at: new Date().toISOString()
        };

        var url = SUPABASE_URL + '/rest/v1/lead_magnets';
        var method = 'POST';
        var headers = {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + session.access_token,
            'Prefer': 'return=minimal'
        };

        if (id) {
            url = url + '?id=eq.' + id;
            method = 'PATCH';
        }

        supaFetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
            body: JSON.stringify(payload)
        }).then(function(res) {
            if (!res.ok) throw new Error('Erro ao salvar');
            closeLeadMagnetModal();
            refreshLeadMagnets();
            toast('Isca salva!');
        }).catch(function(e) {
            toast('Erro ao salvar isca: ' + e.message, 'error');
        });
    }

    function deleteLeadMagnet(id) {
        if (!confirm('Excluir esta isca digital?')) return;
        supaFetch(SUPABASE_URL + '/rest/v1/lead_magnets?id=eq.' + id, {
            method: 'DELETE',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + session.access_token
            }
        }).then(function(res) {
            if (!res.ok) throw new Error('Erro ao excluir');
            refreshLeadMagnets();
            toast('Isca excluida.');
        }).catch(function(e) {
            toast('Erro ao excluir isca.', 'error');
        });
    }

    function populateLeadMagnetDropdown() {
        var select = document.getElementById('leadMagnetSelect');
        if (!select) return;
        var currentVal = select.value;
        select.innerHTML = '<option value="">Nenhuma (desativado)</option>' +
            supabaseLeadMagnets.map(function(lm) {
                return '<option value="' + lm.id + '">' + escapeHtml(LEAD_TYPE_LABELS[lm.type] || lm.type) + ' - ' + escapeHtml(lm.title) + '</option>';
            }).join('');
        select.value = currentVal;
    }

    // Lead Magnet modal image upload
    function handleLmImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { toast('Imagem muito grande. Max 2MB.', 'error'); return; }
        if (!file.type.startsWith('image/')) { toast('Selecione um arquivo de imagem.', 'error'); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('lmImageData').value = e.target.result;
            document.getElementById('lmImagePreview').innerHTML = '<img src="' + e.target.result + '" style="max-width:100%;border-radius:8px;">';
        };
        reader.readAsDataURL(file);
    }

    // Lead Magnet modal drag & drop
    const lmDropZone = document.getElementById('lmImageDropZone');
    if (lmDropZone) {
        lmDropZone.addEventListener('dragover', (e) => { e.preventDefault(); lmDropZone.classList.add('dragover'); });
        lmDropZone.addEventListener('dragleave', () => { lmDropZone.classList.remove('dragover'); });
        lmDropZone.addEventListener('drop', (e) => {
            e.preventDefault(); lmDropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) handleLmImageUpload({ target: { files: [file] } });
        });
    }

    // ══ AUTHOR AVATAR UPLOAD ══
    // ══ AI IMAGE GENERATION ══
    // Modelo: google/gemini-2.5-flash-image via OpenRouter
    // Prompt template: Orbit corporate cinematic style
    // Aspect ratios: 16:9 (blog), 1:1 (feed), 9:16 (stories)
    var OPENROUTER_KEY = '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';

    var AI_ASPECT_RATIOS = {
        '16:9': { w: 1200, h: 675, label: '16:9 (Blog/Vídeo)' },
        '1:1':  { w: 1080, h: 1080, label: '1:1 (Feed)' },
        '9:16': { w: 675, h: 1200, label: '9:16 (Stories/Reels)' }
    };

    function buildImagePrompt(userPrompt, orientation) {
        return userPrompt + ', ' + orientation + ', cinematic 8K, dark background #0D1117, gold #D4A017 accent light, depth of field, volumetric lighting, Sony A7IV 35mm f1.4, corporate premium, no text no watermark, rich detail texture';
    }

    async function autoGeneratePrompt() {
        var title = document.getElementById('articleTitleInput').value.trim();
        var category = document.getElementById('articleCategory').value;
        if (!title) { toast('Preencha o título primeiro.', 'error'); return; }

        var status = document.getElementById('aiImageStatus');
        status.style.display = 'block';
        status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando prompt com IA...';

        try {
            var res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + OPENROUTER_KEY,
                    'HTTP-Referer': 'https://orbitgestao.com.br'
                },
                body: JSON.stringify({
                    model: 'google/gemini-2.0-flash-001',
                    messages: [{
                        role: 'user',
                        content: 'Você é um diretor de arte. Crie uma descrição visual curta (2 frases em inglês) para uma imagem de capa de artigo de blog. O artigo é: "' + title + '" (categoria: ' + (category || 'gestão empresarial') + '). A imagem deve representar visualmente o conceito do artigo de forma metafórica e sofisticada. Foque na CENA, não em texto. Responda APENAS a descrição visual, nada mais.'
                    }],
                    max_tokens: 150
                })
            });
            var data = await res.json();
            var prompt = data.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
            document.getElementById('aiImagePrompt').value = prompt;
            status.innerHTML = '<i class="fas fa-check" style="color:var(--success);"></i> Prompt gerado! Clique em "Gerar"';
        } catch(e) {
            status.innerHTML = '<i class="fas fa-exclamation-circle" style="color:var(--error);"></i> Erro ao gerar prompt';
            console.error(e);
        }
    }

    async function generateAIImage() {
        var prompt = document.getElementById('aiImagePrompt').value.trim();
        if (!prompt) { toast('Digite ou gere um prompt primeiro.', 'error'); return; }

        var btn = document.getElementById('aiImageBtn');
        var status = document.getElementById('aiImageStatus');
        var ratioSelect = document.getElementById('aiAspectRatio');
        var ratio = ratioSelect ? ratioSelect.value : '16:9';
        var dims = AI_ASPECT_RATIOS[ratio] || AI_ASPECT_RATIOS['16:9'];
        var orientation = ratio === '9:16' ? 'Vertical portrait' : ratio === '1:1' ? 'Square format' : 'Horizontal landscape';

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando...';
        status.style.display = 'block';
        status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando imagem com Gemini... (15-30s)';

        try {
            var fullPrompt = buildImagePrompt(prompt, orientation);

            var res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + OPENROUTER_KEY,
                    'HTTP-Referer': 'https://orbitgestao.com.br'
                },
                body: JSON.stringify({
                    model: 'google/gemini-2.5-flash-image',
                    messages: [{ role: 'user', content: 'Generate this image: ' + fullPrompt }],
                    max_tokens: 1000
                })
            });

            var data = await res.json();
            if (data.error) throw new Error(data.error.message || 'Erro API');

            var msg = data.choices[0].message;
            var images = msg.images || [];

            if (images.length > 0 && images[0].image_url && images[0].image_url.url) {
                var base64 = images[0].image_url.url;
                document.getElementById('articleImageData').value = base64;
                showImagePreview(base64);
                updateSeoScore();
                status.innerHTML = '<i class="fas fa-check" style="color:var(--success);"></i> Imagem gerada com Gemini!';
                toast('Imagem gerada com IA!');
            } else {
                throw new Error('Nenhuma imagem retornada');
            }

            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-sparkles"></i> Gerar';
        } catch(e) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-sparkles"></i> Gerar';
            status.innerHTML = '<i class="fas fa-exclamation-circle" style="color:var(--error);"></i> ' + (e.message || 'Erro ao gerar');
            console.error('AI Image error:', e);
        }
    }

    function handleAuthorAvatarUpload(event) {
        var file = event.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { toast('Imagem muito grande. Max 2MB.', 'error'); return; }
        if (!file.type.startsWith('image/')) { toast('Selecione uma imagem.', 'error'); return; }
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('authorAvatarData').value = e.target.result;
            document.getElementById('authorAvatarPreview').innerHTML = '<img src="' + e.target.result + '" style="width:100%;height:100%;object-fit:cover;">';
        };
        reader.readAsDataURL(file);
    }

    function removeAuthorAvatar() {
        document.getElementById('authorAvatarData').value = '';
        document.getElementById('authorAvatarPreview').innerHTML = '<i class="fas fa-user" style="color:var(--gray-400);"></i>';
        var input = document.getElementById('authorAvatarInput');
        if (input) input.value = '';
    }

    // ══ CTA BANNER IMAGE UPLOAD ══
    function handleCtaBannerImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { toast('Imagem muito grande. Max 2MB.', 'error'); return; }
        if (!file.type.startsWith('image/')) { toast('Selecione um arquivo de imagem.', 'error'); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('ctaBannerImageData').value = e.target.result;
            document.getElementById('ctaBannerImagePreview').innerHTML = '<img src="' + e.target.result + '" style="max-width:100%;border-radius:8px;">';
        };
        reader.readAsDataURL(file);
    }

    const ctaBannerDropZone = document.getElementById('ctaBannerImageDropZone');
    if (ctaBannerDropZone) {
        ctaBannerDropZone.addEventListener('dragover', (e) => { e.preventDefault(); ctaBannerDropZone.classList.add('dragover'); });
        ctaBannerDropZone.addEventListener('dragleave', () => { ctaBannerDropZone.classList.remove('dragover'); });
        ctaBannerDropZone.addEventListener('drop', (e) => {
            e.preventDefault(); ctaBannerDropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) handleCtaBannerImageUpload({ target: { files: [file] } });
        });
    }

    // Meta description counter
    document.getElementById('articleMetaDesc').addEventListener('input', function() {
        document.getElementById('metaCharCount').textContent = this.value.length;
        updateSeoScore();
    });

    // SEO title counter
    document.getElementById('seoTitle').addEventListener('input', function() {
        document.getElementById('seoTitleCount').textContent = this.value.length;
    });

    // ── SEO Score ──
    function updateSeoScore() {
        const title = document.getElementById('seoTitle').value.trim();
        const desc = document.getElementById('articleMetaDesc').value.trim();
        const keyword = document.getElementById('seoKeyword').value.trim();
        const image = document.getElementById('articleImageData').value || document.getElementById('articleImageUrl').value.trim();
        const slug = document.getElementById('articleSlug').value.trim();
        const content = document.getElementById('richEditor').innerText || '';
        const wordCount = content.split(/\\s+/).filter(w => w.length > 0).length;

        let score = 0;
        const checks = {
            seoCheckTitle: title.length > 0 && title.length <= 60,
            seoCheckDesc: desc.length >= 120 && desc.length <= 160,
            seoCheckKeyword: keyword.length > 0,
            seoCheckImage: image.length > 0,
            seoCheckSlug: slug.length > 0 && slug.length <= 80,
            seoCheckContent: wordCount >= 300
        };

        Object.entries(checks).forEach(([id, pass]) => {
            const el = document.getElementById(id);
            if (el) {
                el.className = 'seo-check ' + (pass ? 'pass' : 'fail');
                el.innerHTML = pass ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-circle"></i>';
            }
            if (pass) score++;
        });

        const pct = Math.round((score / 6) * 100);
        const fill = document.getElementById('seoScoreFill');
        fill.style.width = pct + '%';
        fill.style.background = pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--error)';
    }

    // ── Auto read time ──
    function updateReadTime() {
        var content = document.getElementById('richEditor').innerText || '';
        var words = content.split(/\\s+/).filter(function(w) { return w.length > 0; }).length;
        var mins = Math.max(1, Math.ceil(words / 200));
        var el = document.getElementById('articleReadTimeValue');
        var wc = document.getElementById('articleWordCount');
        if (el) el.textContent = mins + ' min';
        if (wc) wc.textContent = words;
    }

    // Update read time on editor input
    var richEditorEl = document.getElementById('richEditor');
    if (richEditorEl) {
        richEditorEl.addEventListener('input', updateReadTime);
        // Also observe mutations (paste, formatting)
        var readTimeObserver = new MutationObserver(updateReadTime);
        readTimeObserver.observe(richEditorEl, { childList: true, subtree: true, characterData: true });
    }

    // ── Custom category ──
    function onCategoryChange(sel) {
        var wrapper = document.getElementById('customCategoryWrapper');
        if (sel.value === '__custom__') {
            wrapper.style.display = 'block';
            document.getElementById('customCategoryInput').focus();
        } else {
            wrapper.style.display = 'none';
        }
    }

    // View article from list (opens preview modal for a saved article)
    function viewArticle(id) {
        var article = supabaseArticles.find(function(a) { return a.id === id || a.id === Number(id); });
        if (!article) return;

        var imgSrc = article.cover_url || '';
        var categoryLabel = CATEGORIES[article.category] || article.category;
        var statusLabel = article.published ? 'Publicado' : 'Rascunho';
        var statusClass = article.published ? 'published' : 'draft';
        var previewHTML =
            '<div style="background:#000;margin:-24px -32px 0;padding:40px 32px 32px;text-align:center;border-radius:16px 16px 0 0;">' +
                '<span style="background:#ffba1a;color:#000;padding:4px 14px;border-radius:20px;font-size:0.7rem;font-weight:600;text-transform:uppercase;">' + escapeHtml(categoryLabel) + '</span>' +
                '<h1 style="font-size:1.5rem;font-weight:700;color:#fff;margin:16px 0 8px;line-height:1.3;">' + escapeHtml(article.title) + '</h1>' +
                '<p style="color:rgba(255,255,255,.5);font-size:0.82rem;">' +
                    '<i class="fas fa-calendar-alt"></i> ' + formatDate(article.updated_at) +
                    '&nbsp;&nbsp;<i class="fas fa-user"></i> ' + escapeHtml(article.author || 'Equipe Orbit') +
                '</p>' +
            '</div>' +
            (imgSrc ? '<img src="' + imgSrc + '" style="width:100%;max-height:350px;object-fit:cover;border-radius:0 0 12px 12px;margin-bottom:24px;" alt="' + escapeHtml(article.title) + '">' : '') +
            '<div style="line-height:1.8;font-size:0.95rem;padding-top:' + (imgSrc ? '0' : '24px') + ';">' +
                article.content +
            '</div>' +
            '<div style="border-top:1px solid #eee;margin-top:24px;padding-top:16px;">' +
                '<span class="badge badge-' + statusClass + '" style="font-size:0.72rem;">' + statusLabel + '</span>' +
                (article.excerpt ? '<p style="font-size:0.78rem;color:#888;margin-top:8px;"><strong>Resumo:</strong> ' + escapeHtml(article.excerpt) + '</p>' : '') +
            '</div>';

        document.getElementById('previewContent').innerHTML = previewHTML;
        document.getElementById('previewModal').classList.add('active');
    }

    // Preview article (from editor)
    function previewArticle() {
        const title = document.getElementById('articleTitleInput').value || 'Sem titulo';
        const content = document.getElementById('richEditor').innerHTML;
        const category = document.getElementById('articleCategory').value;
        const author = document.getElementById('articleAuthor').value || session.name;
        const imgSrc = document.getElementById('articleImageData').value || document.getElementById('articleImageUrl').value;

        const previewHTML = '<div style="background:#000;margin:-24px -32px 0;padding:40px 32px 32px;text-align:center;border-radius:16px 16px 0 0;">' +
                '<span style="background:#ffba1a;color:#000;padding:4px 14px;border-radius:20px;font-size:0.7rem;font-weight:600;text-transform:uppercase;">' + (CATEGORIES[category] || 'Categoria') + '</span>' +
                '<h1 style="font-size:1.5rem;font-weight:700;color:#fff;margin:16px 0 8px;line-height:1.3;">' + escapeHtml(title) + '</h1>' +
                '<p style="color:rgba(255,255,255,.5);font-size:0.82rem;">Por ' + escapeHtml(author) + '</p>' +
            '</div>' +
            (imgSrc ? '<img src="' + imgSrc + '" style="width:100%;max-height:350px;object-fit:cover;border-radius:0 0 12px 12px;margin-bottom:24px;" alt="Destaque">' : '') +
            '<div style="line-height:1.8;font-size:0.95rem;padding-top:' + (imgSrc ? '0' : '24px') + ';">' + content + '</div>';

        document.getElementById('previewContent').innerHTML = previewHTML;
        document.getElementById('previewModal').classList.add('active');
    }

    // Export article as HTML file with full SEO + Schema
    function exportArticleHTML() {
        const title = document.getElementById('articleTitleInput').value || 'artigo';
        const slug = document.getElementById('articleSlug').value || 'artigo';
        const content = document.getElementById('richEditor').innerHTML;
        const category = document.getElementById('articleCategory').value;
        const author = document.getElementById('articleAuthor').value || 'Equipe Orbit';
        const readTime = document.getElementById('articleReadTime').value || '5 min';
        const metaDesc = document.getElementById('articleMetaDesc').value || '';
        const imageData = document.getElementById('articleImageData').value;
        const imageUrl = imageData || document.getElementById('articleImageUrl').value || 'https://placehold.co/900x450/000000/FDB73F?text=Artigo';
        // SEO
        const seoTitle = document.getElementById('seoTitle').value || title;
        const seoCanonical = document.getElementById('seoCanonical').value || 'https://orbitgestao.com.br/blog/' + slug + '.html';
        const seoKeyword = document.getElementById('seoKeyword').value || '';
        const seoOgImage = document.getElementById('seoOgImage').value || imageUrl;

        const categoryLabel = CATEGORIES[category] || 'Blog';
        const now = new Date();
        const isoDate = now.toISOString();
        const today = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
        const readMinutes = parseInt(readTime) || 5;

        // Extract plain text word count for schema
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const plainText = tempDiv.textContent || '';
        const wordCount = plainText.split(/\\\\s+/).filter(w => w.length > 0).length;

        // Build JSON-LD Schema
        const schemaArticle = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": escapeHtml(seoTitle),
            "description": escapeHtml(metaDesc),
            "image": escapeHtml(seoOgImage),
            "author": {
                "@type": "Person",
                "name": escapeHtml(author)
            },
            "publisher": {
                "@type": "Organization",
                "name": "Orbit Gestao",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://orbitgestao.com.br/images/logo-orbit-white.png"
                }
            },
            "datePublished": isoDate,
            "dateModified": isoDate,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": escapeHtml(seoCanonical)
            },
            "wordCount": wordCount,
            "articleSection": escapeHtml(categoryLabel),
            "inLanguage": "pt-BR",
            "timeRequired": "PT" + readMinutes + "M"
        };
        if (seoKeyword) {
            schemaArticle.keywords = escapeHtml(seoKeyword);
        }

        const schemaBreadcrumb = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://orbitgestao.com.br/" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://orbitgestao.com.br/blog" },
                { "@type": "ListItem", "position": 3, "name": escapeHtml(title), "item": escapeHtml(seoCanonical) }
            ]
        };

        const schemaOrg = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Orbit Gestao",
            "url": "https://orbitgestao.com.br",
            "logo": "https://orbitgestao.com.br/images/logo-orbit-white.png",
            "sameAs": []
        };

        const schemaFAQ = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Orbit Gestao",
            "url": "https://orbitgestao.com.br",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://orbitgestao.com.br/blog?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };

        const html = '<!DOCTYPE html>' +
'<html lang="pt-BR">' +
'<head>' +
'    <meta charset="UTF-8">' +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
'' +
'    <!-- SEO Primary Meta Tags -->' +
'    <title>' + escapeHtml(seoTitle) + ' | Blog Orbit Gestao</title>' +
'    <meta name="title" content="' + escapeHtml(seoTitle) + ' | Blog Orbit Gestao">' +
'    <meta name="description" content="' + escapeHtml(metaDesc) + '">' +
    (seoKeyword ? '<meta name="keywords" content="' + escapeHtml(seoKeyword) + ', gestao estrategica, orbit gestao, gestao empresarial">' : '') +
'    <meta name="author" content="' + escapeHtml(author) + '">' +
'    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">' +
'    <link rel="canonical" href="' + escapeHtml(seoCanonical) + '">' +
'    <meta name="language" content="pt-BR">' +
'    <meta name="revisit-after" content="7 days">' +
'' +
'    <!-- Open Graph / Facebook -->' +
'    <meta property="og:type" content="article">' +
'    <meta property="og:url" content="' + escapeHtml(seoCanonical) + '">' +
'    <meta property="og:title" content="' + escapeHtml(seoTitle) + '">' +
'    <meta property="og:description" content="' + escapeHtml(metaDesc) + '">' +
'    <meta property="og:image" content="' + escapeHtml(seoOgImage) + '">' +
'    <meta property="og:image:width" content="1200">' +
'    <meta property="og:image:height" content="630">' +
'    <meta property="og:image:alt" content="' + escapeHtml(title) + '">' +
'    <meta property="og:site_name" content="Orbit Gestao">' +
'    <meta property="og:locale" content="pt_BR">' +
'    <meta property="article:published_time" content="' + isoDate + '">' +
'    <meta property="article:modified_time" content="' + isoDate + '">' +
'    <meta property="article:author" content="' + escapeHtml(author) + '">' +
'    <meta property="article:section" content="' + escapeHtml(categoryLabel) + '">' +
    (seoKeyword ? '<meta property="article:tag" content="' + escapeHtml(seoKeyword) + '">' : '') +
'' +
'    <!-- Twitter Card -->' +
'    <meta name="twitter:card" content="summary_large_image">' +
'    <meta name="twitter:url" content="' + escapeHtml(seoCanonical) + '">' +
'    <meta name="twitter:title" content="' + escapeHtml(seoTitle) + '">' +
'    <meta name="twitter:description" content="' + escapeHtml(metaDesc) + '">' +
'    <meta name="twitter:image" content="' + escapeHtml(seoOgImage) + '">' +
'    <meta name="twitter:image:alt" content="' + escapeHtml(title) + '">' +
'' +
'    <!-- JSON-LD Structured Data -->' +
'    <script type="application/ld+json">' +
JSON.stringify(schemaArticle, null, 2) +
'    <\\/script>' +
'    <script type="application/ld+json">' +
JSON.stringify(schemaBreadcrumb, null, 2) +
'    <\\/script>' +
'    <script type="application/ld+json">' +
JSON.stringify(schemaOrg, null, 2) +
'    <\\/script>' +
'' +
'    <!-- Preconnect & Fonts -->' +
'    <link rel="preconnect" href="https://fonts.googleapis.com">' +
'    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
'    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">' +
'    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">' +
'    <link rel="stylesheet" href="/css/styles-v2.css?v=4fbbda1e">' +
'    <style>' +
'        .article-hero{background:#000;padding:140px 24px 80px;text-align:center;position:relative;overflow:hidden}' +
'        .article-hero__bg{position:absolute;inset:0;pointer-events:none}' +
'        .article-hero__glow{position:absolute;width:400px;height:400px;border-radius:50%;background:#ffba1a;filter:blur(150px);opacity:.1;top:-100px;right:-100px}' +
'        .article-hero .container{position:relative;z-index:1;max-width:800px;margin:0 auto}' +
'        .article-hero__tag{display:inline-block;background:#ffba1a;color:#000;padding:6px 18px;border-radius:50px;font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:24px}' +
'        .article-hero h1{font-size:clamp(1.75rem,4vw,2.75rem);font-weight:700;color:#fff;line-height:1.25;margin-bottom:20px}' +
'        .article-hero__meta{display:flex;align-items:center;justify-content:center;gap:24px;color:rgba(255,255,255,.5);font-size:.9rem}' +
'        .article-hero__meta i{margin-right:6px}' +
'        .article-featured-image{max-width:900px;margin:-40px auto 0;padding:0 24px;position:relative;z-index:2}' +
'        .article-featured-image img{width:100%;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.15)}' +
'        .article-body{max-width:760px;margin:0 auto;padding:60px 24px 80px}' +
'        .article-body h2{font-size:1.5rem;font-weight:700;color:#000;margin:48px 0 16px;line-height:1.3}' +
'        .article-body h3{font-size:1.2rem;font-weight:600;color:#000;margin:36px 0 12px}' +
'        .article-body p{font-size:1.05rem;line-height:1.8;color:#444;margin-bottom:20px}' +
'        .article-body ul,.article-body ol{margin:16px 0 24px 24px;color:#444;line-height:1.8;font-size:1.05rem}' +
'        .article-body li{margin-bottom:8px;list-style:disc}' +
'        .article-body ol li{list-style:decimal}' +
'        .article-body blockquote{border-left:4px solid #ffba1a;margin:32px 0;padding:16px 24px;background:#fdf8ee;border-radius:0 12px 12px 0;font-style:italic;color:#333}' +
'        .article-body img{max-width:100%;border-radius:12px;margin:32px 0}' +
'        .article-body a{color:#E5A235;font-weight:500;text-decoration:underline}' +
'        .article-cta{background:#000;padding:60px 24px;text-align:center;margin-top:40px}' +
'        .article-cta .container{max-width:640px;margin:0 auto}' +
'        .article-cta h3{font-size:1.5rem;font-weight:700;color:#fff;margin-bottom:12px}' +
'        .article-cta p{color:rgba(255,255,255,.6);margin-bottom:24px;font-size:1rem}' +
'        nav.breadcrumb{max-width:760px;margin:24px auto 0;padding:0 24px;font-size:.82rem}' +
'        nav.breadcrumb a{color:#E5A235;text-decoration:none}' +
'        nav.breadcrumb a:hover{text-decoration:underline}' +
'        nav.breadcrumb span{color:#999;margin:0 8px}' +
'        @media(max-width:768px){.article-hero{padding:120px 20px 60px}.article-hero__meta{flex-direction:column;gap:8px}.article-body{padding:40px 20px 60px}}' +
'    </style>' +
'</head>' +
'<body>' +
'    <header class="header">' +
'        <div class="container">' +
'            <div class="logo"><a href="/"><img src="/images/logo-orbit-white.png" alt="Orbit Gestao" height="40"></a></div>' +
'            <ul class="nav-menu">' +
'                <li><a href="/">Inicio</a></li>' +
'                <li><a href="/#plataforma">Solucoes <i class="fas fa-chevron-down dropdown-arrow"></i></a>' +
'                    <div class="dropdown">' +
'                        <a href="/processos"><i class="fas fa-sitemap"></i> Processos</a>' +
'                        <a href="/indicadores"><i class="fas fa-chart-line"></i> Indicadores</a>' +
'                        <a href="/tarefas"><i class="fas fa-tasks"></i> Tarefas</a>' +
'                        <a href="/competencias"><i class="fas fa-users"></i> Competencias</a>' +
'                        <a href="/auditorias"><i class="fas fa-clipboard-check"></i> Auditorias</a>' +
'                    </div>' +
'                </li>' +
'                <li><a href="/blog">Conhecimento</a></li>' +
'                <li><a href="/parcerias" data-i18n="footer.partners">Seja Parceiro</a></li>' +
'                <li><a href="/#contato-form">Fale Conosco</a></li>' +
'            </ul>' +
'            <div class="nav-actions">' +
'                <a href="#" class="btn btn-outline" data-i18n="nav.login">Entrar</a>' +
'                <a href="/#contato-form" class="btn btn-primary">Agendar Demo</a>' +
'            </div>' +
'            <button class="lang-switch" onclick="switchLang()" aria-label="Change language">' +
'                <span class="lang-switch__flag">\ud83c\uddfa\ud83c\uddf8</span>' +
'                <span class="lang-switch__label">EN</span>' +
'            </button>' +
'' +
'            <button class="menu-toggle">' +
'                <span></span><span></span><span></span>' +
'            </button>' +
'        </div>' +
'    </header>' +
'    <!-- Mobile Menu -->' +
'    <div class="mobile-menu-overlay" onclick="closeMobileMenu()"></div>' +
'    <div class="mobile-menu">' +
'        <div class="mobile-menu__header">' +
'            <span class="mobile-menu__header-title" data-i18n="mobile.title">Menu</span>' +
'            <button class="mobile-menu-close" onclick="closeMobileMenu()">&times;</button>' +
'        </div>' +
'        <div class="mobile-menu__body">' +
'            <a href="/">Home</a>' +
'            <a href="/processos">Processos</a>' +
'            <a href="/indicadores">Indicadores</a>' +
'            <a href="/tarefas">Tarefas</a>' +
'            <a href="/competencias">Competencias</a>' +
'            <a href="/auditorias">Auditorias</a>' +
'            <a href="/blog">Conhecimento</a>' +
'            <a href="/parcerias" data-i18n="footer.partners">Seja Parceiro</a>' +
'        </div>' +
'        <div class="mobile-menu__footer">' +
'            <button class="lang-switch" onclick="switchLang()" aria-label="Change language">' +
'                <span class="lang-switch__flag">\ud83c\uddfa\ud83c\uddf8</span>' +
'                <span class="lang-switch__label">EN</span>' +
'            </button>' +
'            <a href="/#contato-form" class="btn btn-primary" onclick="closeMobileMenu()">Fale Conosco</a>' +
'        </div>' +
'    </div>' +
'    <section class="article-hero">' +
'        <div class="article-hero__bg"><div class="article-hero__glow"></div></div>' +
'        <div class="container">' +
'            <span class="article-hero__tag">' + escapeHtml(categoryLabel) + '</span>' +
'            <h1>' + escapeHtml(title) + '</h1>' +
'            <div class="article-hero__meta">' +
'                <span><i class="fas fa-calendar-alt"></i> <time datetime="' + isoDate + '">' + today + '</time></span>' +
'                <span><i class="fas fa-clock"></i> ' + escapeHtml(readTime) + ' de leitura</span>' +
'                <span><i class="fas fa-user"></i> ' + escapeHtml(author) + '</span>' +
'            </div>' +
'        </div>' +
'    </section>' +
'    <div class="article-featured-image">' +
'        <img src="' + escapeHtml(imageUrl) + '" alt="' + escapeHtml(title) + '" loading="eager" width="900" height="450">' +
'    </div>' +
'    <nav class="breadcrumb" aria-label="Breadcrumb">' +
'        <a href="/">Home</a><span>/</span>' +
'        <a href="/blog">Blog</a><span>/</span>' +
        escapeHtml(title) +
'    </nav>' +
'    <article class="article-body" itemscope itemtype="https://schema.org/BlogPosting">' +
'        <meta itemprop="headline" content="' + escapeHtml(title) + '">' +
'        <meta itemprop="author" content="' + escapeHtml(author) + '">' +
'        <meta itemprop="datePublished" content="' + isoDate + '">' +
'        <meta itemprop="image" content="' + escapeHtml(imageUrl) + '">' +
        content +
'    </article>' +
'    <section class="article-cta">' +
'        <div class="container">' +
'            <h3>Pronto para transformar sua gestao?</h3>' +
'            <p>Veja como a Orbit pode ajudar sua empresa a executar a estrategia com mais eficiencia.</p>' +
'            <a href="/#contato-form" class="btn btn-primary btn-lg">Agendar demonstracao</a>' +
'        </div>' +
'    </section>' +
'    <footer class="footer">' +
'        <div class="container">' +
'            <div class="footer-grid">' +
'                <div class="footer-brand">' +
'                    <div class="footer-logo"><img src="/images/logo-orbit-white.png" alt="Orbit Gestao" height="36"></div>' +
'                    <p>Transformando estrategia em execucao para empresas de medio porte.</p>' +
'                    <div class="social-hover">' +
'                        <a href="#" class="social-hover__item" data-name="LinkedIn">' +
'                            <i class="fab fa-linkedin"></i>' +
'                            <span class="social-hover__label">LinkedIn</span>' +
'                        </a>' +
'                        <a href="#" class="social-hover__item" data-name="Facebook">' +
'                            <i class="fab fa-facebook"></i>' +
'                            <span class="social-hover__label">Facebook</span>' +
'                        </a>' +
'                        <a href="#" class="social-hover__item" data-name="Instagram">' +
'                            <i class="fab fa-instagram"></i>' +
'                            <span class="social-hover__label">Instagram</span>' +
'                        </a>' +
'                        <a href="#" class="social-hover__item" data-name="YouTube">' +
'                            <i class="fab fa-youtube"></i>' +
'                            <span class="social-hover__label">YouTube</span>' +
'                        </a>' +
'                    </div>' +
'                </div>' +
'                <div class="footer-column"><h5 data-i18n="footer.contact">Contato</h5><ul class="footer-contact"><li><i class="fas fa-phone"></i> +55 (11) 9999-9999</li><li><i class="fas fa-envelope"></i> contato@orbit.com</li></ul></div>' +
'                <div class="footer-column"><h5>Solucoes</h5><ul><li><a href="/processos">Processos</a></li><li><a href="/indicadores">Indicadores</a></li><li><a href="/tarefas">Tarefas</a></li><li><a href="/competencias">Competencias</a></li><li><a href="/auditorias">Auditorias</a></li></ul></div>' +
'                <div class="footer-column"><h5 data-i18n="footer.knowledge">Conhecimento</h5><ul><li><a href="/blog">Blog</a></li><li><a href="#">Documentacao</a></li><li><a href="#">FAQ</a></li></ul></div>' +
'            </div>' +
'            <div class="footer-bottom"><p>&copy; 2024 Orbit Gestao. Todos os direitos reservados.</p></div>' +
'        </div>' +
'    </footer>' +
'    <script>' +
"        const header = document.querySelector('.header');" +
"        window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 50); });" +
"        document.querySelectorAll('.nav-menu > li').forEach(item => {" +
"            const dropdown = item.querySelector('.dropdown');" +
'            if (!dropdown) return;' +
"            item.addEventListener('mouseenter', () => { dropdown.style.opacity='1'; dropdown.style.visibility='visible'; dropdown.style.transform='translateY(0)'; });" +
"            item.addEventListener('mouseleave', () => { dropdown.style.opacity='0'; dropdown.style.visibility='hidden'; dropdown.style.transform='translateY(10px)'; });" +
'        });' +
'    <\\/script>' +
'</body>' +
'</html>';

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = slug + '.html';
        a.click();
        URL.revokeObjectURL(url);
        toast('HTML exportado com SEO + Schema! Coloque na pasta blog/');
    }

    // ═══ USERS MANAGEMENT ═══
    var supabaseUsers = [];

    async function refreshUsers() {
        try {
            var res = await supaFetch(SUPABASE_URL + '/rest/v1/cms_admins?order=created_at.asc', {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token }
            });
            supabaseUsers = await res.json();
        } catch(e) { supabaseUsers = []; }

        var tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = supabaseUsers.map(function(u) {
            return '<tr>' +
                '<td><strong>' + escapeHtml(u.name) + '</strong></td>' +
                '<td>' + escapeHtml(u.email) + '</td>' +
                '<td><span class="badge badge-' + u.role + '">' + (u.role === 'admin' ? 'Admin Full' : 'Editor') + '</span></td>' +
                '<td><span class="badge badge-published">Ativo</span></td>' +
                '<td><div class="actions-cell">' +
                    '<button class="btn btn-secondary btn-icon btn-sm" onclick="editUser(&apos;' + u.id + '&apos;)" title="Editar"><i class="fas fa-edit"></i></button>' +
                '</div></td>' +
            '</tr>';
        }).join('');
    }

    function openUserModal(userId) {
        document.getElementById('modalUserId').value = '';
        document.getElementById('modalUserName').value = '';
        document.getElementById('modalUserEmail').value = '';
        document.getElementById('modalUserPassword').value = '';
        document.getElementById('modalUserRole').value = 'editor';
        document.getElementById('userModalTitle').textContent = 'Novo Usuario';
        document.getElementById('passwordHint').textContent = 'Obrigatorio para novos usuarios';
        document.getElementById('userModal').classList.add('active');
    }

    function editUser(id) {
        var user = supabaseUsers.find(function(u) { return u.id === id; });
        if (!user) return;

        document.getElementById('modalUserId').value = user.id;
        document.getElementById('modalUserName').value = user.name;
        document.getElementById('modalUserEmail').value = user.email;
        document.getElementById('modalUserPassword').value = '';
        document.getElementById('modalUserRole').value = user.role;
        document.getElementById('userModalTitle').textContent = 'Editar Usuario';
        document.getElementById('passwordHint').textContent = 'Deixe em branco para manter a senha atual';
        document.getElementById('userModal').classList.add('active');
    }

    function closeUserModal() {
        document.getElementById('userModal').classList.remove('active');
    }

    async function saveUser() {
        var id = document.getElementById('modalUserId').value;
        var name = document.getElementById('modalUserName').value.trim();
        var email = document.getElementById('modalUserEmail').value.trim().toLowerCase();
        var password = document.getElementById('modalUserPassword').value;
        var role = document.getElementById('modalUserRole').value;

        if (!name || !email) {
            toast('Preencha nome e e-mail.', 'error');
            return;
        }

        try {
            if (id) {
                // Update cms_admins record
                var updateRes = await supaFetch(SUPABASE_URL + '/rest/v1/cms_admins?id=eq.' + id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_KEY,
                        'Authorization': 'Bearer ' + session.access_token,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({ name: name, role: role })
                });
                if (!updateRes.ok) throw new Error('Erro ao atualizar');
                toast('Usuario atualizado!');
            } else {
                // Create new user via Supabase Auth signup
                if (!password || password.length < 6) {
                    toast('Senha deve ter pelo menos 6 caracteres.', 'error');
                    return;
                }

                var signupRes = await fetch(SUPABASE_URL + '/auth/v1/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_KEY
                    },
                    body: JSON.stringify({ email: email, password: password })
                });
                var signupData = await signupRes.json();

                if (!signupRes.ok || !signupData.id) {
                    toast(signupData.msg || signupData.error_description || 'Erro ao criar usuario.', 'error');
                    return;
                }

                // Insert into cms_admins
                var insertRes = await supaFetch(SUPABASE_URL + '/rest/v1/cms_admins', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_KEY,
                        'Authorization': 'Bearer ' + session.access_token,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({ id: signupData.id, email: email, name: name, role: role })
                });
                if (!insertRes.ok) throw new Error('Erro ao salvar admin');
                toast('Usuario criado! O usuario precisa confirmar o e-mail para acessar.');
            }
        } catch(err) {
            console.error(err);
            toast('Erro ao salvar usuario.', 'error');
        }

        closeUserModal();
        refreshUsers();
        refreshDashboard();
    }

    // ═══ DELETE CONFIRMATIONS ═══
    let pendingDeleteFn = null;

    function confirmDeleteArticle(id) {
        document.getElementById('deleteMessage').textContent = 'Tem certeza que deseja excluir este artigo? Esta acao nao pode ser desfeita.';
        document.getElementById('deleteConfirmBtn').onclick = async function() {
            try {
                await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles?id=eq.' + id, {
                    method: 'DELETE',
                    headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': 'Bearer ' + session.access_token
                    }
                });
                toast('Artigo excluido.');
            } catch(e) { toast('Erro ao excluir.', 'error'); }
            closeDeleteModal();
            await refreshArticles();
            refreshDashboard();
        };
        document.getElementById('deleteModal').classList.add('active');
    }

    function confirmDeleteUser(id) {
        document.getElementById('deleteMessage').textContent = 'Tem certeza que deseja excluir este usuario?';
        document.getElementById('deleteConfirmBtn').onclick = () => {
            const db = getDB();
            db.users = db.users.filter(u => u.id !== id);
            setDB(db);
            closeDeleteModal();
            refreshUsers();
            refreshDashboard();
            toast('Usuario excluido.');
        };
        document.getElementById('deleteModal').classList.add('active');
    }

    function closeDeleteModal() {
        document.getElementById('deleteModal').classList.remove('active');
    }

    // ═══ HELPERS ═══
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatDate(dateStr) {
        try {
            return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
        } catch(e) { return dateStr; }
    }

    // ═══ CUSTOMER STORIES ═══
    const SEGMENT_LABELS = {
        industria: 'Indústria', servicos: 'Serviços', tecnologia: 'Tecnologia',
        saude: 'Saúde', educacao: 'Educação', varejo: 'Varejo',
        financeiro: 'Financeiro', agronegocio: 'Agronegócio', outro: 'Outro'
    };

    const STORY_STATUS_LABELS = { pending: 'Pendente', published: 'Publicada', rejected: 'Rejeitada' };
    const STORY_STATUS_COLORS = { pending: 'warning', published: 'published', rejected: 'draft' };

    function refreshStories() {
        supaFetch(SUPABASE_URL + '/rest/v1/customer_stories?order=created_at.desc', {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token }
        }).then(function(res) {
            if (res.ok) return res.json();
            return [];
        }).then(function(data) {
            supabaseStories = data || [];
            updateNotifications();
            var stories = supabaseStories;
            var tbody = document.getElementById('storiesTableBody');
            var emptyEl = document.getElementById('storiesEmpty');

            document.getElementById('statStoriesTotal').textContent = stories.length;
            document.getElementById('statStoriesPending').textContent = stories.filter(function(s) { return s.status === 'pending'; }).length;
            document.getElementById('statStoriesPublished').textContent = stories.filter(function(s) { return s.status === 'published'; }).length;

            if (stories.length === 0) {
                tbody.innerHTML = '';
                emptyEl.style.display = 'block';
                return;
            }

            emptyEl.style.display = 'none';

            tbody.innerHTML = stories.map(function(s) {
                var logo = s.logo_url ? '<img src="' + escapeHtml(s.logo_url) + '" style="width:32px;height:32px;border-radius:6px;object-fit:cover;margin-right:8px;vertical-align:middle;">' : '<span style="display:inline-flex;width:32px;height:32px;border-radius:6px;background:var(--gray-100);align-items:center;justify-content:center;margin-right:8px;vertical-align:middle;font-size:0.7rem;color:var(--gray-500);"><i class="fas fa-building"></i></span>';
                var statusClass = STORY_STATUS_COLORS[s.status] || 'draft';
                var statusLabel = STORY_STATUS_LABELS[s.status] || s.status;
                var pendingBtns = '<button class="btn btn-primary btn-icon btn-sm" onclick="updateStoryStatus(' + s.id + ',&apos;published&apos;)" title="Aprovar"><i class="fas fa-check"></i></button>' +
                    '<button class="btn btn-danger btn-icon btn-sm" onclick="updateStoryStatus(' + s.id + ',&apos;rejected&apos;)" title="Rejeitar"><i class="fas fa-ban"></i></button>';
                var publishedBtns = '<button class="btn btn-secondary btn-icon btn-sm" onclick="updateStoryStatus(' + s.id + ',&apos;pending&apos;)" title="Despublicar"><i class="fas fa-undo"></i></button>';
                var rejectedBtns = '<button class="btn btn-primary btn-icon btn-sm" onclick="updateStoryStatus(' + s.id + ',&apos;published&apos;)" title="Aprovar"><i class="fas fa-check"></i></button>';
                var actionBtns = s.status === 'pending' ? pendingBtns : (s.status === 'published' ? publishedBtns : rejectedBtns);

                return '<tr>' +
                    '<td><div style="display:flex;align-items:center;">' + logo + '<strong>' + escapeHtml(s.company_name) + '</strong></div></td>' +
                    '<td><span style="font-size:0.85rem;">' + escapeHtml(s.contact_name) + '</span></td>' +
                    '<td style="max-width:200px;"><span style="font-size:0.85rem;">' + escapeHtml(s.challenge ? s.challenge.slice(0, 60) + (s.challenge.length > 60 ? '...' : '') : '-') + '</span></td>' +
                    '<td><span style="background:rgba(255,186,26,0.15);color:var(--primary);padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:500;">' + escapeHtml(SEGMENT_LABELS[s.segment] || s.segment || '-') + '</span></td>' +
                    '<td><span class="badge badge-' + statusClass + '">' + statusLabel + '</span></td>' +
                    '<td style="font-size:0.82rem;">' + formatDate(s.created_at) + '</td>' +
                    '<td>' +
                        '<div style="display:flex;gap:4px;">' +
                            '<button class="btn btn-secondary btn-icon btn-sm" onclick="viewStoryDetail(' + s.id + ')" title="Ver detalhes"><i class="fas fa-eye"></i></button>' +
                            '<button class="btn btn-secondary btn-icon btn-sm" onclick="editStoryInEditor(' + s.id + ')" title="Editar"><i class="fas fa-edit"></i></button>' +
                            actionBtns +
                            '<button class="btn btn-danger btn-icon btn-sm" onclick="deleteStory(' + s.id + ')" title="Excluir"><i class="fas fa-trash"></i></button>' +
                        '</div>' +
                    '</td>' +
                '</tr>';
            }).join('');
        }).catch(function(e) {
            supabaseStories = [];
            console.error('Erro ao carregar stories:', e);
        });
    }

    function updateStoryStatus(id, newStatus) {
        var payload = { status: newStatus, updated_at: new Date().toISOString() };
        if (newStatus === 'published') {
            payload.published_at = new Date().toISOString();
            // Generate slug if missing
            var story = supabaseStories.find(function(s) { return s.id === id || s.id === Number(id); });
            if (story && !story.slug && story.company_name) {
                payload.slug = generateSlugFromTitle(story.company_name);
            }
        }
        supaFetch(SUPABASE_URL + '/rest/v1/customer_stories?id=eq.' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + session.access_token,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(payload)
        }).then(function(res) {
            if (!res.ok) throw new Error('Erro ao atualizar');
            refreshStories();
            toast(newStatus === 'published' ? 'História publicada!' : newStatus === 'rejected' ? 'História rejeitada.' : 'Status atualizado.');
        }).catch(function(e) {
            toast('Erro ao atualizar status.', 'error');
        });
    }

    function deleteStory(id) {
        if (!confirm('Excluir esta história de cliente?')) return;
        supaFetch(SUPABASE_URL + '/rest/v1/customer_stories?id=eq.' + id, {
            method: 'DELETE',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + session.access_token
            }
        }).then(function(res) {
            if (!res.ok) throw new Error('Erro ao excluir');
            refreshStories();
            toast('História excluída.');
        }).catch(function(e) {
            toast('Erro ao excluir história.', 'error');
        });
    }

    function viewStoryDetail(id) {
        var s = supabaseStories.find(function(st) { return st.id === id || st.id === Number(id); });
        if (!s) return;

        var logo = s.logo_url ? '<img src="' + escapeHtml(s.logo_url) + '" style="width:64px;height:64px;border-radius:12px;object-fit:cover;">' : '<div style="width:64px;height:64px;border-radius:12px;background:var(--gray-100);display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:var(--gray-400);"><i class="fas fa-building"></i></div>';

        var html = '<div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--gray-200);">' +
            logo +
            '<div>' +
                '<h3 style="font-size:1.1rem;font-weight:700;margin-bottom:2px;">' + escapeHtml(s.company_name) + '</h3>' +
                '<span style="font-size:0.82rem;color:var(--gray-500);">' + escapeHtml(s.contact_name) + ' - ' + escapeHtml(s.contact_role || '') + '</span>' +
            '</div>' +
            '<span class="badge badge-' + (STORY_STATUS_COLORS[s.status] || 'draft') + '" style="margin-left:auto;">' + (STORY_STATUS_LABELS[s.status] || s.status) + '</span>' +
        '</div>';

        html += '<div style="margin-bottom:20px;">' +
            '<h5 style="font-size:0.82rem;font-weight:600;color:var(--primary-dark);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;"><i class="fas fa-exclamation-triangle" style="margin-right:6px;"></i>O Desafio</h5>' +
            '<p style="font-size:0.9rem;line-height:1.7;color:var(--gray-700);white-space:pre-line;">' + escapeHtml(s.challenge || '-') + '</p>' +
        '</div>';

        html += '<div style="margin-bottom:20px;">' +
            '<h5 style="font-size:0.82rem;font-weight:600;color:var(--primary-dark);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;"><i class="fas fa-lightbulb" style="margin-right:6px;"></i>A Solução</h5>' +
            '<p style="font-size:0.9rem;line-height:1.7;color:var(--gray-700);white-space:pre-line;">' + escapeHtml(s.solution || '-') + '</p>' +
        '</div>';

        html += '<div style="margin-bottom:20px;">' +
            '<h5 style="font-size:0.82rem;font-weight:600;color:var(--primary-dark);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;"><i class="fas fa-chart-line" style="margin-right:6px;"></i>Os Resultados</h5>' +
            '<p style="font-size:0.9rem;line-height:1.7;color:var(--gray-700);white-space:pre-line;">' + escapeHtml(s.results || '-') + '</p>' +
        '</div>';

        if (s.testimonial) {
            html += '<div style="border-left:4px solid var(--primary);padding:16px 20px;background:rgba(255,186,26,0.05);border-radius:0 12px 12px 0;margin-bottom:20px;">' +
                '<p style="font-style:italic;font-size:0.9rem;line-height:1.7;color:var(--gray-700);">"' + escapeHtml(s.testimonial) + '"</p>' +
                '<span style="font-size:0.78rem;color:var(--gray-500);margin-top:8px;display:block;">- ' + escapeHtml(s.contact_name) + ', ' + escapeHtml(s.contact_role || '') + ' na ' + escapeHtml(s.company_name) + '</span>' +
            '</div>';
        }

        document.getElementById('storyDetailContent').innerHTML = html;

        var footerHtml = '';
        if (s.status === 'pending') {
            footerHtml = '<button class="btn btn-danger" onclick="updateStoryStatus(' + s.id + ',&apos;rejected&apos;);closeStoryDetail();">Rejeitar</button>' +
                '<button class="btn btn-primary" onclick="updateStoryStatus(' + s.id + ',&apos;published&apos;);closeStoryDetail();">Aprovar e Publicar</button>';
        } else if (s.status === 'published') {
            footerHtml = '<button class="btn btn-secondary" onclick="updateStoryStatus(' + s.id + ',&apos;pending&apos;);closeStoryDetail();">Despublicar</button>' +
                '<a href="/historias/' + (s.slug || s.id) + '" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Ver no site</a>';
        } else {
            footerHtml = '<button class="btn btn-primary" onclick="updateStoryStatus(' + s.id + ',&apos;published&apos;);closeStoryDetail();">Aprovar e Publicar</button>';
        }
        document.getElementById('storyDetailFooter').innerHTML = footerHtml;
        document.getElementById('storyDetailModal').classList.add('active');
    }

    function closeStoryDetail() {
        document.getElementById('storyDetailModal').classList.remove('active');
    }

    // ═══ STORY EDITOR ═══
    let storyPhotos = []; // base64 array for current editor

    function clearStoryEditor() {
        document.getElementById('storyEditId').value = '';
        document.getElementById('seEmpresa').value = '';
        document.getElementById('seSegmento').value = '';
        document.getElementById('seNome').value = '';
        document.getElementById('seEmail').value = '';
        document.getElementById('seCargo').value = '';
        document.getElementById('seTelefone').value = '';
        document.getElementById('seTitulo').value = '';
        document.getElementById('seDesafio').value = '';
        document.getElementById('seSolucao').value = '';
        document.getElementById('seResultados').value = '';
        document.getElementById('seDepoimento').value = '';
        document.getElementById('seLinkedin').value = '';
        document.getElementById('seInstagram').value = '';
        document.getElementById('seWebsite').value = '';
        document.getElementById('seVideoUrl').value = '';
        document.getElementById('seLogoData').value = '';
        document.getElementById('seLogoPreview').innerHTML = '';
        document.querySelectorAll('.se-modulo').forEach(cb => cb.checked = false);
        storyPhotos = [];
        renderStoryPhotoPreviews();
        document.getElementById('storyEditorTitle').textContent = 'Nova História';
    }

    function editStoryInEditor(id) {
        var s = supabaseStories.find(function(st) { return st.id === id || st.id === Number(id); });
        if (!s) return;

        document.getElementById('storyEditId').value = s.id;
        document.getElementById('seEmpresa').value = s.company_name || '';
        document.getElementById('seSegmento').value = s.segment || '';
        document.getElementById('seNome').value = s.contact_name || '';
        document.getElementById('seEmail').value = '';
        document.getElementById('seCargo').value = s.contact_role || '';
        document.getElementById('seTelefone').value = '';
        document.getElementById('seTitulo').value = s.challenge ? s.company_name : '';
        document.getElementById('seDesafio').value = s.challenge || '';
        document.getElementById('seSolucao').value = s.solution || '';
        document.getElementById('seResultados').value = s.results || '';
        document.getElementById('seDepoimento').value = s.testimonial || '';
        document.getElementById('seLinkedin').value = '';
        document.getElementById('seInstagram').value = '';
        document.getElementById('seWebsite').value = '';
        document.getElementById('seVideoUrl').value = '';
        document.getElementById('seLogoData').value = s.logo_url || '';
        document.getElementById('seLogoPreview').innerHTML = s.logo_url ? '<img src="' + escapeHtml(s.logo_url) + '" alt="Logo" style="max-width:100%;border-radius:8px;"><button class="remove-image" onclick="document.getElementById(&apos;seLogoData&apos;).value=&apos;&apos;;document.getElementById(&apos;seLogoPreview&apos;).innerHTML=&apos;&apos;" title="Remover"><i class="fas fa-times"></i></button>' : '';

        // Modules
        const mods = s.modulos || [];
        document.querySelectorAll('.se-modulo').forEach(cb => {
            cb.checked = mods.includes(cb.value);
        });

        // Photos
        storyPhotos = (s.photos || []).slice();
        renderStoryPhotoPreviews();

        document.getElementById('storyEditorTitle').textContent = 'Editar História';
        showView('storyeditor');
    }

    function handleStoryLogoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { toast('Imagem muito grande. Max 2MB.', 'error'); return; }
        if (!file.type.startsWith('image/')) { toast('Selecione um arquivo de imagem.', 'error'); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('seLogoData').value = e.target.result;
            document.getElementById('seLogoPreview').innerHTML = '<img src="' + e.target.result + '" style="max-width:100%;border-radius:8px;"><button class="remove-image" onclick="document.getElementById(&apos;seLogoData&apos;).value=&apos;&apos;;document.getElementById(&apos;seLogoPreview&apos;).innerHTML=&apos;&apos;" title="Remover"><i class="fas fa-times"></i></button>';
        };
        reader.readAsDataURL(file);
    }

    function handleStoryPhotosUpload(event) {
        const files = Array.from(event.target.files);
        if (storyPhotos.length + files.length > 5) {
            toast('Máximo 5 fotos.', 'error');
            return;
        }
        files.forEach(file => {
            if (file.size > 2 * 1024 * 1024) { toast(file.name + ' muito grande. Max 2MB.', 'error'); return; }
            if (!file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                storyPhotos.push(e.target.result);
                renderStoryPhotoPreviews();
            };
            reader.readAsDataURL(file);
        });
        event.target.value = '';
    }

    function renderStoryPhotoPreviews() {
        const container = document.getElementById('sePhotosPreview');
        if (!container) return;
        container.innerHTML = storyPhotos.map(function(p, i) {
            return '<div style="position:relative;display:inline-block;">' +
                '<img src="' + p + '" style="width:80px;height:60px;object-fit:cover;border-radius:6px;">' +
                '<button onclick="storyPhotos.splice(' + i + ',1);renderStoryPhotoPreviews()" style="position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;background:var(--error);color:#fff;border:none;cursor:pointer;font-size:0.6rem;display:flex;align-items:center;justify-content:center;"><i class="fas fa-times"></i></button>' +
            '</div>';
        }).join('');
    }

    // Story editor drag & drop
    const seLogoZone = document.getElementById('seLogoDropZone');
    if (seLogoZone) {
        seLogoZone.addEventListener('dragover', (e) => { e.preventDefault(); seLogoZone.classList.add('dragover'); });
        seLogoZone.addEventListener('dragleave', () => seLogoZone.classList.remove('dragover'));
        seLogoZone.addEventListener('drop', (e) => {
            e.preventDefault(); seLogoZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) handleStoryLogoUpload({ target: { files: [file] } });
        });
    }
    const sePhotosZone = document.getElementById('sePhotosDropZone');
    if (sePhotosZone) {
        sePhotosZone.addEventListener('dragover', (e) => { e.preventDefault(); sePhotosZone.classList.add('dragover'); });
        sePhotosZone.addEventListener('dragleave', () => sePhotosZone.classList.remove('dragover'));
        sePhotosZone.addEventListener('drop', (e) => {
            e.preventDefault(); sePhotosZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length) handleStoryPhotosUpload({ target: { files } });
        });
    }

    function saveStoryFromEditor(status) {
        var empresa = document.getElementById('seEmpresa').value.trim();
        var segmento = document.getElementById('seSegmento').value;
        var nome = document.getElementById('seNome').value.trim();
        var titulo = document.getElementById('seTitulo').value.trim();
        var desafio = document.getElementById('seDesafio').value.trim();
        var solucao = document.getElementById('seSolucao').value.trim();
        var resultados = document.getElementById('seResultados').value.trim();

        if (!empresa) { toast('Informe o nome da empresa.', 'error'); return; }
        if (!segmento) { toast('Selecione o segmento.', 'error'); return; }
        if (!nome) { toast('Informe o nome do contato.', 'error'); return; }
        if (!titulo) { toast('Informe o título da história.', 'error'); return; }
        if (!desafio) { toast('Descreva o desafio.', 'error'); return; }
        if (!solucao) { toast('Descreva a solução.', 'error'); return; }
        if (!resultados) { toast('Descreva os resultados.', 'error'); return; }

        var slug = generateSlugFromTitle(titulo);

        var payload = {
            company_name: empresa,
            segment: segmento,
            contact_name: nome,
            contact_role: document.getElementById('seCargo').value.trim(),
            challenge: desafio,
            solution: solucao,
            results: resultados,
            testimonial: document.getElementById('seDepoimento').value.trim(),
            logo_url: document.getElementById('seLogoData').value,
            cover_url: '',
            slug: slug,
            status: status,
            updated_at: new Date().toISOString()
        };

        var editId = document.getElementById('storyEditId').value;
        var url = SUPABASE_URL + '/rest/v1/customer_stories';
        var method = 'POST';
        var headers = {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + session.access_token,
            'Prefer': 'return=minimal'
        };

        if (editId) {
            url = url + '?id=eq.' + editId;
            method = 'PATCH';
        } else {
            payload.published_at = status === 'published' ? new Date().toISOString() : null;
        }

        supaFetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
            body: JSON.stringify(payload)
        }).then(function(res) {
            if (!res.ok) throw new Error('Erro ao salvar');
            toast(status === 'published' ? 'História publicada!' : 'Rascunho salvo!');
            clearStoryEditor();
            showView('stories');
        }).catch(function(e) {
            toast('Erro ao salvar história: ' + e.message, 'error');
        });
    }

    // ═══ COMMENTS MANAGEMENT ═══
    var supabaseComments = [];

    async function refreshComments() {
        try {
            var res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_comments?order=created_at.desc', {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token }
            });
            supabaseComments = res.ok ? await res.json() : [];
        } catch(e) { supabaseComments = []; }

        var pending = supabaseComments.filter(function(c) { return c.status === 'pending'; });
        var approved = supabaseComments.filter(function(c) { return c.status === 'approved'; });
        var rejected = supabaseComments.filter(function(c) { return c.status === 'rejected'; });

        var pendingEl = document.getElementById('statCommentsPending');
        var approvedEl = document.getElementById('statCommentsApproved');
        var rejectedEl = document.getElementById('statCommentsRejected');
        if (pendingEl) pendingEl.textContent = pending.length;
        if (approvedEl) approvedEl.textContent = approved.length;
        if (rejectedEl) rejectedEl.textContent = rejected.length;

        var tbody = document.getElementById('commentsTableBody');
        if (!tbody) return;

        if (supabaseComments.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--gray-500);">Nenhum comentário recebido.</td></tr>';
            return;
        }

        var articleMap = {};
        supabaseArticles.forEach(function(a) { articleMap[a.id] = a.title; });

        var STATUS_LABELS = { pending: 'Pendente', approved: 'Aprovado', rejected: 'Rejeitado' };
        var STATUS_COLORS = { pending: 'warning', approved: 'published', rejected: 'draft' };

        tbody.innerHTML = supabaseComments.map(function(c) {
            var statusClass = STATUS_COLORS[c.status] || 'draft';
            var statusLabel = STATUS_LABELS[c.status] || c.status;
            var articleTitle = articleMap[c.article_id] || 'Artigo #' + c.article_id;
            var commentPreview = c.comment.length > 60 ? c.comment.slice(0, 60) + '...' : c.comment;

            var actionBtns = '';
            if (c.status === 'pending') {
                actionBtns = '<button class="btn btn-primary btn-sm" onclick="updateCommentStatus(' + c.id + ',&apos;approved&apos;)" style="font-size:0.72rem;padding:4px 10px;"><i class="fas fa-check" style="margin-right:4px;"></i>Aprovar</button>' +
                    '<button class="btn btn-danger btn-sm" onclick="updateCommentStatus(' + c.id + ',&apos;rejected&apos;)" style="font-size:0.72rem;padding:4px 10px;"><i class="fas fa-ban" style="margin-right:4px;"></i>Rejeitar</button>';
            } else if (c.status === 'approved') {
                actionBtns = '<button class="btn btn-secondary btn-sm" onclick="updateCommentStatus(' + c.id + ',&apos;pending&apos;)" style="font-size:0.72rem;padding:4px 10px;"><i class="fas fa-undo" style="margin-right:4px;"></i>Despublicar</button>';
            } else {
                actionBtns = '<button class="btn btn-primary btn-sm" onclick="updateCommentStatus(' + c.id + ',&apos;approved&apos;)" style="font-size:0.72rem;padding:4px 10px;"><i class="fas fa-check" style="margin-right:4px;"></i>Aprovar</button>';
            }

            return '<tr>' +
                '<td><div>' +
                    '<strong style="display:block;">' + escapeHtml(c.name) + '</strong>' +
                    '<span style="font-size:0.78rem;color:var(--gray-500);">' + escapeHtml(c.email) + '</span>' +
                '</div></td>' +
                '<td style="max-width:250px;"><span style="font-size:0.85rem;">' + escapeHtml(commentPreview) + '</span></td>' +
                '<td style="font-size:0.82rem;max-width:180px;">' + escapeHtml(articleTitle.length > 40 ? articleTitle.slice(0, 40) + '...' : articleTitle) + '</td>' +
                '<td><span class="badge badge-' + statusClass + '">' + statusLabel + '</span></td>' +
                '<td style="font-size:0.82rem;">' + formatDate(c.created_at) + '</td>' +
                '<td><div style="display:flex;gap:4px;">' + actionBtns +
                    '<button class="btn btn-danger btn-icon btn-sm" onclick="deleteComment(' + c.id + ')" title="Excluir"><i class="fas fa-trash"></i></button>' +
                '</div></td>' +
            '</tr>';
        }).join('');
    }

    async function updateCommentStatus(id, newStatus) {
        try {
            await supaFetch(SUPABASE_URL + '/rest/v1/blog_comments?id=eq.' + id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
                body: JSON.stringify({ status: newStatus, updated_at: new Date().toISOString() })
            });
            toast(newStatus === 'approved' ? 'Comentário aprovado!' : newStatus === 'rejected' ? 'Comentário rejeitado.' : 'Status atualizado.');
            refreshComments();
        } catch(e) { toast('Erro ao atualizar.', 'error'); }
    }

    async function deleteComment(id) {
        if (!confirm('Excluir este comentário?')) return;
        try {
            await supaFetch(SUPABASE_URL + '/rest/v1/blog_comments?id=eq.' + id, {
                method: 'DELETE',
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token }
            });
            toast('Comentário excluído.');
            refreshComments();
        } catch(e) { toast('Erro ao excluir.', 'error'); }
    }

    // ═══ NOTIFICATIONS ═══
    function updateNotifications() {
        var pending = (supabaseStories || []).filter(function(s) { return s.status === 'pending'; });
        var badge = document.getElementById('notifBadge');
        var countEl = document.getElementById('notifCount');
        var list = document.getElementById('notifList');

        badge.textContent = pending.length;
        badge.setAttribute('data-count', pending.length);
        countEl.textContent = pending.length ? pending.length + ' pendente' + (pending.length > 1 ? 's' : '') : '';

        if (pending.length === 0) {
            list.innerHTML = '<div class="notif-dropdown__empty"><i class="fas fa-check-circle" style="font-size:1.5rem;margin-bottom:8px;display:block;color:var(--success);"></i>Nenhuma notificação pendente</div>';
            return;
        }

        list.innerHTML = pending.map(function(s) {
            var date = s.created_at ? new Date(s.created_at).toLocaleDateString('pt-BR') : '';
            var challenge = s.challenge || '';
            return '<div class="notif-dropdown__item" onclick="showView(&apos;stories&apos;);closeNotifDropdown();">' +
                '<div class="notif-dropdown__title"><i class="fas fa-clock" style="color:#F59E0B;margin-right:6px;"></i>' + escapeHtml(s.company_name || 'Empresa') + ' enviou uma história</div>' +
                '<div class="notif-dropdown__meta">"' + escapeHtml(challenge.slice(0, 50)) + (challenge.length > 50 ? '...' : '') + '" · ' + date + '</div>' +
            '</div>';
        }).join('');
    }

    function toggleNotifDropdown() {
        document.getElementById('notifDropdown').classList.toggle('open');
    }

    function closeNotifDropdown() {
        document.getElementById('notifDropdown').classList.remove('open');
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#notifBellWrapper')) {
            closeNotifDropdown();
        }
    });

    // ═══ BANNERS CRUD ═══
    var supabaseBanners = [];

    async function refreshBanners() {
        try {
            var res = await supaFetch(SUPABASE_URL + '/rest/v1/site_banners?order=priority.desc,created_at.desc');
            supabaseBanners = res.ok ? await res.json() : [];
        } catch(e) { supabaseBanners = []; }
        var tbody = document.getElementById('bannersTableBody');
        if (!tbody) return;
        if (supabaseBanners.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--gray-500);">Nenhum banner cadastrado.</td></tr>';
            return;
        }
        var modeLabels = { bar: 'Barra', image: 'Imagem' };
        var posLabels = { 'above-header': 'Acima do header', 'below-header': 'Abaixo do header', 'floating-bottom': 'Rodape flutuante' };
        tbody.innerHTML = supabaseBanners.map(function(bn) {
            var s = bn.start_date ? new Date(bn.start_date).toLocaleDateString('pt-BR') : 'Sempre';
            var e = bn.end_date ? new Date(bn.end_date).toLocaleDateString('pt-BR') : 'Sem fim';
            return '<tr>' +
                '<td><button class="badge ' + (bn.active ? 'badge-published' : 'badge-draft') + '" style="cursor:pointer;border:none;" onclick="toggleBannerActive(\\'' + bn.id + '\\',' + bn.active + ')">' + (bn.active ? 'Ativo' : 'Inativo') + '</button></td>' +
                '<td>' + escapeHtml(modeLabels[bn.display_mode] || bn.display_mode) + '</td>' +
                '<td style="font-size:0.85rem;">' + escapeHtml(posLabels[bn.position] || bn.position) + '</td>' +
                '<td><strong>' + escapeHtml(bn.title || '(sem titulo)') + '</strong></td>' +
                '<td style="font-size:0.82rem;color:var(--gray-500);">' + s + ' - ' + e + '</td>' +
                '<td><div style="display:flex;gap:4px;">' +
                    '<button class="btn btn-secondary btn-icon btn-sm" onclick="editBanner(\\'' + bn.id + '\\')" title="Editar"><i class="fas fa-pen"></i></button>' +
                    '<button class="btn btn-danger btn-icon btn-sm" onclick="deleteBanner(\\'' + bn.id + '\\')" title="Excluir"><i class="fas fa-trash"></i></button>' +
                '</div></td>' +
            '</tr>';
        }).join('');
    }

    function openBannerModal() {
        document.getElementById('bnId').value = '';
        document.getElementById('bnDisplayMode').value = 'bar';
        document.getElementById('bnPosition').value = 'above-header';
        document.getElementById('bnTitle').value = '';
        document.getElementById('bnDescription').value = '';
        document.getElementById('bnCtaText').value = '';
        document.getElementById('bnCtaUrl').value = '';
        document.getElementById('bnBgColor').value = '#ffba1a';
        document.getElementById('bnTextColor').value = '#0D1117';
        document.getElementById('bnDismissible').checked = true;
        document.getElementById('bnStartDate').value = '';
        document.getElementById('bnEndDate').value = '';
        document.getElementById('bnPriority').value = '0';
        document.getElementById('bnImageData').value = '';
        document.getElementById('bnImagePreview').innerHTML = '';
        document.getElementById('bnImageGroup').style.display = 'block';
        document.getElementById('bannerModalTitle').textContent = 'Novo Banner';
        document.getElementById('bannerModal').classList.add('active');
    }

    function closeBannerModal() {
        document.getElementById('bannerModal').classList.remove('active');
    }

    function editBanner(id) {
        var bn = supabaseBanners.find(function(b) { return b.id === id; });
        if (!bn) return;
        document.getElementById('bnId').value = bn.id;
        document.getElementById('bnDisplayMode').value = bn.display_mode || 'bar';
        document.getElementById('bnPosition').value = bn.position || 'above-header';
        document.getElementById('bnTitle').value = bn.title || '';
        document.getElementById('bnDescription').value = bn.description || '';
        document.getElementById('bnCtaText').value = bn.cta_text || '';
        document.getElementById('bnCtaUrl').value = bn.cta_url || '';
        document.getElementById('bnBgColor').value = bn.bg_color || '#ffba1a';
        document.getElementById('bnTextColor').value = bn.text_color || '#0D1117';
        document.getElementById('bnDismissible').checked = bn.dismissible !== false;
        document.getElementById('bnStartDate').value = bn.start_date ? bn.start_date.slice(0, 16) : '';
        document.getElementById('bnEndDate').value = bn.end_date ? bn.end_date.slice(0, 16) : '';
        document.getElementById('bnPriority').value = bn.priority || 0;
        document.getElementById('bnImageData').value = bn.image_data || '';
        document.getElementById('bnImagePreview').innerHTML = bn.image_data ? '<img src="' + bn.image_data + '" style="max-width:100%;border-radius:8px;">' : '';
        document.getElementById('bnImageGroup').style.display = bn.display_mode === 'image' ? 'block' : 'block';
        document.getElementById('bannerModalTitle').textContent = 'Editar Banner';
        document.getElementById('bannerModal').classList.add('active');
    }

    function saveBanner() {
        var mode = document.getElementById('bnDisplayMode').value;
        var title = document.getElementById('bnTitle').value.trim();
        if (mode === 'bar' && !title) { toast('Informe o titulo do banner.', 'error'); return; }
        if (mode === 'image' && !document.getElementById('bnImageData').value) { toast('Selecione uma imagem para o banner.', 'error'); return; }
        var id = document.getElementById('bnId').value;
        var sd = document.getElementById('bnStartDate').value;
        var ed = document.getElementById('bnEndDate').value;
        var payload = {
            title: title,
            description: document.getElementById('bnDescription').value.trim(),
            cta_text: document.getElementById('bnCtaText').value.trim(),
            cta_url: document.getElementById('bnCtaUrl').value.trim(),
            image_data: document.getElementById('bnImageData').value,
            display_mode: mode,
            position: document.getElementById('bnPosition').value,
            dismissible: document.getElementById('bnDismissible').checked,
            bg_color: document.getElementById('bnBgColor').value,
            text_color: document.getElementById('bnTextColor').value,
            start_date: sd ? new Date(sd).toISOString() : null,
            end_date: ed ? new Date(ed).toISOString() : null,
            priority: parseInt(document.getElementById('bnPriority').value) || 0,
            updated_at: new Date().toISOString()
        };
        var url = SUPABASE_URL + '/rest/v1/site_banners';
        var method = 'POST';
        if (id) { url += '?id=eq.' + id; method = 'PATCH'; }
        supaFetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
            body: JSON.stringify(payload)
        }).then(function(res) {
            if (!res.ok) throw new Error('Erro ao salvar');
            closeBannerModal(); refreshBanners(); toast('Banner salvo!');
        }).catch(function(err) { toast('Erro ao salvar banner: ' + err.message, 'error'); });
    }

    function deleteBanner(id) {
        if (!confirm('Excluir este banner?')) return;
        supaFetch(SUPABASE_URL + '/rest/v1/site_banners?id=eq.' + id, { method: 'DELETE' })
        .then(function(res) {
            if (!res.ok) throw new Error('Erro');
            refreshBanners(); toast('Banner excluido.');
        }).catch(function() { toast('Erro ao excluir banner.', 'error'); });
    }

    function toggleBannerActive(id, current) {
        supaFetch(SUPABASE_URL + '/rest/v1/site_banners?id=eq.' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
            body: JSON.stringify({ active: !current, updated_at: new Date().toISOString() })
        }).then(function(res) {
            if (!res.ok) throw new Error('Erro');
            refreshBanners(); toast(!current ? 'Banner ativado!' : 'Banner desativado.');
        }).catch(function() { toast('Erro ao alterar status.', 'error'); });
    }

    function handleBnImageUpload(event) {
        var file = event.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { toast('Imagem muito grande. Max 2MB.', 'error'); return; }
        if (!file.type.startsWith('image/')) { toast('Selecione um arquivo de imagem.', 'error'); return; }
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('bnImageData').value = e.target.result;
            document.getElementById('bnImagePreview').innerHTML = '<img src="' + e.target.result + '" style="max-width:100%;border-radius:8px;">';
        };
        reader.readAsDataURL(file);
    }

    // ═══ Expose functions to global scope (required for onclick handlers) ═══
    window.showView = showView;
    window.logout = logout;
    window.toggleNotifDropdown = toggleNotifDropdown;
    window.closeNotifDropdown = closeNotifDropdown;
    window.saveArticle = saveArticle;
    window.execCmd = execCmd;
    window.insertBlockquote = insertBlockquote;
    window.insertLink = insertLink;
    window.insertImage = insertImage;
    window.insertImageFromFile = insertImageFromFile;
    window.switchImageTab = switchImageTab;
    window.handleImageUpload = handleImageUpload;
    window.showImagePreview = showImagePreview;
    window.removeImage = removeImage;
    window.previewFeaturedImage = previewFeaturedImage;
    window.editArticle = editArticle;
    window.duplicateArticle = duplicateArticle;
    window.confirmDeleteArticle = confirmDeleteArticle;
    window.viewArticle = viewArticle;
    window.previewArticle = previewArticle;
    window.exportArticleHTML = exportArticleHTML;
    window.clearEditor = clearEditor;
    window.newArticle = newArticle;
    window.generateSlug = generateSlug;
    window.openLeadMagnetModal = openLeadMagnetModal;
    window.closeLeadMagnetModal = closeLeadMagnetModal;
    window.editLeadMagnet = editLeadMagnet;
    window.saveLeadMagnet = saveLeadMagnet;
    window.deleteLeadMagnet = deleteLeadMagnet;
    window.handleLmImageUpload = handleLmImageUpload;
    window.generateAIImage = generateAIImage;
    window.autoGeneratePrompt = autoGeneratePrompt;
    window.handleAuthorAvatarUpload = handleAuthorAvatarUpload;
    window.removeAuthorAvatar = removeAuthorAvatar;
    window.handleCtaBannerImageUpload = handleCtaBannerImageUpload;
    window.openUserModal = openUserModal;
    window.editUser = editUser;
    window.closeUserModal = closeUserModal;
    window.saveUser = saveUser;
    window.confirmDeleteUser = confirmDeleteUser;
    window.closeDeleteModal = closeDeleteModal;
    window.refreshStories = refreshStories;
    window.updateStoryStatus = updateStoryStatus;
    window.deleteStory = deleteStory;
    window.refreshComments = refreshComments;
    window.updateCommentStatus = updateCommentStatus;
    window.deleteComment = deleteComment;
    window.viewStoryDetail = viewStoryDetail;
    window.closeStoryDetail = closeStoryDetail;
    window.clearStoryEditor = clearStoryEditor;
    window.editStoryInEditor = editStoryInEditor;
    window.handleStoryLogoUpload = handleStoryLogoUpload;
    window.handleStoryPhotosUpload = handleStoryPhotosUpload;
    window.saveStoryFromEditor = saveStoryFromEditor;
    window.toggleSidebar = toggleSidebar;
    window.openBannerModal = openBannerModal;
    window.closeBannerModal = closeBannerModal;
    window.editBanner = editBanner;
    window.saveBanner = saveBanner;
    window.deleteBanner = deleteBanner;
    window.toggleBannerActive = toggleBannerActive;
    window.handleBnImageUpload = handleBnImageUpload;
    window.updateSeoScore = updateSeoScore;
    window.onCategoryChange = onCategoryChange;

    // ═══ INIT ═══
    initUI();
    updateNotifications();
    </script>
`;
