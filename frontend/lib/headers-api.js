import http from "./http";

const getAll = () => {
  return http.get("/headers");
};

const get = (id) => {
  return http.get(`/headers/${id}`);
};

const create = (data) => {
  return http.post("/headers", data);
};

const update = (id, data) => {
  return http.put(`/headers/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/headers/${id}`);
};

const removeAll = () => {
  return http.delete(`/headers`);
};

const findByTitle = (title) => {
  return http.get(`/headers?title=${title}`);
};

const findByActive = () => {
  return http.get(`/headers?active=1`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  findByActive,
};
