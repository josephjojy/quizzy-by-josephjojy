import axios from "axios";

const create = payload => axios.post("/questions", payload);

const destroy = id => axios.delete(`/questions/${id}`);

const update = (id, payload) => axios.put(`/questions/${id}`, payload);

const questionsApi = {
  create,
  destroy,
  update,
};

export default questionsApi;
