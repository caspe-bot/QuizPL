import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const questions = pgTable("questions", {
  id: varchar("id").primaryKey(),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  category: text("category").notNull(),
});

export const insertQuestionSchema = createInsertSchema(questions);
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questions.$inferSelect;

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  percentage: number;
  ranking: string;
  rankingMessage: string;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface SubmitQuizRequest {
  answers: Array<{
    questionId: string;
    selectedAnswer: number;
    timeSpent: number;
  }>;
}

export interface SubmitQuizResponse {
  result: QuizResult;
}
