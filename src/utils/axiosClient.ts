import axios from 'axios';

export const axiosServer = axios.create({
  baseURL: `${String(process.env.NEXT_PUBLIC_API_URL)}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
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
