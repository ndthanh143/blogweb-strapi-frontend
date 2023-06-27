import { Popper } from '@/components';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

describe('Popper component', () => {
  test('should render correctly', () => {
    const component = renderer.create(<Popper isOpen={false} onClose={() => {}}></Popper>);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
