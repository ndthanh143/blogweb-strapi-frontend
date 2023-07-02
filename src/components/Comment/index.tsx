import { CommentAttribute, UpdateCommentPayload } from '@/services/comment/comment.dto';
import { Avatar, Button, Popper } from '@/components';
import { getStrapiMedia } from '@/utils/media';
import moment from 'moment';
import Link from 'next/link';
import { FaAngleDown, FaAngleUp, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import useBoolean from '@/hooks/useBoolean';
import { useAuth } from '@/hooks/useAuth';
import { HTMLAttributes, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/redux/store';
import cx from 'classnames';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const Editor = dynamic(() => import('@/components/Editor/Editor'), { ssr: false });

export interface ICommentProps extends HTMLAttributes<HTMLDivElement> {
  data: CommentAttribute;
  onDelete: () => void;
  onUpdate: (comment: string) => void;
  onAnswer?: (reply: string) => void;
}

export function Comment({ data, onDelete = () => {}, onUpdate, onAnswer = () => {}, className }: ICommentProps) {
  const { user } = useAuth();

  const { value: isAction, setFalse: closeAction, toggle: toggleAction } = useBoolean(false);

  const { value: isUpdating, setFalse: closeUpdate, setTrue: openUpdate } = useBoolean(false);

  const { value: isAnswering, setFalse: closeAnswer, setTrue: openAnswer } = useBoolean(false);

  const [comment, setComment] = useState(data.content);

  const [reply, setReply] = useState('');

  const { isUpdateSuccess, isAnswerSuccess, updateLoading, answerLoading } = useAppSelector(
    (state) => state.handleComment,
  );

  useEffect(() => {
    if (isUpdateSuccess) {
      closeUpdate();
    }
    if (isAnswerSuccess) {
      closeAnswer();
      setReply('');
    }
  }, [isUpdateSuccess, isAnswerSuccess, closeUpdate, closeAnswer]);

  return (
    <div className={cx('border-b dark:border-dark-mode mb-2 last:mb-0 last:border-0', className)}>
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

      {isUpdating && (
        <div className="py-2">
          <Editor value={comment} onChange={setComment} />
          <div className="flex flex-row-reverse my-4">
            <Button
              variant="solid"
              onClick={() => onUpdate(comment)}
              loading={updateLoading}
              disabled={updateLoading}
              aria-label="Save - Click to update your comment"
            >
              Save
            </Button>
            <Button variant="text" className="mx-2" onClick={closeUpdate} aria-label="Cancel">
              Cancel
            </Button>
          </div>
        </div>
      )}
      {!isUpdating && (
        <>
          <div className="text-lg font-light my-2">
            <section className="rich-text py-6">
              <Markdown remarkPlugins={[remarkGfm]}>{data.content}</Markdown>
            </section>
          </div>
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
              <p className="text-blue-500 hover:underline hover:decoration-1 cursor-pointer" onClick={openAnswer}>
                Answer
              </p>
              {user && user.id === data.user.data.id && (
                <span className="text-color-thin mx-2 text-2xl cursor-pointer relative" onClick={toggleAction}>
                  <HiOutlineDotsCircleHorizontal />
                  <Popper
                    isOpen={isAction}
                    onClose={closeAction}
                    onItemClick={closeAction}
                    className="left-0 origin-top-left"
                  >
                    <span
                      className="cursor-pointer text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 flex items-center pr-8"
                      onClick={openUpdate}
                    >
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
          {isAnswering && (
            <div className="py-2">
              <Editor value={reply} onChange={setReply} />
              <div className="flex flex-row-reverse my-4">
                <Button
                  variant="solid"
                  onClick={() => onAnswer(reply)}
                  loading={answerLoading}
                  disabled={answerLoading}
                  aria-label="Reply - Click to submit your reply"
                >
                  Reply
                </Button>
                <Button variant="text" className="mx-2" onClick={closeAnswer} aria-label="Cancel">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
