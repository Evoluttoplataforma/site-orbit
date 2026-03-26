import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W6H3729J" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        {children}
        <script src="/js/main-v2.js" defer></script>
        <script src="/js/orbit-init.js" defer></script>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';document.head.appendChild(l)})()` }} />
      </body>
    </html>
  );
}
