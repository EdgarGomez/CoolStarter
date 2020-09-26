import http from "./http";

const getAll = () => {
  return http.get("/upload");
};

const get = (id) => {
  return http.get(`/upload/${id}`);
};

const create = (data) => {
  return http.post("/upload", data);
};

const update = (id, data) => {
  return http.put(`/upload/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/upload/${id}`);
};

const removeAll = () => {
  return http.delete(`/upload`);
};

const findByUrl = (url) => {
  return http.get(`/upload/files?url=${url}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByUrl,
};
