import { Label } from '@/components';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

describe('Label component', () => {
  test('should render correctly', () => {
    const component = renderer.create(<Label>You are the best!</Label>);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
