interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
        data-testid="progress-bar"
      />
    </div>
  );
}
