import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { Button } from './index';

describe('Button component', () => {
  test('should render correctly', () => {
    const component = renderer.create(<Button variant="solid">Hello</Button>);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
