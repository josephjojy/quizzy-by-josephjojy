import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import quizzesApi from "../../apis/quizzes";
import QuestionsTable from "../Questions/QuestionsTable";

const ShowQuiz = () => {
  const { id } = useParams();
  const [quizName, setQuizName] = useState("");
  const [ques, setQues] = useState([]);

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      const { quiz } = response.data;
      setQues(quiz.questions);
      setQuizName(quiz.name);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div>
      <div className="w-full flex justify-end pr-8 pt-8">
        <Link to={`/question/${id}/create`}>
          <Button
            label="Add new question"
            size="large"
            icon={() => <Plus />}
            iconPosition="left"
          />
        </Link>
        {ques.length > 0 && (
          <Link to={`#`}>
            <Button
              className="ml-8"
              label="Publish"
              size="large"
              icon={() => <Plus />}
              iconPosition="left"
            />
          </Link>
        )}
      </div>
      <div>
        <Typography weight="extrabold" className="ml-20" style="h1">
          {quizName}
        </Typography>
      </div>
      {ques.length ? (
        <QuestionsTable ques={ques} />
      ) : (
        <div className="flex items-center justify-center h-64">
          <Typography> You have not created any questions. </Typography>
        </div>
      )}
    </div>
  );
};

export default ShowQuiz;
