import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Trophy } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
  totalQuestions: number;
}

export default function StartScreen({ onStart, totalQuestions }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 md:mb-12 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 mb-6">
            <Brain className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          <h1 className="font-sans text-5xl md:text-7xl font-bold text-white mb-4" data-testid="text-app-title">
            QuizPL
          </h1>
          <p className="font-body text-lg md:text-xl text-white/90" data-testid="text-tagline">
            Test Your Knowledge
          </p>
        </div>

        <Card className="p-8 md:p-12 shadow-2xl animate-scale-in">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-body text-muted-foreground">Questions</p>
                  <p className="text-2xl font-sans font-bold" data-testid="text-total-questions">
                    {totalQuestions}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-warning/10">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-body text-muted-foreground">Time Limit</p>
                  <p className="text-2xl font-sans font-bold" data-testid="text-time-limit">
                    20s
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-body text-muted-foreground">Difficulty</p>
                  <p className="text-2xl font-sans font-bold" data-testid="text-difficulty">
                    Mixed
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-sans text-xl md:text-2xl font-semibold">
                How It Works
              </h2>
              <div className="space-y-3 font-body text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">1</Badge>
                  <p>Answer multiple-choice questions as they appear</p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">2</Badge>
                  <p>Each question has a 20-second time limit</p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">3</Badge>
                  <p>Get instant feedback on your answers</p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">4</Badge>
                  <p>View your final score and ranking at the end</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full rounded-full text-lg font-sans font-semibold py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={onStart}
              data-testid="button-start-quiz"
            >
              Start Quiz
            </Button>
          </div>
        </Card>

        <div className="text-center mt-8 text-white/80 font-body text-sm">
          Challenge yourself and see how you rank!
        </div>
      </div>
    </div>
  );
}
