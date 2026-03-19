import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orbit - Contrate um time de IA que executa",
  description: "Gestão Operada por IA com consultoria recorrente passiva. 12 agentes especializados constroem e operam a gestão da sua empresa 24/7.",
  icons: { icon: '/images/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        {children}
        <script src="/js/main-v2.js" defer></script>
        <script src="/js/orbit-init.js" defer></script>
      </body>
    </html>
  );
}
