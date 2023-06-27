import { Input } from '@/components';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

describe('Input component', () => {
  test('should render correctly', () => {
    const component = renderer.create(<Input type="text" defaultValue="type here..." />);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
