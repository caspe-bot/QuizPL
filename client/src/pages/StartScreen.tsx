import React from "react";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Start Screen</h2>
      <button onClick={() => navigate("/quiz")}>Begin Quiz</button>
    </div>
  );
};

export default StartScreen;
