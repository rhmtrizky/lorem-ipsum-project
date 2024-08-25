import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Link ke manifest.json */}
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* Anda juga bisa menambahkan meta tag PWA lainnya di sini */}
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
