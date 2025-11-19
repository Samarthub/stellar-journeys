import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { LevelMap } from "@/components/LevelMap";
import { QuizView } from "@/components/QuizView";
import { ResultsView } from "@/components/ResultsView";
import { getQuizQuestionsForLevel } from "@/config/quizzes";
import { calculateXPForQuiz } from "@/config/xp";
import { Level } from "@/config/levels";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type ViewMode = "map" | "video" | "lesson" | "activity" | "results";

export default function Coding() {
  const { getActiveChild, getActiveProgress, completeLevel, addActivity } = useApp();
  const navigate = useNavigate();
  const child = getActiveChild();
  const progress = getActiveProgress();

  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [quizResults, setQuizResults] = useState({ correct: 0, total: 0, xp: 0 });

  useEffect(() => {
    if (child && child.ageGroup === "5-7") {
      toast.error("Coding is for ages 8 and up!");
      navigate("/dashboard");
    }
  }, [child, navigate]);

  if (!child || !progress || child.ageGroup === "5-7") {
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
      completeLevel("coding", selectedLevel.id);
      addActivity({
        module: "coding",
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
        backPath="/coding"
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
              <h1 className="text-4xl font-bold mb-2">💻 Simple Coding Fun</h1>
              <p className="text-lg text-muted-foreground">
                Start your coding adventure!
              </p>
            </div>

            <LevelMap levels={progress.levelsCoding} onLevelClick={handleLevelClick} />
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
                Watch this video to learn about coding!
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
                <div className="bg-muted p-6 rounded-lg font-mono text-sm">
                  <pre>
                    {selectedLevel.category.includes("python") && (
                      `# Python Example\nprint("Hello, World!")\nname = "Coder"\nprint(f"Welcome, {name}!")`
                    )}
                    {selectedLevel.category.includes("c_basics") && (
                      `// C Example\n#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}`
                    )}
                    {selectedLevel.category.includes("cpp") && (
                      `// C++ Example\n#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`
                    )}
                  </pre>
                </div>

                <div className="space-y-2">
                  <p className="text-lg">
                    Coding is like giving instructions to a computer!
                  </p>
                  <p className="text-lg">
                    Each line tells the computer what to do step by step.
                  </p>
                  <p className="text-lg">
                    Practice and you'll become a great programmer!
                  </p>
                </div>
              </div>

              <Button onClick={handleLessonComplete} size="lg" className="w-full mt-8">
                Start Quiz
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

            <QuizView
              questions={getQuizQuestionsForLevel("coding", selectedLevel.category)}
              onComplete={handleActivityComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
