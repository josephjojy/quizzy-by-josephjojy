import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import QuestionForm from "./QuestionForm";

import questionsApi from "../../apis/questions";
import quizzesApi from "../../apis/quizzes";
import { TOASTR_OPTIONS } from "../../constants";

const EditQuestion = () => {
  const [optionsObject, setOptionsObject] = useState([]);
  const [numberOfOptions, setNumberOfOptions] = useState(2);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState();
  const { id, quesId } = useParams();

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      const quiz = await response.data.quiz.questions;
      const result = quiz.find(Q => Q.id == quesId);
      const res = result.options.map(ele => ({
        value: ele.content,
        label: ele.content,
        answer: ele.answer,
        id: ele.id,
      }));
      setOptionsObject(res);
      setNumberOfOptions(result.options.length);
      setQuestion(result.content);
      setCorrect(res.find(O => O.answer));
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  const handleDelete = (e, index) => {
    const data = optionsObject;
    const deleteEle = { id: data[index].id, _destroy: "1", answer: false };
    data.splice(index, 1);
    data.push(deleteEle);
    setOptionsObject([...data]);
    setNumberOfOptions(prev => prev - 1);
    setCorrect("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (correct) {
      let i = optionsObject.findIndex(option => option.label === correct.label);
      let j = optionsObject.findIndex(option => option.answer);
      const data = optionsObject;
      if (j >= 0) data[j].answer = false;
      data[i].answer = true;
      setOptionsObject([...data]);
      const result = optionsObject.map(ele => ({
        content: ele.value,
        answer: ele.answer,
        id: ele.id,
        _destroy: ele._destroy,
      }));

      try {
        await questionsApi.update(quesId, {
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
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditQuestion;
