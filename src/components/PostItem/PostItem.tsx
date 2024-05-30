'use client';

import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
// import { BiSolidVolumeFull, BiSolidVolumeMute } from 'react-icons/bi';
// import { RiArrowLeftSLine, RiArrowRightSLine, RiMoreFill } from 'react-icons/ri';
import { useInView } from 'react-intersection-observer';
import { Carousel } from 'react-responsive-carousel';

import AccountPreview from '@/components/AccountPreview';
import {
  CommentIcon,
  EmojiIcon,
  HeartActiveIcon,
  HeartIcon,
  SavedIcon,
  SendIcon,
} from '@/components/Icons';
import { PopperWrapper } from '@/components/Popper';
import PostOptions from '@/components/PostOptions';
import { useCommentPost, useLikePost } from '@/hooks';
import { IComment, IPost, IUser } from '@/interfaces';
import noAvatar from '@/public/images/no-user-image.jpg';
import { commentService, postService } from '@/services';
import { useAppSelector } from '@/store/hook';
import { timeAgo } from '@/utils/formatTime';
import Link from 'next/link';
import styles from './PostItem.module.scss';
import './custom-carousel.css';

const cx = classNames.bind(styles);

interface IPostItem {
  post: IPost;
  isVolume: boolean;
  onHandlerVolume: () => void;
}

const PostItem = ({ post, isVolume, onHandlerVolume }: IPostItem) => {
  const [play, setPlay] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isOptionsPost, setIsOptionsPost] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [postsUser, setPostsUser] = useState<IPost[]>([]);
  const [comment, setComment] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const authUser = useAppSelector((state) => state.user.currentUser.values);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  const { isLiked, likes, handleLikePost } = useLikePost(post);
  const { handleCommentPost } = useCommentPost();

  const handleEnter = (type: string) => {
    if (type === 'Enter') {
      handleSubmitComment();
    }
  };

  const handleSubmitComment = async () => {
    const data = await handleCommentPost(post?._id as string, comment);

    setComment('');
    commentRef?.current?.focus();
    setComments([...comments, data]);
  };

  const handleOptionPost = () => {
    setIsOptionsPost(!isOptionsPost);
  };

  const renderPreview = (user: IUser) => (
    <div tabIndex={-1}>
      <PopperWrapper>
        <AccountPreview user={user} postsUser={postsUser} />
      </PopperWrapper>
    </div>
  );

  const onHandlePlayVideo = () => {
    setPlay(!play);
    setIsPlaying(!isPlaying);
    !play ? videoRef?.current?.play() : videoRef?.current?.pause();
  };

  const renderArrowPrev = (onClickHandler: any, hasPrev: boolean) => (
    <button
      type='button'
      onClick={onClickHandler}
      disabled={!hasPrev}
      className={cx('arrow-prev')}
      style={{
        display: `${hasPrev ? 'block' : 'none'}`,
      }}
    >
      {/* <RiArrowLeftSLine className={cx('block')} /> */}
    </button>
  );

  const renderArrowNext = (onClickHandler: any, hasNext: boolean) => (
    <button
      type='button'
      onClick={onClickHandler}
      disabled={!hasNext}
      className={cx('arrow-next')}
      style={{
        display: `${hasNext ? 'block' : 'none'}`,
      }}
    >
      {/* <RiArrowRightSLine className={cx('block')} /> */}
    </button>
  );

  const renderIndicator = (onClickHandler: any, isSelected: boolean, index: number) => (
    <li
      className={cx('indicator')}
      style={{
        opacity: isSelected ? '1' : '0.4',
      }}
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      value={index}
      key={index}
    />
  );

  useEffect(() => {
    (async () => {
      const respon = await postService.getPostsUser(post?.user_id?._id);
      respon?.data && setPostsUser(respon?.data);
    })();
  }, [post]);

  useEffect(() => {
    (async () => {
      const respon = await commentService.getAllCommentPost(post?._id as string);
      respon?.data && setComments(respon?.data);
    })();
  }, [post]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVolume;
    }
  }, [isVolume]);

  useEffect(() => {
    if (inView && !isPlaying) {
      videoRef?.current?.play();
      setPlay(true);
    } else {
      videoRef?.current?.pause();
      setPlay(false);
    }
  }, [inView, isPlaying]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('head-post')}>
        <div className={cx('user')}>
          <div>
            <Tippy
              interactive
              delay={[600, 100]}
              offset={[160, 12]}
              placement='bottom'
              render={() => renderPreview(post.user_id)}
            >
              <Link className={cx('link')} href={`/${post.user_id?.username}`}>
                <div className={cx('avatar', { border: true })}>
                  <Image
                    className={cx('img')}
                    src={post.user_id?.profile_image || noAvatar}
                    alt=''
                  />
                </div>
              </Link>
            </Tippy>
          </div>
          <div>
            <Tippy
              interactive
              delay={[600, 100]}
              offset={[150, 2]}
              placement='bottom'
              render={() => renderPreview(post.user_id)}
            >
              <Link href={`/${post.user_id?.username}`}>
                <div className={cx('user-name')}>{post.user_id?.username}</div>
              </Link>
            </Tippy>
          </div>
          <div className={cx('time')}>{timeAgo(post?.createdAt as string)}</div>
          {!authUser?.followings?.includes(post?.user_id?._id) ||
            !(
              authUser?._id === post?.user_id?._id && <div className={cx('btn-follow')}>Follow</div>
            )}
        </div>
        <div onClick={handleOptionPost} className={cx('btn-more')}>
          {/* <RiMoreFill /> */}
        </div>
      </div>
      <div ref={ref} className={cx('body')}>
        <Carousel
          className={cx('carousel')}
          showStatus={false}
          showThumbs={false}
          showIndicators={post?.media?.length !== 1}
          renderArrowPrev={renderArrowPrev}
          renderArrowNext={renderArrowNext}
          renderIndicator={renderIndicator}
        >
          {post?.media?.map((item: any, index: number) => (
            <div className={cx('media-item')} key={index}>
              {item.type === 'image' ? (
                <Image className={cx('img')} src={item.url} alt='' />
              ) : (
                <>
                  <video ref={videoRef} loop className={cx('video')}>
                    <source src={item.url} type='video/mp4' />
                  </video>
                  <div onClick={onHandlePlayVideo} className={cx('play')}>
                    {!play && <div className={cx('icon-play')}></div>}
                  </div>
                  <div onClick={onHandlerVolume} className={cx('sound')}>
                    {/* {isVolume ? (
                      <BiSolidVolumeFull className={cx('block')} />
                    ) : (
                      <BiSolidVolumeMute className={cx('block')} />
                    )} */}
                  </div>
                </>
              )}
            </div>
          ))}
        </Carousel>
      </div>
      <div className={cx('bottom')}>
        <div className={cx('action-item')}>
          <div className={cx('action-box')}>
            <div onClick={handleLikePost} className={cx('item-box')}>
              {isLiked ? (
                <HeartActiveIcon className={cx('heart-active-icon')} />
              ) : (
                <HeartIcon className={cx('heart-icon')} />
              )}
            </div>
            <div className={cx('item-box')}>
              <CommentIcon />
            </div>
            <div className={cx('item-box')}>
              <SendIcon />
            </div>
          </div>
          <div className={cx('item-box')}>
            <SavedIcon className={cx('icon-saved')} />
          </div>
        </div>
        {!!likes && likes > 0 && (
          <div className={cx('like-count')}>
            <div className={cx('text')}>
              {likes} <span>{likes > 1 ? 'likes' : 'like'}</span>
            </div>
          </div>
        )}
        {post?.caption && (
          <div className={cx('content-post')}>
            <div>
              <Tippy
                interactive
                delay={[600, 100]}
                offset={[149, 6]}
                placement='bottom'
                render={() => renderPreview(post.user_id)}
              >
                <Link href={`/${post.user_id?.username}`}>
                  <div className={cx('user-name')}>{post.user_id?.username}</div>
                </Link>
              </Tippy>
            </div>
            <span className={cx('text')}>{post.caption}</span>
          </div>
        )}
        {comments && comments.length > 0 && (
          <div className={cx('btn-show-comments')}>
            <Link href={'/'} className={cx('link')}>
              View{' '}
              {comments.length === 1
                ? `${comments.length} comment`
                : `all ${comments.length} comments`}
            </Link>
          </div>
        )}
        <div className={cx('form-comment')}>
          <div className={cx('form')}>
            <textarea
              className={cx('input')}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => handleEnter(e.key)}
              value={comment}
              spellCheck={false}
              ref={commentRef}
              placeholder='Add a comment...'
            ></textarea>
            {comment && comment.length > 0 && (
              <button onClick={handleSubmitComment} className={cx('btn-send')}>
                Post
              </button>
            )}
          </div>
          <span className={cx('emoji')}>
            <EmojiIcon />
          </span>
        </div>
      </div>
      {isOptionsPost && (
        <PostOptions
          onToggleOption={handleOptionPost}
          userId={post?.user_id?._id}
          postId={post?._id as string}
        />
      )}
    </div>
  );
};

export default PostItem;
