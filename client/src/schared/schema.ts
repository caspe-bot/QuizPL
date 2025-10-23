export type SubmitQuizRequest = {
  quizId: string;
  answers: string[];
};

export type SubmitQuizResponse = {
  score: number;
};

export type Question = {
  id: string;
  text: string;
  options: string[];
};

export type QuizResult = {
  userId: string;
  score: number;
};
