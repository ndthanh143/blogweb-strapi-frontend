import { CommentAttribute } from '@/services/comment/comment.dto';
import { Avatar, Popper } from '@/components';
import { getStrapiMedia } from '@/utils/media';
import moment from 'moment';
import Link from 'next/link';
import { FaAngleDown, FaAngleUp, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import useBoolean from '@/hooks/useBoolean';
import { useAuth } from '@/hooks/useAuth';

export interface ICommentProps {
  data: CommentAttribute;
  onDelete?: () => void;
}

export function Comment({ data, onDelete }: ICommentProps) {
  const { user } = useAuth();

  const { value, setFalse, toggle } = useBoolean(false);

  return (
    <div className="border-b dark:border-dark-mode py-4 mb-2 last:mb-0 last:border-0 ">
      <div className="flex items-center mx-2">
        <Link href={`/writer/${data.user.data.id}`}>
          <Avatar
            src={
              data.user.data.attributes.avatar?.data &&
              getStrapiMedia(data.user.data.attributes.avatar.data.attributes.formats.thumbnail)
            }
            width={40}
            height={40}
            alt={data.user.data.attributes.avatar?.data?.attributes.alternativeText || ''}
            size={data.user.data.attributes.avatar?.data?.attributes.formats.thumbnail + '' || ''}
          />
        </Link>
        <div className="mx-2">
          <Link
            href={`/writer/${data.user.data.id}`}
            className="text-color-bold dark:text-color-bold-dark font-semibold hover:underline hover:decoration-1"
          >
            {data.user.data.attributes.name}
          </Link>
          <p className="text-color-thin text-sm">{moment(data.publishedAt).fromNow()}</p>
        </div>
      </div>
      <div
        className="text-lg font-light my-2"
        dangerouslySetInnerHTML={{
          __html: data.content.replaceAll(/\/uploads/g, `${process.env.API_NEXT_PUBLIC_IMAGE_URL}/uploads`),
        }}
      ></div>
      <div className="flex">
        <div className="flex items-center text-xl text-color-thin font-semibold border-r-2 dark:border-dark-mode px-2">
          <span className="opacity-40 hover:!opacity-100 cursor-pointer">
            <FaAngleUp />
          </span>
          <span className="opacity-70 text-lg">0</span>
          <span className="opacity-40 hover:!opacity-100 cursor-pointer">
            <FaAngleDown />
          </span>
        </div>
        <div className="flex items-center ml-2 ">
          <p className="text-blue-500 hover:underline hover:decoration-1 cursor-pointer">Answer</p>
          {user && user.id === data.user.data.id && (
            <span className="text-color-thin mx-2 text-2xl cursor-pointer relative" onClick={toggle}>
              <HiOutlineDotsCircleHorizontal />
              <Popper isOpen={value} onClose={setFalse} onItemClick={setFalse} className="left-0 origin-top-left">
                <span className="cursor-pointer text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8">
                  <FaPencilAlt /> <span className="px-4">Update</span>
                </span>
                <span
                  className="cursor-pointer text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8"
                  onClick={onDelete}
                >
                  <FaTrash /> <span className="px-4">Remove this comment</span>
                </span>
              </Popper>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
