// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  message: string;
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  return new Promise((resolve) => {
    // don't forward cookie
    req.headers.cookie = '';

    const handleLoginResponse: ProxyResCallback = (proxyResponse, req, res) => {
      let apiResponseBody = '';
      proxyResponse.on('data', (chunk) => {
        apiResponseBody += chunk;
      });

      proxyResponse.on('end', () => {
        try {
          const data = JSON.parse(apiResponseBody);

          const { jwt } = data;

          if (!jwt) {
            (res as NextApiResponse).status(401).json({ message: 'invalid username or password' });
            return res.end();
          } else {
            const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });

            cookies.set('access_token', jwt, {
              httpOnly: true,
              sameSite: 'lax',
            });
            (res as NextApiResponse).status(200).json({ message: 'login successfully' });
          }
        } catch (error) {
          console.log('error', error);
          (res as NextApiResponse).status(400).json({ error: error });
        }

        return res.end();
      });
    };

    proxy.on('proxyRes', handleLoginResponse);
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      autoRewrite: false,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
