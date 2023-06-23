import axios from 'axios';

export const axiosServer = axios.create({
  baseURL: `${String(process.env.NEXT_PUBLIC_API_URL)}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 15000,
});

axiosServer.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    return Promise.reject(error);
  },
);
