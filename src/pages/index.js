import { Inter } from 'next/font/google';
import Header from '@/components/ui/Header';
import { useSession } from 'next-auth/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import HomeMain from './home/HomeMain';


export default function Home() {
  // const session = useSession();
  // console.log(session);
  return (
    <main className={`flex flex-col min-h-screen`}>
      <HomeMain />
    </main>
  );
}
