import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import attemptsApi from "../../apis/attempts";
import quizzesApi from "../../apis/quizzes";

const Result = () => {
  const { slug, attemptId } = useParams();
  const [attemptQuiz, setAttemptQuiz] = useState();
  const [attemptAns, setAttemptAns] = useState();

  const fetchAttempt = async () => {
    try {
      const response = await attemptsApi.show(attemptId);
      const { attempt } = await response.data;
      setAttemptAns(attempt.attempt_answers);
    } catch (error) {
      Logger.error(error);
    }
  };

  const fetchAnswer = async () => {
    try {
      const response = await quizzesApi.showAnswer(slug);
      const { quiz } = await response.data;
      await setAttemptQuiz(quiz);
    } catch (error) {
      Logger.error(error);
    }
  };

  const computeResult = () => {
    let count = 0;
    attemptQuiz?.questions.map(Q => {
      Q.options.map(O => {
        const ans = attemptAns?.find(attempt => attempt.option_id === O.id)
          ? true
          : false;
        ans && O.answer && count++;
      });
    });
    return count;
  };

  useEffect(() => {
    fetchAnswer();
    fetchAttempt();
  }, []);
  return (
    <div className=" max-w-screen-md pl-10 ">
      <Typography className="ml-10 mt-5" style="h1">
        {attemptQuiz?.name} Quiz
      </Typography>
      <Typography style="h3" className="ml-10 mt-5">
        Thank you for attempt.
        <br />
        Your Result is Correct : {computeResult()} and Incorrect :{" "}
        {attemptQuiz?.questions.length - computeResult()}
      </Typography>

      {attemptQuiz?.questions.map((Q, index) => {
        return (
          <div
            key={index}
            className="py-10 m-10 pl-4 shadow-lg space-y-5 border-grey-100 border-8"
          >
            <Typography style="h2" className="bg-gray-300 py-2 px-2">
              Question {index + 1}
            </Typography>
            <Typography style="h3" className="px-4">
              {Q.content}
            </Typography>
            {Q.options.map((O, optionsIndex) => {
              const ans = attemptAns?.find(
                attempt => attempt.option_id === O.id
              )
                ? true
                : false;
              return (
                <li key={optionsIndex} className={ans && "bg-gray-300"}>
                  {O.content}
                  {O.answer && (
                    <span className="text-green-400 font-bold">
                      {" "}
                      &#9989; Correct Answer
                    </span>
                  )}
                </li>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Result;
