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
          grid.querySelectorAll('.story-card[data-story-id]').forEach((card) => {
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

          const overlay = document.createElement('div');
          overlay.id = 'storyDetailOverlay';
          overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);z-index:5000;display:flex;align-items:center;justify-content:center;padding:24px;overflow-y:auto;';
          overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

          overlay.innerHTML = `<div style="background:#fff;border-radius:16px;max-width:720px;width:100%;max-height:90vh;overflow-y:auto;padding:40px;position:relative;">
            <button onclick="this.closest('#storyDetailOverlay').remove()" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;">&times;</button>
            <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px;">
              ${s.companyLogo ? `<img src="${s.companyLogo}" style="width:56px;height:56px;border-radius:12px;object-fit:cover;">` : '<div style="width:56px;height:56px;border-radius:12px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;"><i class="fas fa-building" style="color:#9CA3AF;font-size:20px;"></i></div>'}
              <div>
                <h2 style="margin:0;font-size:22px;color:#1a1a1a;">${escapeHtml(s.empresa)}</h2>
                <p style="margin:4px 0 0;color:#6B7280;font-size:14px;">${escapeHtml(s.nome)}${s.cargo ? ' — ' + escapeHtml(s.cargo) : ''}</p>
              </div>
              ${segLabel ? `<span style="margin-left:auto;background:rgba(255,186,26,0.15);color:#b8860b;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">${escapeHtml(segLabel)}</span>` : ''}
            </div>
            ${s.desafio ? `<div style="margin-bottom:24px;"><h3 style="color:#ffba1a;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;"><i class="fas fa-triangle-exclamation" style="margin-right:6px;"></i>O Desafio</h3><p style="color:#374151;line-height:1.7;margin:0;">${escapeHtml(s.desafio)}</p></div>` : ''}
            ${s.solucao ? `<div style="margin-bottom:24px;"><h3 style="color:#ffba1a;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;"><i class="fas fa-lightbulb" style="margin-right:6px;"></i>A Solução</h3><p style="color:#374151;line-height:1.7;margin:0;">${escapeHtml(s.solucao)}</p></div>` : ''}
            ${s.resultados ? `<div style="margin-bottom:24px;"><h3 style="color:#22C55E;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;"><i class="fas fa-chart-line" style="margin-right:6px;"></i>Os Resultados</h3><p style="color:#374151;line-height:1.7;margin:0;">${escapeHtml(s.resultados)}</p></div>` : ''}
            ${s.depoimento ? `<blockquote style="border-left:3px solid #ffba1a;padding:16px 20px;margin:24px 0;background:#fefce8;border-radius:0 8px 8px 0;"><p style="color:#374151;font-style:italic;line-height:1.7;margin:0;">"${escapeHtml(s.depoimento)}"</p></blockquote>` : ''}
          </div>`;

          document.body.appendChild(overlay);
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
