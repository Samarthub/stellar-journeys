export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: {
    type: "xp" | "levels_completed" | "module_levels_completed";
    module?: "images" | "coding" | "maths";
    value: number;
  };
};

export const badges: Badge[] = [
  {
    id: "picture_explorer",
    name: "Picture Explorer",
    description: "Completed 5 Learn from Images levels",
    icon: "🖼️",
    condition: { type: "module_levels_completed", module: "images", value: 5 },
  },
  {
    id: "code_starter",
    name: "Code Starter",
    description: "Completed 3 Simple Coding Fun levels",
    icon: "💻",
    condition: { type: "module_levels_completed", module: "coding", value: 3 },
  },
  {
    id: "math_magician",
    name: "Math Magician",
    description: "Completed 5 Magic Maths levels",
    icon: "🔢",
    condition: { type: "module_levels_completed", module: "maths", value: 5 },
  },
  {
    id: "curiosity_champion",
    name: "Curiosity Champion",
    description: "Earned 500 XP in total",
    icon: "🏆",
    condition: { type: "xp", value: 500 },
  },
  {
    id: "learning_streak",
    name: "Learning Streak",
    description: "Completed 10 levels across all modules",
    icon: "⭐",
    condition: { type: "levels_completed", value: 10 },
  },
  {
    id: "super_learner",
    name: "Super Learner",
    description: "Earned 1000 XP in total",
    icon: "🌟",
    condition: { type: "xp", value: 1000 },
  },
  {
    id: "master_explorer",
    name: "Master Explorer",
    description: "Completed all 20 Learn from Images levels",
    icon: "🎨",
    condition: { type: "module_levels_completed", module: "images", value: 20 },
  },
  {
    id: "coding_hero",
    name: "Coding Hero",
    description: "Completed all 20 Simple Coding Fun levels",
    icon: "🚀",
    condition: { type: "module_levels_completed", module: "coding", value: 20 },
  },
  {
    id: "math_genius",
    name: "Math Genius",
    description: "Completed all 20 Magic Maths levels",
    icon: "🧮",
    condition: { type: "module_levels_completed", module: "maths", value: 20 },
  },
];

export function checkBadgeUnlocked(badge: Badge, progress: {
  xp: number;
  imagesCompleted: number;
  codingCompleted: number;
  mathsCompleted: number;
  totalCompleted: number;
}): boolean {
  const { type, module, value } = badge.condition;

  if (type === "xp") {
    return progress.xp >= value;
  }

  if (type === "levels_completed") {
    return progress.totalCompleted >= value;
  }

  if (type === "module_levels_completed" && module) {
    const moduleMap = {
      images: progress.imagesCompleted,
      coding: progress.codingCompleted,
      maths: progress.mathsCompleted,
    };
    return moduleMap[module] >= value;
  }

  return false;
}
