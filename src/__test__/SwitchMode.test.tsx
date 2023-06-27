import { SwitchMode } from '@/components';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

describe('SwitchMode component', () => {
  test('should render correctly', () => {
    const component = renderer.create(<SwitchMode />);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
