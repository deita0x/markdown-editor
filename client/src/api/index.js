import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3333/api/v1/';

const api = axios.create({
  baseURL: BASE_URL
});


api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.resolve({
      ...error.response.data
    });
  }
);

export const getDocuments = async () => await api.get('documents');

export const createDocument = async (title, content) => {
  return await api.post('documents', { title, content });
};

export const readDocument = async (id) => await api.get(`documents/${id}`);

export const updateDocument = async (document) => {
  const { id, title, content } = document;
  return await api.put(`documents/${id}`, { title, content });
};

export const deleteDocument = async (id) => await api.delete(`documents/${id}`);
