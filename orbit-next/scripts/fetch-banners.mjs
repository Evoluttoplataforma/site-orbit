/**
 * Pre-build script: puxa banners ativos do Supabase e gera public/data/banners.json
 * Roda no prebuild para que o site sirva banners estaticamente
 * (sem fetch live ao Supabase em cada page view).
 *
 * Banners atualizam apenas no rebuild — disparado pelo webhook
 * Supabase ao publicar/editar banner no CMS.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'data');
const OUT_FILE = path.join(OUT_DIR, 'banners.json');

const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const RAW_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ1NjAwNiwiZXhwIjoyMDkwMDMyMDA2fQ.LTZYTuBXAf7cFJrGbo9J_F80VzA_8kbcHiwsTZXRM5Q';
const SUPABASE_KEY = RAW_KEY.replace(/\s+/g, '');

async function fetchBanners() {
  console.log('📥 Buscando banners do Supabase...');
  const url = `${SUPABASE_URL}/rest/v1/site_banners?active=eq.true&order=priority.desc&limit=10&select=id,title,description,cta_text,cta_url,image_data,display_mode,position,dismissible,bg_color,text_color`;

  const resp = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!resp.ok) {
    const err = await resp.text();
    if (fs.existsSync(OUT_FILE)) {
      console.log('⚠️  Supabase indisponível, mantendo banners.json existente como fallback');
      console.log(`   Erro: ${err.slice(0, 200)}`);
      return null;
    }
    console.log(`⚠️  Supabase erro ${resp.status} — gerando banners.json vazio`);
    return [];
  }

  return await resp.json();
}

async function main() {
  console.log('🚀 fetch-banners — Pre-build script\n');
  const banners = await fetchBanners();

  if (banners === null) {
    console.log('\n✅ Usando banners.json existente (Supabase offline)');
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(banners, null, 2), 'utf-8');
  console.log(`\n💾 banners.json salvo (${banners.length} banner${banners.length === 1 ? '' : 's'})`);
  console.log('\n✅ Pronto! Build pode continuar.');
}

main().catch((err) => {
  console.error('❌ Erro no fetch-banners:', err.message);
  // Não falha o build — JSON vazio é aceitavel
  if (!fs.existsSync(OUT_FILE)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(OUT_FILE, '[]', 'utf-8');
  }
  process.exit(0);
});
