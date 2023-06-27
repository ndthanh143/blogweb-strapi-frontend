import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { SocialMedia } from '@/components';

describe('SocialMedia component', () => {
  test('should render correctly', () => {
    const component = renderer.create(<SocialMedia variant="facebook" href="#" />);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
