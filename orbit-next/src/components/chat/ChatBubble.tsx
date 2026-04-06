interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  boldName?: string;
}

export default function ChatBubble({ message, isUser = false, boldName }: ChatBubbleProps) {
  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div className="bg-secondary text-secondary-foreground px-5 py-3 rounded-2xl max-w-xs font-medium">
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
          <strong className="font-bold">{boldName}</strong>
          {parts[1] || ''}
        </>
      );
    }
    return message;
  };

  return (
    <div className="flex items-start gap-3 animate-fade-in-up">
      <img
        src="/images/olivia.png"
        alt="Olívia - Atendente Orbit"
        className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-primary/30"
      />
      <div className="bg-chat-bubble text-chat-bubble-foreground px-5 py-4 rounded-2xl max-w-md leading-relaxed">
        {renderMessage()}
      </div>
    </div>
  );
}
