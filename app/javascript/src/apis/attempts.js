import axios from "axios";

const create = payload => axios.post("/attempts", payload);

const attemptsApi = {
  create,
};

export default attemptsApi;
