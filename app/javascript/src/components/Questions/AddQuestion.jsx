import React, { useState } from "react";

import Logger from "js-logger";
import { useParams } from "react-router";

import QuestionForm from "./QuestionForm";

import questionsApi from "../../apis/questions";

const AddQuestion = () => {
  const [optionsObject, setOptionsObject] = useState([]);
  const [numberOfOptions, setNumberOfOptions] = useState(2);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState();
  const { id } = useParams();

  const handleDelete = (e, index) => {
    const data = optionsObject;
    data.splice(index, 1);
    setOptionsObject([...data]);
    setNumberOfOptions(prev => prev - 1);
    setCorrect("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
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
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddQuestion;
