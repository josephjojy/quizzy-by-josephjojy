import axios from "axios";

const create = payload => axios.post("/quizzes", payload);

const index = () => axios.get("/quizzes");

const destroy = id => axios.delete(`/quizzes/${id}`);

const update = (id, payload) => axios.put(`/quizzes/${id}`, payload);

const show = id => axios.get(`/quizzes/${id}`);

const setSlug = id => axios.get(`/quizzes/setSlug/${id}`);

const showSlug = slug => axios.get(`/quizzes/showSlug/${slug}`);

const quizzesApi = {
  index,
  create,
  destroy,
  update,
  show,
  setSlug,
  showSlug,
};

export default quizzesApi;
