import { Clock } from 'lucide-react';

interface ExamHeaderProps {
  examName: string;
  examYear: string;
  timeLeft: number;
}

export const ExamHeader = ({ examName, examYear, timeLeft }: ExamHeaderProps) => {
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="h-[60px] bg-header-bg border-b-2 border-border-color flex justify-between items-center px-5 font-bold">
      <div>{examName} {examYear}</div>
      <div className="text-[#d32f2f] text-[20px] flex items-center gap-2">
        <Clock size={20} />
        <span>Time Left: {formatTime(timeLeft)}</span>
      </div>
    </header>
  );
};
