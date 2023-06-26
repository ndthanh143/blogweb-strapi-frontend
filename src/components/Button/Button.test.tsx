import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { Button } from '.';

describe('Button component', () => {
  test('should render correctly', () => {
    const solidComponent = renderer.create(<Button variant="solid">Click me!</Button>);
    const outlinedComponent = renderer.create(<Button variant="outlined">Click me!</Button>);
    const textComponent = renderer.create(<Button variant="text">Click me!</Button>);

    let tree = solidComponent.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
    tree = outlinedComponent.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
    tree = textComponent.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
