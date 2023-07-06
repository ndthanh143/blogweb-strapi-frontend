import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import axios from 'axios';
import { Card } from '@/components';
import { ArticlesResponse } from '@/services/article/article.dto';
import { Router, useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
  Router: jest.fn(),
}));

describe('Card component', () => {
  test('should render correctly', async () => {
    const { data } = await axios.get<ArticlesResponse>('https://blogsite-backend-6e79.onrender.com/api/articles', {
      params: { populate: '*' },
    });
    const article = data.data[0].attributes;

    const component = renderer.create(
      <Card
        title={article.title}
        thumbnail={article.thumbnail}
        slug={article.slug}
        category={article.category}
        author={article.author}
        publishedAt={article.publishedAt}
      />,
    );
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
