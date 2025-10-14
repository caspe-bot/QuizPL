# QuizPL - Modern Quiz Application

## Overview
QuizPL is a modern, interactive quiz application with timed multiple-choice questions, instant feedback, and a comprehensive ranking system. Built with React, TypeScript, and Express.

## Purpose
Challenge users with engaging quiz questions across various topics, providing instant feedback and performance rankings in a beautiful, mobile-responsive interface.

## Current State
MVP is complete with all core features implemented:
- Start screen with quiz overview
- 10 random quiz questions with 20-second timer
- Instant visual feedback on answers
- Results screen with performance analysis and ranking

## Recent Changes (October 14, 2025)
- Implemented complete quiz application from scratch
- Created data schema for questions and results
- Built beautiful UI with gradient hero, animated timer, and results display
- Implemented in-memory storage with 10 diverse quiz questions
- Added smooth animations and transitions throughout

## Project Architecture

### Frontend (`/client`)
- **Pages**:
  - `Home.tsx`: Main component managing game state (start, quiz, results)
  - `StartScreen.tsx`: Hero screen with quiz information and start button
  - `QuizScreen.tsx`: Interactive quiz with timer, progress bar, and answer cards
  - `ResultsScreen.tsx`: Score display, performance stats, and ranking

- **Components**:
  - `CircularTimer.tsx`: Animated countdown timer with color transitions
  - `ProgressBar.tsx`: Visual progress indicator with gradient

### Backend (`/server`)
- **Storage** (`storage.ts`): In-memory storage with 10 seeded quiz questions
- **Routes** (`routes.ts`): GET `/api/questions` endpoint returning 10 random questions

### Data Schema (`/shared/schema.ts`)
```typescript
Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  category: string
}

QuizResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  percentage: number
  ranking: string
  rankingMessage: string
}
```

## Design System
- **Colors**: Vibrant purple primary, bright blue accent, green success, red error
- **Typography**: Poppins for headings, Inter for body text
- **Animations**: Slide-in, scale, shake, pulse-ring, count-up effects
- **Mobile-first**: Fully responsive design with touch-friendly interactions

## Key Features
1. **Start Screen**: Gradient hero with quiz stats and "How It Works" section
2. **Timed Questions**: 20-second countdown with color-coded urgency
3. **Visual Feedback**: Green (correct) or red (incorrect) with animations
4. **Progress Tracking**: Live progress bar and score counter
5. **Results & Ranking**: Circular score display, performance badges, detailed stats
6. **Replay**: Easy restart functionality

## Ranking System
- 90%+: Quiz Master
- 80-89%: Expert
- 70-79%: Advanced
- 60-69%: Intermediate
- 50-59%: Beginner
- <50%: Novice

## Tech Stack
- Frontend: React, TypeScript, Tailwind CSS, Shadcn UI, TanStack Query
- Backend: Express.js, TypeScript
- Storage: In-memory (MemStorage)
- Build: Vite
