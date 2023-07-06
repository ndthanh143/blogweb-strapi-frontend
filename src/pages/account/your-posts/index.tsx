import { Button, DeleteModal, Input, Pagination } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import useBoolean from '@/hooks/useBoolean';
import { deleteArticle, resetState } from '@/redux/features/articles/articleSlice';
import { getArticlesByWriter } from '@/redux/features/articles/articlesFilterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getStrapiMedia } from '@/utils/media';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';

const PAGE_SIZE = 1;
export default function Posts() {
  const router = useRouter();

  const { user } = useAuth();

  const [pageIndex, setPageIndex] = useState(1);

  const { value: isOpenModal, setFalse: closeModal, setTrue: openModal } = useBoolean(false);

  const dispatch = useAppDispatch();

  const { data: articles, pageCount } = useAppSelector((state) => state.articlesFilter);

  const { isDeleteSuccess, loading: handleLoading } = useAppSelector((state) => state.articleDetail);

  const onDeleteHandler = (articleId: number) => {
    dispatch(deleteArticle(articleId));
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success('Delete successfully!');
      dispatch(resetState());
      closeModal();
    }
    if (user) {
      dispatch(getArticlesByWriter({ id: user.id, options: { page: pageIndex, pageSize: PAGE_SIZE } }));
    }
  }, [dispatch, closeModal, user, isDeleteSuccess, pageIndex]);

  return (
    <div>
      <ToastContainer />
      <h2>Your Posts</h2>

      <div className="flex justify-end">
        <Button variant="solid" onClick={() => router.push('/publish/post')}>
          Create new Posts
        </Button>
      </div>
      <div className="py-4">
        <div className="grid grid-cols-11 dark:bg-search-dark px-2 py-4">
          <span className="col-span-1 border-r flex justify-center">ID</span>
          <span className="col-span-2 border-r flex justify-center">Category</span>
          <span className="col-span-2 border-r flex justify-center">Thumbnail</span>
          <span className="col-span-4 border-r flex justify-center">Title</span>
          <span className="col-span-2 flex justify-center">Action</span>
        </div>
        {articles.map((article) => (
          <>
            <div className="grid grid-cols-11 px-2 py-6 last:!border-0">
              <span className="col-span-1 flex justify-center items-center">{article.id}</span>
              <span className="col-span-2 flex justify-center items-center">
                {article.attributes.category.data.attributes.name}
              </span>
              <span className="col-span-2 flex justify-center items-center">
                <Image
                  src={getStrapiMedia(article.attributes.thumbnail.data.attributes.formats.thumbnail)}
                  width={40}
                  height={40}
                  alt={article.attributes.thumbnail.data.attributes.alternativeText || ''}
                />
              </span>
              <span className="col-span-4 flex items-center px-4 truncate break-all line-clamp-1">
                {article.attributes.title}
              </span>
              <span className="col-span-2 flex justify-center items-center">
                <Button
                  variant="outlined"
                  className="mx-2"
                  onClick={() => router.push(`/account/your-posts/${article.id}`)}
                >
                  <BiEdit />
                </Button>
                <Button variant="solid" className="mx-2" onClick={openModal}>
                  <BiTrash />
                </Button>
              </span>
            </div>
            <DeleteModal
              isOpen={isOpenModal}
              loading={handleLoading}
              onClose={closeModal}
              onConfirm={() => onDeleteHandler(article.id)}
            />
          </>
        ))}
        <Pagination
          pageCount={pageCount}
          pageRangeDisplayed={2}
          onPageChange={(e) => setPageIndex(e.selected + 1)}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

Posts.Layout = 'UserManagement';
