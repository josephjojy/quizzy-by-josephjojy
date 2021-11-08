import axios from "axios";

const create = payload => axios.post("/quizzes", payload);

const index = () => axios.get("/quizzes");

const destroy = id => axios.delete(`/quizzes/${id}`);

const quizzesApi = {
  index,
  create,
  destroy,
};

export default quizzesApi;
