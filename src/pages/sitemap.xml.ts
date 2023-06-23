import { BaseResponseData } from '@/dtos/base';
import { Article } from '@/services/article/article.dto';
import { getArticlesAPI } from '@/services/article/article.service';
import { NextApiResponse } from 'next';

function generateSiteMap(posts: BaseResponseData<Article>[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://jsonplaceholder.typicode.com</loc>
     </url>
     <url>
       <loc>https://jsonplaceholder.typicode.com/guide</loc>
     </url>
     ${posts
       .map((item) => {
         return `
       <url>
           <loc>${`${process.env.NEXT_PUBLIC_API_URL}/${item.attributes.slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(res: NextApiResponse) {
  // We make an API call to gather the URLs for our site
  const { data } = await getArticlesAPI();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
