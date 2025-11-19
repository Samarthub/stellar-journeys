import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizQuestion } from "@/config/quizzes";

type MatchPair = {
  left: string;
  right: string;
  leftIndex: number;
  rightIndex: number;
};

type MatchGameProps = {
  questions: QuizQuestion[];
  onComplete: (correct: number, total: number) => void;
};

export function MatchGame({ questions, onComplete }: MatchGameProps) {
  const [pairs, setPairs] = useState<MatchPair[]>(() => {
    return questions.slice(0, 5).map((q, i) => ({
      left: q.question.replace(/^What is |Which |What does /, ""),
      right: q.options[q.correctAnswer],
      leftIndex: i,
      rightIndex: i,
    }));
  });

  const [shuffledRight] = useState(() => {
    const rights = [...pairs];
    for (let i = rights.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rights[i], rights[j]] = [rights[j], rights[i]];
    }
    return rights;
  });

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPairs, setWrongPairs] = useState<Set<string>>(new Set());

  const handleLeftClick = (index: number) => {
    if (matched.has(index)) return;
    setSelectedLeft(index);
  };

  const handleRightClick = (index: number) => {
    if (matched.has(index)) return;
    setSelectedRight(index);

    if (selectedLeft !== null) {
      // Check if match is correct
      const leftPair = pairs[selectedLeft];
      const rightPair = shuffledRight[index];

      if (leftPair.leftIndex === rightPair.leftIndex) {
        // Correct match!
        setMatched(new Set([...matched, selectedLeft, index]));
        setSelectedLeft(null);
        setSelectedRight(null);

        // Play success sound
        playSound(true);

        // Check if all matched
        if (matched.size + 2 >= pairs.length * 2) {
          setTimeout(() => {
            onComplete(pairs.length, pairs.length);
          }, 500);
        }
      } else {
        // Wrong match
        playSound(false);
        const pairKey = `${selectedLeft}-${index}`;
        setWrongPairs(new Set([...wrongPairs, pairKey]));

        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setWrongPairs(new Set());
        }, 1000);
      }
    }
  };

  const playSound = (isCorrect: boolean) => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = isCorrect ? 800 : 400;
    oscillator.type = "sine";
    gainNode.gain.value = 0.1;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Match the Pairs!</h2>
          <p className="text-muted-foreground">
            Click one item from each column to make a match
          </p>
          <div className="mt-3">
            <span className="text-lg font-medium">
              Matched: {matched.size / 2} / {pairs.length}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-3">
            {pairs.map((pair, index) => {
              const isMatched = matched.has(index);
              const isSelected = selectedLeft === index;

              return (
                <button
                  key={index}
                  onClick={() => handleLeftClick(index)}
                  disabled={isMatched}
                  className={`
                    w-full p-4 rounded-xl border-2 text-left font-medium
                    transition-all duration-200
                    ${isMatched ? "bg-green-100 border-green-500 dark:bg-green-900/30" : ""}
                    ${isSelected ? "border-primary scale-105 bg-primary/10" : "border-border"}
                    ${!isMatched && !isSelected ? "hover:border-primary hover:scale-102" : ""}
                  `}
                >
                  {pair.left}
                </button>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {shuffledRight.map((pair, index) => {
              const isMatched = matched.has(index);
              const isSelected = selectedRight === index;

              return (
                <button
                  key={index}
                  onClick={() => handleRightClick(index)}
                  disabled={isMatched}
                  className={`
                    w-full p-4 rounded-xl border-2 text-left font-medium
                    transition-all duration-200
                    ${isMatched ? "bg-green-100 border-green-500 dark:bg-green-900/30" : ""}
                    ${isSelected ? "border-primary scale-105 bg-primary/10" : "border-border"}
                    ${!isMatched && !isSelected ? "hover:border-primary hover:scale-102" : ""}
                  `}
                >
                  {pair.right}
                </button>
              );
            })}
          </div>
        </div>

        {matched.size === pairs.length * 2 && (
          <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg text-center animate-fade-in">
            <p className="text-xl font-bold text-green-700 dark:text-green-300">
              🎉 Perfect! All matched!
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
