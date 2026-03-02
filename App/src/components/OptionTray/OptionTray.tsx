import type { OptionSet } from '../../types';

interface OptionTrayProps {
  questionId: number;
  options: OptionSet;
  selectedOption: string | null;
  onSelect: (opt: string) => void;
}

export const OptionTray = ({ questionId, options, selectedOption, onSelect }: OptionTrayProps) => {
  return (
    <div className="mt-5 flex flex-col gap-4">
      {Object.entries(options).map(([key, text]) => (
        <label 
          key={key} 
          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all hover:bg-gray-50
            ${selectedOption === key ? 'border-primary-blue bg-blue-50/30' : 'border-gray-200'}`}
        >
          <input 
            type="radio" 
            name={`q-${questionId}`} 
            value={key}
            checked={selectedOption === key}
            className="w-4 h-4 text-primary-blue focus:ring-primary-blue"
            onChange={() => onSelect(key)}
          />
          <span className="text-gray-800">{key}. {text}</span>
        </label>
      ))}
    </div>
  );
};
