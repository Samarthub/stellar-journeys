import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

const Index = () => {
  const navigate = useNavigate();
  const { state } = useApp();

  useEffect(() => {
    // Redirect based on auth state
    if (state.isAuthenticated) {
      if (state.children.length === 0) {
        navigate("/parent/setup");
      } else {
        navigate("/parent/home");
      }
    } else {
      navigate("/login");
    }
  }, [state.isAuthenticated, state.children.length, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-galaxy-deep to-galaxy-purple">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold bg-gradient-to-r from-galaxy-accent to-galaxy-glow bg-clip-text text-transparent animate-glow-pulse">
          PlayLoop Kids
        </h1>
        <p className="text-xl text-foreground/80">Loading your learning adventure...</p>
      </div>
    </div>
  );
};

export default Index;
