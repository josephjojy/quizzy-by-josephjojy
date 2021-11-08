import React, { useState } from "react";

import { Typography, Button, Input } from "@bigbinary/neetoui/v2";
import { toast } from "react-toastify";

import quizzesApi from "../../apis/quizzes";
import { TOASTR_OPTIONS } from "../../constants";

const AddQuiz = ({
  setAddQuiz,
  editQuiz,
  setEditQuiz,
  quizTitle,
  setQuizTitle,
}) => {
  const [quizName, setQuizName] = useState(quizTitle);

  const handleSubmit = async event => {
    event.preventDefault();
    setQuizTitle("");
    setQuizName(quizName.trim());
    if (quizName.trim()) {
      try {
        if (editQuiz) {
          await quizzesApi.update(editQuiz, {
            quiz: { name: quizName },
          });
        } else {
          await quizzesApi.create({
            quiz: { name: quizName },
          });
        }
        setAddQuiz(false);
        setEditQuiz(false);
      } catch (error) {
        logger.error(error);
      }
    } else toast.error("Quiz Name can't be blank", TOASTR_OPTIONS);
  };

  return (
    <div className=" h-full">
      <div className="pl-16 pt-16 ml-24">
        <Typography style="h2">{editQuiz ? "Edit" : "Add new"} quiz</Typography>
        <div className="max-w-lg">
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="flex">
              <p className="flex items-center pr-8 font-bold">Quiz Name</p>
              <Input
                type="text"
                value={quizName}
                onChange={e => setQuizName(e.target.value)}
              />
            </div>
            <div className="mt-4 ml-24 pl-2 ">
              <Button
                className="ml-1"
                type="submit"
                size="large"
                label="Submit"
              />
              <Button
                className="ml-4"
                style="secondary"
                size="large"
                label="Cancel"
                onClick={() => {
                  setAddQuiz(false);
                  setEditQuiz(false);
                  setQuizTitle("");
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
