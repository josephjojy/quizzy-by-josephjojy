import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { useParams } from "react-router-dom";

import Login from "./Login";
import Quiz from "./Quiz";

import quizzesApi from "../../apis/quizzes";

const AttemptQuiz = () => {
  const { slug } = useParams();
  const [quizName, setQuizName] = useState("");
  const [userId, setUserId] = useState();
  const [questions, setQuestions] = useState();

  const fetchQuizSlug = async () => {
    try {
      const response = await quizzesApi.showSlug(slug);
      const { quiz } = await response.data;
      setQuestions(quiz.questions);
      setQuizName(quiz.name);
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
        <Quiz quizName={quizName} userId={userId} questions={questions} />
      ) : (
        <Login quizName={quizName} setUserId={setUserId} />
      )}
    </>
  );
};

export default AttemptQuiz;
