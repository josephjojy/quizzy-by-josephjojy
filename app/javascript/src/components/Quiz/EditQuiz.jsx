import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import QuizForm from "./QuizForm";

import quizzesApi from "../../apis/quizzes";
import { TOASTR_OPTIONS } from "../../constants";

const EditQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const { id } = useParams();

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

  const handleSubmit = async event => {
    event.preventDefault();
    setQuizName(quizName.trim());
    if (quizName.trim()) {
      try {
        await quizzesApi.update(id, {
          quiz: { name: quizName },
        });
        window.location.assign("/");
      } catch (error) {
        logger.error(error);
      }
    } else toast.error("Quiz Name can't be blank", TOASTR_OPTIONS);
  };

  return (
    <QuizForm
      title="Edit"
      handleSubmit={handleSubmit}
      quizName={quizName}
      setQuizName={setQuizName}
    />
  );
};

export default EditQuiz;
