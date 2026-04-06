export default function TypingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        animation: 'fade-in-up 0.4s ease-out',
      }}
    >
      <img
        src="/images/olivia.png"
        alt="Olívia"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          objectFit: 'cover',
          objectPosition: 'center 15%',
          flexShrink: 0,
          display: 'block',
        }}
      />
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          padding: '14px 18px',
          borderRadius: '18px',
          display: 'flex',
          gap: '5px',
        }}
      >
        {[0, 0.2, 0.4].map((delay) => (
          <span
            key={delay}
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#8b949e',
              animation: 'typing-dot 1.4s infinite ease-in-out',
              animationDelay: `${delay}s`,
              display: 'block',
            }}
          />
        ))}
      </div>
    </div>
  );
}
