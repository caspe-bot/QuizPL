import React from "react";
import { useNavigate } from "react-router-dom";

const ResultsScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Quiz Results</h2>
      <p>Your score: 100%</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default ResultsScreen;
