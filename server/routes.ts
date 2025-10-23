import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { SubmitQuizResponse, QuizResult } from "../shared/schema";
import { submitQuizRequestSchema } from "../shared/validation";
import { fromError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/questions", async (_req, res) => {
    try {
      const questions = await storage.getRandomQuestions(10);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/submit-quiz", async (req, res) => {
    try {
      const validationResult = submitQuizRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromError(validationResult.error);
        return res.status(400).json({ error: validationError.message });
      }

      const { answers } = validationResult.data;
      
      let correctAnswers = 0;
      const totalQuestions = answers.length;

      for (const answer of answers) {
        const question = await storage.getQuestion(answer.questionId);
        if (question && answer.selectedAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      }

      const incorrectAnswers = totalQuestions - correctAnswers;
      const percentage = Math.round((correctAnswers / totalQuestions) * 100);

      let ranking = "";
      let rankingMessage = "";

      if (percentage >= 90) {
        ranking = "Quiz Master";
        rankingMessage = "Outstanding! You're a true quiz master!";
      } else if (percentage >= 80) {
        ranking = "Expert";
        rankingMessage = "Excellent work! You really know your stuff!";
      } else if (percentage >= 70) {
        ranking = "Advanced";
        rankingMessage = "Great job! You're doing really well!";
      } else if (percentage >= 60) {
        ranking = "Intermediate";
        rankingMessage = "Nice effort! Keep practicing!";
      } else if (percentage >= 50) {
        ranking = "Beginner";
        rankingMessage = "Good try! There's room for improvement!";
      } else {
        ranking = "Novice";
        rankingMessage = "Keep learning! You'll get better with practice!";
      }

      const result: QuizResult = {
        score: correctAnswers,
        totalQuestions,
        correctAnswers,
        incorrectAnswers,
        percentage,
        ranking,
        rankingMessage,
      };

      const response: SubmitQuizResponse = { result };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit quiz" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
