import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import {
  ReduxProvider,
  RoutesProvider,
  StoreProvider,
  ThemeProvider,
} from '@/components/Providers';
import { TooltipProvider } from '@/components/ui/tooltip';
import { quickSandFont } from '@/configs/font';
import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Insta Social Network',
  description: 'Insta Social Network',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${quickSandFont.className}`}>
      <body className='min-h-screen'>
        <ReduxProvider>
          <StoreProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider delayDuration={800}>
                <RoutesProvider>{children}</RoutesProvider>
              </TooltipProvider>
            </ThemeProvider>
          </StoreProvider>
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
