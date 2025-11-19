import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Sun, User } from "lucide-react";

export default function ParentHome() {
  const { state, getActiveChild, setActiveChild, toggleTheme, logout } = useApp();
  const navigate = useNavigate();
  const activeChild = getActiveChild();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!activeChild) {
    navigate("/parent/setup");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--parent-bg))] to-muted">
      {/* Top Bar */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PlayLoop Kids
          </h1>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {state.theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{state.parentName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, {state.parentName}!</h2>
            <p className="text-muted-foreground">
              You're viewing {activeChild.name} (Age {activeChild.ageGroup})
            </p>
          </div>

          {state.children.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Switch Child</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={state.activeChildId || ""} onValueChange={setActiveChild}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {state.children.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.name} ({child.ageGroup})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-hover cursor-pointer" onClick={() => navigate("/dashboard")}>
              <CardHeader>
                <CardTitle className="text-2xl">🎮 Enter Kid Mode</CardTitle>
                <CardDescription>
                  Let {activeChild.name} start learning and playing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg">
                  Go to Kid Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover cursor-pointer" onClick={() => navigate("/parent/analysis")}>
              <CardHeader>
                <CardTitle className="text-2xl">📊 View Analysis</CardTitle>
                <CardDescription>
                  Check {activeChild.name}'s progress and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" size="lg">
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
