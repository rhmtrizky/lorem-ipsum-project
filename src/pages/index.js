import { Inter } from 'next/font/google';
import Header from '@/components/ui/Header';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen`}>
      <Header />
    </main>
  );
}
