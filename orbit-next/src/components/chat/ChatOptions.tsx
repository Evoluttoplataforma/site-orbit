'use client';
import { useState } from 'react';

interface ChatOptionsProps {
  options: string[];
  onSelect: (value: string) => void;
}

export default function ChatOptions({ options, onSelect }: ChatOptionsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        animation: 'fade-in-up 0.4s ease-out',
      }}
    >
      {options.map((option) => {
        const isHovered = hovered === option;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            onMouseEnter={() => setHovered(option)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: isHovered ? 'rgba(255,186,26,0.08)' : 'transparent',
              color: '#e6edf3',
              border: `1.5px solid ${isHovered ? '#ffba1a' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: '999px',
              padding: '14px 22px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              fontFamily: 'inherit',
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
