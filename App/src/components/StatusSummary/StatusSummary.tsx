import { useExam } from '../../context/ExamContext';

export const StatusSummary = () => {
  const { examState, allQuestions } = useExam();

  const summary = {
    answered: 0,
    notAnswered: 0,
    notVisited: 0,
    marked: 0,
    answeredMarked: 0,
  };

  allQuestions.forEach((q) => {
    const state = examState[q.question.question_id];
    if (!state) return;

    switch (state.status) {
      case 'ANSWERED':
        summary.answered++;
        break;
      case 'VISITED':
        summary.notAnswered++;
        break;
      case 'NOT_VISITED':
        summary.notVisited++;
        break;
      case 'MARKED':
        summary.marked++;
        break;
      case 'ANSWERED_MARKED':
        summary.answeredMarked++;
        break;
    }
  });

  const items = [
    { label: 'Answered', count: summary.answered, color: 'bg-[#4caf50]' },
    { label: 'Not Answered', count: summary.notAnswered, color: 'bg-[#f44336]' },
    { label: 'Not Visited', count: summary.notVisited, color: 'bg-[#ffffff] border border-gray-300' },
    { label: 'Marked for Review', count: summary.marked, color: 'bg-[#9c27b0]' },
    { label: 'Answered & Marked for Review', count: summary.answeredMarked, color: 'bg-[#9c27b0] relative after:content-[""] after:absolute after:bottom-0 after:right-0 after:w-3 after:h-3 after:bg-green-500 after:rounded-full' },
  ];

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <h3 className="text-sm font-bold mb-3 text-gray-700 uppercase tracking-wider">Question Summary</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-sm flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${item.color}`}>
              {item.count}
            </div>
            <span className="text-[11px] leading-tight text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
