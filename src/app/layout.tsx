import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import { AntdProvider, PrivateRouteProvider, ReduxProvider } from '@/components/Providers';
import '@/styles/base/index.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Insta App',
  description: 'Nơi kết lối mọi người!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ReduxProvider>
          <PrivateRouteProvider>
            <AntdProvider>{children}</AntdProvider>
          </PrivateRouteProvider>
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
