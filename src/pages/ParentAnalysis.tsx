import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { ArrowLeft } from "lucide-react";

export default function ParentAnalysis() {
  const { getActiveChild, getActiveProgress } = useApp();
  const navigate = useNavigate();
  const child = getActiveChild();
  const progress = getActiveProgress();

  if (!child || !progress) {
    navigate("/parent/home");
    return null;
  }

  const imagesCompleted = progress.levelsImages.filter((l) => l.status === "completed").length;
  const codingCompleted = progress.levelsCoding.filter((l) => l.status === "completed").length;
  const mathsCompleted = progress.levelsMaths.filter((l) => l.status === "completed").length;
  const totalCompleted = imagesCompleted + codingCompleted + mathsCompleted;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--parent-bg))] to-muted">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/parent/home")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{child.name}'s Progress</h1>
            <p className="text-muted-foreground">Age Group: {child.ageGroup}</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total XP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{progress.childXP}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Time Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{progress.dailyTimeMinutes} min</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Levels Done
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{totalCompleted}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{progress.recentActivity.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Module Progress */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>🖼️ Learn from Images</CardTitle>
                <CardDescription>Levels completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{imagesCompleted} / 20</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(imagesCompleted / 20) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💻 Simple Coding Fun</CardTitle>
                <CardDescription>Levels completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{codingCompleted} / 20</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${(codingCompleted / 20) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🧮 Magic Maths</CardTitle>
                <CardDescription>Levels completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mathsCompleted} / 20</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all"
                    style={{ width: `${(mathsCompleted / 20) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest completed activities</CardDescription>
            </CardHeader>
            <CardContent>
              {progress.recentActivity.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No activities yet. Start learning to see progress here!
                </p>
              ) : (
                <div className="space-y-3">
                  {progress.recentActivity.slice(0, 10).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <p className="font-medium">
                          {activity.module === "images" && "🖼️ Learn from Images"}
                          {activity.module === "coding" && "💻 Coding Fun"}
                          {activity.module === "maths" && "🧮 Magic Maths"}
                          {" - Level " + activity.levelId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Score: {activity.score} • +{activity.xpEarned} XP
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
