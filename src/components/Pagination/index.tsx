import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

export function Pagination(props: ReactPaginateProps) {
  if (props.pageCount === 1) return null;
  return (
    <ReactPaginate
      {...props}
      breakLabel="..."
      activeClassName={'text-blue-700 bg-gray-200 hover:!text-blue-700 hover:!bg-gray-200'}
      breakClassName={'item break-me '}
      containerClassName={
        'flex justify-center items-center my-4 text-sm lg:text-lg text-color-medium dark:text-color-medium-dark'
      }
      disabledClassName={'hidden'}
      nextClassName={'mx-4 hover:bg-gray-700 hover:text-white px-4 py-1 rounded-full'}
      pageClassName={'px-4 py-2 flex justify-center items-center rounded-full mx-2 hover:bg-gray-700 hover:text-white'}
      previousClassName={'mx-4 hover:bg-gray-700 hover:text-white px-4 py-1 rounded-full'}
    />
  );
}
