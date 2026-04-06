export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in-up">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <span className="text-primary-foreground font-bold text-lg">O</span>
      </div>
      <div className="bg-chat-bubble px-5 py-4 rounded-2xl flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot" style={{ animationDelay: '0s' }} />
        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot" style={{ animationDelay: '0.2s' }} />
        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
}
