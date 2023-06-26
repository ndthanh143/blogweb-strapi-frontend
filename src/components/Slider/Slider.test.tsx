import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { Slider } from '.';
import axios from 'axios';
import { ArticlesResponse } from '@/services/article/article.dto';

describe('Slider component', () => {
  test('should render correctly', async () => {
    const { data } = await axios.get<ArticlesResponse>('https://blogsite-backend-6e79.onrender.com/api/articles', {
      params: { populate: '*' },
    });

    const component = renderer.create(<Slider data={data.data} />);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
