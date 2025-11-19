import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizQuestion } from "@/config/quizzes";

type QuizViewProps = {
  questions: QuizQuestion[];
  onComplete: (correct: number, total: number) => void;
};

export function QuizView({ questions, onComplete }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const playSound = (isCorrect: boolean) => {
    // Simple audio feedback using Web Audio API
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

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return;

    playSound(false); // Click sound
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    playSound(isCorrect);
    setIsAnswered(true);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(correctCount, questions.length);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-t-lg font-bold text-center">
        Question {currentIndex + 1} of {questions.length}
      </div>

      {/* Question Card */}
      <Card className="p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">{currentQuestion.question}</h2>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswer;
            const showCorrect = isAnswered && isCorrectAnswer;
            const showIncorrect = isAnswered && isSelected && !isCorrectAnswer;

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
                className={`
                  quiz-answer text-left
                  ${isSelected && !isAnswered ? "border-primary bg-primary/10" : ""}
                  ${showCorrect ? "correct" : ""}
                  ${showIncorrect ? "incorrect" : ""}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option}</span>
                  {showCorrect && <span className="text-2xl">✓</span>}
                  {showIncorrect && <span className="text-2xl">✗</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation (shown after answering) */}
        {isAnswered && (
          <div className="mt-6 p-4 bg-muted rounded-lg animate-fade-in">
            <p className="font-medium mb-1">
              {selectedAnswer === currentQuestion.correctAnswer ? "🎉 Correct!" : "Try again next time!"}
            </p>
            <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          {!isAnswered ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              size="lg"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg">
              {isLastQuestion ? "See Results" : "Next Question"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
