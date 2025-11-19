import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";

export default function TimeLocked() {
  const { getActiveChild } = useApp();
  const navigate = useNavigate();
  const child = getActiveChild();

  return (
    <div className="min-h-screen galaxy-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="text-6xl mb-4">⏰</div>
          <CardTitle className="text-2xl">Great Job Today, {child?.name}!</CardTitle>
          <CardDescription className="text-base mt-2">
            You've learned a lot today! Your brain needs rest to remember everything.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium">You've reached your 2-hour learning limit for today.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Come back tomorrow for more fun and learning!
            </p>
          </div>
          <Button
            onClick={() => navigate("/parent/home")}
            variant="outline"
            className="w-full"
          >
            Back to Parent Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
