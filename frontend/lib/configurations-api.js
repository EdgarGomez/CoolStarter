import http from "./http";

const getAll = () => {
  return http.get("/configurations");
};

const get = (id) => {
  return http.get(`/configurations/${id}`);
};

const create = (data) => {
  return http.post("/configurations", data);
};

const update = (id, data) => {
  return http.put(`/configurations/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/configurations/${id}`);
};

const removeAll = () => {
  return http.delete(`/configurations`);
};

const findById = (id) => {
  return http.get(`/configurations?id=${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findById,
};
