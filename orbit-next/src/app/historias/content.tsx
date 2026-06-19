'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';
import staticStories from '@/data/stories.json';

// Tabs primários da página de histórias: distingue B2B direto (Empresas) de
// canais (Consultoria). Substitui o antigo "Serviços" que era genérico.
// Histórias antigas com segment='servicos' são migradas pra 'consultoria'
// via legacyMap abaixo.
const SEGMENTS: Record<string, string> = {
  empresa: 'Empresas',
  consultoria: 'Consultoria',
  industria: 'Indústria',
  tecnologia: 'Tecnologia',
  saude: 'Saúde',
  educacao: 'Educação',
  varejo: 'Varejo',
  financeiro: 'Financeiro',
  agronegocio: 'Agronegócio',
  outro: 'Outro',
};

// Compatibilidade com dados antigos no Supabase
function normalizeSegment(raw: string): string {
  if (raw === 'servicos') return 'consultoria';
  return raw || 'outro';
}

function escapeHtml(str: string) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

interface Story {
  id: number;
  slug: string;
  titulo: string;
  subtitulo: string;
  empresa: string;
  nome: string;
  cargo: string;
  segmento: string;
  desafio: string;
  companyLogo: string;
  coverImage: string;
}

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

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
    // Usa stories.json estatico (gerado no build via fetch-stories.mjs).
    // Antes fazia fetch live no Supabase, mas isso quebra a pagina toda
    // quando o Supabase esta indisponivel ou rate-limited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = staticStories as any[];
    {
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stories: Story[] = data.map((s: any) => ({
          id: Number(s.id),
          slug: String(s.slug || ''),
          titulo: String(s.title || ''),
          subtitulo: String(s.subtitle || ''),
          empresa: String(s.company_name || ''),
          nome: String(s.contact_name || '').split('|')[0].trim(),
          cargo: String(s.contact_role || ''),
          segmento: normalizeSegment(String(s.segment || '')),
          desafio: String(s.challenge || ''),
          companyLogo: String(s.logo_url || ''),
          coverImage: String(s.cover_url || ''),
        }));

        const grid = document.getElementById('storiesGrid');
        const empty = document.getElementById('storiesEmpty');
        if (!grid) return;

        if (stories.length === 0) {
          grid.innerHTML = '';
          if (empty) empty.style.display = 'block';
          return;
        }
        if (empty) empty.style.display = 'none';

        const filterBar = document.getElementById('filterBar');
        if (filterBar) {
          // Tabs PRIMÁRIOS sempre visíveis (Empresas / Consultoria), independente
          // de já existir história desse tipo no JSON. Se houver outros segmentos
          // (industria, varejo, etc.) também adiciona como tabs secundários.
          const PRIMARY_TABS = ['empresa', 'consultoria'] as const;
          PRIMARY_TABS.forEach((seg) => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = seg;
            btn.textContent = SEGMENTS[seg];
            filterBar.appendChild(btn);
          });
          const secondarySegments = [...new Set(stories.map((s) => s.segmento).filter(Boolean))]
            .filter((seg) => !PRIMARY_TABS.includes(seg as 'empresa' | 'consultoria'));
          secondarySegments.forEach((seg) => {
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
              const headline = story.titulo || story.empresa;
              const preview = story.subtitulo || (story.desafio ? story.desafio.slice(0, 140) + (story.desafio.length > 140 ? '...' : '') : '');
              const initials = story.empresa ? story.empresa.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() : 'O';
              const href = story.slug ? `/historias/${story.slug}` : `/historias`;

              return `<a href="${href}" class="blog-card blog-card--animate" style="animation-delay:${i * 80}ms;text-decoration:none;color:inherit;display:block;">
                <div class="blog-card__image" style="${story.coverImage ? 'padding:0;overflow:hidden;position:relative;display:block;aspect-ratio:800/360;width:100%;max-height:200px;' : 'background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);display:flex;align-items:center;justify-content:center;min-height:180px;'}">
                  ${story.coverImage
                    ? `<img src="${escapeHtml(story.coverImage)}" alt="${escapeHtml(story.empresa)}" style="width:100%;height:100%;object-fit:cover;object-position:center center;display:block;" loading="lazy">`
                    : story.companyLogo
                      ? `<img src="${story.companyLogo}" alt="${escapeHtml(story.empresa)}" style="max-width:120px;max-height:80px;object-fit:contain;" loading="lazy">`
                      : `<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,186,26,0.15);display:flex;align-items:center;justify-content:center;"><i class="fas fa-building" style="color:#ffba1a;font-size:32px;"></i></div>`}
                  ${segLabel ? `<span class="blog-card__tag" style="background:rgba(255,186,26,0.15);color:#ffba1a;border:1px solid rgba(255,186,26,0.3);">${escapeHtml(segLabel)}</span>` : ''}
                </div>
                <div class="blog-card__body">
                  <h3>${escapeHtml(headline)}</h3>
                  ${preview ? `<p>${escapeHtml(preview)}</p>` : ''}
                  <div class="blog-card__footer">
                    <div class="blog-card__author">
                      ${story.coverImage ? '' : `<div class="blog-card__avatar">${initials}</div>`}
                      <div class="blog-card__author-info">
                        <span class="blog-card__author-name">${escapeHtml(story.nome || 'Equipe')}</span>
                        <span class="blog-card__date">${story.cargo ? escapeHtml(story.cargo) : ''}</span>
                      </div>
                    </div>
                    <span class="blog-card__read-time"><i class="fas fa-arrow-right"></i> Ver história</span>
                  </div>
                </div>
              </a>`;
            })
            .join('');
        }

        renderGrid('all');
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t1 = setTimeout(initScripts, 50);
    const t2 = setTimeout(fetchAndRenderStories, 100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [mounted, initScripts, fetchAndRenderStories]);

  const fullHTML = headerHTML + '\n' + pageHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
