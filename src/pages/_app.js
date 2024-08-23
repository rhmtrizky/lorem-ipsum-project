import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import Header from '@/components/ui/Header';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const excludedPaths = ['/auth', '/admin', '/doctor', '/pharmacy', '/404'];
  const showNavbar = !excludedPaths.some((path) => router.pathname.startsWith(path));
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        {showNavbar && <Header />}
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );
}
