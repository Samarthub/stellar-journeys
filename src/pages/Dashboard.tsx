import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { Moon, Sun, ArrowLeft } from "lucide-react";

export default function Dashboard() {
  const { getActiveChild, canAccessKidMode, toggleTheme, state } = useApp();
  const navigate = useNavigate();
  const child = getActiveChild();

  useEffect(() => {
    if (!child) {
      navigate("/parent/home");
      return;
    }

    if (!canAccessKidMode()) {
      navigate("/time-locked");
    }
  }, [child, canAccessKidMode, navigate]);

  if (!child) return null;

  const modules = [
    {
      title: "🖼️ Learn from Images",
      description: "Explore the world through pictures!",
      path: "/learn-images",
      available: true,
    },
    {
      title: "💻 Simple Coding Fun",
      description: "Start your coding adventure!",
      path: "/coding",
      available: child.ageGroup !== "5-7",
    },
    {
      title: "🧮 Magic Maths",
      description: "Play with numbers!",
      path: "/maths",
      available: true,
    },
    {
      title: "🎨 Touchless Illustrator",
      description: "Draw amazing pictures!",
      path: "/illustrator",
      available: true,
    },
    {
      title: "🏅 My Rewards",
      description: "See your badges and XP!",
      path: "/rewards",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen galaxy-bg">
      {/* Top Bar */}
      <div className="relative z-10 border-b border-white/10 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-galaxy-accent to-galaxy-glow bg-clip-text text-transparent">
            PlayLoop Kids
          </h1>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium px-3 py-1.5 bg-primary/20 rounded-full">
              Hi, {child.name}! 👋
            </div>
            <div className="text-xs px-2 py-1 bg-muted/50 rounded-full">
              Age {child.ageGroup}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
            >
              {state.theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/parent/home")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Parent Area
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-2">Choose Your Adventure!</h2>
            <p className="text-lg text-muted-foreground">Tap any card to start learning</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) =>
              module.available ? (
                <Card
                  key={module.path}
                  className="card-hover card-glow cursor-pointer relative overflow-hidden"
                  onClick={() => navigate(module.path)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                  <CardHeader className="relative">
                    <CardTitle className="text-3xl mb-2">{module.title}</CardTitle>
                    <CardDescription className="text-base">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <Button className="w-full" size="lg">
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
