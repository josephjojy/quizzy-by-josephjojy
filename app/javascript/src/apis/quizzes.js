import axios from "axios";

const create = payload => axios.post("/quizzes", payload);

const index = () => axios.get("/quizzes");

const destroy = id => axios.delete(`/quizzes/${id}`);

const update = (id, payload) => axios.put(`/quizzes/${id}`, payload);

const show = slug => axios.get(`/quizzes/${slug}`);

const quizzesApi = {
  index,
  create,
  destroy,
  update,
  show,
};

export default quizzesApi;
