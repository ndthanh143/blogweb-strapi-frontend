import axios from 'axios';
import iconv from 'iconv-lite';

export const axiosServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosClient = axios.create({
  baseURL: '/api',
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
    var ctype: string = response.headers['content-type'];
    response.data = ctype.includes('charset=GB2312')
      ? iconv.decode(response.data, 'gb2312')
      : iconv.decode(response.data, 'utf-8');
    return response;
  },

  function (error) {
    return Promise.reject(error);
  },
);
