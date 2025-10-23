import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div style={{ padding: "2rem" }}>
    <h1>Welcome to QuizPL</h1>
    <Link to="/start">Start Quiz</Link>
  </div>
);

export default Home;
