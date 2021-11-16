import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { useParams } from "react-router-dom";

import quizzesApi from "../../apis/quizzes";

const CheckQuiz = () => {
  const { slug } = useParams();
  const [quizName, setQuizName] = useState("");

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

  return (
    <div>
      {quizName.length ? (
        window.location.assign(`/public/${slug}/attempt/new`)
      ) : (
        <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
          Quiz Not Found
        </div>
      )}
    </div>
  );
};

export default CheckQuiz;
