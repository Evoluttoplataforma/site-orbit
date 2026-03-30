import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";

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
  if(!stored){
    stored={};
    urlParams.forEach(function(p){var v=getParam(p);if(v)stored[p]=v});
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
        <script src="/js/banner.js?v=1" defer></script>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';document.head.appendChild(l)})()` }} />
      </body>
    </html>
  );
}
