'use client';

import { Header } from '@/app/components/layout/Header';
import { BottomNav } from '@/app/components/layout/BottomNav';
import { NewPost } from '@/app/components/drop/NewPost';

export default function DropPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] to-[#E8F4FD]">
      <Header />
      <main>
        <NewPost />
      </main>
      <BottomNav />
    </div>
  );
}