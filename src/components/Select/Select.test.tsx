import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { Select } from '.';

describe('Select component', () => {
  test('should render correctly', () => {
    const component = renderer.create(
      <Select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>,
    );
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
