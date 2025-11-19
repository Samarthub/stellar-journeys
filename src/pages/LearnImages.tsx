import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { LevelMap } from "@/components/LevelMap";
import { QuizView } from "@/components/QuizView";
import { MatchGame } from "@/components/MatchGame";
import { ResultsView } from "@/components/ResultsView";
import { getQuizQuestionsForLevel } from "@/config/quizzes";
import { calculateXPForQuiz } from "@/config/xp";
import { Level } from "@/config/levels";
import { ArrowLeft } from "lucide-react";

type ViewMode = "map" | "video" | "lesson" | "activity" | "results";

export default function LearnImages() {
  const { getActiveChild, getActiveProgress, completeLevel, addActivity } = useApp();
  const navigate = useNavigate();
  const child = getActiveChild();
  const progress = getActiveProgress();

  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [quizResults, setQuizResults] = useState({ correct: 0, total: 0, xp: 0 });

  if (!child || !progress) {
    navigate("/dashboard");
    return null;
  }

  const handleLevelClick = (level: Level) => {
    setSelectedLevel(level);
    setViewMode("video");
  };

  const handleVideoComplete = () => {
    setViewMode("lesson");
  };

  const handleLessonComplete = () => {
    setViewMode("activity");
  };

  const handleActivityComplete = (correct: number, total: number) => {
    const xp = calculateXPForQuiz(correct, total);
    setQuizResults({ correct, total, xp });

    if (selectedLevel) {
      completeLevel("images", selectedLevel.id);
      addActivity({
        module: "images",
        levelId: selectedLevel.id,
        score: `${correct}/${total}`,
        xpEarned: xp,
      });
    }

    setViewMode("results");
  };

  const handleContinue = () => {
    setSelectedLevel(null);
    setViewMode("map");
  };

  if (viewMode === "results") {
    return (
      <ResultsView
        correct={quizResults.correct}
        total={quizResults.total}
        xpEarned={quizResults.xp}
        onContinue={handleContinue}
        backPath="/learn-images"
      />
    );
  }

  return (
    <div className="min-h-screen galaxy-bg">
      <div className="container mx-auto px-4 py-8">
        {viewMode === "map" && (
          <>
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">🖼️ Learn from Images</h1>
              <p className="text-lg text-muted-foreground">
                Explore the world through pictures!
              </p>
            </div>

            <LevelMap levels={progress.levelsImages} onLevelClick={handleLevelClick} />
          </>
        )}

        {viewMode === "video" && selectedLevel && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Button variant="ghost" onClick={() => setViewMode("map")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Levels
            </Button>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">{selectedLevel.title}</h2>
              <p className="text-muted-foreground mb-6">
                Watch this video to learn about {selectedLevel.category}!
              </p>

              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                <p className="text-muted-foreground">
                  Video placeholder - Add YouTube URL in config
                </p>
              </div>

              <Button onClick={handleVideoComplete} size="lg" className="w-full">
                Continue to Lesson
              </Button>
            </Card>
          </div>
        )}

        {viewMode === "lesson" && selectedLevel && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Button variant="ghost" onClick={() => setViewMode("video")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Video
            </Button>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">{selectedLevel.title}</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <span className="text-5xl">🖼️</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-lg">
                      This is a lesson about {selectedLevel.category}. Images help us learn about the world!
                    </p>
                    <p className="text-lg">
                      Look at the pictures and read the information carefully.
                    </p>
                    <p className="text-lg">
                      After this, you'll answer some fun questions!
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleLessonComplete} size="lg" className="w-full mt-8">
                {child.ageGroup === "5-7" ? "Start Match Game" : "Start Quiz"}
              </Button>
            </Card>
          </div>
        )}

        {viewMode === "activity" && selectedLevel && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setViewMode("lesson")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Lesson
            </Button>

            {child.ageGroup === "5-7" ? (
              <MatchGame
                questions={getQuizQuestionsForLevel("images", selectedLevel.category)}
                onComplete={handleActivityComplete}
              />
            ) : (
              <QuizView
                questions={getQuizQuestionsForLevel("images", selectedLevel.category)}
                onComplete={handleActivityComplete}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
