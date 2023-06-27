import { Avatar } from '@/components';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

describe('Avatar component', () => {
  test('should render correctly', () => {
    const component = renderer.create(<Avatar src="/vi.png" width={40} height={40} alt="avatar" size={'120'} />);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
