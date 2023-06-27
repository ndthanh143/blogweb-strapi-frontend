import { Pagination } from '@/components';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

describe('Pagination component', () => {
  test('should render correctly', () => {
    const component = renderer.create(<Pagination pageCount={5} pageRangeDisplayed={2} />);
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
});
