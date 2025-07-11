'use client';

import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { NewPost } from '@/components/drop/NewPost';

export default function DropPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] to-[#E8F4FD]">
      
      <main>
        <NewPost />
      </main>
      <BottomNav />
    </div>
  );
}