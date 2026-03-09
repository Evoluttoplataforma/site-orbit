# Orbit Gestão — Site Institucional

Site institucional da **Orbit Gestão** — plataforma de gestão estratégica com IA para médias empresas. Projeto estático (HTML/CSS/JS puro) com design inspirado no Zoom.com.

**Slogan:** "Onde a Estratégia vira Execução"

## Quick Start

```bash
cd site/
python3 -m http.server 8080
# Abra http://localhost:8080
```

## Estrutura

```
site/
├── CLAUDE.md                 # Contexto completo do projeto para Claude Code
├── README.md                 # Este arquivo
├── index.html                # Homepage (v2 Zoom-style)
├── css/
│   ├── styles-v2.css         # ★ Design system ativo (v2)
│   └── styles.css            # Legado v1 (blog/parcerias)
├── js/
│   ├── main-v2.js            # ★ JS ativo homepage (v2)
│   └── main.js               # Legado v1
├── images/
│   ├── logo-orbit.svg        # Logo SVG
│   └── manual-marca.pdf      # Manual de marca
├── pages/
│   ├── processos.html        # Módulo Processos (v2)
│   ├── indicadores.html      # Módulo Indicadores (v2)
│   ├── tarefas.html          # Módulo Tarefas (v2)
│   ├── competencias.html     # Módulo Competências (v2)
│   ├── auditorias.html       # Módulo Auditorias (v2)
│   ├── blog.html             # Blog (v1 — pendente migração)
│   └── parcerias.html        # Parcerias (v1 — pendente migração)
├── blog/                     # Artigos individuais (futuro)
└── docs/
    ├── ARCHITECTURE.md        # Arquitetura detalhada
    └── DESIGN-SYSTEM.md       # Design system completo
```

## Identidade Visual

| Elemento | Valor |
|----------|-------|
| Cor primária (amarelo) | `#FDB73F` |
| Cor secundária (preto) | `#000000` |
| Fonte | Poppins (Google Fonts) |
| Ícones | Font Awesome 6 |

## Documentação

- **[CLAUDE.md](./CLAUDE.md)** — Contexto completo para Claude Code (lê automaticamente)
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — Arquitetura técnica, estrutura CSS/JS, templates
- **[docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md)** — Cores, tipografia, componentes, efeitos visuais

## Stack

- HTML5 semântico
- CSS3 com Custom Properties (variáveis `:root`)
- JavaScript vanilla (ES6+)
- Google Fonts (Poppins 300–900)
- Font Awesome 6
- Google Tag Manager (tracking de formulário)

## Páginas v2 (ativas)

| Página | Seções |
|--------|--------|
| Homepage | Hero, Carousel, Tabs, Marquee, Stats, Depoimentos, Integração, Blog, Formulário, Footer |
| 5 Módulos | Hero, Módulos Strip, Benefícios, Features, Detalhe, Depoimento, CTA, Footer |

## Pendências

- [ ] Substituir imagens placeholder por screenshots reais
- [ ] Conectar formulário a webhook real
- [ ] Instalar GTM container
- [ ] Migrar blog.html e parcerias.html para v2
- [ ] SEO (meta tags OG, sitemap.xml, robots.txt)
- [ ] Minificar CSS/JS para produção
