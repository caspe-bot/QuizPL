import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartScreen from "./pages/StartScreen";
import QuizScreen from "./pages/QuizScreen";
import ResultsScreen from "./pages/ResultsScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/results" element={<ResultsScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
