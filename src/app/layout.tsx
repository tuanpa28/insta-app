import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import { ReduxProvider, RoutesProvider, ThemeProvider } from '@/components/Providers';
import { quickSandFont } from '@/configs/font';
import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Insta App',
  description: 'Nơi kết nối mọi người!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${quickSandFont.className}`}>
      <body className='min-h-screen bg-background'>
        <ReduxProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <RoutesProvider>{children}</RoutesProvider>
          </ThemeProvider>
        </ReduxProvider>
        <ToastContainer
          position='top-right'
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </body>
    </html>
  );
}
