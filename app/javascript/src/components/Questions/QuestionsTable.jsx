import React, { useState } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import questionsApi from "../../apis/questions";
import DeleteModal from "../Common/DeleteModal";

const QuestionsTable = ({ ques, fetchQuizDetails }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteQuiz, setDeleteQuiz] = useState(0);
  const { id } = useParams();
  const handleDelete = async id => {
    try {
      await questionsApi.destroy(id);
      fetchQuizDetails();
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleEdit = quesId => {
    window.location.assign(`/quiz/${id}/question/${quesId}/edit`);
  };

  const style = {
    display: "grid",
    gridTemplateColumns: "20% 80%",
    gridAutoFlow: "row",
  };
  return (
    <div>
      <DeleteModal
        deleteQuiz={deleteQuiz}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleDelete={handleDelete}
      />
      {ques.map((Q, index) => {
        return (
          <div
            key={index}
            style={style}
            className=" max-w-screen-md pl-20 py-10"
          >
            <Typography style="h3">Question {index + 1}</Typography>
            <Typography style="h3">
              {Q.content}
              <Button
                className="ml-20"
                label="Edit"
                onClick={() => {
                  handleEdit(Q.id);
                }}
                style="secondary"
                icon={Edit}
                iconPosition="left"
              />
              <Button
                className="ml-2"
                label="Delete"
                onClick={() => {
                  setDeleteQuiz(Q.id);
                  setDeleteModal(true);
                }}
                style="danger"
                icon={Delete}
                iconPosition="left"
              />
            </Typography>
            {Q.options.map((O, optionsIndex) => {
              return (
                <>
                  <Typography style="body1">
                    Option {optionsIndex + 1}
                  </Typography>
                  {O.answer ? (
                    <Typography style="body1" className="text-green-400">
                      {O.content} &#9989; Correct Answer
                    </Typography>
                  ) : (
                    <Typography>{O.content}</Typography>
                  )}
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsTable;
