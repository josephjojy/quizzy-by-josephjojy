import axios from "axios";

const create = payload => axios.post("/users", payload);

const exportReport = () => axios.get("/users/export/report");

const exportStatus = job_id => axios.get(`/users/export/status/${job_id}`);

const exportDownload = job_id => axios.get(`/users/export/download/${job_id}`);

const usersApi = {
  create,
  exportReport,
  exportStatus,
  exportDownload,
};

export default usersApi;
