import { z } from "zod";

export const submitQuizRequestSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string().uuid(),
      selectedAnswer: z.number().int().min(-1),
      timeSpent: z.number().int().min(0).max(30),
    })
  ).min(1).max(20),
});

export type ValidatedSubmitQuizRequest = z.infer<typeof submitQuizRequestSchema>;
