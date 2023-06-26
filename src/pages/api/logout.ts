// import Cookies from 'cookies';
// import type { NextApiRequest, NextApiResponse } from 'next';

// type Data = {
//   success: boolean;
// };

// export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   if (req.method !== 'POST') {
//     return res.status(404).json({ success: false });
//   }

//   const cookies = new Cookies(req, res);
//   cookies.set('access_token');

//   res.status(200).json({ success: true });
// }
