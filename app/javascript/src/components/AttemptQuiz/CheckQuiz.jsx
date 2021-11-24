import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { useParams } from "react-router-dom";

import quizzesApi from "../../apis/quizzes";

const CheckQuiz = () => {
  const { slug } = useParams();
  const [quizValid, setQuizValid] = useState(false);

  const fetchQuizSlug = async () => {
    try {
      await quizzesApi.showSlug(slug);
      setQuizValid(true);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizSlug();
  }, []);

  return (
    <div>
      {quizValid ? (
        window.location.assign(`/public/${slug}/attempt/new`)
      ) : (
        <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full font-extrabold">
          Quiz Not Found
        </div>
      )}
    </div>
  );
};

export default CheckQuiz;
