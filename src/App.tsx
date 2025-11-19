import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ParentSetup from "./pages/ParentSetup";
import ParentHome from "./pages/ParentHome";
import ParentAnalysis from "./pages/ParentAnalysis";
import Dashboard from "./pages/Dashboard";
import LearnImages from "./pages/LearnImages";
import Coding from "./pages/Coding";
import Maths from "./pages/Maths";
import Rewards from "./pages/Rewards";
import Illustrator from "./pages/Illustrator";
import TimeLocked from "./pages/TimeLocked";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/parent/setup" element={<ParentSetup />} />
            <Route path="/parent/home" element={<ParentHome />} />
            <Route path="/parent/analysis" element={<ParentAnalysis />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn-images" element={<LearnImages />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/maths" element={<Maths />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/illustrator" element={<Illustrator />} />
            <Route path="/time-locked" element={<TimeLocked />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
