import axios from "axios";

const create = payload => axios.post("/attempts", payload);

const update = (id, payload) => axios.put(`/attempts/${id}`, payload);

const show = id => axios.get(`/attempts/${id}`);

const attemptsApi = {
  create,
  update,
  show,
};

export default attemptsApi;
