import React, { useState, useEffect } from "react";

import { Typography, Radio, Button } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import attemptsApi from "../../apis/attempts";

const Quiz = ({ attemptId, attemptQuiz, userId, fetchQuizSlug }) => {
  const [answer, setAnswer] = useState({});
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();

    const result = Object.keys(answer).map(key => ({
      question_id: key,
      option_id: answer[key],
    }));

    try {
      await attemptsApi.update(attemptId, {
        attempt: {
          user_id: userId,
          quiz_id: attemptQuiz.id,
          submitted: true,
          attempt_answers_attributes: result,
        },
      });
      window.location.assign(`/public/${slug}/attempt/${attemptId}/result`);
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleChange = async event => {
    const result = {
      ...answer,
      [event.target.name]: event.target.id,
    };
    setAnswer(result);
  };

  useEffect(() => {
    fetchQuizSlug();
  }, [userId]);

  return (
    <div className=" max-w-screen-md pl-10 pb-10">
      <form
        onSubmit={event => {
          handleSubmit(event);
        }}
      >
        <Typography className="ml-10 mt-5" style="h1">
          {attemptQuiz.name}
        </Typography>
        {attemptQuiz.questions?.map((Q, index) => {
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
                        id={O.id}
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
