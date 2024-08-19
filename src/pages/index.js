import { useSession } from 'next-auth/react';
import HomeMain from './home/HomeMain';

export default function Home() {
  const session = useSession();
  return (
    <main className={`flex flex-col min-h-screen`}>
      <HomeMain />
    </main>
  );
}