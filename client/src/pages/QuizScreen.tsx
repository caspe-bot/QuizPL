import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularTimer } from "@/components/CircularTimer";
import { ProgressBar } from "@/components/ProgressBar";
import { Check, X } from "lucide-react";
import type { Question } from "@shared/schema";

interface QuizScreenProps {
  questions: Question[];
  onComplete: (answers: Array<{ questionId: string; selectedAnswer: number; timeSpent: number }>) => void;
}

export default function QuizScreen({ questions, onComplete }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<Array<{ questionId: string; selectedAnswer: number; timeSpent: number }>>([]);
  const [startTime, setStartTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex];
  const letterLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentIndex]);

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answerIndex,
      timeSpent,
    };
    
    setAnswers([...answers, newAnswer]);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        onComplete([...answers, newAnswer]);
      }
    }, 1500);
  };

  const handleTimeUp = () => {
    if (isAnswered) return;

    const timeSpent = 20;
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: -1,
      timeSpent,
    };
    
    setAnswers([...answers, newAnswer]);
    setIsAnswered(true);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        onComplete([...answers, newAnswer]);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 md:mb-8 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <Badge variant="outline" className="mb-2" data-testid="text-question-number">
                Question {currentIndex + 1} of {questions.length}
              </Badge>
              <ProgressBar current={currentIndex + 1} total={questions.length} />
            </div>
            <CircularTimer
              key={currentIndex}
              duration={20}
              onTimeUp={handleTimeUp}
              isPaused={isAnswered}
            />
          </div>
        </div>

        <Card className="p-6 md:p-8 shadow-xl mb-6 animate-slide-in-right" data-testid={`card-question-${currentIndex}`}>
          <h2 className="font-sans text-2xl md:text-3xl font-semibold mb-8" data-testid="text-question">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = isAnswered && isCorrect;
              const showIncorrect = isAnswered && isSelected && !isCorrect;

              return (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className={`
                    justify-start text-left h-auto py-4 px-6 font-body text-base md:text-lg
                    transition-all duration-300 rounded-xl
                    ${!isAnswered ? "hover:scale-105 hover-elevate active-elevate-2" : ""}
                    ${showCorrect ? "border-success bg-success/10 text-success-foreground scale-105" : ""}
                    ${showIncorrect ? "border-destructive bg-destructive/10 text-destructive-foreground animate-shake" : ""}
                    ${isAnswered && !isSelected && !isCorrect ? "opacity-50" : ""}
                  `}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  data-testid={`button-answer-${index}`}
                >
                  <div className="flex items-center gap-4 w-full">
                    <Badge
                      variant={showCorrect ? "default" : showIncorrect ? "destructive" : "outline"}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-semibold"
                    >
                      {letterLabels[index]}
                    </Badge>
                    <span className="flex-1">{option}</span>
                    {showCorrect && (
                      <Check className="w-6 h-6 text-success shrink-0" />
                    )}
                    {showIncorrect && (
                      <X className="w-6 h-6 text-destructive shrink-0" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </Card>

        <div className="text-center">
          <p className="font-body text-muted-foreground">
            Progress: <span className="font-semibold text-foreground" data-testid="text-current-progress">{currentIndex + 1}</span> / {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
}
