interface ChatSuggestionOptionsProps {
  introOptions: string[];
  onSelectOption: (option: string) => void;
  isLoading: boolean;
}

export default function ChatSuggestionOptions({
  introOptions,
  onSelectOption,
  isLoading
}: ChatSuggestionOptionsProps) {
  if (!introOptions.length) return null;

  return (
    <div className="w-full flex flex-wrap gap-2 mb-3">
      {introOptions.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelectOption(option)}
          className="px-3 py-2 bg-[var(--light)] text-[var(--dark)] rounded-md text-sm hover:bg-[var(--accent)] transition-colors cursor-pointer text-left w-full"
          disabled={isLoading}
        >
          {option}
        </button>
      ))}
    </div>
  );
} 