import axios from "axios";

const create = payload => axios.post("/quizzes", payload);

const index = () => axios.get("/quizzes");

const quizzesApi = {
  index,
  create,
};

export default quizzesApi;
