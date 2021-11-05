import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";

const QuizList = () => {
  return (
    <div className=" h-full">
      <div className="w-full flex justify-end pr-8 pt-8">
        <Button
          label="Add new quiz"
          size="large"
          icon={() => <Plus />}
          iconPosition="left"
        />
      </div>
      <div className="flex items-center justify-center h-64">
        <Typography> You have not created any quiz. </Typography>
      </div>
    </div>
  );
};

export default QuizList;
