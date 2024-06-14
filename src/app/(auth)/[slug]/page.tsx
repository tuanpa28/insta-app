'use client';

import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CalendarDaysIcon, PlusIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePage = ({ params }: { params: { slug: string } }) => {
  return (
    <div className='h-screen w-[calc(100%-40px)] max-w-[935px] pt-3 px-5 mx-auto mb-7'>
      <div className='flex flex-col'>
        <section>
          <div className='flex flex-row items-center justify-center mb-14'>
            <div className='w-[30%] mr-12 flex items-center justify-center'>
              <Dialog>
                <DialogTrigger asChild>
                  <Avatar className='w-[150px] h-[150px] object-cover cursor-pointer'>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback />
                  </Avatar>
                </DialogTrigger>
                <DialogContent
                  hideCloseBtn
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  className='w-[calc(100vw-88px)] min-w-[260px] max-w-[400px] max-h-[calc(100%-40px)] p-0 !rounded-xl bg-white dark:bg-[rgb(38,38,38)] border-transparent'
                >
                  <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-col items-center justify-center py-4'>
                      <Avatar className='w-[56px] h-[56px] object-cover cursor-pointer mb-4'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback />
                      </Avatar>
                      <span className='text-xl font-medium dark:text-[rgb(245,245,245)]'>
                        Synced profile photo
                      </span>
                      <span className='text-sm font-medium text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)]'>
                        Instagram, Facebook
                      </span>
                    </div>
                    <button className='w-full flex items-center justify-center font-extrabold text-[rgb(0,149,246)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                      Upload Photo
                    </button>
                    <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                      Manage sync settings
                    </button>

                    <button className='w-full flex items-center justify-center font-extrabold text-red-600 dark:text-red-500 py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
                      Remove Current Photo
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
            <div className='w-[70%]'>
              <div className='mb-5 flex items-center'>
                <div className='mr-5 font-medium text-xl'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <span className='cursor-pointer dark:text-[rgb(245,245,245)]'>
                        {params.slug}
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
                            <AvatarImage src='https://github.com/shadcn.png' />
                            <AvatarFallback />
                          </Avatar>
                          <span className='text-base font-bold mb-1.5 dark:text-[rgb(245,245,245)]'>
                            {params.slug}
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
                                February 2020
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
                </div>
                <div className='flex items-center gap-2'>
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

                <Dialog>
                  <DialogTrigger asChild>
                    <div className='p-2 cursor-pointer dark:text-[rgb(245,245,245)]'>
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
                      <button className='w-full flex items-center justify-center font-medium text-primary dark:text-[rgb(245,245,245)] py-1 px-2 min-h-12 text-sm bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.1)] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
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
              </div>
              <div className='mb-5 flex items-center'>
                <div className='text-base mr-10 dark:text-[rgb(245,245,245)]'>
                  <span className='font-semibold mr-1'>0</span>
                  <span className='font-medium'>posts</span>
                </div>
                <div className='text-base mr-10 dark:text-[rgb(245,245,245)]'>
                  <Link href={`/${params.slug}/followers`}>
                    <span className='font-semibold mr-1'>26</span>
                    <span className='font-medium'>followers</span>
                  </Link>
                </div>
                <div className='text-base dark:text-[rgb(245,245,245)]'>
                  <Link href={`/${params.slug}/following`}>
                    <span className='font-semibold mr-1'>11</span>
                    <span className='font-medium'>following</span>
                  </Link>
                </div>
              </div>
              <div>
                <span className='text-sm font-bold dark:text-[rgb(245,245,245)]'>
                  Phạm Anh Tuấn
                </span>
              </div>
            </div>
          </div>
          <div className='flex items-center px-4'>
            <div className='flex flex-col items-center cursor-pointer'>
              <div className='w-[77px] h-[77px] flex items-center justify-center rounded-full bg-[rgb(250,250,250)] dark:bg-[rgb(18,18,18)] relative after:content-[""] after:block after:bg-[rgb(227,227,227)] dark:after:bg-[rgb(47,47,47)] after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-[87px] after:w-[87px] after:z-[-2] after:rounded-full before:content-[""] before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-[85px] before:w-[85px] before:z-[-1] before:rounded-full before:bg-white dark:before:bg-[rgb(0,0,0)]'>
                <PlusIcon width={44} height={44} className='text-[rgb(199,199,199)]' />
              </div>
              <span className='text-xs font-semibold pt-[15px] dark:text-[rgb(245,245,245)]'>
                New
              </span>
            </div>
          </div>
        </section>
        <section></section>
      </div>
    </div>
  );
};

export default ProfilePage;
