import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button, PageLoader } from "@bigbinary/neetoui/v2";
import { isNil } from "ramda";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import quizzesApi from "../../apis/quizzes";
import QuestionsTable from "../Questions/QuestionsTable";

const ShowQuiz = () => {
  const { id } = useParams();
  const [quizName, setQuizName] = useState("");
  const [ques, setQues] = useState([]);
  const [slug, setSlug] = useState([]);
  const [loading, setLoading] = useState(true);

  const createSlug = async () => {
    try {
      const response = await quizzesApi.setSlug(id);
      await setSlug(response.data.quiz);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      const { quiz } = await response.data;
      setQues(quiz.questions);
      setQuizName(quiz.name);
      setSlug(quiz.slug);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (loading) {
    return (
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
        <PageLoader />
      </div>
    );
  }

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
        {ques.length > 0 && isNil(slug) && (
          <Button
            className="ml-8"
            label="Publish"
            size="large"
            icon={() => <Plus />}
            iconPosition="left"
            onClick={createSlug}
          />
        )}
      </div>
      <div>
        <Typography weight="extrabold" className="ml-20" style="h1">
          {quizName}

          {slug && (
            <Typography>
              Published, your public link is -{" "}
              <Link
                to={`/public/${slug}`}
                target="_blank"
                className="text-blue-400"
              >
                {`${window.location.origin}/public/${slug}`}
              </Link>
            </Typography>
          )}
        </Typography>
      </div>
      {ques.length ? (
        <QuestionsTable ques={ques} fetchQuizDetails={fetchQuizDetails} />
      ) : (
        <div className="flex items-center justify-center h-64">
          <Typography> You have not created any questions. </Typography>
        </div>
      )}
    </div>
  );
};

export default ShowQuiz;
