import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import Header from '@/components/ui/Header';
import { useContext, useEffect } from 'react';
import Footer from '@/components/ui/Footer';
import Toaster from '@/components/ui/Alert';
import AppShell from '@/components/fragments/AppShell';
import { ToasterProvider } from '@/contexts/ToasterContext';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
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
      <ToasterProvider>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </ToasterProvider>
    </SessionProvider>
  );
}
