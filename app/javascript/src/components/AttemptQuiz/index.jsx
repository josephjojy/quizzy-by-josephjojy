import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { useParams } from "react-router-dom";

import Login from "./Login";

import quizzesApi from "../../apis/quizzes";

const AttemptQuiz = () => {
  const { slug } = useParams();
  const [quizName, setQuizName] = useState("");
  const [userId, setUserId] = useState();

  const fetchQuizSlug = async () => {
    try {
      const response = await quizzesApi.showSlug(slug);
      setQuizName(response.data.quiz);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizSlug();
  }, []);

  return <>{!userId && <Login quizName={quizName} setUserId={setUserId} />}</>;
};

export default AttemptQuiz;
