import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <main
        className={`w-full md:w-[calc(100%-var(--nav-narrow-width))] lg:w-[calc(100%-var(--nav-medium-width))] 3xl:w-[calc(100%-var(--nav-wide-width))] ml-auto h-screen overflow-y-auto transition-[width] ease-in-out duration-300`}
      >
        <div className='w-full h-full flex flex-col'>
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
}
