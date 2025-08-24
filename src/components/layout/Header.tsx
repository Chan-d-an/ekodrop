'use client'
import { useEffect, useState } from "react";
import {
  Bell,
  Droplet,
  Settings
} from "lucide-react";
import Link from "next/link";

export function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <section>
      {showHeader && (
        <header
          className="fixed top-0 left-0 right-0 bg-dark backdrop-blur-lg z-50"
        >
          <div className="flex justify-between items-center  px-4 py-3 max-w-md mx-auto relative">
            <div className="relative">
              <div
                className="flex items-center space-x-2 focus:outline-none"
              ><div className="flex flex-row items-center">
                  <h1 className="text-xl font-semibold text-tdark tracking-wider">Ekodrop </h1>
                  <Droplet className="fill-green-400 size-3 -rotate-15 -mt-2" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href={'/notifications'}

                className="p-2 rounded-full  transition-colors"
              >
                <Bell size={20} className="text-tdark" />
              </Link>
              <Link href={'/profile/settings'}

                className="p-2 rounded-full transition-colors"
              >
                <Settings size={20} className="text-tdark" />
              </Link>
            </div>
          </div>
        </header>
      )
      }
    </section>
  );
}
