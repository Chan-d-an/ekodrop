import { HomeFeed } from '@/components/home/HomeFeed';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
export default function Home() {


  return (
    <div >
      <Header />
      <HomeFeed />
      <BottomNav />
    </div>
  );
}