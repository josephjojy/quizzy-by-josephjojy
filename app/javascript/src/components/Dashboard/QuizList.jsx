import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";

import QuizListTable from "./QuizListTable";

import quizzesApi from "../../apis/quizzes";

const QuizList = ({ setAddQuiz }) => {
  const [quizList, setQuizList] = useState([]);
  const fetchQuiz = async () => {
    const response = await quizzesApi.index();
    const data = await response.data;
    setQuizList(data.quiz);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className=" h-full">
      <div className="w-full flex justify-end pr-8 pt-8">
        <Button
          label="Add new quiz"
          size="large"
          icon={() => <Plus />}
          iconPosition="left"
          onClick={() => setAddQuiz(true)}
        />
      </div>
      {quizList ? (
        <QuizListTable quizList={quizList} />
      ) : (
        <div className="flex items-center justify-center h-64">
          <Typography> You have not created any quiz. </Typography>
        </div>
      )}
    </div>
  );
};

export default QuizList;
