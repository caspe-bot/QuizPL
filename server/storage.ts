import { type Question } from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllQuestions(): Promise<Question[]>;
  getRandomQuestions(count: number): Promise<Question[]>;
  getQuestion(id: string): Promise<Question | undefined>;
}

export class MemStorage implements IStorage {
  private questions: Map<string, Question>;

  constructor() {
    this.questions = new Map();
    this.seedQuestions();
  }

  private seedQuestions() {
    const quizQuestions: Omit<Question, "id">[] = [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        category: "Geography",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        category: "Science",
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
        category: "Art",
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
        category: "Geography",
      },
      {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2,
        category: "History",
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        category: "Science",
      },
      {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "Australia", "South Africa", "Brazil"],
        correctAnswer: 1,
        category: "Geography",
      },
      {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correctAnswer: 2,
        category: "Mathematics",
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1,
        category: "Literature",
      },
      {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        correctAnswer: 2,
        category: "Science",
      },
    ];

    quizQuestions.forEach((q) => {
      const id = randomUUID();
      this.questions.set(id, { ...q, id });
    });
  }

  async getAllQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values());
  }

  async getRandomQuestions(count: number): Promise<Question[]> {
    const allQuestions = Array.from(this.questions.values());
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, allQuestions.length));
  }

  async getQuestion(id: string): Promise<Question | undefined> {
    return this.questions.get(id);
  }
}

export const storage = new MemStorage();
