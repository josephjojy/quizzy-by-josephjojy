import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

import QuizListTable from "./QuizListTable";

import quizzesApi from "../../apis/quizzes";

const QuizList = () => {
  const [quizList, setQuizList] = useState([]);
  const fetchQuiz = async () => {
    const response = await quizzesApi.index();
    await setQuizList(response.data.quiz);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className=" h-full">
      <div className="w-full flex justify-end pr-8 pt-8">
        <Link to="/quiz/create">
          <Button
            label="Add new quiz"
            size="large"
            icon={() => <Plus />}
            iconPosition="left"
          />
        </Link>
      </div>
      {quizList.length ? (
        <QuizListTable quizList={quizList} fetchQuiz={fetchQuiz} />
      ) : (
        <div className="flex items-center justify-center h-64">
          <Typography> You have not created any quiz. </Typography>
        </div>
      )}
    </div>
  );
};

export default QuizList;
