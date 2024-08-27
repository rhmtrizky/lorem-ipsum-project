import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import Header from '@/components/ui/Header';
import { useEffect } from 'react';
import Footer from '@/components/ui/Footer';


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const excludedPaths = ['/auth', '/admin', '/doctor', '/pharmacy', '/404'];
  const showNavbar = !excludedPaths.some((path) => router.pathname.startsWith(path));

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered'))
        .catch((err) => console.error('Service Worker registration failed', err));
    }
  }, []);
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        {showNavbar && <Header />}
        <Component {...pageProps} />
        {<Footer/>}
      </NextUIProvider>
    </SessionProvider>
  );
}
