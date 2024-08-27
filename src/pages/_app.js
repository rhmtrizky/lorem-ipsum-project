import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import Header from '@/components/ui/Header';
import { useEffect, useState } from 'react';
import Footer from '@/components/ui/Footer';
import Toaster from '@/components/ui/Alert';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  // toaater
  const [toaster, setToaster] = useState({});

  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 3000);
    }
  }, [toaster]);

  // header and footer
  const router = useRouter();

  const excludedPathsNavbar = ['/auth', '/admin', '/doctor', '/pharmacy', '/404'];
  const showNavbar = !excludedPathsNavbar.some((path) => router.pathname.startsWith(path));

  const excludedPathsFooter = ['/auth', '/admin', '/doctor', '/pharmacy', '/404', '/patient', '/schedules', '/find-doctor'];
  const showFooter = !excludedPathsFooter.some((path) => router.pathname.startsWith(path));

  // service worker
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
        <Component
          {...pageProps}
          setToaster={setToaster}
        />
        {showFooter && <Footer />}
        {Object.keys(toaster).length > 0 && (
          <Toaster
            variant={toaster.variant}
            message={toaster.message}
            setToaster={setToaster}
          />
        )}
      </NextUIProvider>
    </SessionProvider>
  );
}
