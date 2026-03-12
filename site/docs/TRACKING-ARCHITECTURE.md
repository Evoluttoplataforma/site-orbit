# ORBIT — Arquitetura de Tracking & Formulários

> Padrão técnico de tracking, formulários e atribuição para todas as LPs e páginas do Orbit.

---

## 1. ARQUITETURA END-TO-END

```
LP + Script → GTM Web → GTM Server → GA4 + Google Ads + Meta CAPI + Webhook
                                          ↓
                                     n8n Workflow → Supabase (eventos + lead scoring)
                                                  → CRM (deal com click IDs + UTMs)

CRM (deal fechado) → n8n → Google Ads (offline conversion) + Meta Ads (offline conversion)
```

---

## 2. CAMPOS OBRIGATÓRIOS NO dataLayer.push

Padrão único para que nome, email e telefone cheguem corretos às variáveis do GTM — independente da ferramenta.

| Chave | Tipo | Descrição |
|---|---|---|
| `email` | string | Email do lead |
| `phoneNumber` | string | Telefone SEM máscara — apenas dígitos (ex: 48991206282) |
| `nome` | string | Primeiro nome |
| `sobrenome` | string | Sobrenome (string vazia se não disponível, NUNCA omitir) |
| `apex_session_id` | string | Session ID do sessionStorage |
| `time_on_page_at_submit` | number | Segundos na página até o submit |

### Nomes ERRADOS (nunca usar)
- `lead_email` → usar `email`
- `lead_phone` → usar `phoneNumber`
- `lead_first_name` → usar `nome`
- `lead_last_name` → usar `sobrenome`
- `lp_session_id` → usar `apex_session_id`

### Event Names

| event name | Quando usar |
|---|---|
| `form_submit_success` | HTML customizado, qualquer LP |
| `tally_form_submit` | Formulários nativos Tally (se usado) |

Ambos disparam GA4, Meta CAPI, Google Ads. Não criar novos triggers.

---

## 3. HIDDEN INPUTS — 19 CAMPOS OCULTOS

Todo formulário do Orbit deve incluir 19 campos ocultos para atribuição completa.

### HTML Padrão
```html
<!-- UTMs (5) -->
<input type="hidden" name="utm_source" data-field-id="utm_source">
<input type="hidden" name="utm_medium" data-field-id="utm_medium">
<input type="hidden" name="utm_campaign" data-field-id="utm_campaign">
<input type="hidden" name="utm_content" data-field-id="utm_content">
<input type="hidden" name="utm_term" data-field-id="utm_term">

<!-- Click IDs (10) -->
<input type="hidden" name="gclid" data-field-id="gclid">
<input type="hidden" name="fbclid" data-field-id="fbclid">
<input type="hidden" name="gbraid" data-field-id="gbraid">
<input type="hidden" name="wbraid" data-field-id="wbraid">
<input type="hidden" name="ttclid" data-field-id="ttclid">
<input type="hidden" name="gad_campaignid" data-field-id="gad_campaignid">
<input type="hidden" name="gad_source" data-field-id="gad_source">
<input type="hidden" name="msclkid" data-field-id="msclkid">
<input type="hidden" name="li_fat_id" data-field-id="li_fat_id">
<input type="hidden" name="sck" data-field-id="sck">

<!-- Sessão (4) -->
<input type="hidden" name="session_id" id="hidden_session_id">
<input type="hidden" name="landing_page" data-field-id="landing_page">
<input type="hidden" name="origin_page" data-field-id="origin_page">
<input type="hidden" name="session_attributes_encoded" data-field-id="session_attributes_encoded">
```

---

## 4. SESSION ID — GERAÇÃO

```javascript
var sessionId = (function() {
  try {
    var key = 'apex_session_id';
    var s = sessionStorage.getItem(key);
    if (!s) {
      s = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem(key, s);
    }
    return s;
  } catch(e) {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
})();
```

---

## 5. FORM SUBMIT — IMPLEMENTAÇÃO PADRÃO

```javascript
document.getElementById('form-lead').addEventListener('submit', function(e) {
  e.preventDefault();
  var fullName = document.getElementById('nome').value.trim();
  var parts = fullName.split(' ');

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'form_submit_success',
    email: document.getElementById('email').value.trim(),
    phoneNumber: document.getElementById('telefone').value.replace(/\D/g, ''),
    nome: parts[0],
    sobrenome: parts.slice(1).join(' '),
    apex_session_id: sessionId,
    time_on_page_at_submit: Math.round((Date.now() - pageStart) / 1000)
  });

  // Feedback visual + redirect/webhook aqui
});
```

---

## 6. TRACKING SCRIPT — FUNCIONALIDADES

O script de tracking (inline no final do `<body>`) deve implementar:

| Funcionalidade | Descrição |
|---|---|
| Session ID | `sessionStorage` — único por sessão, persistente na aba |
| Cookies first-touch UTMs | Salva UTMs no primeiro acesso — nunca sobrescreve |
| Cookies last-touch UTMs | Sempre atualiza com UTMs mais recentes |
| 11 click IDs | gclid, fbclid, gbraid, wbraid, ttclid, msclkid, li_fat_id, twclid, sck, gad_campaignid, gad_source |
| Referrer mapping | Google, Instagram, Facebook, YouTube, LinkedIn, etc. |
| `custom_page_view` | Dispara no load com todos os dados de sessão |
| `scroll_depth` | Eventos em 25%, 50%, 75%, 90% — para lead scoring |
| `time_on_page_heartbeat` | Pulso a cada 30s — mede engajamento real |
| `form_submit` | Com dados do lead + session attributes |
| Session attributes encoded | Base64 JSON com todos dados de atribuição |
| Preenchimento hidden inputs | Automático no load — preenche os 19 campos |
| Máscara telefone | Formato brasileiro (XX) XXXXX-XXXX |
| Feedback visual form | Loading → sucesso/erro com estados visuais |

### Placeholders a configurar

| Placeholder | Onde usar |
|---|---|
| `{{COOKIE_DOMAIN}}` | Domínio do cookie (ex: `.orbitgestao.com.br`) |
| `{{WEBHOOK_URL}}` | URL do webhook (n8n) |
| `{{GTM_ID}}` | ID do container GTM Web |

---

## 7. LEAD SCORING (COMPORTAMENTAL)

Cálculo automático baseado em comportamento na página (0-100 pontos):

```
Scroll depth (max 30pts):
  90% = 30pts | 75% = 20pts | 50% = 10pts | 25% = 5pts

Tempo na página (max 40pts):
  300s+ = 40pts | 120s+ = 30pts | 60s+ = 20pts | 30s+ = 10pts

Heartbeats/engajamento (max 30pts):
  3+ heartbeats = 30pts | 2 = 20pts | 1 = 10pts
```

### Temperatura do lead

| Score | Temperatura | Ação sugerida |
|---|---|---|
| 0-30 | Frio | Nurturing automatizado |
| 31-60 | Morno | Email sequência + retargeting |
| 61-80 | Quente | Follow-up comercial em 24h |
| 81-100 | Muito quente | Contato imediato |

---

## 8. GTM — ESTRUTURA DE CONTAINERS

### GTM Web
- **Variáveis:** constantes (GA4 ID, Pixel Meta, Tag Google Ads, Server URL), JS customizado (session ID, external ID, GA client ID, lead data), cookies (first/last touch), DataLayer variables
- **Triggers:** custom_page_view, form_submit_success, scroll_depth, time_on_page_heartbeat, janela carregada
- **Tags:** GA4 config, GA4 events (page_view, generate_lead, scroll_depth, heartbeat), Google Ads (conversão + enhanced conversions + remarketing), Meta Pixel (pageview + lead)

### GTM Server
- **Variáveis:** Event Data (~40 variáveis lendo do evento GA4)
- **Tags:** GA4 server-side, Meta CAPI, Google Ads (remarketing + conversão + enhanced), HTTP Request para webhook n8n

---

## 9. DLVs NO GTM

| Variável GTM | Chave dataLayer | Usada em |
|---|---|---|
| 01 - DLV - email | `email` | GA4, Meta CAPI, Google Ads |
| 01 - DLV - Celular | `phoneNumber` | GA4, Meta CAPI, Google Ads |
| 01 - DLV - Nome | `nome` | GA4, Meta CAPI |
| 01 - DLV - Sobrenome | `sobrenome` | GA4, Meta CAPI |
| DLV - time_on_page_at_submit | `time_on_page_at_submit` | GA4 generate_lead |
| jsc - SessionID | `apex_session_id` | Todos os eventos |

---

## 10. CHECKLIST DE VALIDAÇÃO

### Tracking
- [ ] Script antes de `</body>`
- [ ] `{{COOKIE_DOMAIN}}` configurado
- [ ] `{{WEBHOOK_URL}}` configurado
- [ ] `{{GTM_ID}}` configurado
- [ ] dataLayer declarado no `<head>`
- [ ] `custom_page_view` disparando no load
- [ ] Scroll depth (25/50/75/90%) disparando
- [ ] Heartbeat (30s) disparando
- [ ] `form_submit_success` com dados do lead
- [ ] Session attributes encoded sendo gerado
- [ ] Preenchimento automático dos 19 hidden inputs
- [ ] Cookies first-touch sendo salvos

### Formulário
- [ ] 19 hidden inputs presentes
- [ ] Validação HTML5 (required, type=email, type=tel)
- [ ] Máscara telefone funcionando
- [ ] Feedback visual (loading → sucesso/erro)
- [ ] Redirect pós-submit configurado

### GTM Preview
- [ ] Evento chega com nome correto
- [ ] DLV email populada (não undefined/null)
- [ ] DLV phoneNumber populada — apenas dígitos
- [ ] DLV nome e sobrenome populadas
- [ ] apex_session_id presente
- [ ] Meta Events Manager: match quality >= 7
- [ ] Google Ads Enhanced Conversions: user-provided data presente

---

*Referência técnica — Orbit 2026*
