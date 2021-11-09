import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import quizzesApi from "../../apis/quizzes";

const ShowQuiz = () => {
  const { id } = useParams();
  const [quizName, setQuizName] = useState("");

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      const { quiz } = response.data;
      setQuizName(quiz.name);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div className=" h-full">
      <div className="w-full flex justify-end pr-8 pt-8">
        <Link to="#">
          <Button
            label="Add new question"
            size="large"
            icon={() => <Plus />}
            iconPosition="left"
          />
        </Link>
      </div>
      <div>
        <Typography weight="extrabold" className="ml-20" style="h1">
          {quizName}
        </Typography>
      </div>
      <div className="flex items-center justify-center h-64">
        <Typography> You have not created any questions. </Typography>
      </div>
    </div>
  );
};

export default ShowQuiz;
