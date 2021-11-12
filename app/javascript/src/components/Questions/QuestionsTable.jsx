import React from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";

const QuestionsTable = ({ ques }) => {
  const style = {
    display: "grid",
    gridTemplateColumns: "20% 80%",
    gridAutoFlow: "row",
  };
  return (
    <div>
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
                onClick={() => {}}
                style="secondary"
                icon={Edit}
                iconPosition="left"
              />
              <Button
                className="ml-2"
                label="Delete"
                onClick={() => {}}
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
