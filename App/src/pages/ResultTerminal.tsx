import { useExam } from '../context/ExamContext';
import { CheckCircle, XCircle, MinusCircle, Award, BarChart3, Clock } from 'lucide-react';

export const ResultTerminal = () => {
  const { examData, allQuestions, examState } = useExam();

  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  allQuestions.forEach(({ question }) => {
    const state = examState[question.question_id];
    if (state?.selectedOption) {
      if (state.selectedOption === question.correct_answer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    } else {
      unattemptedCount++;
    }
  });

  const correctMarks = examData.exam_details.correct_answer_weightage;
  const negativeMarking = parseFloat(examData.exam_details.negative_marking);
  const totalScore = (correctCount * correctMarks) - (incorrectCount * negativeMarking);
  const maxScore = allQuestions.length * correctMarks;
  const percentage = ((totalScore / maxScore) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-8 border-primary-blue flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 uppercase tracking-tight">{examData.exam_details.name} Result</h1>
            <p className="text-gray-500 font-medium">Candidate: <span className="text-primary-blue">Joymalya Majee (000-420)</span></p>
          </div>
          <div className="text-center bg-blue-50 px-6 py-3 rounded-lg border border-blue-100">
            <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">Total Score</div>
            <div className="text-4xl font-black text-primary-blue">{totalScore} <span className="text-lg text-gray-400">/ {maxScore}</span></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Award className="text-yellow-500" />} label="Accuracy" value={`${percentage}%`} color="border-yellow-500" />
          <StatCard icon={<CheckCircle className="text-green-500" />} label="Correct" value={correctCount} color="border-green-500" />
          <StatCard icon={<XCircle className="text-red-500" />} label="Incorrect" value={incorrectCount} color="border-red-500" />
          <StatCard icon={<MinusCircle className="text-gray-400" />} label="Unattempted" value={unattemptedCount} color="border-gray-400" />
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary-blue" />
            <h2 className="font-bold text-gray-700 uppercase tracking-wide">Question Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-3 font-bold">#</th>
                  <th className="px-6 py-3 font-bold">Subject</th>
                  <th className="px-6 py-3 font-bold">Your Response</th>
                  <th className="px-6 py-3 font-bold">Correct Answer</th>
                  <th className="px-6 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allQuestions.map(({ subject, question }, idx) => {
                  const state = examState[question.question_id];
                  const isCorrect = state?.selectedOption === question.correct_answer;
                  const isUnattempted = !state?.selectedOption;

                  return (
                    <tr key={question.question_id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-400">{idx + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-700">{subject}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded font-mono font-bold ${isUnattempted ? 'text-gray-300' : 'text-primary-blue bg-blue-50'}`}>
                          {state?.selectedOption || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-green-50 text-green-700 font-mono font-bold">
                          {question.correct_answer}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {isUnattempted ? (
                          <span className="text-gray-400 text-xs font-bold uppercase">Skipped</span>
                        ) : isCorrect ? (
                          <span className="text-green-600 text-xs font-bold uppercase flex items-center gap-1">
                            <CheckCircle size={14} /> Correct
                          </span>
                        ) : (
                          <span className="text-red-600 text-xs font-bold uppercase flex items-center gap-1">
                            <XCircle size={14} /> Wrong
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2 mx-auto"
          >
            <Clock size={20} /> Restart Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border-b-4 ${color} flex items-center gap-4 transition-transform hover:-translate-y-1`}>
    <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
    <div>
      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</div>
      <div className="text-2xl font-black text-gray-800">{value}</div>
    </div>
  </div>
);
