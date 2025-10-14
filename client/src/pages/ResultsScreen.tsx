import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCw, Award, Target, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { QuizResult } from "@shared/schema";

interface ResultsScreenProps {
  result: QuizResult;
  onPlayAgain: () => void;
}

export default function ResultsScreen({ result, onPlayAgain }: ResultsScreenProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = result.percentage / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setAnimatedScore(Math.min(Math.round(increment * currentStep), result.percentage));
      
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [result.percentage]);

  const getRankingIcon = () => {
    if (result.percentage >= 80) return <Trophy className="w-12 h-12 md:w-16 md:h-16 text-warning" />;
    if (result.percentage >= 60) return <Award className="w-12 h-12 md:w-16 md:h-16 text-accent" />;
    return <Target className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground" />;
  };

  const getPerformanceColor = () => {
    if (result.percentage >= 80) return "text-success";
    if (result.percentage >= 60) return "text-accent";
    if (result.percentage >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12 animate-scale-in">
          <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 mb-6">
            {getRankingIcon()}
          </div>
          <h1 className="font-sans text-4xl md:text-5xl font-bold mb-4" data-testid="text-result-title">
            Quiz Complete!
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground" data-testid="text-ranking-message">
            {result.rankingMessage}
          </p>
        </div>

        <Card className="p-8 md:p-12 shadow-2xl mb-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <svg className="w-40 h-40 md:w-48 md:h-48 transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="70"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="70"
                  stroke="hsl(var(--primary))"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - animatedScore / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-5xl md:text-6xl font-bold font-sans ${getPerformanceColor()} animate-count-up`} data-testid="text-percentage">
                    {animatedScore}%
                  </div>
                  <div className="text-sm font-body text-muted-foreground mt-1">Score</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-success/10">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-body text-muted-foreground">Correct Answers</p>
                  <p className="text-3xl font-sans font-bold text-success" data-testid="text-correct-answers">
                    {result.correctAnswers}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-destructive/10">
                  <XCircle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-body text-muted-foreground">Incorrect Answers</p>
                  <p className="text-3xl font-sans font-bold text-destructive" data-testid="text-incorrect-answers">
                    {result.incorrectAnswers}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-body font-medium">Your Ranking</span>
              </div>
              <Badge variant="outline" className="text-base font-semibold" data-testid="text-ranking">
                {result.ranking}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-accent" />
                <span className="font-body font-medium">Accuracy</span>
              </div>
              <span className="font-sans font-bold text-lg" data-testid="text-accuracy">
                {result.percentage}%
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-warning" />
                <span className="font-body font-medium">Total Questions</span>
              </div>
              <span className="font-sans font-bold text-lg" data-testid="text-total-answered">
                {result.totalQuestions}
              </span>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="flex-1 rounded-full text-lg font-sans font-semibold py-6"
            onClick={onPlayAgain}
            data-testid="button-play-again"
          >
            <RotateCw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
}
