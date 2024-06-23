'use client';

import {
  BadgeCheckIcon,
  BookmarkIcon,
  CalendarDaysIcon,
  EllipsisIcon,
  HeartIcon,
  LoaderCircleIcon,
  LoaderIcon,
  MessageCircleIcon,
  SendIcon,
  SmileIcon,
} from 'lucide-react';
import Link from 'next/link';
import { forwardRef, memo, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

import { Textarea } from '@/components/common/DataEntry';
import { TippyDisplay } from '@/components/common/display';
import { SwiperCarousel } from '@/components/home';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { IComment, IPostTimeLine, IUser } from '@/interfaces';
import { commentService, postService, userService } from '@/services';
import { actions, useStore } from '@/store';
import { timeAgo } from '@/utils';

interface PostItemProps {
  post: IPostTimeLine;
  isSound: boolean;
  onToggleSound: () => void;
}

const PostItem = forwardRef<HTMLDivElement, PostItemProps>(
  ({ post, isSound, onToggleSound }, innerRef) => {
    const [isLoadingFollowUser, setIsLoadingFollowUser] = useState<boolean>(false);
    const [isLoadingComment, setIsLoadingComment] = useState<boolean>(false);
    const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[]>([]);
    const [comment, setComment] = useState<string>('');
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const [state, dispatch] = useStore();
    const [ref, inView] = useInView({
      threshold: 0.8,
    });

    const indexFollowing = state.user?.followings
      ? state.user?.followings.indexOf(post?.user?._id)
      : -1;
    const isFollowed = state.user?._id === post?.user?._id || indexFollowing !== -1;

    const handleFollowUser = async (user: IUser) => {
      setIsLoadingFollowUser(true);
      try {
        await userService.followUser(user._id);
        dispatch(actions.toggleFollowingUser(user._id));
        if (state.user && user.followers) {
          const index = user.followers.indexOf(state.user?._id);
          if (index !== -1) {
            user.followers.splice(index, 1);
          } else {
            user.followers.push(state.user?._id);
          }
        }
      } catch (error) {
        toast.error('Theo dõi người dùng thất bại! vui lòng thử lại sau!');
      } finally {
        setIsLoadingFollowUser(false);
      }
    };

    const handleLikePost = async (post: IPostTimeLine) => {
      try {
        if (state.user) {
          const index = post.likes.indexOf(state.user?._id);
          if (index !== -1) {
            post.likes.splice(index, 1);
          } else {
            post.likes.push(state.user?._id);
          }
        }
        await postService.likePost(post._id);
      } catch (error) {
        toast.error('Thích bài viết thất bại! Vui lòng thử lại!');
      }
    };

    const handleSubmitComment = async () => {
      setIsLoadingComment(true);
      try {
        const data = await commentService.createCommentPost({
          post_id: post._id,
          content: comment,
        });
        setComment('');
        setComments((prev) =>
          prev.length >= 3 ? [...prev.slice(1), data.data?.data] : [...prev, data.data?.data],
        );
        setTimeout(() => {
          commentRef?.current?.focus();
        }, 100);
      } catch (error) {
        toast.error('Bình luận bài viết thất bại! Vui lòng thử lại!');
      } finally {
        setIsLoadingComment(false);
      }
    };

    const handleTooglePlayVideo = () => {
      setIsPlayVideo(!isPlayVideo);
      setIsPlaying(!isPlaying);
      !isPlayVideo ? videoRef?.current?.play() : videoRef?.current?.pause();
    };

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.muted = !isSound;
      }
    }, [isSound]);

    useEffect(() => {
      if (inView && !isPlaying) {
        videoRef?.current?.play();
        setIsPlayVideo(true);
      } else {
        videoRef?.current?.pause();
        setIsPlayVideo(false);
      }
    }, [inView, isPlaying]);

    return (
      <div
        ref={innerRef}
        className='flex flex-col w-full min-w-[min(390px,100%)] h-full pb-4 mb-5 sm:border-b sm:border-solid sm:border-[rgb(219,219,219)] dark:border-[rgb(38,38,38)]'
      >
        <div className='w-full flex items-center justify-between px-4 sm:pr-0 sm:pl-1 pb-3'>
          <div className='flex items-center'>
            <TippyDisplay user={post.user}>
              <Link
                className='flex items-center justify-center w-full h-full relative after:bg-linearGradientAvatar after:content-[""] after:block after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-10 after:w-10 after:z-[-2] after:rounded-full before:content-[""] before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-9 before:w-9 before:z-[-1] before:rounded-full before:bg-white dark:before:bg-[rgb(0,0,0)]'
                href={`/${post.user?.username}`}
              >
                <div className='w-8 h-8 rounded-full'>
                  <Avatar className='w-full h-full object-cover'>
                    <AvatarImage src={post?.user?.profile_image} />
                    <AvatarFallback />
                  </Avatar>
                </div>
              </Link>
            </TippyDisplay>
            <TippyDisplay offset={[150, 8]} user={post.user}>
              <Link className='ml-3 block' href={`/${post.user?.username}`}>
                <div className='flex items-center text-sm font-bold dark:text-[rgb(245,245,245)]'>
                  {post.user?.username}
                </div>
              </Link>
            </TippyDisplay>
            {post.user?.tick && (
              <BadgeCheckIcon
                width={12}
                height={12}
                className={'ml-0.5 text-[rgb(0,149,246)] -mt-2'}
              />
            )}

            <div className='flex items-center relative text-sm font-medium ml-3 text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)] before:content-["•"] before:absolute before:top-0 before:-left-2'>
              {timeAgo(post?.createdAt)}
            </div>
            {!isFollowed && (
              <div
                onClick={() => !isLoadingFollowUser && handleFollowUser(post.user)}
                className="flex items-center relative text-sm font-bold text-[rgb(0,149,246)] dark:text-[rgb(0,149,246)] dark:hover:text-[rgb(224,241,255)] ml-3.5 cursor-pointer hover:text-[rgb(0,55,107)] before:content-['•'] before:block before:absolute before:text-[rgb(115,115,115)] dark:before:text-[rgb(168,168,168)] before:top-0 before:-left-2.5"
              >
                {isLoadingFollowUser ? (
                  <LoaderCircleIcon
                    width={16}
                    height={16}
                    className='animate-spinner text-[rgb(16,16,16)] dark:text-[rgb(245,245,245)]'
                  />
                ) : (
                  <span>Follow</span>
                )}
              </div>
            )}
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
              className='w-[calc(100vw-88px)] min-w-[260px] max-w-[400px] max-h-[calc(100%-40px)] p-0 !rounded-xl bg-white dark:bg-[rgb(38,38,38)] border-transparent'
            >
              <div className='flex flex-col justify-center items-center'>
                <button className='w-full flex items-center justify-center font-extrabold text-red-600 dark:text-red-500 py-1 px-2 min-h-12 text-sm bg-transparent rounded-t-xl cursor-pointer hover:bg-[rgba(0,0,0,0.1)]'>
                  Report
                </button>
                {!!(indexFollowing !== -1) && (
                  <button
                    onClick={() => !isLoadingFollowUser && handleFollowUser(post.user)}
                    className='w-full flex items-center justify-center font-extrabold text-red-600 dark:text-red-500 py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'
                  >
                    {isLoadingFollowUser ? (
                      <LoaderCircleIcon
                        width={16}
                        height={16}
                        className='animate-spinner text-[rgb(16,16,16)] dark:text-[rgb(245,245,245)]'
                      />
                    ) : (
                      <span>Unfollow</span>
                    )}
                  </button>
                )}

                <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                  Add to favorites
                </button>
                <Link
                  href={'/'}
                  className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'
                >
                  Go to post
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                      About this account
                    </button>
                  </DialogTrigger>
                  <DialogContent
                    hideCloseBtn
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className='w-[calc(100vw-88px)] min-w-[260px] max-w-[400px] max-h-[calc(100%-40px)] p-0 !rounded-xl bg-white dark:bg-[rgb(38,38,38)] border-transparent'
                  >
                    <div className='flex flex-col justify-center items-center'>
                      <div className='w-full flex items-center justify-center font-semibold text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-base bg-transparent border-b border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                        About your account
                      </div>
                      <div className='flex flex-col items-center justify-center py-4'>
                        <Avatar className='w-[78px] h-[78px] object-cover cursor-pointer mb-4'>
                          <AvatarImage src={post.user.profile_image} />
                          <AvatarFallback />
                        </Avatar>
                        <span className='text-base font-bold mb-1.5 dark:text-[rgb(245,245,245)]'>
                          {post.user.username}
                        </span>
                        <span className='text-xs font-normal text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)] text-center px-8'>
                          To help keep our community authentic, we’re showing information about
                          accounts on Instagram. People can see this by tapping on the ••• on your
                          profile and choosing About This Account. See why this information is
                          important.
                        </span>
                      </div>
                      <div className='flex flex-col w-full'>
                        <div className='flex items-center py-3 px-4'>
                          <div className='pr-3'>
                            <CalendarDaysIcon />
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-base font-medium leading-5'>Date joined</span>
                            <span className='text-sm text-[rgb(115,115,115)] leading-4'>
                              {post.user?.createdAt &&
                                new Date(post.user?.createdAt)?.toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <DialogClose asChild>
                        <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] rounded-b-xl border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                          Close
                        </button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
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
          className='relative flex items-center justify-center border border-solid border-[rgb(219,219,219)] dark:border-[rgb(38,38,38)] rounded bg-[rgb(0,0,0)] w-full h-[60vh] sm:w-[468px] sm:h-[585px]'
        >
          <SwiperCarousel
            medias={post.media}
            videoRef={videoRef}
            isPlayVideo={isPlayVideo}
            onTogglePlayVideo={handleTooglePlayVideo}
            onToggleSound={onToggleSound}
            isSound={isSound}
          />
        </div>
        <div className='flex flex-col px-4 sm:px-0'>
          <div className='flex items-center justify-between py-1 -mx-2'>
            <div className='flex items-center justify-center'>
              <div
                onMouseLeave={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setIsAnimating(false);
                  }, 450);
                }}
                onClick={() => {
                  setIsAnimating(true);
                  handleLikePost(post);
                  setTimeout(() => {
                    setIsAnimating(false);
                  }, 450);
                }}
                className={`hover:opacity-60 cursor-pointer text-[rgb(0,0,0)] dark:text-[rgb(245,245,245)] p-2 ${
                  isAnimating ? 'animate-contractility' : ''
                }`}
              >
                {state.user && post?.likes.indexOf(state.user?._id) !== -1 ? (
                  <HeartIcon width={24} height={24} strokeWidth={3} className='text-red-600' />
                ) : (
                  <HeartIcon width={24} height={24} />
                )}
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

          {post.likes.length > 0 && (
            <div className='flex items-center justify-start mb-1'>
              <div className='text-sm font-semibold dark:text-[rgb(245,245,245)] cursor-pointer'>
                {post.likes.length} <span>{post.likes.length > 1 ? 'likes' : 'like'}</span>
              </div>
            </div>
          )}

          {post?.caption && (
            <div className='flex items-center justify-start mb-1'>
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
          {comments && comments.length > 0 ? (
            <div className='flex flex-col'>
              {comments.map((comment: IComment, i) => (
                <div key={i} className='flex items-center justify-start mb-1'>
                  <TippyDisplay user={comment.user} offset={[150, 8]}>
                    <Link href={`/${comment.user?.username}`}>
                      <div className='flex items-center text-sm font-bold dark:text-[rgb(245,245,245)]'>
                        {comment.user?.username}
                      </div>
                    </Link>
                  </TippyDisplay>
                  <span className='text-sm font-medium ml-1 dark:text-[rgb(245,245,245)]'>
                    {comment.content}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            post.totalComments > 0 && (
              <div className='flex items-center justify-start mb-1'>
                <Link href={'/'} className='text-sm font-medium text-[rgb(115,115,115)]'>
                  View{' '}
                  {post.totalComments === 1
                    ? `${post.totalComments} comment`
                    : `all ${post.totalComments} comments`}
                </Link>
              </div>
            )
          )}

          <div className='flex items-center'>
            <div className='relative flex items-center flex-row flex-grow'>
              <Textarea
                className={`${
                  isLoadingComment && 'opacity-60'
                } w-full h-5 max-h-20 mr-2 border-none outline-none overflow-hidden text-sm font-medium text-[#000] dark:text-[rgb(245,245,245)] bg-white dark:bg-[rgb(0,0,0)] placeholder:text-[rgb(115,115,115)] dark:placeholder:text-[rgb(168,168,168)] resize-none`}
                onChange={(event) => !isLoadingComment && setComment(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (!isLoadingComment && comment && comment.length > 0) {
                      handleSubmitComment();
                    }
                  }
                }}
                value={comment}
                height={20}
                spellCheck={false}
                ref={commentRef}
                placeholder='Add a comment...'
                disabled={isLoadingComment}
              />
              {!isLoadingComment && comment && comment.length > 0 && (
                <button
                  onClick={handleSubmitComment}
                  className='text-sm font-semibold mr-2 leading-5 text-[rgb(0,149,246)] cursor-pointer hover:text-[rgb(0,55,107)] dark:hover:text-[rgb(245,245,245)]'
                >
                  Post
                </button>
              )}
              {isLoadingComment && (
                <div className='absolute top-[50%] right-[calc(50%-14px)] -translate-y-1/2 -translate-x-1/2'>
                  <LoaderIcon
                    width={24}
                    height={24}
                    className='animate-spinner text-[rgb(16,16,16)] dark:text-[rgb(245,245,245)]'
                  />
                </div>
              )}
            </div>
            <span
              className={`${
                isLoadingComment ? 'opacity-60 cursor-default' : 'cursor-pointer hover:opacity-60'
              } flex items-center justify-center text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)]`}
            >
              <SmileIcon width={14} height={14} />
            </span>
          </div>
        </div>
      </div>
    );
  },
);

PostItem.displayName = 'PostItem';

export default memo(PostItem);
