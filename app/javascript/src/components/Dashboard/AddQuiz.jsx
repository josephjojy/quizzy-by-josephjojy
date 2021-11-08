import React, { useState } from "react";

import { Typography, Button, Input } from "@bigbinary/neetoui/v2";
import { toast } from "react-toastify";

import quizzesApi from "../../apis/quizzes";
import { TOASTR_OPTIONS } from "../../constants";
import { getFromLocalStorage } from "../../helpers/storage";

const AddQuiz = ({ setAddQuiz }) => {
  const [quizName, setQuizName] = useState("");

  const userId = getFromLocalStorage("authUserId");

  const handleSubmit = async event => {
    event.preventDefault();
    setQuizName(quizName.trim());
    if (quizName.trim()) {
      try {
        await quizzesApi.create({ quiz: { name: quizName, user_id: userId } });
        setAddQuiz(false);
      } catch (error) {
        logger.error(error);
      }
    } else toast.error("Quiz Name can't be blank", TOASTR_OPTIONS);
  };

  return (
    <div className=" h-full">
      <div className="pl-16 pt-16 ml-24">
        <Typography style="h2"> Add new quiz </Typography>
        <div className="max-w-lg">
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="flex">
              <p className="flex items-center pr-8 font-bold">Quiz Name</p>
              <Input type="text" onChange={e => setQuizName(e.target.value)} />
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
                onClick={() => setAddQuiz(false)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
