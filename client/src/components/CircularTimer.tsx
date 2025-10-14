import { useEffect, useState } from "react";

interface CircularTimerProps {
  duration: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

export function CircularTimer({ duration, onTimeUp, isPaused = false }: CircularTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp, isPaused]);

  const progress = (timeLeft / duration) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (timeLeft > 10) return "hsl(var(--accent))";
    if (timeLeft > 5) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  return (
    <div className="relative w-24 h-24 md:w-28 md:h-28">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="50%"
          cy="50%"
          r="45"
          stroke="hsl(var(--muted))"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="50%"
          cy="50%"
          r="45"
          stroke={getColor()}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-mono text-2xl md:text-3xl font-bold ${timeLeft <= 5 ? "animate-pulse-ring" : ""}`}
          style={{ color: getColor() }}
          data-testid="text-timer"
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
