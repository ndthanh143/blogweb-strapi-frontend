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
    'Content-Type': 'application/json; charset=utf-8',
  },
  responseType: 'arraybuffer',
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
    const contentType = response.headers['content-type'];
    let decodedData;

    if (contentType.includes('charset=GB2312')) {
      const buffer = Buffer.from(response.data, 'binary');
      const decodedString = iconv.decode(buffer, 'gb2312');
      decodedData = JSON.parse(decodedString);
    } else {
      const decodedString = iconv.decode(response.data, 'utf-8');
      decodedData = JSON.parse(decodedString);
    }
    return response;
  },

  function (error) {
    return Promise.reject(error);
  },
);
