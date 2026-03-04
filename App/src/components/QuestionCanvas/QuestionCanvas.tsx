import React from 'react';
import { useExam } from '../../context/ExamContext';
import { OptionTray } from '../OptionTray/OptionTray';
import { ControlDock } from '../ControlDock/ControlDock';

export const QuestionCanvas: React.FC = () => {
  const { 
    currentIdx, 
    currentQuestion, 
    examState, 
    selectOption, 
    clearResponse, 
    saveAndNext, 
    markForReview 
  } = useExam();

  if (!currentQuestion) return null;

  const qId = currentQuestion.question_id.toString();
  const qState = examState[qId];

  return (
    <section className="flex-1 flex flex-col bg-white border-r-2 border-border-color p-5 overflow-y-auto relative">
      <div className="border-b border-gray-200 pb-[10px] mb-5">
        <span className="font-bold text-lg">Question No. {currentIdx + 1}</span>
      </div>
      
      <div className="text-[18px] leading-relaxed flex-1">
        <div className="mb-8 text-text-main">
          {question_content(currentQuestion.question)}
        </div>
        
        <OptionTray 
          questionId={Number(currentQuestion.question_id)} 
          options={currentQuestion.options} 
          selectedOption={qState?.selectedOption || null} 
          onSelect={selectOption} 
        />
      </div>

      <ControlDock 
        onMark={markForReview} 
        onClear={clearResponse} 
        onSave={saveAndNext} 
      />
    </section>
  );
};

// Helper to handle potential multi-line question text or future formatting
const question_content = (text: string) => {
  return text.split('\n').map((line, i) => (
    <p key={i} className={i > 0 ? 'mt-4' : ''}>
      {line}
    </p>
  ));
};
