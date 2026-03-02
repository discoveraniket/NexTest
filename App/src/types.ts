export interface OptionSet {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface Question {
  question_id: number;
  question: string;
  options: OptionSet;
  correct_answer: string;
}

export interface Section {
  [subject: string]: Question[];
}

export interface ExamData {
  exam_details: {
    name: string;
    year: string;
    duration_minutes: number;
    correct_answer_weightage: number;
    negative_marking: string;
  };
  sections: {
    [part: string]: Section;
  };
}

export type QuestionStatus = 
  | 'NOT_VISITED'
  | 'VISITED'
  | 'ANSWERED'
  | 'MARKED'
  | 'ANSWERED_MARKED';

export interface QuestionState {
  status: QuestionStatus;
  selectedOption: string | null;
}

export interface ExamState {
  [questionId: number]: QuestionState;
}
