import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { Input } from '.';

describe('Input component', () => {
  test('should render correctly', () => {
    const component = renderer.create(<Input type="text" defaultValue="type here..." />);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
