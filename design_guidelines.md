# QuizPL Design Guidelines

## Design Approach: Reference-Based (Gamified Experience)

**Primary References**: Kahoot (energetic engagement), Duolingo (friendly gamification), modern trivia apps
**Design Philosophy**: Create an exciting, game-like experience that makes learning fun through bold visuals, clear feedback, and rewarding interactions.

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 262 80% 50% (vibrant purple - excitement, quiz energy)
- Secondary: 217 91% 60% (bright blue - trust, clarity)
- Success: 142 76% 36% (green - correct answers)
- Error: 0 84% 60% (red - incorrect answers)
- Warning: 38 92% 50% (orange - time running out)
- Background: 0 0% 98% (near white)
- Surface: 0 0% 100% (pure white cards)
- Text: 222 47% 11% (dark slate)

**Dark Mode:**
- Primary: 262 80% 60% (lighter purple for contrast)
- Secondary: 217 91% 65%
- Success: 142 76% 45%
- Error: 0 84% 65%
- Warning: 38 92% 55%
- Background: 222 47% 11% (dark slate)
- Surface: 217 33% 17% (elevated dark cards)
- Text: 0 0% 98%

### B. Typography

**Font Stack:**
- Primary: 'Poppins' (headings, buttons, quiz questions) - Modern, friendly, highly readable
- Secondary: 'Inter' (body text, answers, UI labels) - Clean, professional
- Load from Google Fonts CDN

**Type Scale:**
- Hero/Start Screen: text-5xl font-bold (quiz title)
- Question Text: text-2xl md:text-3xl font-semibold
- Answer Options: text-lg font-medium
- Timer/Score: text-xl font-bold
- Body/Labels: text-base
- Small Text: text-sm

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20 (as in p-4, gap-6, mb-8, py-12, space-y-16, mt-20)

**Container Strategy:**
- Quiz screens: max-w-4xl mx-auto (centered, readable width)
- Mobile padding: px-4 sm:px-6
- Vertical rhythm: py-8 md:py-12 for sections

**Grid Patterns:**
- Answer grid: grid-cols-1 md:grid-cols-2 gap-4 (2-column on desktop, stack on mobile)
- Leaderboard: Single column with dividers

### D. Component Library

**Start Screen:**
- Large hero section with gradient background (purple to blue diagonal)
- App logo/icon (stylized brain or lightbulb icon from Heroicons)
- Bold title "QuizPL" with tagline "Test Your Knowledge"
- Large primary button "Start Quiz" (rounded-full, px-12 py-4)
- Stats preview: Total questions badge, Time limit indicator

**Quiz Question Screen:**
- Top bar: Progress bar (fills left to right), Question number (e.g., "3/10")
- Timer: Circular progress indicator (20s countdown) - top right, color shifts from blue→orange→red
- Question card: White/dark elevated card with shadow-lg, rounded-2xl, p-8
- Answer options: 4 cards in grid, rounded-xl, border-2, hover states, active state on select
- Each answer: Icon (A/B/C/D letter badge), answer text, checkmark/x icon on reveal

**Feedback States:**
- Correct answer: Green border-2, bg-green-50 (light) / bg-green-900/20 (dark), scale animation
- Incorrect answer: Red border-2, bg-red-50 / bg-red-900/20, shake animation
- Disabled answers: opacity-50, cursor-not-allowed after selection

**Results/Ranking Screen:**
- Score display: Large circular progress (percentage), animated count-up
- Performance badge: Icon + label (e.g., "Quiz Master!", "Nice Try!", "Keep Going!")
- Ranking card: Position indicator with medal icons (🥇🥈🥉)
- Stats breakdown: Correct/Incorrect count, Time taken, Accuracy percentage
- Action buttons: "Play Again" (primary), "Share Score" (outline)

**Timer Component:**
- Circular SVG progress ring
- Countdown number in center (text-2xl font-mono)
- Color transitions: blue (20-10s) → orange (10-5s) → red (5-0s) with pulse animation
- Audio cue consideration (placeholder comment for warning beep)

### E. Animations & Interactions

**Question Transitions:**
- Slide-in from right (new question appears)
- Fade-out (previous question exits)
- Duration: 300ms ease-in-out

**Timer Animations:**
- Smooth circular progress countdown
- Pulse effect when <5 seconds remaining
- Shake animation when time expires

**Answer Selection:**
- Hover: scale-105, shadow-md
- Selected: border-primary, bg-primary/5
- Reveal: 500ms delay, correct/incorrect state transition

**Score Screen:**
- Number count-up animation (0 to final score)
- Confetti effect for high scores (>80%)
- Stagger animation for stats (each stat appears sequentially)

---

## Visual Enhancements

**Icons:** Heroicons for all UI elements (timer, checkmark, x-mark, trophy, play, replay icons)

**Gradients:**
- Start screen background: `bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500`
- Button hovers: Slight opacity shift
- Timer warning: Gradient pulse effect

**Shadows & Depth:**
- Cards: shadow-lg for elevation
- Active cards: shadow-xl
- Floating elements: shadow-2xl

**Illustrations/Graphics:**
- Hero section: Abstract quiz/brain illustration or pattern background
- Empty states: Friendly "no questions" illustration
- Success states: Trophy or star burst graphics

---

## Mobile Optimization

- Touch targets: Minimum 44x44px (all buttons, answers)
- Font sizes: Scale down 1 step on mobile (text-3xl → text-2xl)
- Single column layout for all screens <768px
- Bottom sheet pattern for results (slide up animation)
- Thumb-friendly positioning: Primary actions in lower third of screen

---

## Key Design Principles

1. **Instant Feedback**: Every action has immediate visual response
2. **Progress Clarity**: Always show where user is in quiz journey
3. **Gamification**: Use colors, animations, badges to create excitement
4. **Accessibility**: High contrast ratios (4.5:1 minimum), clear focus states
5. **Performance**: Smooth 60fps animations, minimal layout shifts