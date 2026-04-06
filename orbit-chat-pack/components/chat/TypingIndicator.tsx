import avatarImg from "@/assets/avatar-consultant.jpg";

const TypingIndicator = () => (
  <div className="flex items-start gap-3 animate-fade-in-up">
    <img
      src={avatarImg}
      alt="Olívia"
      className="w-12 h-12 rounded-full object-cover object-[center_20%] flex-shrink-0"
    />
    <div className="bg-chat-bubble px-5 py-4 rounded-2xl flex gap-1.5">
      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot" style={{ animationDelay: "0s" }} />
      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot" style={{ animationDelay: "0.2s" }} />
      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot" style={{ animationDelay: "0.4s" }} />
    </div>
  </div>
);

export default TypingIndicator;
