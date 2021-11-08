import React from "react";

import { Typography, Button, Input } from "@bigbinary/neetoui/v2";

const QuizForm = ({ title, handleSubmit, quizName, setQuizName }) => {
  return (
    <div className=" h-full">
      <div className="pl-16 pt-16 ml-24">
        <Typography style="h2">{title} quiz</Typography>
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
                  window.location.assign("/");
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
