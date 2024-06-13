'use client';

import {
  BadgeCheckIcon,
  BookmarkIcon,
  EllipsisIcon,
  HeartIcon,
  MessageCircleIcon,
  SendIcon,
  SmileIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Textarea } from '@/components/common/DataEntry';
import { TippyDisplay } from '@/components/common/display';
import { SwiperCarousel } from '@/components/home';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { IComment, IPostTimeLine } from '@/interfaces';
import { timeAgo } from '@/utils';

interface IPostItem {
  post: IPostTimeLine;
  isVolume: boolean;
  onToggleVolume: () => void;
}

const PostItem = ({ post, isVolume, onToggleVolume }: IPostItem) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isOptionsPost, setIsOptionsPost] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>();
  const [postsUser, setPostsUser] = useState<IPostTimeLine[]>([]);
  const [comment, setComment] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  // const authUser = useAppSelector((state) => state.user.currentUser.values);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  // const { isLiked, likes, handleLikePost } = useLikePost(post);
  // const { handleCommentPost } = useCommentPost();

  // const handleEnter = (type: string) => {
  //   if (type === 'Enter') {
  //     handleSubmitComment();
  //   }
  // };

  // const handleSubmitComment = async () => {
  //   const data = await handleCommentPost(post?._id as string, comment);

  //   setComment('');
  //   commentRef?.current?.focus();
  //   setComments([...comments, data]);
  // };

  // const handleOptionPost = () => {
  //   setIsOptionsPost(!isOptionsPost);
  // };

  const handleToogleVideo = () => {
    setIsPlay(!isPlay);
    setIsPlaying(!isPlaying);
    !isPlay ? videoRef?.current?.play() : videoRef?.current?.pause();
  };

  // useEffect(() => {
  //   (async () => {
  //     const respon = await postService.getPostsUser(post?.user_id?._id);
  //     respon?.data && setPostsUser(respon?.data);
  //   })();
  // }, [post]);

  // useEffect(() => {
  //   (async () => {
  //     const respon = await commentService.getAllCommentPost(post?._id as string);
  //     respon?.data && setComments(respon?.data);
  //   })();
  // }, [post]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVolume;
    }
  }, [isVolume]);

  useEffect(() => {
    if (inView && !isPlaying) {
      videoRef?.current?.play();
      setIsPlay(true);
    } else {
      videoRef?.current?.pause();
      setIsPlay(false);
    }
  }, [inView, isPlaying]);

  return (
    <div className='flex flex-col w-full min-w-[min(390px,100%)] h-full pb-4 mb-5 border-b border-solid border-[rgb(219,219,219)] dark:border-[rgb(38,38,38)]'>
      <div className='w-full flex items-center justify-between px-4 sm:pr-0 sm:pl-1 pb-3'>
        <div className='flex items-center'>
          <TippyDisplay user={post.user}>
            <Link
              className='flex items-center justify-center w-full h-full relative after:bg-linearGradientAvatar after:content-[""] after:block after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-10 after:w-10 after:z-[-2] after:rounded-full before:content-[""] before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-9 before:w-9 before:z-[-1] before:rounded-full before:bg-white dark:before:bg-[rgb(0,0,0)]'
              href={`/tuanpa.03`}
            >
              <div className='w-8 h-8 rounded-full'>
                <Avatar className='w-full h-full object-cover'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback />
                </Avatar>
              </div>
            </Link>
          </TippyDisplay>
          <TippyDisplay offset={[150, 8]} user={post.user}>
            <Link className='ml-3 block' href={`/tuanpa.03`}>
              <div className='flex items-center text-sm font-bold dark:text-[rgb(245,245,245)]'>
                tuanpa.03
              </div>
            </Link>
          </TippyDisplay>
          <BadgeCheckIcon width={12} height={12} className={'ml-0.5 text-[rgb(0,149,246)] -mt-2'} />

          <div className='flex items-center relative text-sm font-medium ml-3 text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)] before:content-["•"] before:absolute before:top-0 before:-left-2'>
            {timeAgo(post?.createdAt)}
          </div>
          {/* {!authUser?.followings?.includes(post?.user_id?._id) ||
            !(
              authUser?._id === post?.user_id?._id && <div className={cx('btn-follow')}>Follow</div>
            )} */}
          <div className="flex items-center relative text-sm font-bold text-[rgb(0,149,246)] dark:text-[rgb(0,149,246)] dark:hover:text-[rgb(224,241,255)] ml-3.5 cursor-pointer hover:text-[rgb(0,55,107)] before:content-['•'] before:block before:absolute before:text-[rgb(115,115,115)] dark:before:text-[rgb(168,168,168)] before:top-0 before:-left-2.5">
            Follow
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className='flex items-center justify-center ml-2 text-xl text-primary cursor-pointer dark:text-[rgb(245,245,245)]'>
              <EllipsisIcon width={24} height={24} />
            </div>
          </DialogTrigger>
          <DialogContent
            hideCloseBtn
            onOpenAutoFocus={(e) => e.preventDefault()}
            className='w-[calc(100vw-88px)] min-w-[260px] max-w-[400px] max-h-[calc(100%-40px)] m-5 p-0 !rounded-xl bg-white dark:bg-[rgb(38,38,38)] border-transparent'
          >
            <div className='flex flex-col justify-center items-center'>
              <button className='w-full flex items-center justify-center font-extrabold text-red-600 dark:text-red-500 py-1 px-2 min-h-12 text-sm bg-transparent rounded-t-xl cursor-pointer hover:bg-[rgba(0,0,0,0.1)]'>
                Report
              </button>
              <button className='w-full flex items-center justify-center font-extrabold text-red-600 dark:text-red-500 py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                Unfollow
              </button>
              <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                Add to favorites
              </button>
              <Link
                href={'/'}
                className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'
              >
                Go to post
              </Link>
              <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                About this account
              </button>
              <DialogClose asChild>
                <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] rounded-b-xl border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                  Cancel
                </button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div
        ref={ref}
        className='relative flex items-center justify-center border border-solid border-[rgb(219,219,219)] dark:border-[rgb(38,38,38)] rounded bg-[rgb(0,0,0)] w-full h-[400px] sm:w-[468px] sm:h-[585px]'
      >
        <SwiperCarousel
          medias={post.media}
          videoRef={videoRef}
          isPlay={isPlay}
          onTogglePlay={handleToogleVideo}
          onToggleVolume={onToggleVolume}
          isVolume={isVolume}
        />
      </div>
      <div className='flex flex-col px-4 sm:px-0'>
        <div className='flex items-center justify-between py-1 -mx-2'>
          <div className='flex items-center justify-center'>
            <div
              //  onClick={handleLikePost}
              onMouseLeave={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setIsAnimating(false);
                }, 450);
              }}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setIsAnimating(false);
                }, 450);
              }}
              className={`hover:opacity-60 cursor-pointer text-[rgb(0,0,0)] dark:text-[rgb(245,245,245)] p-2 ${
                isAnimating ? 'animate-contractility' : ''
              }`}
            >
              {/* {isLiked ? (
                <HeartIcon className={cx('heart-active-icon')} strokeWidth={3} />
              ) : (
                <HeartIcon className={cx('heart-icon')} />
              )} */}
              <HeartIcon width={24} height={24} strokeWidth={3} className='text-red-600' />
            </div>
            <div className='hover:opacity-60 cursor-pointer text-[rgb(0,0,0)] dark:text-[rgb(245,245,245)] p-2'>
              <MessageCircleIcon width={24} height={24} />
            </div>
            <div className='hover:opacity-60 cursor-pointer text-[rgb(0,0,0)] dark:text-[rgb(245,245,245)] p-2'>
              <SendIcon width={24} height={24} />
            </div>
          </div>
          <div className='hover:opacity-60 cursor-pointer text-[rgb(0,0,0)] dark:text-[rgb(245,245,245)] p-2'>
            <BookmarkIcon width={24} height={24} />
          </div>
        </div>
        {/* {!!likes && likes > 0 && (
          <div className={cx('like-count')}>
            <div className={cx('text')}>
              {likes} <span>{likes > 1 ? 'likes' : 'like'}</span>
            </div>
          </div>
        )} */}
        <div className='flex items-center justify-start mb-1.5'>
          <div className='text-sm font-semibold dark:text-[rgb(245,245,245)] cursor-pointer'>
            2 <span>likes</span>
          </div>
        </div>
        {post?.caption && (
          <div className='flex items-center justify-start mb-1.5'>
            <TippyDisplay user={post.user} offset={[150, 8]}>
              <Link href={`/${post.user?.username}`}>
                <div className='flex items-center text-sm font-bold dark:text-[rgb(245,245,245)]'>
                  {post.user?.username}
                </div>
              </Link>
            </TippyDisplay>
            <span className='text-sm font-medium ml-1 dark:text-[rgb(245,245,245)]'>
              {post.caption}
            </span>
          </div>
        )}
        {comments && comments.length > 0 && (
          <div className='flex items-center justify-start mb-1.5'>
            <Link href={'/'} className='text-sm font-medium text-[rgb(115,115,115)]'>
              View{' '}
              {comments.length === 1
                ? `${comments.length} comment`
                : `all ${comments.length} comments`}
            </Link>
          </div>
        )}
        <div className='flex items-center'>
          <div className='flex items-center flex-row flex-grow'>
            <Textarea
              className='w-full h-5 max-h-20 mr-2 border-none outline-none overflow-hidden text-sm font-medium text-[#000] dark:text-[rgb(245,245,245)] bg-white dark:bg-[rgb(0,0,0)] placeholder:text-[rgb(115,115,115)] dark:placeholder:text-[rgb(168,168,168)] resize-none'
              onChange={(event) => setComment(event.target.value)}
              // onKeyDown={(e) => handleEnter(e.key)}
              value={comment}
              height={20}
              spellCheck={false}
              ref={commentRef}
              placeholder='Add a comment...'
            />
            {comment && comment.length > 0 && (
              <button
                // onClick={handleSubmitComment}
                className='text-sm font-semibold mr-2 leading-5 text-[rgb(0,149,246)] cursor-pointer hover:text-[rgb(0,55,107)] dark:hover:text-[rgb(245,245,245)]'
              >
                Post
              </button>
            )}
          </div>
          <span className='flex items-center justify-center text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)] cursor-pointer hover:opacity-60'>
            <SmileIcon width={14} height={14} />
          </span>
        </div>
      </div>
      {/* {isOptionsPost && (
        <PostOptions
          onToggleOption={handleOptionPost}
          userId={post?.user?._id}
          postId={post?._id as string}
        />
      )} */}
    </div>
  );
};

export default PostItem;
