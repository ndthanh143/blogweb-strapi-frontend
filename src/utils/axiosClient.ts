import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const accessToken = Cookies.get('access_token');

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${accessToken}`,
};

export const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers,
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
