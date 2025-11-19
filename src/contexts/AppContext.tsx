import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Level, imagesLevels, codingLevels, mathsLevels } from "@/config/levels";

export type AgeGroup = "5-7" | "8-10" | "11-12";

export type ChildProfile = {
  id: string;
  name: string;
  ageGroup: AgeGroup;
  interests: string[];
};

export type ActivityEntry = {
  id: string;
  module: "images" | "coding" | "maths";
  levelId: number;
  score: string;
  xpEarned: number;
  timestamp: string;
};

export type ModuleProgress = {
  levelsImages: Level[];
  levelsCoding: Level[];
  levelsMaths: Level[];
  childXP: number;
  recentActivity: ActivityEntry[];
  dailyTimeMinutes: number;
  lastActivityDate: string;
};

export type AppState = {
  parentName: string;
  children: ChildProfile[];
  activeChildId: string | null;
  progressByChild: Record<string, ModuleProgress>;
  theme: "light" | "dark";
  isAuthenticated: boolean;
};

type AppContextType = {
  state: AppState;
  setParentName: (name: string) => void;
  addChild: (child: ChildProfile) => void;
  updateChild: (id: string, updates: Partial<ChildProfile>) => void;
  setActiveChild: (id: string) => void;
  getActiveChild: () => ChildProfile | null;
  getActiveProgress: () => ModuleProgress | null;
  updateProgress: (updates: Partial<ModuleProgress>) => void;
  completeLevel: (module: "images" | "coding" | "maths", levelId: number) => void;
  addActivity: (activity: Omit<ActivityEntry, "id" | "timestamp">) => void;
  toggleTheme: () => void;
  login: (name: string) => void;
  logout: () => void;
  addDailyTime: (minutes: number) => void;
  canAccessKidMode: () => boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = "playloop_kids_data";
const DAILY_TIME_LIMIT = 120; // 2 hours in minutes

function createInitialProgress(): ModuleProgress {
  return {
    levelsImages: JSON.parse(JSON.stringify(imagesLevels)),
    levelsCoding: JSON.parse(JSON.stringify(codingLevels)),
    levelsMaths: JSON.parse(JSON.stringify(mathsLevels)),
    childXP: 0,
    recentActivity: [],
    dailyTimeMinutes: 0,
    lastActivityDate: new Date().toDateString(),
  };
}

const initialState: AppState = {
  parentName: "",
  children: [],
  activeChildId: null,
  progressByChild: {},
  theme: "dark",
  isAuthenticated: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  const setParentName = (name: string) => {
    setState((prev) => ({ ...prev, parentName: name }));
  };

  const addChild = (child: ChildProfile) => {
    setState((prev) => {
      const newProgressByChild = {
        ...prev.progressByChild,
        [child.id]: createInitialProgress(),
      };
      return {
        ...prev,
        children: [...prev.children, child],
        progressByChild: newProgressByChild,
        activeChildId: prev.activeChildId || child.id,
      };
    });
  };

  const updateChild = (id: string, updates: Partial<ChildProfile>) => {
    setState((prev) => ({
      ...prev,
      children: prev.children.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
  };

  const setActiveChild = (id: string) => {
    setState((prev) => ({ ...prev, activeChildId: id }));
  };

  const getActiveChild = (): ChildProfile | null => {
    if (!state.activeChildId) return null;
    return state.children.find((c) => c.id === state.activeChildId) || null;
  };

  const getActiveProgress = (): ModuleProgress | null => {
    if (!state.activeChildId) return null;
    return state.progressByChild[state.activeChildId] || null;
  };

  const updateProgress = (updates: Partial<ModuleProgress>) => {
    if (!state.activeChildId) return;
    setState((prev) => ({
      ...prev,
      progressByChild: {
        ...prev.progressByChild,
        [state.activeChildId!]: {
          ...prev.progressByChild[state.activeChildId!],
          ...updates,
        },
      },
    }));
  };

  const completeLevel = (module: "images" | "coding" | "maths", levelId: number) => {
    if (!state.activeChildId) return;
    const progress = state.progressByChild[state.activeChildId];
    if (!progress) return;

    const levelsKey = module === "images" ? "levelsImages" : module === "coding" ? "levelsCoding" : "levelsMaths";
    const levels = [...progress[levelsKey]];

    const currentIndex = levels.findIndex((l) => l.id === levelId);
    if (currentIndex === -1) return;

    levels[currentIndex] = { ...levels[currentIndex], status: "completed" };
    if (currentIndex + 1 < levels.length) {
      levels[currentIndex + 1] = { ...levels[currentIndex + 1], status: "current" };
    }

    updateProgress({ [levelsKey]: levels });
  };

  const addActivity = (activity: Omit<ActivityEntry, "id" | "timestamp">) => {
    if (!state.activeChildId) return;
    const progress = state.progressByChild[state.activeChildId];
    if (!progress) return;

    const newActivity: ActivityEntry = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    const updatedActivities = [newActivity, ...progress.recentActivity].slice(0, 20);
    updateProgress({
      recentActivity: updatedActivities,
      childXP: progress.childXP + activity.xpEarned,
    });
  };

  const addDailyTime = (minutes: number) => {
    if (!state.activeChildId) return;
    const progress = state.progressByChild[state.activeChildId];
    if (!progress) return;

    const today = new Date().toDateString();
    const isNewDay = progress.lastActivityDate !== today;

    updateProgress({
      dailyTimeMinutes: isNewDay ? minutes : progress.dailyTimeMinutes + minutes,
      lastActivityDate: today,
    });
  };

  const canAccessKidMode = (): boolean => {
    if (!state.activeChildId) return false;
    const progress = state.progressByChild[state.activeChildId];
    if (!progress) return false;

    const today = new Date().toDateString();
    const isNewDay = progress.lastActivityDate !== today;

    return isNewDay || progress.dailyTimeMinutes < DAILY_TIME_LIMIT;
  };

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const login = (name: string) => {
    setState((prev) => ({
      ...prev,
      parentName: name,
      isAuthenticated: true,
    }));
  };

  const logout = () => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setParentName,
        addChild,
        updateChild,
        setActiveChild,
        getActiveChild,
        getActiveProgress,
        updateProgress,
        completeLevel,
        addActivity,
        toggleTheme,
        login,
        logout,
        addDailyTime,
        canAccessKidMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
