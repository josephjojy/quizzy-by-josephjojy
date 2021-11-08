import React, { useState } from "react";

import AddQuiz from "./AddQuiz";
import QuizList from "./QuizList";

const Dashboard = () => {
  const [addQuiz, setAddQuiz] = useState(false);
  const [editQuiz, setEditQuiz] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  return (
    <div>
      {addQuiz ? (
        <AddQuiz
          setAddQuiz={setAddQuiz}
          editQuiz={editQuiz}
          setEditQuiz={setEditQuiz}
          quizTitle={quizTitle}
          setQuizTitle={setQuizTitle}
        />
      ) : (
        <QuizList
          setAddQuiz={setAddQuiz}
          setEditQuiz={setEditQuiz}
          setQuizTitle={setQuizTitle}
        />
      )}
    </div>
  );
};

export default Dashboard;
