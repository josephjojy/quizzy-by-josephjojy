import React from "react";

import { useParams } from "react-router-dom";

const CheckQuiz = () => {
  const { slug } = useParams();
  return <div>{slug}</div>;
};

export default CheckQuiz;
