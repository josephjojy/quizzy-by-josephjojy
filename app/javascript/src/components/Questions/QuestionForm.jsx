import React, { useState, useEffect } from "react";

import { Delete, Plus } from "@bigbinary/neeto-icons";
import { Input, Button, Typography, Select } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useParams } from "react-router";

import questionsApi from "../../apis/questions";
import quizzesApi from "../../apis/quizzes";

const QuestionForm = () => {
  const [quizName, setQuizName] = useState("");
  const [optionsObject, setOptionsObject] = useState([]);
  const [numberOfOptions, setNumberOfOptions] = useState(2);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState();
  const { id } = useParams();

  const style = {
    display: "grid",
    gridTemplateColumns: "10% 40% 50%",
    gridAutoFlow: "row",
  };

  const fetchQuizName = async () => {
    const response = await quizzesApi.show(id);
    const data = await response.data;
    setQuizName(data.quiz.name);
  };

  const handleOption = (e, index) => {
    const data = optionsObject;
    data[index] = {
      label: e.target.value,
      value: e.target.value,
      answer: false,
    };
    setOptionsObject([...data]);
  };

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

  useEffect(() => {
    fetchQuizName();
  }, []);

  return (
    <div className="">
      <Typography className="ml-5 mt-10" style="h1">
        {quizName}
      </Typography>
      <form
        className=" space-y-5 space-x-5 w-10/12"
        style={style}
        onSubmit={handleSubmit}
      >
        <span className="mt-5 ml-5">Question</span>
        <Input
          required
          placeholder="Enter the Question"
          className=""
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <div></div>
        {Array(numberOfOptions)
          .fill()
          .map((_, index) => (
            <>
              <span className="">{`Option ${index + 1}`}</span>
              <div className="flex space-x-3">
                <Input
                  required
                  value={optionsObject[index]?.value}
                  onChange={e => handleOption(e, index)}
                />
              </div>
              {numberOfOptions > 2 && index > 1 ? (
                <Button
                  className="justify-self-start"
                  icon={Delete}
                  onClick={e => handleDelete(e, index)}
                ></Button>
              ) : (
                <div></div>
              )}
            </>
          ))}
        <div></div>
        {numberOfOptions < 4 ? (
          <Button
            icon={() => <Plus />}
            iconPosition="left"
            label="Add Options"
            className="justify-self-start"
            onClick={() => setNumberOfOptions(prev => prev + 1)}
          />
        ) : (
          <div></div>
        )}
        <div></div>
        <div className="">Correct Answer</div>
        <div>
          <Select
            value={correct}
            isClearable
            isSearchable
            options={optionsObject}
            placeholder="Select an Option"
            onChange={e => setCorrect(e)}
            required
          />
          <Button label="Submit" type="submit" className="mt-4" size="large" />
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
