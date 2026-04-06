interface ChatHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export default function ChatHeader({ currentStep, totalSteps }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">O</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-foreground text-lg leading-tight">Olívia</span>
          <span className="text-xs text-muted-foreground leading-tight">Atendente Orbit</span>
        </div>
      </div>
      <div className="flex-1 mx-8 flex items-center gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div className={`h-1 w-full rounded-full transition-colors duration-300 ${i < currentStep ? 'bg-primary' : 'bg-muted'}`} />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-3xl font-bold text-foreground">{currentStep}</span>
        <span className="text-muted-foreground text-sm">de {totalSteps}</span>
      </div>
    </header>
  );
}
