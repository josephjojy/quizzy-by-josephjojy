import React, { useState } from "react";

import Logger from "js-logger";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import QuestionForm from "./QuestionForm";

import questionsApi from "../../apis/questions";
import { TOASTR_OPTIONS } from "../../constants";

const AddQuestion = () => {
  const [optionsObject, setOptionsObject] = useState([]);
  const [numberOfOptions, setNumberOfOptions] = useState(2);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState();
  const { id } = useParams();

  const handleSubmit = async e => {
    e.preventDefault();
    if (correct) {
      let i = optionsObject.findIndex(option => option.label === correct.label);
      const data = optionsObject;
      correct.answer = true;
      data[i] = correct;
      setOptionsObject([...data]);

      const result = optionsObject.map(ele => ({
        content: ele.value,
        answer: ele.answer,
      }));

      try {
        await questionsApi.create({
          question: {
            content: question,
            quiz_id: id,
            options_attributes: result,
          },
        });
      } catch (error) {
        Logger.error(error);
      }
      window.location.assign(`/quiz/${id}/show`);
    } else toast.error(" Select the answer from options", TOASTR_OPTIONS);
  };

  return (
    <QuestionForm
      optionsObject={optionsObject}
      setOptionsObject={setOptionsObject}
      numberOfOptions={numberOfOptions}
      setNumberOfOptions={setNumberOfOptions}
      question={question}
      setQuestion={setQuestion}
      correct={correct}
      setCorrect={setCorrect}
      id={id}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddQuestion;
