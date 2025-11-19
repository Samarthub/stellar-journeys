export const xpConfig = {
  basePerCorrectAnswer: 10,
  bonusPerPerfectQuiz: 10,
  bonusPerLevelCompleted: 20,
};

export function calculateXPForQuiz(correct: number, total: number): number {
  let xp = correct * xpConfig.basePerCorrectAnswer;
  if (correct === total) {
    xp += xpConfig.bonusPerPerfectQuiz;
  }
  xp += xpConfig.bonusPerLevelCompleted;
  return xp;
}
