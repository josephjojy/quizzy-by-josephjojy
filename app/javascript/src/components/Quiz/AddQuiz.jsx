import React, { useState } from "react";

import { toast } from "react-toastify";

import QuizForm from "./QuizForm";

import quizzesApi from "../../apis/quizzes";
import { TOASTR_OPTIONS } from "../../constants";

const AddQuiz = () => {
  const [quizName, setQuizName] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    setQuizName(quizName.trim());
    if (quizName.trim()) {
      try {
        await quizzesApi.create({
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
      title="Add new"
      handleSubmit={handleSubmit}
      quizName={quizName}
      setQuizName={setQuizName}
    />
  );
};

export default AddQuiz;
