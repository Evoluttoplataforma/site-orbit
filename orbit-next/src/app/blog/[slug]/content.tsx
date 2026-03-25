'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { headerHTML } from '@/components/shared-header';

const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

const CATEGORIES: Record<string, string> = {
  estrategica: 'Gestão Estratégica',
  processos: 'Processos',
  indicadores: 'Indicadores',
  lideranca: 'Liderança',
  ia: 'IA & Inovação',
};

interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_url: string;
  category: string;
  author: string;
  published_at: string;
  created_at: string;
}

export function ArticleContent() {
  const params = useParams();
  const slug = params.slug as string;
  const ref = useRef<HTMLDivElement>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`${SUPABASE_URL}/rest/v1/blog_articles?slug=eq.${slug}&published=eq.true&limit=1`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setArticle(data[0] || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!ref.current) return;
    const timer = setTimeout(() => {
      const scripts = ref.current?.querySelectorAll('script');
      if (!scripts) return;
      scripts.forEach((oldScript) => {
        if (oldScript.textContent) {
          try {
            const fn = new Function(oldScript.textContent);
            fn();
          } catch (e) {
            console.warn('Script execution error:', e);
          }
        }
      });
    }, 150);
    return () => clearTimeout(timer);
  }, [article]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D1117' }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, color: '#ffba1a' }} />
      </div>
    );
  }

  if (!article) {
    const notFoundHTML = headerHTML + `
      <section style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;background:#0D1117;">
        <div class="container" style="max-width:500px;">
          <i class="fas fa-newspaper" style="font-size:48px;color:#ffba1a;margin-bottom:24px;display:block;"></i>
          <h1 style="color:#fff;font-size:2rem;margin-bottom:12px;">Artigo não encontrado</h1>
          <p style="color:#8B949E;margin-bottom:32px;">Este artigo não existe ou ainda não foi publicado.</p>
          <a href="/blog" class="btn btn-primary">Voltar ao Blog</a>
        </div>
      </section>`;
    return <div ref={ref} dangerouslySetInnerHTML={{ __html: notFoundHTML }} />;
  }

  const date = new Date(article.published_at || article.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
  const catLabel = CATEGORIES[article.category] || article.category;

  const articleHTML = headerHTML + `
    <article style="background:#0D1117;min-height:100vh;">
      <!-- Hero -->
      <div style="position:relative;padding:160px 0 80px;text-align:center;overflow:hidden;">
        ${article.cover_url ? `<div style="position:absolute;inset:0;opacity:0.2;"><img src="${article.cover_url}" alt="" style="width:100%;height:100%;object-fit:cover;"></div>` : ''}
        <div class="lp-hero__glow lp-hero__glow--1"></div>
        <div class="lp-hero__glow lp-hero__glow--2"></div>
        <div class="container" style="max-width:800px;position:relative;z-index:2;">
          <span style="display:inline-block;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.3);border-radius:100px;padding:6px 16px;color:#ffba1a;font-size:13px;font-weight:600;margin-bottom:20px;">${catLabel}</span>
          <h1 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:16px;">${article.title}</h1>
          <div style="display:flex;align-items:center;justify-content:center;gap:20px;color:#8B949E;font-size:14px;flex-wrap:wrap;">
            <span><i class="fas fa-user" style="margin-right:6px;color:#ffba1a;"></i>${article.author}</span>
            <span><i class="fas fa-calendar-alt" style="margin-right:6px;color:#ffba1a;"></i>${date}</span>
          </div>
        </div>
      </div>
      <!-- Content -->
      <div class="container" style="max-width:780px;padding:60px 20px 100px;">
        <div class="blog-article-content" style="color:#C9D1D9;font-size:17px;line-height:1.8;">
          ${article.content}
        </div>
        <div style="margin-top:60px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <a href="/blog" class="btn btn-primary" style="padding:14px 40px;"><i class="fas fa-arrow-left" style="margin-right:8px;"></i>Voltar ao Blog</a>
        </div>
      </div>
    </article>
    <style>
      .blog-article-content h2 { font-size:1.5rem; font-weight:700; color:#fff; margin:40px 0 16px; }
      .blog-article-content h3 { font-size:1.25rem; font-weight:700; color:#fff; margin:32px 0 12px; }
      .blog-article-content p { margin-bottom:20px; }
      .blog-article-content ul, .blog-article-content ol { margin:0 0 20px 24px; }
      .blog-article-content li { margin-bottom:8px; }
      .blog-article-content strong { color:#fff; }
      .blog-article-content a { color:#ffba1a; text-decoration:underline; }
      .blog-article-content img { border-radius:12px; margin:24px 0; }
      .blog-article-content blockquote { border-left:3px solid #ffba1a; padding:16px 24px; margin:24px 0; background:rgba(255,186,26,0.05); border-radius:0 12px 12px 0; }
    </style>`;

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: articleHTML }} />;
}
