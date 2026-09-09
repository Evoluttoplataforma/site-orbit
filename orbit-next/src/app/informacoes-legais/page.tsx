import type { Metadata } from 'next';
import { I18n } from '@/lib/i18n-react';

export const metadata: Metadata = {
  title: 'Informações Legais | Orbit Gestão',
  description:
    'Informações empresariais e jurídicas da Orbit Gestão, incluindo razão social, CNPJ, endereço e canais oficiais de contato.',
  alternates: { canonical: 'https://orbitgestao.com.br/informacoes-legais' },
  openGraph: {
    title: 'Informações Legais | Orbit Gestão',
    description:
      'Informações empresariais e jurídicas da Orbit Gestão, incluindo razão social, CNPJ, endereço e canais oficiais de contato.',
    url: 'https://orbitgestao.com.br/informacoes-legais',
  },
};

const wrap = { background: '#0D1117', color: '#C9D1D9', minHeight: '100vh', padding: '60px 20px', fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" } as const;
const container = { maxWidth: 820, margin: '0 auto' } as const;
const back = { color: '#ffba1a', textDecoration: 'none', fontSize: 14, marginBottom: 32, display: 'inline-block' } as const;
const h1 = { fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 } as const;
const stamp = { color: '#8B949E', marginBottom: 40 } as const;
const h2 = { fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12, marginTop: 8 } as const;
const p = { lineHeight: 1.7, marginBottom: 12 } as const;
const ul = { paddingLeft: 24, lineHeight: 1.9, marginBottom: 12 } as const;
const section = { marginBottom: 32 } as const;
const strong = { color: '#fff' } as const;
const accent = { color: '#ffba1a' } as const;
const dl = { margin: '0 0 12px', lineHeight: 1.8 } as const;
const dt = { color: '#8B949E', fontSize: 13, fontWeight: 600, marginTop: 12 } as const;
const dd = { color: '#fff', margin: '0 0 4px' } as const;

export default function Page() {
  return (
    <div style={wrap}>
      <div style={container}>
        <I18n as="a" href="/" style={back} pt="← Voltar para o site" en="← Back to the site" />
        <I18n as="h1" style={h1} pt="Informações Legais" en="Legal Information" />
        <I18n
          as="p"
          style={stamp}
          pt="Última atualização: 31 de agosto de 2026"
          en="Last updated: 31 August 2026"
        />

        <section style={section}>
          <I18n
            style={p}
            pt={
              <>
                Esta página reúne as principais informações empresariais e jurídicas relacionadas à operação da{' '}
                <strong style={strong}>Orbit Gestão</strong> no Brasil.
              </>
            }
            en={
              <>
                This page gathers the main corporate and legal information related to the operation of{' '}
                <strong style={strong}>Orbit Gestão</strong> in Brazil.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="Identificação empresarial" en="Business identification" />
          <dl style={dl}>
            <I18n as="dt" style={dt} pt="Razão social" en="Legal name" />
            <dd style={dd}>FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA</dd>
            <I18n as="dt" style={dt} pt="Nome comercial" en="Trade name" />
            <dd style={dd}>Orbit Gestão</dd>
            <dt style={dt}>CNPJ</dt>
            <dd style={dd}>65.167.064/0001-27</dd>
            <I18n as="dt" style={dt} pt="Endereço" en="Address" />
            <dd style={dd}>
              Rodovia Jose Carlos Daux, 5500, Conj. 306, Saco Grande, Florianópolis, Santa Catarina, CEP 88032-005,
              Brasil
            </dd>
            <I18n as="dt" style={dt} pt="Website oficial" en="Official website" />
            <dd style={dd}>
              <a href="https://orbitgestao.com.br" style={accent}>orbitgestao.com.br</a>
            </dd>
            <dt style={dt}>E-mail</dt>
            <dd style={dd}>
              <a href="mailto:contato@orbitgestao.com.br" style={accent}>contato@orbitgestao.com.br</a>
            </dd>
            <I18n as="dt" style={dt} pt="Telefone" en="Telephone" />
            <dd style={dd}>
              <a href="https://wa.me/5548998246863" style={accent}>+55 (48) 99824-6863</a>
            </dd>
          </dl>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="Sobre a marca Orbit Gestão" en="About the Orbit Gestão brand" />
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>Orbit Gestão</strong> é a marca comercial utilizada por{' '}
                <strong style={strong}>FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA</strong> para a oferta e operação de
                serviços tecnológicos relacionados à gestão empresarial e inteligência artificial.
              </>
            }
            en={
              <>
                <strong style={strong}>Orbit Gestão</strong> is the trade name used by{' '}
                <strong style={strong}>FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA</strong> to offer and operate technology
                services related to business management and artificial intelligence.
              </>
            }
          />
          <I18n
            style={p}
            pt="A utilização da expressão “Orbit Gestão”, “Orbit” ou da identidade visual Orbit nas comunicações institucionais e comerciais refere-se à operação realizada por FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA, salvo quando houver indicação expressa em contrário."
            en="Use of the expression “Orbit Gestão”, “Orbit” or of the Orbit visual identity in institutional and commercial communications refers to the operation carried out by FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA, unless expressly indicated otherwise."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="Website oficial" en="Official website" />
          <I18n
            style={p}
            pt={
              <>
                O domínio oficial da operação é <strong style={strong}>orbitgestao.com.br</strong>. Páginas, conteúdos
                institucionais, políticas, informações comerciais e demais recursos disponibilizados nesse domínio fazem
                parte da presença digital oficial da Orbit Gestão.
              </>
            }
            en={
              <>
                The official domain of the operation is <strong style={strong}>orbitgestao.com.br</strong>. Pages,
                institutional content, policies, commercial information and other resources made available on that
                domain are part of Orbit Gestão’s official digital presence.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="Relação com o Grupo GSN" en="Relationship with Grupo GSN" />
          <I18n
            style={p}
            pt={
              <>
                A Orbit Gestão integra o ecossistema do <strong style={strong}>Grupo GSN</strong>. As referências ao
                Grupo GSN existentes no website e nas comunicações institucionais representam a vinculação da Orbit ao
                grupo empresarial.
              </>
            }
            en={
              <>
                Orbit Gestão is part of the <strong style={strong}>Grupo GSN</strong> ecosystem. References to Grupo GSN
                on the website and in institutional communications represent Orbit’s affiliation with the business
                group.
              </>
            }
          />
          <I18n
            style={p}
            pt={
              <>
                A pessoa jurídica responsável pela operação dos serviços Orbit identificados nesta página é{' '}
                <strong style={strong}>FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA</strong>, CNPJ{' '}
                <strong style={strong}>65.167.064/0001-27</strong>.
              </>
            }
            en={
              <>
                The legal entity responsible for operating the Orbit services identified on this page is{' '}
                <strong style={strong}>FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA</strong>, CNPJ{' '}
                <strong style={strong}>65.167.064/0001-27</strong>.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="Operação white label" en="White-label operation" />
          <I18n
            style={p}
            pt="Determinados serviços da infraestrutura Orbit podem ser disponibilizados por consultorias, canais ou parceiros utilizando identidade visual própria. Nesse modelo, a experiência apresentada ao cliente poderá utilizar:"
            en="Certain Orbit infrastructure services may be made available by consultancies, channels or partners using their own visual identity. In that model, the experience presented to the customer may use:"
          />
          <ul style={ul}>
            <I18n as="li" pt="marca do parceiro;" en="the partner’s brand;" />
            <I18n as="li" pt="logotipo do parceiro;" en="the partner’s logo;" />
            <I18n as="li" pt="cores do parceiro;" en="the partner’s colours;" />
            <I18n as="li" pt="domínio ou ambiente personalizado;" en="a custom domain or environment;" />
            <I18n as="li" pt="metodologia própria;" en="the partner’s own methodology;" />
            <I18n as="li" pt="jornadas e conteúdos configurados pelo parceiro." en="journeys and content configured by the partner." />
          </ul>
          <I18n
            style={p}
            pt="A utilização de identidade visual de terceiros não altera automaticamente a identificação da empresa responsável pela infraestrutura tecnológica Orbit. As responsabilidades específicas de cada parte serão aquelas estabelecidas nos respectivos contratos comerciais."
            en="Use of a third party’s visual identity does not automatically change the identification of the company responsible for the Orbit technology infrastructure. The specific responsibilities of each party are those set out in the respective commercial contracts."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="Proteção de dados" en="Data protection" />
          <I18n
            style={p}
            pt={
              <>
                Informações relacionadas à coleta, utilização, armazenamento, compartilhamento e proteção de dados estão
                disponíveis na nossa{' '}
                <a href="/politica-privacidade" style={accent}>Política de Privacidade</a>.
              </>
            }
            en={
              <>
                Information on the collection, use, storage, sharing and protection of data is available in our{' '}
                <a href="/politica-privacidade" style={accent}>Privacy Policy</a>.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="Termos de utilização" en="Terms of use" />
          <I18n
            style={p}
            pt={
              <>
                As condições aplicáveis à utilização dos Serviços estão disponíveis nos{' '}
                <a href="/termos-de-servico" style={accent}>Termos de Uso</a> e nos instrumentos contratuais aplicáveis a
                cada relação comercial.
              </>
            }
            en={
              <>
                The conditions applicable to use of the Services are available in the{' '}
                <a href="/termos-de-servico" style={accent}>Terms of Use</a> and in the contractual instruments applicable
                to each commercial relationship.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="Segurança e confiança" en="Security and trust" />
          <I18n
            style={p}
            pt={
              <>
                Informações relacionadas à segurança, privacidade, infraestrutura e demais controles disponibilizados
                pela Orbit podem ser consultadas na nossa{' '}
                <a href="/seguranca-ia" style={accent}>Central de Confiança</a>.
              </>
            }
            en={
              <>
                Information on security, privacy, infrastructure and other controls provided by Orbit can be reviewed in
                our <a href="/seguranca-ia" style={accent}>Trust Center</a>.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="Canais oficiais de contato" en="Official contact channels" />
          <I18n
            style={p}
            pt="Para assuntos institucionais, comerciais ou relacionados aos Serviços:"
            en="For institutional, commercial or Services-related matters:"
          />
          <ul style={ul}>
            <li>
              E-mail:{' '}
              <a href="mailto:contato@orbitgestao.com.br" style={accent}>contato@orbitgestao.com.br</a>
            </li>
            <li>
              <I18n as="span" pt="Telefone: " en="Telephone: " />
              <a href="https://wa.me/5548998246863" style={accent}>+55 (48) 99824-6863</a>
            </li>
            <li>
              Website:{' '}
              <a href="https://orbitgestao.com.br" style={accent}>orbitgestao.com.br</a>
            </li>
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="Dados cadastrais" en="Registered details" />
          <p style={p}>
            <strong style={strong}>FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA</strong>
          </p>
          <p style={p}>CNPJ: 65.167.064/0001-27</p>
          <p style={p}>
            Rodovia Jose Carlos Daux, 5500, Conj. 306, Saco Grande
            <br />
            Florianópolis, Santa Catarina
            <br />
            CEP 88032-005
            <br />
            Brasil
          </p>
        </section>
      </div>
    </div>
  );
}
