import React, { useState, useEffect } from "react";

import { Delete, Plus } from "@bigbinary/neeto-icons";
import { Input, Button, Typography, Select } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

import quizzesApi from "../../apis/quizzes";

const QuestionForm = () => {
  const [quizName, setQuizName] = useState("");
  const [optionsObject, setOptionsObject] = useState([]);
  const [numberOfOptions, setNumberOfOptions] = useState(2);
  const [questionName, setQuestionName] = useState("");
  const [correct, setCorrect] = useState();
  const { id } = useParams();

  const fetchQuizDetails = async () => {
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

  const handleSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div className="w-2/4">
      <Typography className="ml-5 mt-10" style="h1">
        {quizName}
      </Typography>
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-around mt-10 ">
          <span className="">Question</span>
          <Input
            placeholder="Enter the Question"
            className="w-2/4 ml-12"
            value={questionName}
            onChange={e => setQuestionName(e.target.value)}
          />
        </div>
        {Array(numberOfOptions)
          .fill()
          .map((_, index) => (
            <div key={index} className="w-full flex justify-around mt-10 ">
              <span className="mt-2">{`Option ${index + 1}`}</span>
              <div className="w-3/4 flex justify-between">
                <div className="w-11/12">
                  <Input
                    value={optionsObject[index]?.value}
                    onChange={e => handleOption(e, index)}
                  />
                </div>
                <div className="max-h-4 mt-1">
                  {numberOfOptions > 2 && index > 1 && (
                    <Button
                      icon={Delete}
                      onClick={e => handleDelete(e, index)}
                    ></Button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {numberOfOptions < 4 && (
        <Button
          icon={() => <Plus />}
          iconPosition="left"
          label="Add Options"
          className="mt-10 ml-32"
          onClick={() => setNumberOfOptions(prev => prev + 1)}
        />
      )}
      <div className=" w-11/12 flex items-center mt-16">
        <div className="ml-5">Correct Answer</div>
        <div className="w-11/12 ml-6">
          <form onSubmit={handleSubmit}>
            <Select
              value={correct}
              isClearable
              isSearchable
              name="ValueList"
              options={optionsObject}
              placeholder="Select an Option"
              onChange={e => setCorrect(e)}
            />
            <Button label="Submit" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
