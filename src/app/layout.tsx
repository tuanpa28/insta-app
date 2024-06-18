import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import { StoreProvider, TanstackProvider, ThemeProvider } from '@/components/Providers';
import { TooltipProvider } from '@/components/ui/tooltip';
import { quickSandFont } from '@/configs/font';
import '@/styles/globals.css';
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
    <html lang='en' suppressHydrationWarning className={`${quickSandFont.className}`}>
      <body className={`min-h-screen`}>
        <TanstackProvider>
          <StoreProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider delayDuration={800}>{children}</TooltipProvider>
            </ThemeProvider>
          </StoreProvider>
        </TanstackProvider>
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
