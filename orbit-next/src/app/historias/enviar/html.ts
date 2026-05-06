// Auto-generated from site/historias/enviar.html
export const pageHTML = `
    <section class="story-hero" data-reveal>
        <div class="story-hero__bg">
            <div class="story-hero__glow story-hero__glow--1"></div>
            <div class="story-hero__glow story-hero__glow--2"></div>
        </div>
        <div class="container">
            <div class="story-hero__badge"><i class="fas fa-star"></i> Histórias de Clientes</div>
            <h1 class="story-hero__title">Conte sua história <span>com a Orbit</span></h1>
            <p class="story-hero__subtitle">Sua experiência pode inspirar outras empresas a transformarem sua gestão. Compartilhe como a Orbit Gestão fez a diferença no seu negócio.</p>
        </div>
    </section>

    <!-- Form -->
    <section class="story-form-section" data-reveal>
        <form id="storyForm" class="story-form-card" novalidate>

            <!-- Customer Info -->
            <div class="form-section">
                <div class="form-section__header">
                    <div class="form-section__icon"><i class="fas fa-user"></i></div>
                    <div>
                        <div class="form-section__title">Informações Pessoais</div>
                        <div class="form-section__desc">Dados de contato para identificação</div>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Nome completo <span class="required">*</span></label>
                        <input type="text" name="nomeCompleto" required placeholder="Seu nome completo">
                        <span class="error-msg">Campo obrigatório</span>
                    </div>
                    <div class="form-group">
                        <label>Email <span class="required">*</span></label>
                        <input type="email" name="email" required placeholder="seu@email.com">
                        <span class="error-msg">Informe um email válido</span>
                    </div>
                    <div class="form-group">
                        <label>Telefone <span class="required">*</span></label>
                        <input type="tel" name="telefone" required placeholder="(00) 00000-0000" id="telefoneInput">
                        <span class="error-msg">Informe um telefone válido</span>
                    </div>
                    <div class="form-group">
                        <label>Cargo / Função <span class="required">*</span></label>
                        <input type="text" name="cargo" required placeholder="Ex: Gerente de Qualidade">
                        <span class="error-msg">Campo obrigatório</span>
                    </div>
                    <div class="form-group">
                        <label>Empresa <span class="required">*</span></label>
                        <input type="text" name="empresa" required placeholder="Nome da empresa">
                        <span class="error-msg">Campo obrigatório</span>
                    </div>
                    <div class="form-group">
                        <label>Segmento da empresa <span class="required">*</span></label>
                        <select name="segmento" required>
                            <option value="">Selecione o segmento</option>
                            <option value="Indústria">Indústria</option>
                            <option value="Serviços">Serviços</option>
                            <option value="Tecnologia">Tecnologia</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Educação">Educação</option>
                            <option value="Varejo">Varejo</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Agronegócio">Agronegócio</option>
                            <option value="Outro">Outro</option>
                        </select>
                        <span class="error-msg">Selecione um segmento</span>
                    </div>
                </div>
            </div>

            <!-- Social Media -->
            <div class="form-section">
                <div class="form-section__header">
                    <div class="form-section__icon"><i class="fas fa-share-nodes"></i></div>
                    <div>
                        <div class="form-section__title">Redes Sociais</div>
                        <div class="form-section__desc">Links opcionais para enriquecer sua história</div>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>LinkedIn <span class="optional">(opcional)</span></label>
                        <input type="url" name="linkedin" placeholder="https://linkedin.com/in/seu-perfil">
                    </div>
                    <div class="form-group">
                        <label>Instagram <span class="optional">(opcional)</span></label>
                        <input type="url" name="instagram" placeholder="https://instagram.com/seu-perfil">
                    </div>
                    <div class="form-group full-width">
                        <label>Website da empresa <span class="optional">(opcional)</span></label>
                        <input type="url" name="website" placeholder="https://suaempresa.com.br">
                    </div>
                </div>
            </div>

            <!-- Story -->
            <div class="form-section">
                <div class="form-section__header">
                    <div class="form-section__icon"><i class="fas fa-pen-fancy"></i></div>
                    <div>
                        <div class="form-section__title">Sua História</div>
                        <div class="form-section__desc">Conte em detalhes como a Orbit impactou sua empresa</div>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label>Título da sua história <span class="required">*</span></label>
                        <input type="text" name="titulo" required placeholder="Ex: Empresa X: 40% Menos Retrabalho">
                        <span class="error-msg">Campo obrigatório</span>
                    </div>
                    <div class="form-group full-width">
                        <label>Subtítulo</label>
                        <input type="text" name="subtitulo" placeholder="Ex: Como utilizamos automação para otimizar processos manuais">
                    </div>
                    <div class="form-group full-width">
                        <label>Qual era o desafio antes da Orbit? <span class="required">*</span></label>
                        <textarea name="desafio" required placeholder="Descreva os problemas e desafios que sua empresa enfrentava antes de usar a Orbit Gestão..."></textarea>
                        <span class="error-msg">Campo obrigatório</span>
                    </div>
                    <div class="form-group full-width">
                        <label>Como a Orbit ajudou a resolver? <span class="required">*</span></label>
                        <textarea name="solucao" required placeholder="Conte como a plataforma foi implementada e quais funcionalidades fizeram a diferença..."></textarea>
                        <span class="error-msg">Campo obrigatório</span>
                    </div>
                    <div class="form-group full-width">
                        <label>Quais resultados alcançados? <span class="required">*</span></label>
                        <textarea name="resultados" required placeholder="Compartilhe números, métricas, melhorias concretas que sua empresa obteve..."></textarea>
                        <span class="error-msg">Campo obrigatório</span>
                    </div>
                    <div class="form-group full-width">
                        <label>Depoimento livre / Mensagem adicional <span class="optional">(opcional)</span></label>
                        <textarea name="depoimento" placeholder="Fique à vontade para deixar uma mensagem adicional, dica ou depoimento pessoal..."></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label>Quais módulos utiliza?</label>
                        <div class="checkbox-grid">
                            <label class="checkbox-item">
                                <input type="checkbox" name="modulos" value="Processos">
                                <span>Processos</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="modulos" value="Indicadores">
                                <span>Indicadores</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="modulos" value="Tarefas">
                                <span>Tarefas</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="modulos" value="Competências">
                                <span>Competências</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="modulos" value="Auditorias">
                                <span>Auditorias</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="modulos" value="Orbit IA">
                                <span>Orbit IA</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Media -->
            <div class="form-section">
                <div class="form-section__header">
                    <div class="form-section__icon"><i class="fas fa-image"></i></div>
                    <div>
                        <div class="form-section__title">Mídia</div>
                        <div class="form-section__desc">Fotos, vídeos e logo para ilustrar sua história</div>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label>Upload de fotos <span class="optional">(até 5 imagens, máx. 2MB cada)</span></label>
                        <div class="file-upload-area" id="photosUploadArea">
                            <input type="file" id="photosInput" accept="image/*" multiple>
                            <i class="fas fa-cloud-arrow-up"></i>
                            <p>Arraste fotos aqui ou clique para selecionar</p>
                            <span class="upload-hint">JPG, PNG ou WebP - Máximo 5 imagens de 2MB cada</span>
                        </div>
                        <div class="thumbnail-grid" id="photosThumbnails"></div>
                    </div>
                    <div class="form-group full-width">
                        <label>URL de vídeo do YouTube ou Vimeo <span class="optional">(opcional)</span></label>
                        <input type="text" name="videoUrl" placeholder="https://youtube.com/watch?v=... ou https://vimeo.com/...">
                    </div>
                    <div class="form-group full-width">
                        <label>Logo da empresa <span class="optional">(opcional, máx. 2MB)</span></label>
                        <div class="file-upload-area" id="logoUploadArea">
                            <input type="file" id="logoInput" accept="image/*">
                            <i class="fas fa-building"></i>
                            <p>Arraste o logo aqui ou clique para selecionar</p>
                            <span class="upload-hint">JPG, PNG ou SVG - Máximo 2MB</span>
                        </div>
                        <div class="logo-preview" id="logoPreview">
                            <img id="logoPreviewImg" alt="Logo preview">
                            <button type="button" class="remove-thumb" id="removeLogo" title="Remover logo" style="margin-top:8px;width:auto;height:auto;border-radius:6px;padding:4px 12px;font-size:0.78rem;background:var(--error);color:#fff;border:none;cursor:pointer;">
                                <i class="fas fa-trash"></i> Remover
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Consent -->
            <div class="consent-section">
                <label class="consent-label">
                    <input type="checkbox" name="consentimento" id="consentCheckbox" required>
                    <span>Autorizo a Orbit Gestão a publicar minha história no site, incluindo nome, empresa e imagens enviadas. <span class="required">*</span></span>
                </label>
                <span class="error-msg" id="consentError" style="margin-left:32px;">Você precisa autorizar para enviar</span>
            </div>

            <!-- Submit -->
            <div class="submit-section">
                <button type="submit" class="submit-btn" id="submitBtn">
                    <i class="fas fa-paper-plane"></i> Enviar minha história
                </button>
            </div>

        </form>
    </section>

    <!-- Success Overlay -->
    <div class="success-overlay" id="successOverlay">
        <div class="success-card">
            <div class="success-card__icon"><i class="fas fa-check-circle"></i></div>
            <h3>História enviada com sucesso!</h3>
            <p>Obrigado por compartilhar sua experiência. Nossa equipe irá revisar sua história e em breve ela poderá ser publicada no site.</p>
            <a href="/historias" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Ver Histórias</a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="footer-logo"><img src="/images/logo-orbit-white.png" alt="Orbit Gestão" height="36"></div>
                    <p data-i18n="footer.tagline">Plataforma de gestão com IA. Contrate um time que executa.</p>
                    <div class="social-hover">
                        <a href="https://wa.me/554898149776" target="_blank" rel="noopener nofollow" class="social-hover__item" data-name="WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                            <span class="social-hover__label">WhatsApp</span>
                        </a>
                        <a href="https://www.instagram.com/orbitgestao/" target="_blank" rel="noopener" class="social-hover__item" data-name="Instagram">
                            <i class="fab fa-instagram"></i>
                            <span class="social-hover__label">Instagram</span>
                        </a>
                        <a href="https://www.youtube.com/@Orbit.Gest%C3%A3o" target="_blank" rel="noopener" class="social-hover__item" data-name="YouTube">
                            <i class="fab fa-youtube"></i>
                            <span class="social-hover__label">YouTube</span>
                        </a>
                    </div>
                </div>
                <div class="footer-column">
                    <h5 data-i18n="footer.contact">Contato</h5>
                    <ul class="footer-contact">                        <li><a href="https://wa.me/554898149776" target="_blank" rel="noopener nofollow" style="color:inherit;text-decoration:none;"><i class="fab fa-whatsapp"></i> (48) 9814-9776</a></li>
                        <li><i class="fas fa-map-marker-alt"></i> Square SC, Florianópolis - SC</li>
                    </ul>
                </div>
                

                <div class="footer-column">
                    <h5 data-i18n="footer.content">Conteúdo</h5>
                    <ul>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/historias" data-i18n="footer.stories">Histórias de Clientes</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                    <h5 style="margin-top: 20px;" data-i18n="footer.company">Empresa</h5>
                    <ul>
                        <li><a href="/sobre" data-i18n="footer.about">Sobre Nós</a></li>
                        <li><a href="/consultores" data-i18n="footer.partners">Seja Parceiro</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p data-i18n="footer.rights">&copy; 2026 Orbit - Grupo GSN. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Back to Top -->
    <button class="back-to-top" id="backToTop" style="display:none;">
        <i class="fas fa-arrow-up"></i>
    </button>

    <script>
    // Mobile menu, header scroll, dropdowns handled by PageLayout.tsx

    // ========== Phone Mask ==========
    const telefoneInput = document.getElementById('telefoneInput');
    telefoneInput.addEventListener('input', function () {
        let v = this.value.replace(/\\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 6) {
            this.value = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
        } else if (v.length > 2) {
            this.value = '(' + v.slice(0, 2) + ') ' + v.slice(2);
        } else if (v.length > 0) {
            this.value = '(' + v;
        }
    });

    // ========== Photo Upload ==========
    const photosInput = document.getElementById('photosInput');
    const photosArea = document.getElementById('photosUploadArea');
    const photosThumbnails = document.getElementById('photosThumbnails');
    let uploadedPhotos = []; // { file, base64 }

    ['dragenter', 'dragover'].forEach(evt => {
        photosArea.addEventListener(evt, e => { e.preventDefault(); photosArea.classList.add('dragover'); });
    });
    ['dragleave', 'drop'].forEach(evt => {
        photosArea.addEventListener(evt, e => { e.preventDefault(); photosArea.classList.remove('dragover'); });
    });
    photosArea.addEventListener('drop', e => {
        handlePhotoFiles(e.dataTransfer.files);
    });
    photosInput.addEventListener('change', () => {
        handlePhotoFiles(photosInput.files);
        photosInput.value = '';
    });

    function handlePhotoFiles(files) {
        const remaining = 5 - uploadedPhotos.length;
        const toProcess = Array.from(files).slice(0, remaining);
        toProcess.forEach(file => {
            if (!file.type.startsWith('image/')) return;
            if (file.size > 2 * 1024 * 1024) {
                alert('A imagem "' + file.name + '" excede 2MB. Por favor, escolha uma imagem menor.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedPhotos.push({ name: file.name, base64: e.target.result });
                renderPhotoThumbnails();
            };
            reader.readAsDataURL(file);
        });
    }

    function renderPhotoThumbnails() {
        photosThumbnails.innerHTML = uploadedPhotos.map((p, i) =>
            '<div class="thumbnail-item">' +
                '<img src="' + p.base64 + '" alt="' + p.name + '">' +
                '<button type="button" class="remove-thumb" onclick="removePhoto(' + i + ')" title="Remover">&times;</button>' +
            '</div>'
        ).join('');
    }

    function removePhoto(index) {
        uploadedPhotos.splice(index, 1);
        renderPhotoThumbnails();
    }

    // ========== Logo Upload ==========
    const logoInput = document.getElementById('logoInput');
    const logoArea = document.getElementById('logoUploadArea');
    const logoPreview = document.getElementById('logoPreview');
    const logoPreviewImg = document.getElementById('logoPreviewImg');
    const removeLogo = document.getElementById('removeLogo');
    let uploadedLogo = null;

    ['dragenter', 'dragover'].forEach(evt => {
        logoArea.addEventListener(evt, e => { e.preventDefault(); logoArea.classList.add('dragover'); });
    });
    ['dragleave', 'drop'].forEach(evt => {
        logoArea.addEventListener(evt, e => { e.preventDefault(); logoArea.classList.remove('dragover'); });
    });
    logoArea.addEventListener('drop', e => {
        handleLogoFile(e.dataTransfer.files[0]);
    });
    logoInput.addEventListener('change', () => {
        if (logoInput.files[0]) handleLogoFile(logoInput.files[0]);
        logoInput.value = '';
    });

    function handleLogoFile(file) {
        if (!file || !file.type.startsWith('image/')) return;
        if (file.size > 2 * 1024 * 1024) {
            alert('O arquivo excede 2MB. Por favor, escolha uma imagem menor.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedLogo = e.target.result;
            logoPreviewImg.src = uploadedLogo;
            logoPreview.style.display = 'block';
            logoArea.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    removeLogo.addEventListener('click', () => {
        uploadedLogo = null;
        logoPreview.style.display = 'none';
        logoArea.style.display = '';
    });

    // ========== Form Submission ==========
    const form = document.getElementById('storyForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validateForm()) return;

        const fd = new FormData(form);
        const modulos = Array.from(form.querySelectorAll('input[name="modulos"]:checked')).map(c => c.value);

        const titulo = fd.get('titulo');
        const empresa = fd.get('empresa');
        const slug = (empresa || titulo)
            .toLowerCase()
            .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
            .replace(/[^a-z0-9\\s-]/g, '')
            .replace(/\\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 80);

        const story = {
            id: 'cs_' + Date.now(),
            slug: slug,
            status: 'pending',
            nome: fd.get('nomeCompleto'),
            email: fd.get('email'),
            telefone: fd.get('telefone'),
            cargo: fd.get('cargo'),
            empresa: fd.get('empresa'),
            segmento: fd.get('segmento'),
            linkedin: fd.get('linkedin'),
            instagram: fd.get('instagram'),
            website: fd.get('website'),
            titulo: fd.get('titulo'),
            subtitulo: fd.get('subtitulo'),
            desafio: fd.get('desafio'),
            solucao: fd.get('solucao'),
            resultados: fd.get('resultados'),
            depoimento: fd.get('depoimento'),
            modulos: modulos,
            videoUrl: fd.get('videoUrl'),
            photos: uploadedPhotos.map(p => p.base64),
            companyLogo: uploadedLogo,
            consentimento: true,
            createdAt: new Date().toISOString()
        };

        // Save to Supabase
        var SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
        var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';
        fetch(SB_URL + '/rest/v1/customer_stories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SB_KEY,
                'Authorization': 'Bearer ' + SB_KEY,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                company_name: story.empresa,
                contact_name: story.nome + (story.email ? ' | ' + story.email : '') + (story.telefone ? ' | ' + story.telefone : ''),
                contact_role: story.cargo,
                segment: story.segmento,
                slug: story.slug,
                title: story.titulo,
                subtitle: story.subtitulo || null,
                challenge: story.desafio,
                solution: story.solucao,
                results: story.resultados,
                testimonial: story.depoimento + (story.modulos && story.modulos.length ? '\\n\\nMódulos: ' + story.modulos.join(', ') : '') + (story.videoUrl ? '\\n\\nVídeo: ' + story.videoUrl : '') + (story.linkedin ? '\\nLinkedIn: ' + story.linkedin : '') + (story.instagram ? '\\nInstagram: ' + story.instagram : '') + (story.website ? '\\nSite: ' + story.website : ''),
                logo_url: story.companyLogo || null,
                status: 'pending'
            })
        }).catch(function(e) { console.warn('Erro ao salvar historia:', e); });

        // DataLayer push
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'customer_story_submit',
            empresa: story.empresa,
            email: story.email
        });

        // Show success
        document.getElementById('successOverlay').classList.add('active');
        form.reset();
        uploadedPhotos = [];
        uploadedLogo = null;
        photosThumbnails.innerHTML = '';
        logoPreview.style.display = 'none';
        logoArea.style.display = '';
    });

    function validateForm() {
        let valid = true;

        // Clear previous errors
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        form.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');

        // Required text/email/tel/select fields
        form.querySelectorAll('[required]').forEach(field => {
            if (field.type === 'checkbox') return; // handle consent separately
            const val = field.value.trim();
            if (!val) {
                field.classList.add('error');
                const msg = field.closest('.form-group')?.querySelector('.error-msg');
                if (msg) msg.style.display = 'block';
                valid = false;
            }
        });

        // Email validation
        const emailField = form.querySelector('[name="email"]');
        if (emailField.value && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(emailField.value.trim())) {
            emailField.classList.add('error');
            const msg = emailField.closest('.form-group')?.querySelector('.error-msg');
            if (msg) msg.style.display = 'block';
            valid = false;
        }

        // Phone validation (at least 14 chars with mask)
        const phoneField = form.querySelector('[name="telefone"]');
        if (phoneField.value && phoneField.value.replace(/\\D/g, '').length < 10) {
            phoneField.classList.add('error');
            const msg = phoneField.closest('.form-group')?.querySelector('.error-msg');
            if (msg) msg.style.display = 'block';
            valid = false;
        }

        // Consent
        const consent = document.getElementById('consentCheckbox');
        const consentError = document.getElementById('consentError');
        if (!consent.checked) {
            consentError.style.display = 'block';
            valid = false;
        } else {
            consentError.style.display = 'none';
        }

        // Scroll to first error
        if (!valid) {
            const firstError = form.querySelector('.error, .error-msg[style*="block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return valid;
    }

    // Remove error on input
    form.addEventListener('input', function (e) {
        if (e.target.classList.contains('error')) {
            e.target.classList.remove('error');
            const msg = e.target.closest('.form-group')?.querySelector('.error-msg');
            if (msg) msg.style.display = 'none';
        }
    });
    form.addEventListener('change', function (e) {
        if (e.target.classList.contains('error')) {
            e.target.classList.remove('error');
            const msg = e.target.closest('.form-group')?.querySelector('.error-msg');
            if (msg) msg.style.display = 'none';
        }
        if (e.target.id === 'consentCheckbox') {
            document.getElementById('consentError').style.display = e.target.checked ? 'none' : 'block';
        }
    });

    // Close success overlay on background click
    document.getElementById('successOverlay').addEventListener('click', function (e) {
        if (e.target === this) this.classList.remove('active');
    });
    </script>

    <!-- Scroll Reveal -->
    <script>
    (function() {
        var els = document.querySelectorAll('[data-reveal],[data-reveal-stagger]');
        document.body.classList.add('reveal-ready');
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed');
                        io.unobserve(e.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            els.forEach(function(el) { io.observe(el); });
        }
        // Fallback: force reveal all after 800ms in case observer didn't fire
        setTimeout(function() {
            els.forEach(function(el) { el.classList.add('revealed'); });
        }, 800);
    })();
    </script>
    <script src="/js/seo.js"></script>
`;
