'use client';

import { usePathname } from 'next/navigation';

import Footer from '@/components/Footer';
import HeaderMobile from '@/components/HeaderMobile';
import Sidebar, { SidebarMobile } from '@/components/Sidebar';
import { RootPath } from '@/constants/enum';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  return (
    <div className='flex flex-row'>
      <HeaderMobile />
      <Sidebar />
      <SidebarMobile />
      <main
        className={`${
          pathName.startsWith(RootPath.Inbox) && 'md:!w-[calc(100%-var(--nav-narrow-width))]'
        } w-full md:w-[calc(100%-var(--nav-narrow-width))] xl:w-[calc(100%-var(--nav-medium-width))] 3xl:w-[calc(100%-var(--nav-wide-width))] ml-auto h-screen overflow-y-auto transition-[width] ease-in-out duration-300`}
      >
        <div className='w-full h-full flex flex-col pt-[50px] sm:pt-[68px] md:pt-4'>
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
}
