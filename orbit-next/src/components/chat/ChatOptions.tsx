interface ChatOptionsProps {
  options: string[];
  onSelect: (value: string) => void;
}

export default function ChatOptions({ options, onSelect }: ChatOptionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in-up">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="bg-secondary text-secondary-foreground border border-border rounded-xl px-5 py-4 text-left hover:border-primary hover:bg-primary/10 active:scale-[0.98] transition-all duration-200 text-sm font-medium"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
