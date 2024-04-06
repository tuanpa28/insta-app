'use client';

import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import { postService } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { deletePostTimeLine } from '@/store/slices/postSlice';
import styles from './PostOptions.module.scss';

const cx = classNames.bind(styles);

interface IPostOptions {
  onToggleOption: () => void;
  userId: string;
  postId: string;
}

const PostOptions = ({ userId, postId, onToggleOption }: IPostOptions) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.user.currentUser.values);

  const handleDeletePost = async () => {
    if (window.confirm('Bạn muốn xóa bài viết này?')) {
      await postService.deletePost(postId);
      dispatch(deletePostTimeLine(postId));
      toast.success('Xóa bài viết thành công!');
      onToggleOption();
    }
  };

  return (
    <div onClick={onToggleOption} className={cx('wrapper')}>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={cx('modal-container')}
      >
        <div className={cx('list-option')}>
          {authUser?._id === userId && (
            <button onClick={handleDeletePost} className={cx('option-item', 'btn-danger')}>
              Delete post
            </button>
          )}
          {authUser?._id === userId && <button className={cx('option-item')}>Edit</button>}
          <button className={cx('option-item')}>Go to post</button>
          <button onClick={onToggleOption} className={cx('option-item')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostOptions;
