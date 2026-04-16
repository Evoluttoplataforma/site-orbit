import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import ChatPopup from "@/components/chat/ChatPopup";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Orbit - Contrate um time de IA que executa",
  description: "Gestão Operada por IA com consultoria recorrente passiva. Dezenas de agentes especializados constroem e operam a gestão da sua empresa 24/7.",
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    title: "Orbit - Contrate um time de IA que executa",
    description: "Gestão Operada por IA com consultoria recorrente passiva. Dezenas de agentes especializados constroem e operam a gestão da sua empresa 24/7.",
    url: "https://orbitgestao.com.br",
    siteName: "Orbit Gestão",
    images: [{ url: "/images/og-image.png", width: 1080, height: 1080, alt: "Orbit Gestão" }],
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit - Contrate um time de IA que executa",
    description: "Gestão Operada por IA com consultoria recorrente passiva.",
    images: ["/images/og-image.png"],
  },
  metadataBase: new URL("https://orbitgestao.com.br"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} ${plusJakarta.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" href="/images/hero-bg.avif" as="image" type="image/avif" />
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style" crossOrigin="anonymous" />
        <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /></noscript>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W6H3729J');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Orbit Gestão",
          "description": "Plataforma de gestão operada por IA com consultoria recorrente passiva. Dezenas de agentes de IA especializados constroem e operam a gestão da sua empresa 24/7.",
          "url": "https://orbitgestao.com.br",
          "logo": "https://orbitgestao.com.br/images/logo-orbit-white.png",
          "image": "https://orbitgestao.com.br/images/og-image.png",
          "foundingDate": "1996",
          "sameAs": [
            "https://www.instagram.com/orbitgestao/",
            "https://www.youtube.com/@Orbit.Gest%C3%A3o"
          ],
          "parentOrganization": {
            "@type": "Organization",
            "name": "Grupo GSN",
            "description": "30 anos de experiência em gestão e consultoria empresarial, mais de 8.000 empresas atendidas."
          },
          "knowsAbout": [
            "Gestão Empresarial com IA",
            "Agentes de IA para gestão",
            "Mapeamento de processos",
            "Indicadores e KPIs",
            "Consultoria recorrente passiva",
            "Planejamento estratégico",
            "Gestão de pessoas",
            "Auditorias e conformidade"
          ],
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "BRL",
            "lowPrice": "1200",
            "highPrice": "4500",
            "offerCount": "3"
          }
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Orbit Gestão",
          "url": "https://orbitgestao.com.br",
          "description": "Plataforma de gestão operada por IA. Contrate um time de agentes de IA que executa.",
          "inLanguage": ["pt-BR", "en"]
        }) }} />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W6H3729J" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <LocaleProvider>
        {children}
        <ChatPopup />
        <WhatsAppWidget />
        </LocaleProvider>
        <script dangerouslySetInnerHTML={{ __html: `
// ===== CAMPOS OCULTOS GTM - Captura e Preenchimento =====
(function(){
  function getParam(n){var m=RegExp("[?&]"+n+"=([^&]*)").exec(window.location.search);return m?decodeURIComponent(m[1].replace(/\\+/g," ")):""}
  function getCookie(n){var m=document.cookie.match(new RegExp("(^| )"+n+"=([^;]+)"));return m?decodeURIComponent(m[2]):""}
  function generateSessionId(){return Date.now().toString(36)+"."+Math.random().toString(36).substring(2,10)}
  var STORAGE_KEY="__wl_tracking";
  var urlParams=["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","gbraid","wbraid","gad_campaignid","gad_source","fbclid","ttclid","msclkid","li_fat_id","twclid","sck","ref"];
  var stored=null;
  try{stored=JSON.parse(sessionStorage.getItem(STORAGE_KEY))}catch(e){}
  // Mapeia referrer (quando lead chega sem UTM na URL) → utm_source/medium sintéticos
  var REFERRER_MAP={
    "google.":{utm_source:"google",utm_medium:"organic"},
    "bing.":{utm_source:"bing",utm_medium:"organic"},
    "yahoo.":{utm_source:"yahoo",utm_medium:"organic"},
    "duckduckgo.":{utm_source:"duckduckgo",utm_medium:"organic"},
    "yandex.":{utm_source:"yandex",utm_medium:"organic"},
    "ecosia.":{utm_source:"ecosia",utm_medium:"organic"},
    "instagram.":{utm_source:"instagram",utm_medium:"social"},
    "facebook.":{utm_source:"facebook",utm_medium:"social"},
    "fb.":{utm_source:"facebook",utm_medium:"social"},
    "l.facebook.":{utm_source:"facebook",utm_medium:"social"},
    "lm.facebook.":{utm_source:"facebook",utm_medium:"social"},
    "youtube.":{utm_source:"youtube",utm_medium:"social"},
    "youtu.be":{utm_source:"youtube",utm_medium:"social"},
    "twitter.":{utm_source:"twitter",utm_medium:"social"},
    "x.com":{utm_source:"twitter",utm_medium:"social"},
    "t.co":{utm_source:"twitter",utm_medium:"social"},
    "linkedin.":{utm_source:"linkedin",utm_medium:"social"},
    "lnkd.in":{utm_source:"linkedin",utm_medium:"social"},
    "tiktok.":{utm_source:"tiktok",utm_medium:"social"},
    "pinterest.":{utm_source:"pinterest",utm_medium:"social"},
    "reddit.":{utm_source:"reddit",utm_medium:"social"},
    "whatsapp.":{utm_source:"whatsapp",utm_medium:"social"},
    "wa.me":{utm_source:"whatsapp",utm_medium:"social"},
    "api.whatsapp.":{utm_source:"whatsapp",utm_medium:"social"},
    "telegram.":{utm_source:"telegram",utm_medium:"social"},
    "t.me":{utm_source:"telegram",utm_medium:"social"},
    "chatgpt.":{utm_source:"chatgpt",utm_medium:"ai"},
    "chat.openai.":{utm_source:"chatgpt",utm_medium:"ai"},
    "openai.":{utm_source:"chatgpt",utm_medium:"ai"},
    "gemini.google":{utm_source:"gemini",utm_medium:"ai"},
    "perplexity.":{utm_source:"perplexity",utm_medium:"ai"},
    "claude.":{utm_source:"claude",utm_medium:"ai"},
    "poe.":{utm_source:"poe",utm_medium:"ai"},
    "copilot.microsoft":{utm_source:"copilot",utm_medium:"ai"},
    "bing.com/chat":{utm_source:"bingchat",utm_medium:"ai"},
    "wikipedia.":{utm_source:"wikipedia",utm_medium:"referral"},
    "github.":{utm_source:"github",utm_medium:"referral"},
    "medium.":{utm_source:"medium",utm_medium:"referral"},
    "quora.":{utm_source:"quora",utm_medium:"referral"}
  };
  function detectReferrerSource(){
    var ref=document.referrer||"";
    if(!ref) return null;
    try{
      var refHost=new URL(ref).hostname.toLowerCase();
      var curHost=window.location.hostname.toLowerCase().replace(/^www\\./,"");
      // Internal referrer (mesmo site) — ignora
      if(refHost===curHost||refHost.endsWith("."+curHost)||curHost.endsWith("."+refHost)) return null;
      // Procura match no map
      for(var key in REFERRER_MAP){
        if(refHost.indexOf(key)!==-1) return REFERRER_MAP[key];
      }
      // Referrer desconhecido → marca como referral genérico com o domínio
      return {utm_source:refHost.replace(/^www\\./,""),utm_medium:"referral"};
    }catch(e){return null;}
  }
  if(!stored){
    stored={};
    urlParams.forEach(function(p){var v=getParam(p);if(v)stored[p]=v});
    // Fallback 1: detecta UTM via referrer (Google orgânico, Instagram, ChatGPT, etc)
    if(!stored.utm_source){
      var detected=detectReferrerSource();
      if(detected){
        stored.utm_source=detected.utm_source;
        stored.utm_medium=detected.utm_medium;
        if(!stored.utm_campaign) stored.utm_campaign="(referral)";
      }
    }
    // Fallback 2: tráfego direto (sem referrer e sem UTM)
    if(!stored.utm_source){
      stored.utm_source="(direct)";
      stored.utm_medium="(none)";
      stored.utm_campaign="(direct)";
    }
    var fbc=getCookie("_fbc"),fbp=getCookie("_fbp");
    if(fbc)stored.fbc=fbc;if(fbp)stored.fbp=fbp;
    if(stored.fbclid&&!stored.fbc){stored.fbc="fb.1."+Date.now()+"."+stored.fbclid}
    stored.landing_page=window.location.href;
    stored.originPage=window.location.href;
    stored.referrer=document.referrer||"";
    stored.user_agent=navigator.userAgent;
    stored.first_visit=new Date().toISOString();
    stored.session_id=generateSessionId();
    var attrs={};urlParams.forEach(function(p){if(stored[p])attrs[p]=stored[p]});
    try{stored.session_attributes_encoded=btoa(JSON.stringify(attrs))}catch(e){}
    try{sessionStorage.setItem(STORAGE_KEY,JSON.stringify(stored))}catch(e){}
  }
  function populateHiddenFields(){
    var fields=["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","gbraid","wbraid","gad_campaignid","gad_source","fbclid","fbc","fbp","ttclid","msclkid","li_fat_id","twclid","sck","landing_page","referrer","user_agent","first_visit","session_id","session_attributes_encoded","originPage","ref"];
    fields.forEach(function(f){var el=document.getElementById("h_"+f);if(el&&stored[f])el.value=stored[f]});
  }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",populateHiddenFields)}else{populateHiddenFields()}
  window.__wlTracking=stored;
  if(stored.fbclid){var fbcVal=stored.fbc||("fb.1."+Date.now()+"."+stored.fbclid);document.cookie="_fbc="+encodeURIComponent(fbcVal)+";max-age="+(90*24*60*60)+";path=/;SameSite=Lax"}
})();
        ` }} />
        <script src="/js/main-v2.js?v=2" defer></script>
        <script src="/js/orbit-init.js?v=2" defer></script>
        <script src="/js/banner.js?v=3" defer></script>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';document.head.appendChild(l)})()` }} />
      </body>
    </html>
  );
}
