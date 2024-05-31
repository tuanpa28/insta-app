import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [fullMain, setFullMain] = useState(false);
  const fullMain = false;
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <main
        className={`w-full md:w-[calc(100%-var(--nav-narrow-width))] lg:w-[calc(100%-var(--nav-medium-width))] 3xl:w-[calc(100%-var(--nav-wide-width))] ml-auto h-screen overflow-hidden transition-[width] ease-in-out duration-300`}
      >
        <div className='w-full flex flex-col overflow-y-auto h-screen'>
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
}
