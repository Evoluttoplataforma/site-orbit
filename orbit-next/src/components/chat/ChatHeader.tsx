interface ChatHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export default function ChatHeader({ currentStep, totalSteps }: ChatHeaderProps) {
  return (
    <header
      style={{
        flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: '#0d1117',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          margin: '0 auto',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Logo + nome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#ffba1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ color: '#0d1117', fontWeight: 800, fontSize: '15px' }}>O</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '16px' }}>Olívia</span>
            <span style={{ color: '#8b949e', fontSize: '11px' }}>Atendente Orbit</span>
          </div>
        </div>

        {/* Progress bars */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '3px',
                borderRadius: '999px',
                background: i < currentStep ? '#ffba1a' : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexShrink: 0 }}>
          <span style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{currentStep}</span>
          <span style={{ color: '#8b949e', fontSize: '13px' }}>de {totalSteps}</span>
        </div>
      </div>
    </header>
  );
}
