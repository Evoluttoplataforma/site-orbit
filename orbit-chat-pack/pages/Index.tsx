import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { normalizePhone } from "@/lib/phone";
import { getMeetingLink } from "@/lib/meeting-link";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatBubble from "@/components/chat/ChatBubble";
import ChatInput from "@/components/chat/ChatInput";
import ChatOptions from "@/components/chat/ChatOptions";
import WhatsAppInput from "@/components/chat/WhatsAppInput";
import CalendarPicker from "@/components/chat/CalendarPicker";
import ConfirmationScreen from "@/components/chat/ConfirmationScreen";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { getSessionVariant } from "@/components/chat/copyVariants";
import execGabriel from "@/assets/exec-gabriel.png";
import execGisele from "@/assets/exec-gisele.png";
import execPedro from "@/assets/exec-pedro.png";
import execThayane from "@/assets/exec-thayane.png";

const EXECUTIVES: Record<string, { nome: string; foto: string; whatsapp: string }> = {
  gabriel: { nome: "Gabriel Carvente", foto: execGabriel, whatsapp: "5511971999192" },
  gisele: { nome: "Gisele Ferrarezi", foto: execGisele, whatsapp: "5548991206282" },
  pedro: { nome: "Pedro", foto: execPedro, whatsapp: "5548996934524" },
  thayane: { nome: "Thayane Torbis", foto: execThayane, whatsapp: "5548996934515" },
};

function matchExecutive(ownerName: string) {
  const lower = ownerName.toLowerCase();
  for (const [key, exec] of Object.entries(EXECUTIVES)) {
    if (lower.includes(key)) return exec;
  }
  return null;
}

interface Message {
  text: string;
  isUser?: boolean;
  boldName?: string;
}

type StepType =
  | "welcome"
  | "name"
  | "whatsapp"
  | "email"
  | "empresa"
  | "oqueFaz"
  | "cargo"
  | "softwareGestaoConfirm"
  | "softwareGestao"
  | "faturamento"
  | "funcionarios"
  | "prioridade"
  | "preferencia"
  | "calendar"
  | "confirmationVendedor"
  | "confirmation";

const STEPS: StepType[] = [
  "welcome", "name", "whatsapp", "email", "empresa",
  "oqueFaz", "cargo", "softwareGestaoConfirm", "softwareGestao", "faturamento", "funcionarios", "prioridade", "preferencia", "calendar", "confirmation"
];

const FATURAMENTO_OPTIONS = [
  "Até R$ 100 mil/mês",
  "R$ 100 mil - R$ 500 mil/mês",
  "R$ 500 mil - R$ 1 milhão/mês",
  "Acima de R$ 1 milhão/mês",
];

const FUNCIONARIOS_OPTIONS = [
  "1-5 funcionários",
  "6-20 funcionários",
  "21-50 funcionários",
  "51-100 funcionários",
  "Mais de 100 funcionários",
];

const SEGMENTO_OPTIONS = [
  "Consultoria",
  "Indústria",
  "Serviços",
  "Comércio / Varejo",
  "Governo",
  "Outro",
];

const CARGO_OPTIONS = [
  "CEO / Diretor",
  "Funcionário",
  "Responsável pela Qualidade",
  "Consultor",
  "Outro",
];

const PRIORIDADE_OPTIONS = [
  "Urgente — preciso para ontem",
  "Em breve — nos próximos 30 dias",
  "Estou pesquisando ainda",
  "Só quero conhecer",
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState<StepType>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOutroSegmento, setShowOutroSegmento] = useState(false);
  const [showOutroCargo, setShowOutroCargo] = useState(false);
  const [matchedExec, setMatchedExec] = useState<{ nome: string; foto: string; whatsapp: string } | null>(null);
  const [loadingExec, setLoadingExec] = useState(false);
  const [resolvedMeetLink, setResolvedMeetLink] = useState("");
  const [leadData, setLeadData] = useState({
    name: "", nome: "", sobrenome: "", whatsapp: "", email: "", empresa: "",
    oqueFaz: "", cargo: "", softwareGestao: "", faturamento: "", funcionarios: "",
    prioridade: "", date: "", time: "",
  });
  const pageStartRef = useRef(Date.now());
  const sessionIdRef = useRef("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Track DB lead ID and Pipedrive IDs for updates
  const leadIdRef = useRef<string | null>(null);
  const pipedriveIdsRef = useRef<{ person_id?: number; org_id?: number; deal_id?: number }>({});
  const utmDataRef = useRef<Record<string, string>>({});
  const savingLeadRef = useRef(false);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const addBotMessage = useCallback((text: string, boldName?: string) => {
    setIsTyping(true);
    scrollToBottom();
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { text, boldName }]);
      scrollToBottom();
    }, 800);
  }, []);

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, isUser: true }]);
    scrollToBottom();
  };

  // Save partial lead to DB after email step — upsert if email/whatsapp already exists
  const savePartialLead = async (data: typeof leadData) => {
    // Mutex guard: prevent concurrent saves creating duplicates
    if (savingLeadRef.current) return;
    if (leadIdRef.current) {
      // Already have a lead ID — just update, don't insert
      try {
        await supabase.from('leads').update({
          nome: data.nome,
          sobrenome: data.sobrenome,
          whatsapp: normalizePhone(data.whatsapp),
          email: data.email,
        }).eq('id', leadIdRef.current);
      } catch (err) {
        console.error('Failed to update existing lead:', err);
      }
      return;
    }
    savingLeadRef.current = true;
    try {
      const lpRaw = sessionStorage.getItem("orbit_lp_data");
      // Always resolve a copy variant: from LP data, sessionStorage, or assign one now
      const copyVariant = lpRaw
        ? JSON.parse(lpRaw)?.copyVariant || null
        : sessionStorage.getItem("hero_copy_variant") || getSessionVariant().id;
      const phoneDigits = data.whatsapp.replace(/\D/g, '');

      // Check for existing lead by email or whatsapp
      const { data: existingLead } = await supabase.from('leads')
        .select('id')
        .or(`email.eq.${data.email},whatsapp.ilike.%${phoneDigits}%`)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const leadPayload = {
        nome: data.nome,
        sobrenome: data.sobrenome,
        whatsapp: normalizePhone(data.whatsapp),
        email: data.email,
        empresa: '',
        status: 'parcial',
        copy_variant: copyVariant,
      };

      if (existingLead) {
        console.log('Existing lead found, updating:', existingLead.id);
        const { error } = await supabase.from('leads').update(leadPayload).eq('id', existingLead.id);
        if (error) {
          console.error('Failed to update existing lead:', error);
          return;
        }
        leadIdRef.current = existingLead.id;
      } else {
        const { data: inserted, error } = await supabase.from('leads').insert(leadPayload).select('id').single();
        if (error) {
          console.error('Failed to save partial lead:', error);
          return;
        }
        leadIdRef.current = inserted.id;
      }
      console.log('Lead saved (upsert):', leadIdRef.current, existingLead ? '(updated)' : '(new)');

      // Sync to Make.com webhook (fire-and-forget, sends all fields)
      supabase.functions.invoke('sync-lead-make', {
        body: { lead_id: leadIdRef.current },
      }).then(({ error }) => {
        if (error) console.warn('Make.com sync failed:', error);
        else console.log('Lead synced to Make.com');
      });

      // Sync to external CRM (fire-and-forget)
      supabase.functions.invoke('sync-lead-crm', {
        body: {
          nome: data.nome + (data.sobrenome ? ` ${data.sobrenome}` : ''),
          email: data.email,
          whatsapp: normalizePhone(data.whatsapp),
          empresa: '',
        },
      }).then(({ error }) => {
        if (error) console.warn('CRM sync failed:', error);
        else console.log('Lead synced to external CRM');
      });
    } catch (err) {
      console.error('Failed to save partial lead:', err);
    } finally {
      savingLeadRef.current = false;
    }
  };

  // Create lead in Pipedrive for direct /chat flow (no LP data)
  const createPipedriveFromChat = async (data: typeof leadData) => {
    try {
      console.log('[Chat] Creating Pipedrive lead:', { name: data.name, email: data.email, empresa: data.empresa });
      const lpRaw = sessionStorage.getItem("orbit_lp_data");
      const chatCopyVariant = lpRaw
        ? JSON.parse(lpRaw)?.copyVariant || null
        : sessionStorage.getItem("hero_copy_variant") || getSessionVariant().id;
      const { data: result, error } = await supabase.functions.invoke('create-pipedrive-lead', {
        body: {
          action: 'create',
          name: data.name,
          whatsapp: data.whatsapp,
          email: data.email,
          empresa: data.empresa,
          leadId: leadIdRef.current,
          copyVariant: chatCopyVariant,
        },
      });
      if (error) {
        console.error('[Chat] Pipedrive create error:', error);
        return;
      }
      if (result?.success) {
        pipedriveIdsRef.current = {
          person_id: result.person_id,
          org_id: result.org_id,
          deal_id: result.deal_id,
        };
        // Update DB with pipedrive IDs
        if (leadIdRef.current) {
          await supabase.from('leads').update({
            empresa: data.empresa,
            pipedrive_person_id: result.person_id,
            pipedrive_org_id: result.org_id,
            pipedrive_deal_id: result.deal_id,
          }).eq('id', leadIdRef.current);
        }
        console.log('[Chat] Pipedrive lead created:', pipedriveIdsRef.current);
      }
    } catch (err) {
      console.error('[Chat] Failed to create Pipedrive lead:', err);
    }
  };

  // Update lead in DB and Pipedrive
  const updateLead = async (fields: Record<string, string | boolean | number | null>, pipedrivePayload?: Record<string, unknown>) => {
    // Update DB
    if (leadIdRef.current) {
      try {
        await supabase.from('leads').update(fields).eq('id', leadIdRef.current);
      } catch (err) {
        console.error('Failed to update lead in DB:', err);
      }
    }
    // Update Pipedrive
    if (pipedrivePayload && pipedriveIdsRef.current.deal_id) {
      try {
        await supabase.functions.invoke('create-pipedrive-lead', {
          body: {
            action: 'update',
            ...pipedriveIdsRef.current,
            ...pipedrivePayload,
          },
        });
      } catch (err) {
        console.error('Failed to update Pipedrive:', err);
      }
    }
  };

  useEffect(() => {
    try {
      const key = 'apex_session_id';
      let s = sessionStorage.getItem(key);
      if (!s) {
        s = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem(key, s);
      }
      sessionIdRef.current = s;
    } catch {
      sessionIdRef.current = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Check for LP data handoff
    const lpRaw = sessionStorage.getItem("orbit_lp_data");
    if (lpRaw) {
      try {
        const lp = JSON.parse(lpRaw);
        if (lp.nome && lp.email && lp.phone && lp.company) {
          // Pre-fill lead data from LP
          const parts = (lp.name || "").trim().split(" ");
          const firstName = parts[0] || lp.nome;
          const lastName = parts.slice(1).join(" ") || lp.sobrenome || "";

          setLeadData((p) => ({
            ...p,
            name: lp.name || `${lp.nome} ${lp.sobrenome || ""}`.trim(),
            nome: lp.nome || firstName,
            sobrenome: lp.sobrenome || lastName,
            whatsapp: lp.phone,
            email: lp.email,
            empresa: lp.company,
          }));

          // Pre-fill refs from LP
          if (lp.leadId) leadIdRef.current = lp.leadId;
          if (lp.pipedriveIds) pipedriveIdsRef.current = lp.pipedriveIds;
          if (lp.utmData) utmDataRef.current = lp.utmData;

          // Clear LP data so it's not reused
          sessionStorage.removeItem("orbit_lp_data");

          // Pipedrive IDs come from LP sessionStorage (blocking call)

          // Skip to oqueFaz — greet by name and go straight to remaining questions
          const nome = lp.nome || firstName;
          setTimeout(() => {
            setMessages([
              { text: `Olá, ${nome}! Prazer em te conhecer! 😊` },
            ]);
            setTimeout(() => {
              addBotMessage(`Já tenho seus dados. Agora me conta: o que a ${lp.company} faz?`);
              setCurrentStep("oqueFaz");
            }, 1200);
          }, 500);
          return; // Skip normal welcome flow
        }
      } catch {
        // Invalid LP data, proceed normally
      }
    }

    // Normal flow (no LP data)
    setTimeout(() => {
      setMessages([
        { text: "Reduza custos e aumente a produtividade com o Orbit. Vamos agendar uma conversa?" },
      ]);
      setTimeout(() => {
        addBotMessage("Então bora começar! Qual seu nome?");
        setCurrentStep("name");
      }, 1200);
    }, 500);
  }, [addBotMessage]);

  const stepIndex = STEPS.indexOf(currentStep);
  const progressSteps = 10;
  const currentProgress = Math.min(stepIndex, progressSteps);

  const handleAnswer = (step: StepType, value: string) => {
    addUserMessage(value);

    switch (step) {
      case "name": {
        const parts = value.trim().split(' ');
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ');
        setLeadData((p) => ({ ...p, name: value, nome: firstName, sobrenome: lastName }));
        setTimeout(() => {
          addBotMessage(`Prazer, ${value}! Qual seu WhatsApp?`);
          setCurrentStep("whatsapp");
        }, 400);
        break;
      }
      case "whatsapp":
        setLeadData((p) => {
          const updated = { ...p, whatsapp: value };
          return updated;
        });
        setTimeout(() => {
          addBotMessage(`Show, ${leadData.name}! Me passa seu e-mail que já te envio um material top! Qual o seu e-mail?`);
          setCurrentStep("email");
        }, 400);
        break;
      case "email": {
        const updatedForSave = { ...leadData, email: value };
        setLeadData((p) => ({ ...p, email: value }));
        // Save partial lead after email (name + whatsapp + email)
        savePartialLead(updatedForSave);
        setTimeout(() => {
          addBotMessage("Ótimo! Qual o nome da sua empresa?");
          setCurrentStep("empresa");
        }, 400);
        break;
      }
      case "empresa": {
        const updatedForPipedrive = { ...leadData, empresa: value };
        setLeadData((p) => ({ ...p, empresa: value }));
        // Only create in Pipedrive if NOT from LP (LP already created)
        if (!pipedriveIdsRef.current.deal_id) {
          console.log('[Chat] No Pipedrive IDs from LP, creating now...');
          createPipedriveFromChat(updatedForPipedrive);
        } else {
          // Just update empresa in DB
          if (leadIdRef.current) {
            supabase.from('leads').update({ empresa: value }).eq('id', leadIdRef.current);
          }
        }
        setTimeout(() => {
          addBotMessage("Legal! O que a sua empresa faz?");
          setCurrentStep("oqueFaz");
        }, 400);
        break;
      }
      case "oqueFaz":
        setLeadData((p) => ({ ...p, oqueFaz: value }));
        console.log('[Chat] Updating oqueFaz, pipedriveIds:', pipedriveIdsRef.current);
        updateLead({ oque_faz: value }, { oqueFaz: value });
        setTimeout(() => {
          addBotMessage("Entendi! E o que você faz na empresa?");
          setCurrentStep("cargo");
        }, 400);
        break;
      case "cargo":
        setLeadData((p) => ({ ...p, cargo: value }));
        console.log('[Chat] Updating cargo, pipedriveIds:', pipedriveIdsRef.current);
        updateLead({ cargo: value }, { cargo: value });
        if (value.toLowerCase().includes("qualidade")) {
          setTimeout(() => {
            addBotMessage("Você utiliza algum software de gestão?");
            setCurrentStep("softwareGestaoConfirm");
          }, 400);
        } else {
          setTimeout(() => {
            addBotMessage("Qual o faturamento mensal da empresa?");
            setCurrentStep("faturamento");
          }, 400);
        }
        break;
      case "softwareGestaoConfirm":
        if (value === "Sim") {
          setTimeout(() => {
            addBotMessage("Qual software de gestão você utiliza?");
            setCurrentStep("softwareGestao");
          }, 400);
        } else {
          setLeadData((p) => ({ ...p, softwareGestao: "Não utiliza" }));
          updateLead({ software_gestao: "Não utiliza" }, { softwareGestao: "Não utiliza" });
          setTimeout(() => {
            addBotMessage("Qual o faturamento mensal da empresa?");
            setCurrentStep("faturamento");
          }, 400);
        }
        break;
      case "softwareGestao":
        setLeadData((p) => ({ ...p, softwareGestao: value }));
        console.log('[Chat] Updating softwareGestao, pipedriveIds:', pipedriveIdsRef.current);
        updateLead({ software_gestao: value }, { softwareGestao: value });
        setTimeout(() => {
          addBotMessage("Qual o faturamento mensal da empresa?");
          setCurrentStep("faturamento");
        }, 400);
        break;
      case "faturamento":
        setLeadData((p) => ({ ...p, faturamento: value }));
        console.log('[Chat] Updating faturamento, pipedriveIds:', pipedriveIdsRef.current);
        updateLead({ faturamento: value }, { faturamento: value });
        setTimeout(() => {
          addBotMessage("Quantos funcionários a empresa tem?");
          setCurrentStep("funcionarios");
        }, 400);
        break;
      case "funcionarios":
        setLeadData((p) => ({ ...p, funcionarios: value }));
        console.log('[Chat] Updating funcionarios, pipedriveIds:', pipedriveIdsRef.current);
        updateLead({ funcionarios: value }, { funcionarios: value });
        setTimeout(() => {
          addBotMessage("Qual a prioridade para você implementar um sistema de gestão?");
          setCurrentStep("prioridade");
        }, 400);
        break;
      case "prioridade": {
        setLeadData((p) => ({ ...p, prioridade: value }));
        console.log('[Chat] Updating prioridade, pipedriveIds:', pipedriveIdsRef.current);
        updateLead({ prioridade: value }, { prioridade: value });
        // Only leads "Até R$ 100 mil/mês" go straight to calendar; rest get preference question
        const fat = leadData.faturamento.toLowerCase();
        const isLowRevenue = fat.includes("até") && fat.includes("100 mil");
        const isHighRevenue = !isLowRevenue;
        if (isHighRevenue) {
          setTimeout(() => {
            addBotMessage(`${leadData.nome}, você prefere participar de uma demonstração em grupo ou prefere que um executivo comercial entre em contato com você?`);
            setCurrentStep("preferencia");
          }, 400);
        } else {
          setTimeout(() => {
            addBotMessage("Perfeito! Agora escolha o melhor dia e horário para a sua demonstração gratuita com nosso time:");
            setCurrentStep("calendar");
          }, 400);
        }
        break;
      }
      case "preferencia":
        if (value === "Demonstração em grupo") {
          setTimeout(() => {
            addBotMessage("Perfeito! Agora escolha o melhor dia e horário para a sua demonstração gratuita com nosso time:");
            setCurrentStep("calendar");
          }, 400);
        } else {
          // Lead wants a sales executive contact — assign via round-robin + move to "Tentativa de contato"
          updateLead({ deseja_contato_vendedor: true }, {});
          setLoadingExec(true);
          (async () => {
            try {
              const dealId = pipedriveIdsRef.current.deal_id;
              if (dealId) {
                // Assign owner via round-robin and move to "Tentativa de contato"
                const { data: assignResult } = await supabase.functions.invoke("assign-pipedrive-owner", {
                  body: { deal_id: dealId, flow: "vendedor" },
                });
                console.log("[Chat] assign-pipedrive-owner result:", assignResult);

                // Match assigned user to executive for display
                if (assignResult?.assigned_user?.name) {
                  const exec = matchExecutive(assignResult.assigned_user.name);
                  if (exec) setMatchedExec(exec);
                }

                // Add note to Pipedrive
                supabase.functions.invoke("get-pipedrive-owners", {
                  body: {
                    leads: [],
                    add_note: {
                      deal_id: dealId,
                      content: `<b>📞 Lead solicitou contato com executivo</b><br><br>O lead optou por falar diretamente com um executivo em vez de participar da demonstração em grupo.${assignResult?.assigned_user?.name ? `<br>Executivo atribuído (roleta): <b>${assignResult.assigned_user.name}</b>` : ""}`,
                    },
                  },
                }).catch((e) => console.error("[Chat] Failed to add Pipedrive note:", e));

                // Tag ManyChat to remove lead from follow-up flows
                supabase.functions.invoke("tag-manychat", {
                  body: {
                    action: "tag",
                    whatsapp: leadData.whatsapp,
                    tag_name: "foi-falar-com-vendedor",
                    lead_data: {
                      nome: leadData.name,
                      sobrenome: leadData.sobrenome,
                      email: leadData.email,
                    },
                  },
                }).catch((e) => console.error("[Chat] Failed to tag ManyChat foi-falar-com-vendedor:", e));
              }

              // Sync to Make.com when lead chooses to talk to executive
              if (leadIdRef.current) {
                supabase.functions.invoke('sync-lead-make', {
                  body: { lead_id: leadIdRef.current },
                }).then(({ error }) => {
                  if (error) console.warn('[Chat] Make.com sync (vendedor) failed:', error);
                  else console.log('[Chat] Lead synced to Make.com (vendedor flow)');
                });
              }
            } catch (e) {
              console.error("[Chat] Failed to assign executive:", e);
            } finally {
              setLoadingExec(false);
            }
          })();
          setTimeout(() => {
            setCurrentStep("confirmationVendedor");
          }, 400);
        }
        break;
    }
  };

  const handleCalendarSelect = async (date: string, time: string) => {
    // If Pipedrive IDs are still missing, try one last fetch from DB
    if (!pipedriveIdsRef.current.deal_id && leadIdRef.current) {
      const { data: fresh } = await supabase.from('leads')
        .select('pipedrive_deal_id, pipedrive_person_id, pipedrive_org_id')
        .eq('id', leadIdRef.current)
        .maybeSingle();
      if (fresh?.pipedrive_deal_id) {
        pipedriveIdsRef.current = {
          deal_id: fresh.pipedrive_deal_id,
          person_id: fresh.pipedrive_person_id,
          org_id: fresh.pipedrive_org_id,
        };
        console.log('[Chat] Pipedrive IDs fetched at calendar select:', pipedriveIdsRef.current);
      }
    }
    console.log('[Chat] Calendar select — pipedriveIds:', pipedriveIdsRef.current, 'leadId:', leadIdRef.current);
    setLeadData((p) => ({ ...p, date, time }));
    addUserMessage(`${date} às ${time}`);

    // Update DB with final scheduling data
    // Determine meeting link based on lead profile
    const meetLink = getMeetingLink(leadData.faturamento, leadData.cargo, leadData.oqueFaz);
    setResolvedMeetLink(meetLink);

    if (leadIdRef.current) {
      try {
        await supabase.from('leads').update({
          data_reuniao: date,
          horario_reuniao: time,
          status: 'completo',
          ligacao_agendada: true,
          link_reuniao: meetLink,
        }).eq('id', leadIdRef.current);
      } catch (err) {
        console.error('Failed to update lead with schedule:', err);
      }
      // Re-sync to Make.com with complete data (fire-and-forget)
      supabase.functions.invoke('sync-lead-make', {
        body: { lead_id: leadIdRef.current },
      }).then(({ error }) => {
        if (error) console.warn('Make.com re-sync failed:', error);
        else console.log('Lead re-synced to Make.com (complete)');
      });
    }

    // Disparar webhook n8n via Edge Function (always, regardless of leadIdRef)
    try {
      const [dd, mm, yyyy] = date.split("/");
      const callDatetime = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}T${time}:00-03:00`;
      const phone = leadData.whatsapp.startsWith("+") ? leadData.whatsapp : `+55${leadData.whatsapp.replace(/\D/g, "")}`;
      const { data: n8nResult, error: n8nError } = await supabase.functions.invoke("trigger-n8n-call", {
        body: {
          lead_name: `${leadData.nome} ${leadData.sobrenome || ""}`.trim(),
          lead_phone: phone,
          call_datetime: callDatetime,
          subscriber_id: null,
          deal_id: pipedriveIdsRef.current.deal_id || null,
        },
      });
      if (n8nError || !n8nResult?.ok) {
        console.error("[Chat] n8n trigger failed:", n8nError || n8nResult);
      } else {
        console.log("[Chat] n8n webhook disparado com sucesso:", n8nResult);
      }
    } catch (e) {
      console.error("[Chat] Falha ao disparar n8n edge function:", e);
    }

    // Update Pipedrive with scheduling + UTM data
    updateLead({}, {
      name: leadData.name,
      whatsapp: leadData.whatsapp,
      email: leadData.email,
      empresa: leadData.empresa,
      oqueFaz: leadData.oqueFaz,
      cargo: leadData.cargo,
      softwareGestao: leadData.softwareGestao,
      faturamento: leadData.faturamento,
      funcionarios: leadData.funcionarios,
      prioridade: leadData.prioridade,
      date,
      time,
      utmData: utmDataRef.current,
    });

    // Send calendar invite email
    try {
      await supabase.functions.invoke("send-calendar-invite", {
        body: {
          email: leadData.email,
          name: `${leadData.nome} ${leadData.sobrenome || ""}`.trim(),
          date,
          time,
          meetingLink: meetLink,
        },
      });
      console.log("[Chat] Calendar invite sent to:", leadData.email);
    } catch (e) {
      console.error("[Chat] Failed to send calendar invite:", e);
    }

    // Tag lead in ManyChat as "agendou-reuniao"
    try {
      await supabase.functions.invoke("tag-manychat", {
        body: {
          action: "tag",
          whatsapp: leadData.whatsapp,
          tag_name: "agendou-reuniao",
          lead_data: {
            nome: leadData.nome,
            sobrenome: leadData.sobrenome,
            email: leadData.email,
            empresa: leadData.empresa,
            oque_faz: leadData.oqueFaz,
            cargo: leadData.cargo,
            faturamento: leadData.faturamento,
            funcionarios: leadData.funcionarios,
            prioridade: leadData.prioridade,
            data_reuniao: date,
            horario_reuniao: time,
            software_gestao: leadData.softwareGestao,
            link_reuniao: meetLink,
          },
        },
      });
      console.log("[Chat] ManyChat tag 'agendou-reuniao' applied");
    } catch (e) {
      console.error("[Chat] Failed to tag ManyChat:", e);
    }

    // Assign deal owner via round-robin (fire-and-forget)
    if (pipedriveIdsRef.current.deal_id) {
      supabase.functions.invoke("assign-pipedrive-owner", {
        body: { deal_id: pipedriveIdsRef.current.deal_id, flow: "sala" },
      }).then(({ data, error }) => {
        if (error) console.warn("[Chat] assign-pipedrive-owner (sala) failed:", error);
        else console.log("[Chat] Deal assigned to:", data?.assigned_user?.name);
      });
    }

    setTimeout(() => {
      setCurrentStep("confirmation");
    }, 500);
  };

  const renderInput = () => {
    if (isTyping) return null;

    switch (currentStep) {
      case "name":
        return <ChatInput label="NOME COMPLETO" placeholder="Digite seu nome e sobrenome..." onSubmit={(v) => handleAnswer("name", v)} />;
      case "whatsapp":
        return <WhatsAppInput onSubmit={(v) => handleAnswer("whatsapp", v)} />;
      case "email":
        return <ChatInput label="E-MAIL" placeholder="seu@email.com" onSubmit={(v) => handleAnswer("email", v)} type="email" />;
      case "empresa":
        return <ChatInput label="EMPRESA" placeholder="Nome da sua empresa..." onSubmit={(v) => handleAnswer("empresa", v)} />;
      case "oqueFaz":
        if (showOutroSegmento) {
          return <ChatInput label="SEGMENTO" placeholder="Digite o segmento da empresa..." onSubmit={(v) => handleAnswer("oqueFaz", v)} />;
        }
        return <ChatOptions options={SEGMENTO_OPTIONS} onSelect={(v) => {
          if (v === "Outro") {
            setShowOutroSegmento(true);
          } else {
            handleAnswer("oqueFaz", v);
          }
        }} />;
      case "cargo":
        if (showOutroCargo) {
          return <ChatInput label="SEU CARGO" placeholder="Digite seu cargo..." onSubmit={(v) => handleAnswer("cargo", v)} />;
        }
        return <ChatOptions options={CARGO_OPTIONS} onSelect={(v) => {
          if (v === "Outro") {
            setShowOutroCargo(true);
          } else {
            handleAnswer("cargo", v);
          }
        }} />;
      case "faturamento":
        return <ChatOptions options={FATURAMENTO_OPTIONS} onSelect={(v) => handleAnswer("faturamento", v)} />;
      case "funcionarios":
        return <ChatOptions options={FUNCIONARIOS_OPTIONS} onSelect={(v) => handleAnswer("funcionarios", v)} />;
      case "softwareGestaoConfirm":
        return <ChatOptions options={["Sim", "Não"]} onSelect={(v) => handleAnswer("softwareGestaoConfirm", v)} />;
      case "softwareGestao":
        return <ChatInput label="SOFTWARE DE GESTÃO" placeholder="Ex: Totvs, SAP..." onSubmit={(v) => handleAnswer("softwareGestao", v)} />;
      case "prioridade":
        return <ChatOptions options={PRIORIDADE_OPTIONS} onSelect={(v) => handleAnswer("prioridade", v)} />;
      case "preferencia":
        return <ChatOptions options={["Demonstração em grupo", "Falar com executivo comercial"]} onSelect={(v) => handleAnswer("preferencia", v)} />;
      case "calendar":
        return null;
      case "confirmationVendedor":
        return null;
      default:
        return null;
    }
  };

  if (currentStep === "confirmationVendedor") {
    return (
      <div className="h-dvh bg-background flex flex-col overflow-hidden">
        <ChatHeader currentStep={progressSteps} totalSteps={progressSteps} />
        <div className="flex-1 overflow-y-auto flex items-center justify-center px-4">
          <div className="w-full max-w-md text-center space-y-6 animate-fade-in-up">
            {loadingExec ? (
              <p className="text-muted-foreground">Localizando seu executivo...</p>
            ) : matchedExec ? (
              <>
                <img
                  src={matchedExec.foto}
                  alt={matchedExec.nome}
                  className="w-28 h-28 rounded-full object-cover object-top mx-auto border-4 border-primary/20 shadow-lg"
                />
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {leadData.nome}, seu executivo é
                  </h2>
                  <p className="text-2xl font-bold text-primary mt-1">{matchedExec.nome}</p>
                </div>
                <a
                  href={`https://wa.me/${matchedExec.whatsapp}?text=${encodeURIComponent(`Olá ${matchedExec.nome.split(" ")[0]}, sou ${leadData.name} da ${leadData.empresa}. Gostaria de saber mais sobre o Orbit!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base shadow-md"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.462-1.494A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.724-6.022-1.95l-.422-.316-2.644.885.886-2.638-.346-.45A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                  Fale agora com {matchedExec.nome.split(" ")[0]}
                </a>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl">🤝</span>
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {leadData.nome}, seu contato foi registrado!
                </h2>
                <p className="text-muted-foreground text-sm">
                  Um dos nossos executivos comerciais vai entrar em contato com você em breve pelo WhatsApp.
                </p>
              </>
            )}
            <p className="text-xs text-muted-foreground">Fique de olho no seu WhatsApp! 📱</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "confirmation") {
    return (
      <div className="h-dvh bg-background flex flex-col overflow-hidden">
        <ChatHeader currentStep={progressSteps} totalSteps={progressSteps} />
        <div className="flex-1 overflow-y-auto flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <ConfirmationScreen name={leadData.name} date={leadData.date} time={leadData.time} segmento={leadData.oqueFaz} meetingLink={resolvedMeetLink} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh bg-background flex flex-col overflow-hidden">
      <ChatHeader currentStep={currentProgress} totalSteps={progressSteps} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scrollbar">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {messages.map((msg, i) => (
            <ChatBubble key={i} message={msg.text} isUser={msg.isUser} boldName={msg.boldName} />
          ))}
          {isTyping && <TypingIndicator />}
          {currentStep === "calendar" && !isTyping && (
            <CalendarPicker onSelect={handleCalendarSelect} segmento={leadData.oqueFaz} cargo={leadData.cargo} faturamento={leadData.faturamento} />
          )}
        </div>
      </div>

      <div className="border-t border-border shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-3">
          {renderInput()}
        </div>
      </div>
    </div>
  );
};

export default Index;
