import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import StartScreen from "./StartScreen";
import QuizScreen from "./QuizScreen";
import ResultsScreen from "./ResultsScreen";
import type { Question, QuizResult, SubmitQuizRequest, SubmitQuizResponse } from "@shared/schema";

type GameState = "start" | "quiz" | "results";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const { data: questions, isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
  });

  const submitQuizMutation = useMutation<SubmitQuizResponse, Error, SubmitQuizRequest>({
    mutationFn: async (data) => {
      const response = await apiRequest("POST", "/api/submit-quiz", data);
      console.log("Quiz submitted, response:", response);
      return response;
    },
    onSuccess: (data) => {
      console.log("Mutation success, setting result:", data.result);
      setQuizResult(data.result);
      setGameState("results");
    },
    onError: (error) => {
      console.error("Failed to submit quiz:", error);
    },
  });

  const handleStartQuiz = () => {
    setGameState("quiz");
  };

  const handleQuizComplete = (answers: Array<{ questionId: string; selectedAnswer: number; timeSpent: number }>) => {
    submitQuizMutation.mutate({ answers });
  };

  const handlePlayAgain = () => {
    setGameState("start");
    setQuizResult(null);
  };

  if (isLoading || submitQuizMutation.isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4" data-testid="spinner-loading"></div>
          <p className="text-white font-body text-lg" data-testid="text-loading">
            {isLoading ? "Loading quiz..." : "Calculating your score..."}
          </p>
        </div>
      </div>
    );
  }

  if (submitQuizMutation.isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center p-4">
        <div className="text-center text-white max-w-md">
          <h2 className="text-2xl font-sans font-bold mb-4" data-testid="text-error-title">Oops! Something went wrong</h2>
          <p className="font-body mb-6" data-testid="text-error-message">
            We couldn't calculate your score. Please try again.
          </p>
          <Button
            onClick={() => {
              submitQuizMutation.reset();
              setGameState("start");
            }}
            className="rounded-full"
            data-testid="button-try-again"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h2 className="text-2xl font-sans font-bold mb-2">No questions available</h2>
          <p className="font-body">Please check back later!</p>
        </div>
      </div>
    );
  }

  console.log("Home render - gameState:", gameState, "quizResult:", quizResult, "mutation:", {
    isPending: submitQuizMutation.isPending,
    isError: submitQuizMutation.isError,
    isSuccess: submitQuizMutation.isSuccess,
  });

  return (
    <>
      {gameState === "start" && (
        <StartScreen onStart={handleStartQuiz} totalQuestions={questions.length} />
      )}
      {gameState === "quiz" && (
        <QuizScreen questions={questions} onComplete={handleQuizComplete} />
      )}
      {gameState === "results" && quizResult && (
        <ResultsScreen result={quizResult} onPlayAgain={handlePlayAgain} />
      )}
    </>
  );
}
