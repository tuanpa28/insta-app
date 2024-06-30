'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import {
  BadgeCheckIcon,
  CalendarDaysIcon,
  EllipsisIcon,
  LoaderIcon,
  PlusIcon,
  SettingsIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Error from '@/app/error';
import { LoadingIcon } from '@/components/Icons';
import { PostList } from '@/components/profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { RootPath } from '@/constants/enum';
import { IUser } from '@/interfaces';
import { postService, userService } from '@/services';
import { logOut } from '@/services/authService';
import { getUserByUserName } from '@/services/userService';
import { actions, useStore } from '@/store';

const ProfilePage = ({ params }: { params: { slug: string } }) => {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);
  const [isLoadingFollowUser, setIsLoadingFollowUser] = useState<boolean>(false);
  const [state, dispatch] = useStore();
  const { push, refresh } = useRouter();

  const { status, data, error } = useQuery({
    queryKey: ['profile', { user: params.slug }],
    queryFn: () => getUserByUserName(params.slug),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });

  const { mutateAsync } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      toast.success('Đăng xuất thành công!');
      push(RootPath.SignIn);
    },
    onError: (error) => {
      console.log('error:', error);
      toast.error(error.message || 'Đăng xuất thất bại!');
    },
  });

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

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;

    if (files && files.length > 0) {
      if (!files[0].type.startsWith('image/')) {
        toast.error('Loại file không được hỗ trợ!');
        return;
      }
      setIsLoadingAvatar(true);

      const formData = new FormData();
      formData.append(`image`, files[0]);
      try {
        const response = await postService.uploadImage(formData);
        const avatarUrl = response.data.data[0].url;
        const userId = data?.data?.data?._id;
        dispatch(actions.setAvatar(avatarUrl));
        data && (data.data.data.profile_image = avatarUrl);
        await userService.updateUser(userId, {
          profile_image: avatarUrl,
        });
        toast.success('Upload thành công!');
      } catch (error: any) {
        toast.error(error?.message || 'Upload avatar failed!');
      } finally {
        setIsLoadingAvatar(false);
      }
    }
  };

  const handleRemoveAvatar = async () => {
    setIsLoadingAvatar(true);
    const userId = data?.data?.data?._id;
    try {
      await userService.updateUser(userId, { profile_image: '' });
      dispatch(actions.setAvatar(''));
      data && (data.data.data.profile_image = '');
      toast.success('Xóa ảnh đại diện thành công!');
    } catch (error: any) {
      toast.error(error?.message || 'Remove avatar failed!');
    } finally {
      setIsLoadingAvatar(false);
    }
  };

  if (status === 'pending') {
    return (
      <div className='h-14 mt-10 flex items-center justify-center'>
        <LoadingIcon className='w-10 h-10 animate-spinner' />
      </div>
    );
  }

  if (status === 'error') {
    return <Error reset={refresh} error={error} />;
  }

  return (
    <div className='md:w-[calc(100%-40px)] max-w-[935px] pt-16 sm:pt-20 md:pt-8 px-4 md:px-5 mx-auto'>
      <div className='flex flex-col'>
        <section className='border-b border-solid border-[rgb(219,219,219)] dark:border-[rgb(38,38,38)]'>
          <div className='flex flex-col md:flex-row items-center justify-center sm:justify-start md:justify-center mb-10 md:mb-14'>
            <div className='w-full md:w-[30%] mb-2 md:mb-0 md:mr-12 flex items-center justify-center'>
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className={`w-[77px] h-[77px] md:w-[150px] md:h-[150px] relative after:content-[""] before:content-[""] after:bg-linearGradientAvatar after:block after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-[90px] md:after:h-[166px] after:w-[90px] md:after:w-[166px] after:z-[-2] after:rounded-full before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-[84px] md:before:h-[160px] before:w-[84px] md:before:w-[160px] before:z-[-1] before:rounded-full before:bg-white dark:before:bg-[rgb(0,0,0)]`}
                  >
                    <Avatar
                      className={`w-[77px] h-[77px] md:w-[150px] md:h-[150px] object-cover cursor-pointer`}
                    >
                      <AvatarImage src={data?.data?.data?.profile_image} />
                      <AvatarFallback />
                    </Avatar>
                    {isLoadingAvatar && (
                      <div className='absolute inset-0 flex items-center justify-center rounded-full bg-[rgba(85,85,85,.4)]'>
                        <LoadingIcon className='w-8 h-8 animate-spinner' />
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                {state.user?._id == data?.data?.data?._id && !isLoadingAvatar && (
                  <DialogContent
                    hideCloseBtn
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className='w-[calc(100vw-88px)] min-w-[260px] max-w-[400px] max-h-[calc(100%-40px)] p-0 !rounded-xl bg-white dark:bg-[rgb(38,38,38)] border-transparent'
                  >
                    <div className='flex flex-col justify-center items-center'>
                      <div className='flex flex-col items-center justify-center py-4'>
                        <Avatar className='w-[56px] h-[56px] object-cover cursor-pointer mb-4'>
                          <AvatarImage src={data?.data?.data?.profile_image} />
                          <AvatarFallback />
                        </Avatar>
                        <span className='text-xl font-medium dark:text-[rgb(245,245,245)]'>
                          Synced profile photo
                        </span>
                        <span className='text-sm font-medium text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)]'>
                          Instagram, Facebook
                        </span>
                      </div>
                      <button className='w-full font-extrabold text-[rgb(0,149,246)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                        <label
                          htmlFor='file-upload'
                          className='w-full h-full flex items-center justify-center cursor-pointer bg-transparent'
                        >
                          Upload Photo
                        </label>
                        <input
                          id='file-upload'
                          type='file'
                          onChange={handleAvatarChange}
                          accept='image/*'
                          className='hidden'
                        />
                      </button>
                      <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                        Manage sync settings
                      </button>
                      {!!data?.data?.data?.profile_image && (
                        <button
                          onClick={handleRemoveAvatar}
                          className='w-full flex items-center justify-center font-extrabold text-red-600 dark:text-red-500 py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'
                        >
                          Remove Current Photo
                        </button>
                      )}

                      <DialogClose asChild>
                        <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] rounded-b-xl border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                          Cancel
                        </button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </div>
            <div className='w-full md:w-[70%]'>
              <div className='mb-2 md:mb-5 flex flex-col md:flex-row items-center'>
                <div className='flex md:mr-5 mb-2 md:mb-0 font-medium text-xl'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <span className='cursor-pointer dark:text-[rgb(245,245,245)]'>
                        {data?.data?.data?.username}
                      </span>
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
                            <AvatarImage src={data?.data?.data?.profile_image} />
                            <AvatarFallback />
                          </Avatar>
                          <span className='text-base font-bold mb-1.5 dark:text-[rgb(245,245,245)]'>
                            {data?.data?.data?.username}
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
                                {data?.data?.data?.createdAt &&
                                  new Date(data?.data?.data?.createdAt)?.toLocaleDateString(
                                    'en-US',
                                    {
                                      year: 'numeric',
                                      month: 'long',
                                    },
                                  )}
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
                  {data?.data?.data?.tick && (
                    <BadgeCheckIcon
                      width={18}
                      height={18}
                      className={'ml-1 text-[rgb(0,149,246)] -mt-1'}
                    />
                  )}
                </div>
                {state.user?._id == data?.data?.data?._id ? (
                  <div className='flex items-center gap-2 mb-1 md:mb-0'>
                    <Link
                      href={`/accounts/edit`}
                      className='flex items-center font-semibold text-sm h-8 px-4 bg-[rgb(239,239,239)] dark:bg-[rgb(54,54,54)] hover:dark:bg-[rgb(38,38,38)] dark:text-[rgb(245,245,245)] rounded-lg hover:bg-[rgb(219,219,219)]'
                    >
                      Edit profile
                    </Link>
                    <Link
                      href={`/${params.slug}`}
                      className='flex items-center font-semibold text-sm h-8 px-4 bg-[rgb(239,239,239)] dark:bg-[rgb(54,54,54)] hover:dark:bg-[rgb(38,38,38)] dark:text-[rgb(245,245,245)] rounded-lg hover:bg-[rgb(219,219,219)]'
                    >
                      View archive
                    </Link>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 mb-1 md:mb-0'>
                    <button
                      disabled={isLoadingFollowUser}
                      onClick={() => !isLoadingFollowUser && handleFollowUser(data?.data?.data)}
                      className={`flex items-center justify-center font-semibold text-sm min-w-20 h-8 px-4 dark:bg-[rgb(54,54,54)] hover:dark:bg-[rgb(38,38,38)] dark:text-[rgb(245,245,245)] rounded-lg ${
                        state.user?.followings &&
                        state.user?.followings.includes(data?.data?.data?._id)
                          ? `bg-[rgb(239,239,239)] text-primary ${
                              !isLoadingFollowUser && 'hover:bg-[rgb(219,219,219)]'
                            }`
                          : `bg-[rgb(0,149,246)] text-[rgb(255,255,255)] ${
                              !isLoadingFollowUser && 'hover:bg-[rgb(24,119,242)]'
                            }`
                      }`}
                    >
                      {isLoadingFollowUser ? (
                        <LoaderIcon
                          width={18}
                          height={18}
                          className={`animate-spinner dark:text-[rgb(245,245,245)] ${
                            state.user?.followings &&
                            state.user?.followings.includes(data?.data?.data?._id)
                              ? 'text-[#555]'
                              : 'text-[rgb(245,245,245)]'
                          }`}
                        />
                      ) : state.user?.followings &&
                        state.user?.followings.includes(data?.data?.data?._id) ? (
                        'Following'
                      ) : (
                        'Follow'
                      )}
                    </button>
                    {state.user?.followings &&
                      state.user?.followings.includes(data?.data?.data?._id) && (
                        <Link
                          href={`/inbox`}
                          className='flex items-center font-semibold text-sm h-8 px-4 bg-[rgb(239,239,239)] dark:bg-[rgb(54,54,54)] hover:dark:bg-[rgb(38,38,38)] dark:text-[rgb(245,245,245)] rounded-lg hover:bg-[rgb(219,219,219)]'
                        >
                          Message
                        </Link>
                      )}
                  </div>
                )}
                {state.user?._id == data?.data?.data?._id ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className='p-2 md:ml-1 cursor-pointer dark:text-[rgb(245,245,245)]'>
                        <SettingsIcon />
                      </div>
                    </DialogTrigger>
                    <DialogContent
                      hideCloseBtn
                      onOpenAutoFocus={(e) => e.preventDefault()}
                      className='w-[calc(100vw-88px)] min-w-[260px] max-w-[400px] max-h-[calc(100%-40px)] p-0 !rounded-xl bg-white dark:bg-[rgb(38,38,38)] border-transparent'
                    >
                      <div className='flex flex-col justify-center items-center'>
                        <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] rounded-t-xl'>
                          Apps and websites
                        </button>
                        <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                          QR code
                        </button>
                        <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                          Notifications
                        </button>
                        <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                          Settings and privacy
                        </button>
                        <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                          Meta Verified
                        </button>
                        <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                          Supervision
                        </button>
                        <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                          Embed
                        </button>
                        <button
                          onClick={async () => {
                            dispatch(actions.logOut());
                            await mutateAsync();
                          }}
                          className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'
                        >
                          Log Out
                        </button>
                        <DialogClose asChild>
                          <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] rounded-b-xl border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                            Cancel
                          </button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div className='p-2 ml-1 cursor-pointer dark:text-[rgb(245,245,245)]'>
                    <EllipsisIcon />
                  </div>
                )}
              </div>
              <div className='mb-4 md:mb-5 flex items-center justify-center md:justify-start'>
                <div className='text-base mr-10 dark:text-[rgb(245,245,245)]'>
                  <span className='font-semibold mr-1'>{data?.data?.data?.totalPosts}</span>
                  <span className='font-medium'>posts</span>
                </div>
                <div className='text-base mr-10 dark:text-[rgb(245,245,245)]'>
                  <Link href={`/${params.slug}/followers`}>
                    <span className='font-semibold mr-1'>{data?.data?.data?.followers.length}</span>
                    <span className='font-medium'>followers</span>
                  </Link>
                </div>
                <div className='text-base dark:text-[rgb(245,245,245)]'>
                  <Link href={`/${params.slug}/following`}>
                    <span className='font-semibold mr-1'>
                      {data?.data?.data?.followings.length}
                    </span>
                    <span className='font-medium'>following</span>
                  </Link>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-sm font-bold dark:text-[rgb(245,245,245)]'>
                  {data?.data?.data?.full_name}
                </span>
                <span className='text-sm font-medium dark:text-[rgb(245,245,245)]'>
                  {data?.data?.data?.bio}
                </span>
              </div>
            </div>
          </div>
          {state.user?._id == data?.data?.data?._id && (
            <div className='flex items-center mb-6 md:mb-10'>
              <div className='flex flex-col items-center cursor-pointer'>
                <div className='w-[56px] md:w-[77px] h-[56px] md:h-[77px] flex items-center justify-center rounded-full bg-[rgb(250,250,250)] dark:bg-[rgb(18,18,18)] relative after:content-[""] after:block after:bg-[rgb(227,227,227)] dark:after:bg-[rgb(47,47,47)] after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-[68px] after:w-[68px] md:after:h-[87px] md:after:w-[87px] after:z-[-2] after:rounded-full before:content-[""] before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-[64px] before:w-[64px] md:before:h-[85px] md:before:w-[85px] before:z-[-1] before:rounded-full before:bg-white dark:before:bg-[rgb(0,0,0)]'>
                  <PlusIcon className='text-[rgb(199,199,199)] w-[30px] md:w-[44px] h-[30px] md:h-[44px]' />
                </div>
                <span className='text-xs font-semibold pt-[15px] dark:text-[rgb(245,245,245)]'>
                  New
                </span>
              </div>
            </div>
          )}
        </section>
        <section className='pt-6 mb-4'>
          <PostList userId={data?.data?.data?._id} />
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
