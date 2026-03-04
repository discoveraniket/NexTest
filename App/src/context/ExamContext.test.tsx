import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ExamProvider, useExam } from './ExamContext';
import { type ReactNode } from 'react';

// Mock questions.json to have a stable test set
vi.mock('../questions.json', () => ({
  default: {
    exam_details: {
      name: "Test Exam",
      duration_minutes: 90
    },
    sections: {
      "Part A": {
        "Math": [
          { question_id: 1, question: "1+1?", options: { A: "1", B: "2", C: "3", D: "4" }, correct_answer: "B" },
          { question_id: 2, question: "2+2?", options: { A: "1", B: "2", C: "3", D: "4" }, correct_answer: "D" }
        ]
      }
    }
  }
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <ExamProvider>{children}</ExamProvider>
);

describe('ExamContext', () => {
  it('should initialize with the first question', async () => {
    const { result } = renderHook(() => useExam(), { wrapper });
    
    // In actual app, we call initializeSession. 
    // For this test, we can mock the initialization or non-null assert if we know it exists
    await act(async () => {
      await result.current.initializeSession('1');
    });

    expect(result.current.currentIdx).toBe(0);
    expect(result.current.currentQuestion?.question_id).toBe(1);
    expect(result.current.examState[1].status).toBe('VISITED');
  });

  it('should navigate to next question and update status', async () => {
    const { result } = renderHook(() => useExam(), { wrapper });

    await act(async () => {
      await result.current.initializeSession('1');
    });

    act(() => {
      result.current.goToQuestion(1);
    });

    expect(result.current.currentIdx).toBe(1);
    expect(result.current.currentQuestion?.question_id).toBe(2);
    expect(result.current.examState[2].status).toBe('VISITED');
  });

  it('should select an option and clear it', async () => {
    const { result } = renderHook(() => useExam(), { wrapper });

    await act(async () => {
      await result.current.initializeSession('1');
    });

    act(() => {
      result.current.selectOption('B');
    });
    expect(result.current.examState[1].selectedOption).toBe('B');

    act(() => {
      result.current.clearResponse();
    });
    expect(result.current.examState[1].selectedOption).toBe(null);
  });

  it('should update status to ANSWERED when saved with option', async () => {
    const { result } = renderHook(() => useExam(), { wrapper });

    await act(async () => {
      await result.current.initializeSession('1');
    });

    act(() => {
      result.current.selectOption('B');
      result.current.saveAndNext();
    });

    expect(result.current.examState[1].status).toBe('ANSWERED');
    expect(result.current.currentIdx).toBe(1);
  });

  it('should update status to MARKED when marked for review without option', async () => {
    const { result } = renderHook(() => useExam(), { wrapper });

    await act(async () => {
      await result.current.initializeSession('1');
    });

    act(() => {
      result.current.markForReview();
    });

    expect(result.current.examState[1].status).toBe('MARKED');
  });

  it('should update status to ANSWERED_MARKED when marked for review with option', async () => {
    const { result } = renderHook(() => useExam(), { wrapper });

    await act(async () => {
      await result.current.initializeSession('1');
    });

    act(() => {
      result.current.selectOption('A');
      result.current.markForReview();
    });

    expect(result.current.examState[1].status).toBe('ANSWERED_MARKED');
  });
});
