import type { ExamState, Question, QuestionStatus } from '../../types';

interface QuestionGridProps {
  currentPart: string;
  currentSubject: string;
  allQuestions: { part: string; subject: string; question: Question }[];
  examState: ExamState;
  onGoTo: (idx: number) => void;
}

export const QuestionGrid = ({ 
  currentPart, 
  currentSubject, 
  allQuestions, 
  examState, 
  onGoTo 
}: QuestionGridProps) => {
  const getStatusStyles = (status: QuestionStatus) => {
    switch (status) {
      case 'VISITED': return 'bg-status-visited text-white border-transparent';
      case 'ANSWERED': return 'bg-status-answered text-white border-transparent';
      case 'MARKED': return 'bg-status-marked text-white border-transparent rounded-full';
      case 'ANSWERED_MARKED': return 'bg-status-marked text-white border-transparent rounded-full after:content-["✓"] after:absolute after:bottom-[-2px] after:right-[-2px] after:bg-status-answered after:text-white after:text-[10px] after:w-3 after:h-3 after:rounded-full after:flex after:items-center after:justify-center';
      default: return 'bg-white text-gray-700 border-[#ccc]';
    }
  };

  return (
    <div className="flex-1 p-[15px] grid grid-cols-5 gap-[10px] overflow-y-auto content-start">
      {allQuestions
        .map((q, idx) => ({ ...q, idx }))
        .filter(q => q.part === currentPart && q.subject === currentSubject)
        .map((q) => (
          <div 
            key={q.question.question_id} 
            className={`w-[40px] h-[40px] border flex justify-center items-center cursor-pointer text-[14px] relative rounded-[4px] transition-all hover:scale-105 ${getStatusStyles(examState[q.question.question_id].status)}`}
            onClick={() => onGoTo(q.idx)}
          >
            {q.idx + 1}
          </div>
        ))}
    </div>
  );
};
