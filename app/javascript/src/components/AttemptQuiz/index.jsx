import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import Login from "./Login";
import Quiz from "./Quiz";

import quizzesApi from "../../apis/quizzes";

const AttemptQuiz = () => {
  const { slug } = useParams();
  const [userId, setUserId] = useState();
  const [attemptQuiz, setAttemptQuiz] = useState("");
  const [attemptId, setAttemptId] = useState();
  const [loading, setLoading] = useState(true);
  attemptId;

  const fetchQuizSlug = async () => {
    try {
      const response = await quizzesApi.showSlug(slug, userId);
      if (userId) {
        const { quiz } = await response.data;
        setAttemptQuiz(quiz);
      } else setAttemptQuiz(response.data);
      setLoading(false);
    } catch (error) {
      Logger.error(error);
      window.location.assign(`/public/${slug}`);
    }
  };
  useEffect(() => {
    fetchQuizSlug();
  }, []);

  if (loading) {
    return (
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      {userId ? (
        <Quiz
          attemptId={attemptId}
          attemptQuiz={attemptQuiz}
          userId={userId}
          fetchQuizSlug={fetchQuizSlug}
        />
      ) : (
        <Login
          setAttemptId={setAttemptId}
          attemptQuiz={attemptQuiz}
          setUserId={setUserId}
        />
      )}
    </>
  );
};

export default AttemptQuiz;
