import http from "./http";

const getAll = () => {
  return http.get("/authors");
};

const get = (id) => {
  return http.get(`/authors/${id}`);
};

const create = (data) => {
  return http.post("/authors", data);
};

const update = (id, data) => {
  return http.put(`/authors/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/authors/${id}`);
};

const removeAll = () => {
  return http.delete(`/authors`);
};

const findByName = (name) => {
  return http.get(`/authors?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
