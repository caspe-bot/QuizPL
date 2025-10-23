import React from "react";
import { useNavigate } from "react-router-dom";

const QuizScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Quiz In Progress</h2>
      <p>Questions will appear here...</p>
      <button onClick={() => navigate("/results")}>Finish Quiz</button>
    </div>
  );
};

export default QuizScreen;
