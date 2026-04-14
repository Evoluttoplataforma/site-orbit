import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Projeto antigo (MKT ORBIT) onde está o cms_admins
const ORBIT_URL = "https://yfpdrckyuxltvznqfqgh.supabase.co";
const ORBIT_SERVICE_KEY = Deno.env.get("ORBIT_SERVICE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return new Response(JSON.stringify({ error: "missing auth token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Validar que quem chama é admin (via cms_admins)
    const meResp = await fetch(`${ORBIT_URL}/auth/v1/user`, {
      headers: {
        apikey: ORBIT_SERVICE_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!meResp.ok) {
      return new Response(JSON.stringify({ error: "invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const me = await meResp.json();

    const adminResp = await fetch(
      `${ORBIT_URL}/rest/v1/cms_admins?id=eq.${me.id}&select=id,role`,
      {
        headers: {
          apikey: ORBIT_SERVICE_KEY,
          Authorization: `Bearer ${ORBIT_SERVICE_KEY}`,
        },
      }
    );
    const adminData = await adminResp.json();
    if (!Array.isArray(adminData) || adminData.length === 0) {
      return new Response(JSON.stringify({ error: "not an admin" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Parse body
    const { email, password, name, role } = await req.json();
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: "email, password and name are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (password.length < 6) {
      return new Response(JSON.stringify({ error: "password must be at least 6 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Criar usuário via Admin API com email já confirmado
    const createResp = await fetch(`${ORBIT_URL}/auth/v1/admin/users`, {
      method: "POST",
      headers: {
        apikey: ORBIT_SERVICE_KEY,
        Authorization: `Bearer ${ORBIT_SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
      }),
    });
    const created = await createResp.json();

    if (!createResp.ok || !created.id) {
      return new Response(
        JSON.stringify({ error: created.msg || created.message || "failed to create user" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 4. Inserir na cms_admins
    const insertResp = await fetch(`${ORBIT_URL}/rest/v1/cms_admins`, {
      method: "POST",
      headers: {
        apikey: ORBIT_SERVICE_KEY,
        Authorization: `Bearer ${ORBIT_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        id: created.id,
        email,
        name,
        role: role || "editor",
      }),
    });

    if (!insertResp.ok) {
      // Rollback: deletar o usuário criado no auth
      await fetch(`${ORBIT_URL}/auth/v1/admin/users/${created.id}`, {
        method: "DELETE",
        headers: {
          apikey: ORBIT_SERVICE_KEY,
          Authorization: `Bearer ${ORBIT_SERVICE_KEY}`,
        },
      });
      return new Response(JSON.stringify({ error: "failed to save admin profile" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: created.id, email, name, role }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
