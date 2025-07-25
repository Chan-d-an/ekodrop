import { HomeFeed } from '@/components/home/HomeFeed';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
export default function Home() {


  return (
    <div className='dark '>
      <Header />
      <div className='pt-16 px-4 bg-dark'>
          <HomeFeed />
      </div>
      <BottomNav />
    </div>
  );
}