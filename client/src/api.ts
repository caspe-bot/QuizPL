// client/src/api.ts
export interface Question {
  id: string;
  question: string;
  options: string[];
}

export interface QuizResult {
  score: number;
  total: number;
  correctAnswers: Record<string, string>;
}

export async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch("/api/questions");
  if (!res.ok) throw new Error("Błąd pobierania pytań");
  return res.json();
}

export async function submitAnswers(
  answers: Record<string, string>,
): Promise<QuizResult> {
  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  });
  if (!res.ok) throw new Error("Błąd wysyłania odpowiedzi");
  return res.json();
}
