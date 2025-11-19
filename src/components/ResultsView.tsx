import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type ResultsViewProps = {
  correct: number;
  total: number;
  xpEarned: number;
  onContinue: () => void;
  backPath: string;
};

export function ResultsView({ correct, total, xpEarned, onContinue, backPath }: ResultsViewProps) {
  const navigate = useNavigate();
  const percentage = Math.round((correct / total) * 100);
  const isPerfect = correct === total;
  const stars = isPerfect ? 3 : correct >= total * 0.6 ? 2 : 1;

  return (
    <div className="min-h-screen galaxy-bg flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 animate-scale-in">
        <div className="text-6xl mb-4">
          {isPerfect ? "🎉" : stars === 2 ? "⭐" : "👍"}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2">
            {isPerfect ? "Perfect!" : stars === 2 ? "Great Job!" : "Good Try!"}
          </h2>
          <p className="text-muted-foreground">
            {isPerfect
              ? "You got everything right!"
              : "Keep learning to get even better!"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-muted rounded-lg">
            <div className="text-5xl font-bold text-primary mb-2">{percentage}%</div>
            <p className="text-sm text-muted-foreground">
              {correct} out of {total} correct
            </p>
          </div>

          <div className="flex justify-center gap-2 text-4xl">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className={i < stars ? "animate-glow-pulse" : "opacity-30"}>
                ⭐
              </span>
            ))}
          </div>

          <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
            <div className="text-2xl font-bold text-primary">+{xpEarned} XP</div>
            <p className="text-sm text-muted-foreground">Experience earned!</p>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button onClick={onContinue} size="lg" className="w-full">
            Continue to Next Level
          </Button>
          <Button
            onClick={() => navigate(backPath)}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Back to Levels
          </Button>
        </div>
      </Card>
    </div>
  );
}
