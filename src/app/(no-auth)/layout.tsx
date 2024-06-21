import { AuthProvider } from '@/components/Providers';

export default function NoAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="bg-[url('/images/bg-login.webp')] dark:bg-[url('/images/dark-bg-login.png')] dark:bg-[rgb(16,16,16)] bg-no-repeat bg-[length:1785px_510px] bg-top">
        {children}
      </div>
    </AuthProvider>
  );
}
