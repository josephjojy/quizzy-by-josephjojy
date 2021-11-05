import React, { useState } from "react";

import AddQuiz from "./AddQuiz";
import QuizList from "./QuizList";

const Dashboard = () => {
  const [addQuiz, setAddQuiz] = useState(false);

  return (
    <div>
      {addQuiz ? (
        <AddQuiz setAddQuiz={setAddQuiz} />
      ) : (
        <QuizList setAddQuiz={setAddQuiz} />
      )}
    </div>
  );
};

export default Dashboard;
