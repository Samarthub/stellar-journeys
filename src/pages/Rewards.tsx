import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { ArrowLeft } from "lucide-react";
import { badges, checkBadgeUnlocked } from "@/config/badges";

export default function Rewards() {
  const { getActiveChild, getActiveProgress } = useApp();
  const navigate = useNavigate();
  const child = getActiveChild();
  const progress = getActiveProgress();

  if (!child || !progress) {
    navigate("/dashboard");
    return null;
  }

  const imagesCompleted = progress.levelsImages.filter((l) => l.status === "completed").length;
  const codingCompleted = progress.levelsCoding.filter((l) => l.status === "completed").length;
  const mathsCompleted = progress.levelsMaths.filter((l) => l.status === "completed").length;
  const totalCompleted = imagesCompleted + codingCompleted + mathsCompleted;

  const badgeProgress = {
    xp: progress.childXP,
    imagesCompleted,
    codingCompleted,
    mathsCompleted,
    totalCompleted,
  };

  const xpPercentage = Math.min((progress.childXP / 1000) * 100, 100);

  return (
    <div className="min-h-screen galaxy-bg">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="space-y-8">
          {/* XP Card */}
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="text-3xl">Your XP Progress</CardTitle>
              <CardDescription>Keep learning to earn more XP!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {progress.childXP} XP
                </div>
                <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-4 rounded-full transition-all duration-500 animate-glow-pulse"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {1000 - progress.childXP} XP until Super Learner badge!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Badges Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Badges</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {badges.map((badge) => {
                const unlocked = checkBadgeUnlocked(badge, badgeProgress);
                return (
                  <Card
                    key={badge.id}
                    className={`relative transition-all ${
                      unlocked
                        ? "border-primary shadow-lg card-glow"
                        : "opacity-50 grayscale"
                    }`}
                  >
                    <CardHeader>
                      <div className="text-5xl mb-2">{badge.icon}</div>
                      <CardTitle className="text-xl">{badge.name}</CardTitle>
                      <CardDescription>{badge.description}</CardDescription>
                    </CardHeader>
                    {unlocked && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold">
                        UNLOCKED!
                      </div>
                    )}
                    {!unlocked && (
                      <div className="absolute top-3 right-3 text-3xl">🔒</div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Progress Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary">{imagesCompleted}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Image Levels
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-accent">{codingCompleted}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Coding Levels
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-secondary">{mathsCompleted}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Maths Levels
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
