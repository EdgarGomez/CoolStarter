import http from "./http";

const getAll = () => {
  return http.get("/pages");
};

const get = (id) => {
  return http.get(`/pages/${id}`);
};

const create = (data) => {
  return http.post("/pages", data);
};

const update = (id, data) => {
  return http.put(`/pages/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/pages/${id}`);
};

const removeAll = () => {
  return http.delete(`/pages`);
};

const findBySlug = (slug) => {
  return http.get(`/pages?slug=${slug}`);
};

const findByTitle = (title) => {
  return http.get(`/pages?title=${title}`);
};

const findByHome = () => {
  return http.get(`/pages?isHome=1`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findBySlug,
  findByTitle,
  findByHome,
};
