import { AuthProvider } from '@/components/Providers';

export default function NoAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="bg-[url('/images/bg-login.webp')] bg-no-repeat bg-[length:1785px_510px] bg-top">
        {children}
      </div>
    </AuthProvider>
  );
}
