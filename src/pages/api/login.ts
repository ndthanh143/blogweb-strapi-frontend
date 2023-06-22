import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import { ProxyResCallback } from 'http-proxy';

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  token?: string;
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method != 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  return new Promise(() => {
    req.headers.cookie = '';

    const handleLoginResponse: ProxyResCallback = (proxyResponse, req, res) => {
      let apiResponseBody = '';

      proxyResponse.on('data', (chunk) => {
        apiResponseBody += chunk;
      });

      proxyResponse.on('end', () => {
        console.log('hahahaha', apiResponseBody);
        try {
          const sanitizedString = apiResponseBody.replace(/[\u0000-\u001F\u0080-\u009F]/g, '');

          const data = JSON.parse(sanitizedString);

          console.log('data', data);

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

    const handleProxyInit = (proxy: any) => {
      proxy.on('proxyRes', handleLoginResponse);
    };

    httpProxyMiddleware(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      pathRewrite: [
        {
          patternStr: '^/api/login',
          replaceStr: '/api/auth/local',
        },
      ],
      selfHandleResponse: true,
      changeOrigin: true,
      onProxyInit: handleProxyInit,
    });
  });
}
