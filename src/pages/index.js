import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <h1 className={inter.className}>Home Page</h1>
      <Link href="/auth/register">Register</Link>
    </div>
  );
}
