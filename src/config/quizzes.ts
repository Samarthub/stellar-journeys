export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type QuizBank = {
  [key: string]: QuizQuestion[];
};

export const quizBank: QuizBank = {
  // Learn from Images - Historical Places
  images_historical: [
    {
      id: "hist1",
      question: "Which famous monument is known as a symbol of love?",
      options: ["Eiffel Tower", "Taj Mahal", "Big Ben", "Statue of Liberty"],
      correctAnswer: 1,
      explanation: "The Taj Mahal in India was built by Emperor Shah Jahan as a memorial for his wife!",
    },
    {
      id: "hist2",
      question: "Where can you find the Great Wall?",
      options: ["India", "Japan", "China", "Korea"],
      correctAnswer: 2,
      explanation: "The Great Wall of China is one of the longest structures ever built!",
    },
    {
      id: "hist3",
      question: "Which ancient wonder is found in Egypt?",
      options: ["Colosseum", "Pyramids", "Machu Picchu", "Stonehenge"],
      correctAnswer: 1,
      explanation: "The Pyramids of Giza are amazing ancient structures built thousands of years ago!",
    },
  ],

  // Learn from Images - Fruits
  images_fruits: [
    {
      id: "fruit1",
      question: "Which fruit is yellow and curved?",
      options: ["Apple", "Banana", "Orange", "Grape"],
      correctAnswer: 1,
      explanation: "Bananas are yellow, curved, and full of energy!",
    },
    {
      id: "fruit2",
      question: "Which fruit is red and keeps the doctor away?",
      options: ["Apple", "Strawberry", "Watermelon", "Cherry"],
      correctAnswer: 0,
      explanation: "An apple a day keeps the doctor away! They're super healthy.",
    },
    {
      id: "fruit3",
      question: "Which fruit is orange on the inside and has green skin?",
      options: ["Lemon", "Kiwi", "Lime", "Pear"],
      correctAnswer: 1,
      explanation: "Kiwis are brown and fuzzy on the outside but bright green inside!",
    },
  ],

  // Learn from Images - Animals
  images_animals: [
    {
      id: "animal1",
      question: "Which animal is known as the king of the jungle?",
      options: ["Tiger", "Elephant", "Lion", "Bear"],
      correctAnswer: 2,
      explanation: "Lions are called the king of the jungle because of their strength and courage!",
    },
    {
      id: "animal2",
      question: "Which animal has a long trunk?",
      options: ["Giraffe", "Elephant", "Rhino", "Hippo"],
      correctAnswer: 1,
      explanation: "Elephants use their trunks to drink water, pick up things, and say hello!",
    },
    {
      id: "animal3",
      question: "Which bird cannot fly but is a great swimmer?",
      options: ["Eagle", "Parrot", "Penguin", "Sparrow"],
      correctAnswer: 2,
      explanation: "Penguins can't fly, but they're amazing swimmers in cold waters!",
    },
  ],

  // Learn from Images - Vegetables
  images_vegetables: [
    {
      id: "veg1",
      question: "Which vegetable makes you cry when you cut it?",
      options: ["Carrot", "Onion", "Potato", "Tomato"],
      correctAnswer: 1,
      explanation: "Onions release a gas that makes our eyes water when we cut them!",
    },
    {
      id: "veg2",
      question: "Which orange vegetable is good for your eyes?",
      options: ["Pumpkin", "Carrot", "Sweet Potato", "Orange Bell Pepper"],
      correctAnswer: 1,
      explanation: "Carrots have Vitamin A which helps keep your eyes healthy!",
    },
    {
      id: "veg3",
      question: "Which green vegetable looks like a tiny tree?",
      options: ["Spinach", "Lettuce", "Broccoli", "Cucumber"],
      correctAnswer: 2,
      explanation: "Broccoli looks like tiny trees and is super healthy!",
    },
  ],

  // Coding - Python Basics
  coding_python_basics: [
    {
      id: "py1",
      question: "What does print('Hello') do in Python?",
      options: ["Saves a file", "Shows 'Hello' on screen", "Deletes text", "Creates a variable"],
      correctAnswer: 1,
      explanation: "print() shows text on the screen so you can see it!",
    },
    {
      id: "py2",
      question: "What is the result of 5 + 3 in Python?",
      options: ["53", "8", "15", "2"],
      correctAnswer: 1,
      explanation: "Python can do math! 5 + 3 equals 8.",
    },
    {
      id: "py3",
      question: "Which symbol is used for comments in Python?",
      options: ["//", "#", "/*", "--"],
      correctAnswer: 1,
      explanation: "In Python, we use # to write comments that the computer ignores!",
    },
  ],

  // Coding - C Basics
  coding_c_basics: [
    {
      id: "c1",
      question: "What does printf() do in C?",
      options: ["Reads input", "Prints output", "Creates files", "Deletes data"],
      correctAnswer: 1,
      explanation: "printf() is used to show information on the screen in C!",
    },
    {
      id: "c2",
      question: "Which symbol ends most lines in C?",
      options: [".", ",", ";", ":"],
      correctAnswer: 2,
      explanation: "In C, we use semicolon (;) at the end of most lines!",
    },
    {
      id: "c3",
      question: "What is int used for in C?",
      options: ["Text", "Whole numbers", "Decimals", "Characters"],
      correctAnswer: 1,
      explanation: "int is used to store whole numbers like 1, 2, 100!",
    },
  ],

  // Coding - C++ Basics
  coding_cpp_basics: [
    {
      id: "cpp1",
      question: "What does cout do in C++?",
      options: ["Input data", "Output data", "Delete data", "Save data"],
      correctAnswer: 1,
      explanation: "cout is used to show output on the screen in C++!",
    },
    {
      id: "cpp2",
      question: "Which symbol is used with cout?",
      options: [">>", "<<", "==", "!="],
      correctAnswer: 1,
      explanation: "We use << with cout to display information!",
    },
    {
      id: "cpp3",
      question: "What does cin do in C++?",
      options: ["Output", "Input", "Loop", "Calculate"],
      correctAnswer: 1,
      explanation: "cin is used to get input from the user!",
    },
  ],

  // Coding - Mixed
  coding_mixed_coding: [
    {
      id: "mix1",
      question: "What is a variable?",
      options: ["A fixed number", "A storage box for data", "A loop", "An error"],
      correctAnswer: 1,
      explanation: "Variables are like boxes where we store information!",
    },
    {
      id: "mix2",
      question: "What does a loop do?",
      options: ["Stops program", "Repeats code", "Saves file", "Prints once"],
      correctAnswer: 1,
      explanation: "Loops help us repeat code multiple times without writing it again!",
    },
    {
      id: "mix3",
      question: "What is debugging?",
      options: ["Writing code", "Finding and fixing errors", "Deleting code", "Running code"],
      correctAnswer: 1,
      explanation: "Debugging means finding and fixing mistakes in our code!",
    },
  ],

  // Maths - Addition
  maths_addition: [
    {
      id: "add1",
      question: "What is 5 + 3?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "5 + 3 = 8. Great job!",
    },
    {
      id: "add2",
      question: "What is 10 + 7?",
      options: ["15", "16", "17", "18"],
      correctAnswer: 2,
      explanation: "10 + 7 = 17. You're doing great!",
    },
    {
      id: "add3",
      question: "What is 12 + 8?",
      options: ["18", "19", "20", "21"],
      correctAnswer: 2,
      explanation: "12 + 8 = 20. Excellent!",
    },
  ],

  // Maths - Subtraction
  maths_subtraction: [
    {
      id: "sub1",
      question: "What is 9 - 4?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1,
      explanation: "9 - 4 = 5. Well done!",
    },
    {
      id: "sub2",
      question: "What is 15 - 8?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 1,
      explanation: "15 - 8 = 7. Fantastic!",
    },
    {
      id: "sub3",
      question: "What is 20 - 12?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "20 - 12 = 8. You're a star!",
    },
  ],

  // Maths - Multiplication
  maths_multiplication: [
    {
      id: "mult1",
      question: "What is 3 × 4?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation: "3 × 4 = 12. Amazing!",
    },
    {
      id: "mult2",
      question: "What is 5 × 6?",
      options: ["28", "29", "30", "31"],
      correctAnswer: 2,
      explanation: "5 × 6 = 30. You're brilliant!",
    },
    {
      id: "mult3",
      question: "What is 7 × 8?",
      options: ["54", "55", "56", "57"],
      correctAnswer: 2,
      explanation: "7 × 8 = 56. Superb!",
    },
  ],

  // Maths - Mixed
  maths_mixed_maths: [
    {
      id: "mixm1",
      question: "What is 10 + 5 - 3?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation: "10 + 5 = 15, then 15 - 3 = 12!",
    },
    {
      id: "mixm2",
      question: "What is 4 × 3 + 2?",
      options: ["12", "13", "14", "15"],
      correctAnswer: 2,
      explanation: "4 × 3 = 12, then 12 + 2 = 14!",
    },
    {
      id: "mixm3",
      question: "What is 20 - 5 × 2?",
      options: ["8", "10", "15", "30"],
      correctAnswer: 1,
      explanation: "First multiply: 5 × 2 = 10, then subtract: 20 - 10 = 10!",
    },
  ],
};

export function getQuizQuestionsForLevel(module: "images" | "coding" | "maths", category: string): QuizQuestion[] {
  const bankKey = `${module}_${category}`;
  const questions = quizBank[bankKey] || [];
  return questions.slice(0, 5); // Return up to 5 questions
}
