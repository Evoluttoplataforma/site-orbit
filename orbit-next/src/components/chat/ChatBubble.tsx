interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  boldName?: string;
}

export default function ChatBubble({ message, isUser = false, boldName }: ChatBubbleProps) {
  if (isUser) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          animation: 'fade-in-up 0.4s ease-out',
        }}
      >
        <div
          style={{
            background: '#1c2230',
            color: '#ffffff',
            padding: '12px 18px',
            borderRadius: '18px',
            maxWidth: '80%',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: 1.5,
          }}
        >
          {message}
        </div>
      </div>
    );
  }

  const renderMessage = () => {
    if (boldName) {
      const parts = message.split(boldName);
      return (
        <>
          {parts[0]}
          <strong style={{ fontWeight: 700 }}>{boldName}</strong>
          {parts[1] || ''}
        </>
      );
    }
    return message;
  };

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
          color: '#e6edf3',
          padding: '12px 18px',
          borderRadius: '18px',
          maxWidth: '75%',
          fontSize: '14px',
          lineHeight: 1.55,
        }}
      >
        {renderMessage()}
      </div>
    </div>
  );
}
