import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { SwitchMode } from '.';

describe('SwitchMode component', () => {
  test('should render correctly', () => {
    const component = renderer.create(<SwitchMode />);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
