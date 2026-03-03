import React from 'react';
import { useExam } from '../context/ExamContext';
import { ExamHeader } from '../components/ExamHeader/ExamHeader';
import { SubjectStrip } from '../components/SubjectStrip/SubjectStrip';
import { QuestionCanvas } from '../components/QuestionCanvas/QuestionCanvas';
import { PaletteSidebar } from '../components/PaletteSidebar/PaletteSidebar';

export const ExamTerminal: React.FC = () => {
  const {
    examData,
    allQuestions,
    currentQuestion,
    currentPart,
    currentSubject,
    examState,
    timeLeft,
    isInitialized,
    jumpToSubject,
  } = useExam();

  // Get unique subjects for the SubjectStrip
  const subjects = Array.from(new Set(allQuestions.map(q => `${q.part} - ${q.subject}`)));

  if (!isInitialized || !allQuestions || allQuestions.length === 0 || !currentQuestion || !examState[currentQuestion.question_id]) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="p-8 bg-white shadow-lg rounded-lg border border-gray-200">
          <p className="text-xl font-semibold text-primary-blue animate-pulse">Loading Exam Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full md:h-screen overflow-y-auto md:overflow-hidden bg-gray-50">
      <ExamHeader 
        examName={examData.exam_details.name} 
        examYear={examData.exam_details.year} 
        timeLeft={timeLeft} 
      />

      <SubjectStrip 
        subjects={subjects} 
        currentActive={`${currentPart} - ${currentSubject}`} 
        onSubjectChange={jumpToSubject} 
      />

      <main className="flex-1 flex flex-col md:flex-row overflow-y-visible md:overflow-hidden">
        <QuestionCanvas />
        <PaletteSidebar />
      </main>
    </div>
  );
};
