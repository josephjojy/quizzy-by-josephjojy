import React, { useState, useEffect } from "react";

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
  attemptId;

  const fetchQuizSlug = async () => {
    try {
      const response = await quizzesApi.showSlug(slug);
      const { quiz } = await response.data;
      await setAttemptQuiz(quiz);
    } catch (error) {
      Logger.error(error);
    }
  };
  useEffect(() => {
    fetchQuizSlug();
  }, []);

  return (
    <>
      {userId ? (
        <Quiz attemptId={attemptId} attemptQuiz={attemptQuiz} userId={userId} />
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
