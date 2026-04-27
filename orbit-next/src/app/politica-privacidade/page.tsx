export const metadata = {
  title: 'Política de Privacidade — Orbit Gestão',
  description: 'Política de Privacidade e Proteção de Dados da Orbit Gestão (LGPD).',
};

export default function Page() {
  return (
    <div style={{ background: '#0D1117', color: '#C9D1D9', minHeight: '100vh', padding: '60px 20px', fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <a href="/" style={{ color: '#ffba1a', textDecoration: 'none', fontSize: 14, marginBottom: 32, display: 'inline-block' }}>← Voltar para o site</a>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Política de Privacidade</h1>
        <p style={{ color: '#8B949E', marginBottom: 40 }}>Última atualização: 14 de abril de 2026</p>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>1. Quem somos</h2>
          <p style={{ lineHeight: 1.7, marginBottom: 12 }}>A <strong style={{ color: '#fff' }}>Orbit Gestão</strong> (orbitgestao.com.br) é uma plataforma de gestão operada por inteligência artificial, parte do <strong style={{ color: '#fff' }}>Grupo GSN</strong>. Esta Política de Privacidade descreve como coletamos, usamos e protegemos seus dados pessoais, em conformidade com a <strong style={{ color: '#ffba1a' }}>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>2. Quais dados coletamos</h2>
          <p style={{ lineHeight: 1.7, marginBottom: 12 }}>Coletamos os seguintes dados pessoais quando você se cadastra em formulários do nosso site (live, contato, parcerias, blog, painel administrativo):</p>
          <ul style={{ paddingLeft: 24, lineHeight: 1.9 }}>
            <li>Nome completo</li>
            <li>E-mail</li>
            <li>Telefone / WhatsApp</li>
            <li>Empresa e cargo (quando aplicável)</li>
            <li>Dados de navegação (UTM, IP, página de origem, referrer)</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>3. Como usamos seus dados</h2>
          <p style={{ lineHeight: 1.7, marginBottom: 12 }}>Utilizamos seus dados para:</p>
          <ul style={{ paddingLeft: 24, lineHeight: 1.9 }}>
            <li>Enviar comunicações relacionadas à live semanal (confirmação de inscrição, lembretes 15 minutos antes, link &quot;estamos ao vivo&quot; e convites para próximas edições)</li>
            <li>Enviar conteúdos educacionais sobre gestão e IA</li>
            <li>Entrar em contato comercial quando solicitado</li>
            <li>Melhorar nossa plataforma e personalizar a experiência</li>
            <li>Cumprir obrigações legais</li>
          </ul>
          <p style={{ lineHeight: 1.7, marginTop: 12 }}>O envio é feito por <strong style={{ color: '#fff' }}>e-mail e WhatsApp</strong>, sempre baseado no consentimento explícito que você forneceu ao se cadastrar.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>4. Base legal (LGPD)</h2>
          <p style={{ lineHeight: 1.7 }}>O tratamento dos seus dados é realizado com base no <strong style={{ color: '#ffba1a' }}>consentimento explícito</strong> que você forneceu ao se cadastrar em nossos formulários, marcando a caixa de aceite. Também tratamos dados com base em legítimo interesse (prevenção a fraudes, segurança) e cumprimento de obrigações legais.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>5. Compartilhamento</h2>
          <p style={{ lineHeight: 1.7 }}>Seus dados <strong style={{ color: '#fff' }}>não são vendidos</strong> a terceiros. Compartilhamos apenas com prestadores de serviço necessários para a operação:</p>
          <ul style={{ paddingLeft: 24, lineHeight: 1.9, marginTop: 8 }}>
            <li><strong style={{ color: '#fff' }}>Supabase</strong> — banco de dados (armazenamento)</li>
            <li><strong style={{ color: '#fff' }}>MailerSend</strong> — disparo de e-mails transacionais e relacionais</li>
            <li><strong style={{ color: '#fff' }}>ManyChat</strong> — automação de mensagens via WhatsApp</li>
            <li><strong style={{ color: '#fff' }}>Google Tag Manager / Meta</strong> — análise de tráfego e remarketing</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>6. Seus direitos</h2>
          <p style={{ lineHeight: 1.7, marginBottom: 12 }}>De acordo com a LGPD, você pode a qualquer momento:</p>
          <ul style={{ paddingLeft: 24, lineHeight: 1.9 }}>
            <li>Confirmar a existência de tratamento dos seus dados</li>
            <li>Acessar, corrigir ou atualizar seus dados</li>
            <li>Solicitar a exclusão dos dados</li>
            <li>Revogar o consentimento e cancelar o recebimento de mensagens</li>
            <li>Solicitar portabilidade dos dados</li>
          </ul>
          <p style={{ lineHeight: 1.7, marginTop: 12 }}>Para exercer qualquer direito, envie um e-mail para <span style={{ color: '#ffba1a' }}>contato@orbitgestao.com.br</span>.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>7. Cancelamento (opt-out)</h2>
          <p style={{ lineHeight: 1.7 }}>Você pode cancelar o recebimento de comunicações a qualquer momento:</p>
          <ul style={{ paddingLeft: 24, lineHeight: 1.9, marginTop: 8 }}>
            <li><strong style={{ color: '#fff' }}>E-mails</strong>: clicando no link de descadastramento ao final de cada mensagem</li>
            <li><strong style={{ color: '#fff' }}>WhatsApp</strong>: respondendo &quot;PARAR&quot; ou &quot;CANCELAR&quot; em qualquer mensagem que receber</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>8. Segurança</h2>
          <p style={{ lineHeight: 1.7 }}>Seus dados são armazenados em servidores seguros, com criptografia em trânsito (HTTPS) e em repouso. Aplicamos as melhores práticas de segurança para evitar acesso não autorizado, alteração ou destruição.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>9. Cookies</h2>
          <p style={{ lineHeight: 1.7 }}>Usamos cookies próprios e de terceiros (Google, Meta) para análise de tráfego, remarketing e melhoria da experiência. Você pode desabilitar cookies nas configurações do seu navegador.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>10. Encarregado de Dados (DPO)</h2>
          <p style={{ lineHeight: 1.7 }}>Para questões relacionadas ao tratamento de dados pessoais, entre em contato com nosso Encarregado de Dados:</p>
          <p style={{ lineHeight: 1.7, marginTop: 8 }}><strong style={{ color: '#fff' }}>E-mail:</strong> <span style={{ color: '#ffba1a' }}>contato@orbitgestao.com.br</span></p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>11. Alterações</h2>
          <p style={{ lineHeight: 1.7 }}>Esta política pode ser atualizada periodicamente. Recomendamos que você consulte esta página regularmente. Mudanças significativas serão comunicadas pelos canais cadastrados.</p>
        </section>

        <p style={{ color: '#484F58', fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: '1px solid #21262d', textAlign: 'center' }}>Orbit Gestão — Grupo GSN © 2026</p>
      </div>
    </div>
  );
}
