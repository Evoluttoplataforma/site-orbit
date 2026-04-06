// Cliente Supabase para o projeto MKT ORBIT (yfpdrckyuxltvznqfqgh)
// Usado pelo chat de demonstração para salvar leads.
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

export const supabaseMkt = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
