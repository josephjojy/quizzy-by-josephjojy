import React, { useState } from "react";

import { Typography, Radio, Button } from "@bigbinary/neetoui/v2";

const Quiz = ({ quizName, userId, questions }) => {
  const [answer, setAnswer] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();
    userId;
  };

  const handleChange = async event => {
    const result = {
      ...answer,
      [event.target.name]: event.target.value,
    };
    setAnswer(result);
  };
  return (
    <div className=" max-w-screen-md pl-10 ">
      <form
        onSubmit={event => {
          handleSubmit(event);
        }}
      >
        <Typography className="ml-10 mt-5" style="h1">
          {quizName}
        </Typography>
        {questions.map((Q, index) => {
          return (
            <div
              key={index}
              className="py-10 m-10 pl-4 shadow-lg space-y-5 border-grey-100 border-8"
              onChange={event => handleChange(event)}
            >
              <Typography style="h2" className="bg-gray-300 py-2 px-2">
                Question {index + 1}
              </Typography>
              <Typography style="h3" className="px-4">
                {Q.content}
              </Typography>
              {Q.options.map((O, optionsIndex) => {
                return (
                  <>
                    <Radio key={optionsIndex} stacked>
                      <Radio.Item
                        label={<span className="font-black">{O.content}</span>}
                        value={O.content}
                        name={Q.id}
                      />
                    </Radio>
                  </>
                );
              })}
            </div>
          );
        })}
        <Button type="submit" label="Submit" size="large" className="mx-10" />
      </form>
    </div>
  );
};

export default Quiz;
