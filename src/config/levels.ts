export type LevelStatus = "locked" | "current" | "completed";

export type Level = {
  id: number;
  title: string;
  category: string;
  status: LevelStatus;
  videoUrl?: string;
};

// 1. Learn from Images Levels
export const imagesLevels: Level[] = [
  // 1–5 Historical Places
  { id: 1, title: "Level 1: Historical Places I", category: "historical", status: "current", videoUrl: "" },
  { id: 2, title: "Level 2: Historical Places II", category: "historical", status: "locked", videoUrl: "" },
  { id: 3, title: "Level 3: Historical Places III", category: "historical", status: "locked", videoUrl: "" },
  { id: 4, title: "Level 4: Historical Places IV", category: "historical", status: "locked", videoUrl: "" },
  { id: 5, title: "Level 5: Historical Places V", category: "historical", status: "locked", videoUrl: "" },

  // 6–10 Fruits
  { id: 6, title: "Level 6: Fruits I", category: "fruits", status: "locked", videoUrl: "" },
  { id: 7, title: "Level 7: Fruits II", category: "fruits", status: "locked", videoUrl: "" },
  { id: 8, title: "Level 8: Fruits III", category: "fruits", status: "locked", videoUrl: "" },
  { id: 9, title: "Level 9: Fruits IV", category: "fruits", status: "locked", videoUrl: "" },
  { id: 10, title: "Level 10: Fruits V", category: "fruits", status: "locked", videoUrl: "" },

  // 11–15 Animals
  { id: 11, title: "Level 11: Animals I", category: "animals", status: "locked", videoUrl: "" },
  { id: 12, title: "Level 12: Animals II", category: "animals", status: "locked", videoUrl: "" },
  { id: 13, title: "Level 13: Animals III", category: "animals", status: "locked", videoUrl: "" },
  { id: 14, title: "Level 14: Animals IV", category: "animals", status: "locked", videoUrl: "" },
  { id: 15, title: "Level 15: Animals V", category: "animals", status: "locked", videoUrl: "" },

  // 16–20 Vegetables
  { id: 16, title: "Level 16: Vegetables I", category: "vegetables", status: "locked", videoUrl: "" },
  { id: 17, title: "Level 17: Vegetables II", category: "vegetables", status: "locked", videoUrl: "" },
  { id: 18, title: "Level 18: Vegetables III", category: "vegetables", status: "locked", videoUrl: "" },
  { id: 19, title: "Level 19: Vegetables IV", category: "vegetables", status: "locked", videoUrl: "" },
  { id: 20, title: "Level 20: Vegetables V", category: "vegetables", status: "locked", videoUrl: "" },
];

// 2. Simple Coding Fun Levels
export const codingLevels: Level[] = [
  // 1–5 Python basics
  { id: 1, title: "Level 1: Print Your Name (Python)", category: "python_basics", status: "current", videoUrl: "" },
  { id: 2, title: "Level 2: Print Numbers (Python)", category: "python_basics", status: "locked", videoUrl: "" },
  { id: 3, title: "Level 3: Add Two Numbers (Python)", category: "python_basics", status: "locked", videoUrl: "" },
  { id: 4, title: "Level 4: If-Else Basics (Python)", category: "python_basics", status: "locked", videoUrl: "" },
  { id: 5, title: "Level 5: Loops Basics (Python)", category: "python_basics", status: "locked", videoUrl: "" },

  // 6–10 C basics
  { id: 6, title: "Level 6: Hello World (C)", category: "c_basics", status: "locked", videoUrl: "" },
  { id: 7, title: "Level 7: Variables (C)", category: "c_basics", status: "locked", videoUrl: "" },
  { id: 8, title: "Level 8: Add Numbers (C)", category: "c_basics", status: "locked", videoUrl: "" },
  { id: 9, title: "Level 9: If-Else (C)", category: "c_basics", status: "locked", videoUrl: "" },
  { id: 10, title: "Level 10: Loops (C)", category: "c_basics", status: "locked", videoUrl: "" },

  // 11–15 C++ basics
  { id: 11, title: "Level 11: Hello World (C++)", category: "cpp_basics", status: "locked", videoUrl: "" },
  { id: 12, title: "Level 12: Variables (C++)", category: "cpp_basics", status: "locked", videoUrl: "" },
  { id: 13, title: "Level 13: Add Numbers (C++)", category: "cpp_basics", status: "locked", videoUrl: "" },
  { id: 14, title: "Level 14: If-Else (C++)", category: "cpp_basics", status: "locked", videoUrl: "" },
  { id: 15, title: "Level 15: Loops (C++)", category: "cpp_basics", status: "locked", videoUrl: "" },

  // 16–20 Mixed coding MCQs
  { id: 16, title: "Level 16: Mixed Code I", category: "mixed_coding", status: "locked", videoUrl: "" },
  { id: 17, title: "Level 17: Mixed Code II", category: "mixed_coding", status: "locked", videoUrl: "" },
  { id: 18, title: "Level 18: Mixed Code III", category: "mixed_coding", status: "locked", videoUrl: "" },
  { id: 19, title: "Level 19: Mixed Code IV", category: "mixed_coding", status: "locked", videoUrl: "" },
  { id: 20, title: "Level 20: Mixed Code V", category: "mixed_coding", status: "locked", videoUrl: "" },
];

// 3. Magic Maths Levels
export const mathsLevels: Level[] = [
  // 1–5 Addition
  { id: 1, title: "Level 1: Addition I", category: "addition", status: "current", videoUrl: "" },
  { id: 2, title: "Level 2: Addition II", category: "addition", status: "locked", videoUrl: "" },
  { id: 3, title: "Level 3: Addition III", category: "addition", status: "locked", videoUrl: "" },
  { id: 4, title: "Level 4: Addition IV", category: "addition", status: "locked", videoUrl: "" },
  { id: 5, title: "Level 5: Addition V", category: "addition", status: "locked", videoUrl: "" },

  // 6–10 Subtraction
  { id: 6, title: "Level 6: Subtraction I", category: "subtraction", status: "locked", videoUrl: "" },
  { id: 7, title: "Level 7: Subtraction II", category: "subtraction", status: "locked", videoUrl: "" },
  { id: 8, title: "Level 8: Subtraction III", category: "subtraction", status: "locked", videoUrl: "" },
  { id: 9, title: "Level 9: Subtraction IV", category: "subtraction", status: "locked", videoUrl: "" },
  { id: 10, title: "Level 10: Subtraction V", category: "subtraction", status: "locked", videoUrl: "" },

  // 11–15 Multiplication
  { id: 11, title: "Level 11: Multiplication I", category: "multiplication", status: "locked", videoUrl: "" },
  { id: 12, title: "Level 12: Multiplication II", category: "multiplication", status: "locked", videoUrl: "" },
  { id: 13, title: "Level 13: Multiplication III", category: "multiplication", status: "locked", videoUrl: "" },
  { id: 14, title: "Level 14: Multiplication IV", category: "multiplication", status: "locked", videoUrl: "" },
  { id: 15, title: "Level 15: Multiplication V", category: "multiplication", status: "locked", videoUrl: "" },

  // 16–20 Mixed Maths
  { id: 16, title: "Level 16: Mixed Maths I", category: "mixed_maths", status: "locked", videoUrl: "" },
  { id: 17, title: "Level 17: Mixed Maths II", category: "mixed_maths", status: "locked", videoUrl: "" },
  { id: 18, title: "Level 18: Mixed Maths III", category: "mixed_maths", status: "locked", videoUrl: "" },
  { id: 19, title: "Level 19: Mixed Maths IV", category: "mixed_maths", status: "locked", videoUrl: "" },
  { id: 20, title: "Level 20: Mixed Maths V", category: "mixed_maths", status: "locked", videoUrl: "" },
];
