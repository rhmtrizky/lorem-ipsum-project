import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider, useSession } from 'next-auth/react';
import 'boxicons/css/boxicons.min.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );
}
