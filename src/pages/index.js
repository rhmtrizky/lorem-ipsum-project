import { Archivo_Black, Roboto } from '@next/font/google';
import HomeMain from './home/HomeMain';


const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
})

export default function Home() {
  return (
    <main className={`flex flex-col min-h-screen`}>
      <HomeMain />
    </main>
  );
}