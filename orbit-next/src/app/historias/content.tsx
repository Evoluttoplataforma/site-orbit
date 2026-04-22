'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';

const SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

const SEGMENTS: Record<string, string> = {
  industria: 'Indústria',
  servicos: 'Serviços',
  tecnologia: 'Tecnologia',
  saude: 'Saúde',
  educacao: 'Educação',
  varejo: 'Varejo',
  financeiro: 'Financeiro',
  agronegocio: 'Agronegócio',
  outro: 'Outro',
};

function escapeHtml(str: string) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

interface Story {
  id: number;
  slug: string;
  empresa: string;
  nome: string;
  cargo: string;
  segmento: string;
  desafio: string;
  solucao: string;
  resultados: string;
  depoimento: string;
  companyLogo: string;
  createdAt: string;
}

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const storiesRef = useRef<Story[]>([]);

  useEffect(() => { setMounted(true); }, []);

  const initScripts = useCallback(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('script').forEach(oldScript => {
      if (oldScript.src) {
        const s = document.createElement('script');
        s.src = oldScript.src;
        document.body.appendChild(s);
      } else if (oldScript.textContent) {
        try { new Function(oldScript.textContent)(); } catch (e) { console.warn('Script error:', e); }
      }
    });
  }, []);

  const fetchAndRenderStories = useCallback(() => {
    fetch(`${SB_URL}/rest/v1/customer_stories?status=eq.published&order=created_at.desc&select=*`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stories: Story[] = data.map((s: any) => ({
          id: Number(s.id),
          slug: String(s.slug || ''),
          empresa: String(s.company_name || ''),
          nome: String(s.contact_name || '').split('|')[0].trim(),
          cargo: String(s.contact_role || ''),
          segmento: String(s.segment || ''),
          desafio: String(s.challenge || ''),
          solucao: String(s.solution || ''),
          resultados: String(s.results || ''),
          depoimento: String(s.testimonial || ''),
          companyLogo: String(s.logo_url || ''),
          createdAt: String(s.created_at || ''),
        }));
        storiesRef.current = stories;

        // Render grid
        const grid = document.getElementById('storiesGrid');
        const empty = document.getElementById('storiesEmpty');
        if (!grid) return;

        if (stories.length === 0) {
          grid.innerHTML = '';
          if (empty) empty.style.display = 'block';
          return;
        }
        if (empty) empty.style.display = 'none';

        // Build filter buttons
        const filterBar = document.getElementById('filterBar');
        if (filterBar) {
          const segments = [...new Set(stories.map((s) => s.segmento).filter(Boolean))];
          segments.forEach((seg) => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = seg;
            btn.textContent = SEGMENTS[seg] || seg;
            filterBar.appendChild(btn);
          });
          filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
            (btn as HTMLElement).addEventListener('click', () => {
              filterBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
              btn.classList.add('active');
              renderGrid((btn as HTMLElement).dataset.filter || 'all');
            });
          });
        }

        function renderGrid(filter: string) {
          const filtered = filter === 'all' ? stories : stories.filter((s) => s.segmento === filter);
          if (!grid) return;
          if (filtered.length === 0) {
            grid.innerHTML = '';
            if (empty) empty.style.display = 'block';
            return;
          }
          if (empty) empty.style.display = 'none';

          grid.innerHTML = filtered
            .map((story, i) => {
              const segLabel = SEGMENTS[story.segmento] || story.segmento || '';
              const preview = story.desafio ? story.desafio.slice(0, 140) + (story.desafio.length > 140 ? '...' : '') : '';
              const initials = story.empresa ? story.empresa.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() : 'O';

              return `<article class="blog-card blog-card--animate" data-story-id="${story.id}" style="animation-delay:${i * 80}ms;cursor:pointer;">
                <div class="blog-card__image" style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);display:flex;align-items:center;justify-content:center;min-height:180px;">
                  ${story.companyLogo
                    ? `<img src="${story.companyLogo}" alt="${escapeHtml(story.empresa)}" style="max-width:120px;max-height:80px;object-fit:contain;" loading="lazy">`
                    : `<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,186,26,0.15);display:flex;align-items:center;justify-content:center;"><i class="fas fa-building" style="color:#ffba1a;font-size:32px;"></i></div>`}
                  ${segLabel ? `<span class="blog-card__tag" style="background:rgba(255,186,26,0.15);color:#ffba1a;border:1px solid rgba(255,186,26,0.3);">${escapeHtml(segLabel)}</span>` : ''}
                </div>
                <div class="blog-card__body">
                  <h3>${escapeHtml(story.empresa)}</h3>
                  ${preview ? `<p>${escapeHtml(preview)}</p>` : ''}
                  <div class="blog-card__footer">
                    <div class="blog-card__author">
                      <div class="blog-card__avatar">${initials}</div>
                      <div class="blog-card__author-info">
                        <span class="blog-card__author-name">${escapeHtml(story.nome || 'Equipe')}</span>
                        <span class="blog-card__date">${story.cargo ? escapeHtml(story.cargo) : ''}</span>
                      </div>
                    </div>
                    <span class="blog-card__read-time"><i class="fas fa-arrow-right"></i> Ver história</span>
                  </div>
                </div>
              </article>`;
            })
            .join('');

          // Click handlers
          grid.querySelectorAll('[data-story-id]').forEach((card) => {
            card.addEventListener('click', () => {
              const id = Number((card as HTMLElement).dataset.storyId);
              showDetail(id);
            });
          });
        }

        function showDetail(id: number) {
          const s = storiesRef.current.find((st) => st.id === id);
          if (!s) return;
          const segLabel = SEGMENTS[s.segmento] || s.segmento || '';
          const initials = s.empresa ? s.empresa.split(' ').map((w: string) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() : 'O';

          // Esconde o grid e filtros, mostra o artigo no mesmo layout do blog
          const gridSection = document.querySelector('.blog-grid-section') || grid.parentElement;
          const filtersEl = document.querySelector('.stories-filters');
          const heroEl = document.querySelector('.stories-hero');
          const ctaEl = document.querySelector('.stories-cta');
          if (gridSection) (gridSection as HTMLElement).style.display = 'none';
          if (filtersEl) (filtersEl as HTMLElement).style.display = 'none';
          if (heroEl) (heroEl as HTMLElement).style.display = 'none';
          if (ctaEl) (ctaEl as HTMLElement).style.display = 'none';

          // Cria container do artigo
          let detailContainer = document.getElementById('storyDetailPage');
          if (!detailContainer) {
            detailContainer = document.createElement('div');
            detailContainer.id = 'storyDetailPage';
            (gridSection || grid)?.parentElement?.appendChild(detailContainer);
          }

          window.scrollTo({ top: 0 });

          detailContainer.innerHTML = `
            <div class="blog-article" style="padding-top:100px;">
              <a href="/historias" class="blog-article__back" onclick="event.preventDefault();document.getElementById('storyDetailPage').remove();document.querySelector('.stories-hero').style.display='';document.querySelector('.stories-filters').style.display='';document.querySelector('.blog-grid-section,.stories-section').style.display='';var cta=document.querySelector('.stories-cta');if(cta)cta.style.display='';"><i class="fas fa-arrow-left"></i> Voltar às Histórias</a>
              <div class="blog-article__layout">
                <article class="blog-article__main">
                  <span class="blog-article__category">${escapeHtml(segLabel || 'História de Sucesso')}</span>
                  <h1 class="blog-article__title">${escapeHtml(s.empresa)}</h1>
                  <div class="blog-article__meta">
                    <div class="blog-article__meta-author">
                      <div class="blog-card__avatar">${initials}</div>
                      <span>${escapeHtml(s.nome)}${s.cargo ? ' — ' + escapeHtml(s.cargo) : ''}</span>
                    </div>
                  </div>

                  <div class="blog-article-content">
                    ${s.desafio ? `<h2 style="color:#ffba1a;"><i class="fas fa-triangle-exclamation" style="margin-right:8px;"></i>O Desafio</h2><p>${escapeHtml(s.desafio)}</p>` : ''}
                    ${s.solucao ? `<h2 style="color:#ffba1a;"><i class="fas fa-lightbulb" style="margin-right:8px;"></i>A Solução</h2><p>${escapeHtml(s.solucao)}</p>` : ''}
                    ${s.resultados ? `<h2 style="color:#22C55E;"><i class="fas fa-chart-line" style="margin-right:8px;"></i>Os Resultados</h2><p>${escapeHtml(s.resultados)}</p>` : ''}
                    ${s.depoimento ? `<blockquote style="border-left:3px solid #ffba1a;padding:16px 20px;margin:32px 0;background:rgba(255,186,26,0.05);border-radius:0 12px 12px 0;"><p style="font-style:italic;line-height:1.8;font-size:1.1rem;">"${escapeHtml(s.depoimento)}"</p><footer style="margin-top:12px;font-size:0.9rem;color:#8B949E;">— ${escapeHtml(s.nome)}${s.cargo ? ', ' + escapeHtml(s.cargo) : ''}${s.empresa ? ' na ' + escapeHtml(s.empresa) : ''}</footer></blockquote>` : ''}
                  </div>

                  <div class="blog-article__bottom-cta">
                    <a href="/historias" class="btn btn-primary" onclick="event.preventDefault();document.getElementById('storyDetailPage').remove();document.querySelector('.stories-hero').style.display='';document.querySelector('.stories-filters').style.display='';document.querySelector('.blog-grid-section,.stories-section').style.display='';var cta=document.querySelector('.stories-cta');if(cta)cta.style.display='';"><i class="fas fa-arrow-left"></i> Voltar às Histórias</a>
                    <a href="/historias/enviar" class="btn btn-primary" style="margin-left:12px;"><i class="fas fa-pen"></i> Conte sua história</a>
                  </div>
                </article>

                <aside class="blog-article__sidebar">
                  <div class="blog-article__sidebar-sticky">
                    <div class="blog-sidebar-card">
                      <p class="blog-sidebar-card__label">Empresa</p>
                      <div class="blog-sidebar-card__author">
                        ${s.companyLogo
                          ? `<img src="${s.companyLogo}" style="width:48px;height:48px;border-radius:12px;object-fit:cover;" alt="${escapeHtml(s.empresa)}">`
                          : `<div class="blog-card__avatar blog-card__avatar--lg">${initials}</div>`}
                        <div>
                          <p class="blog-sidebar-card__name">${escapeHtml(s.empresa)}</p>
                          <p class="blog-sidebar-card__role">${escapeHtml(segLabel)}</p>
                        </div>
                      </div>
                    </div>
                    <div class="blog-sidebar-cta">
                      <div class="blog-sidebar-cta__icon"><i class="fas fa-star"></i></div>
                      <h3>Sua empresa também pode ser destaque</h3>
                      <p>Compartilhe sua experiência com a Orbit e inspire outros empresários.</p>
                      <a href="/historias/enviar" class="btn btn-primary" style="width:100%;text-align:center;">Contar minha história</a>
                    </div>
                  </div>
                </aside>
              </div>
            </div>`;
        }

        renderGrid('all');
      })
      .catch((e) => console.warn('Erro ao buscar histórias:', e));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t1 = setTimeout(initScripts, 50);
    const t2 = setTimeout(fetchAndRenderStories, 100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [mounted, initScripts, fetchAndRenderStories]);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#0D1117' }} />;

  const fullHTML = headerHTML + '\n' + pageHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
