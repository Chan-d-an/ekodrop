'use client';

import { useEffect, useState } from "react";
import {
  Bell,
  Droplet,
  MessageSquarePlus,
  ChevronDown,
  User,
  Ghost,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [feedType, setFeedType] = useState("Anonymous Users");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const savedFeed = localStorage.getItem("selectedFeed");
    if (savedFeed) {
      setFeedType(savedFeed);
    }

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

  const handleSelectFeed = (type: string) => {
    setFeedType(type);
    setShowDropdown(false);
    localStorage.setItem("selectedFeed", type);
    location.reload();
  };

  return (
    <section>
      {showHeader && (
        <header
          
          className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-md z-50"
        >
          <div className="flex justify-between items-center px-4 py-3 max-w-md mx-auto relative">
            {/* Left: Logo + Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                   
                  >
                    <Droplet className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] bg-clip-text text-transparent">
                  EkoDrop
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {/* Feed Dropdown */}
              {showDropdown && (
                <div className="absolute top-12 left-0 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <button
                    onClick={() => handleSelectFeed("Real Account Users")}
                    className={`flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-50 transition-all ${
                      feedType === "Real Account Users" ? "text-[#00C4CC] font-semibold bg-gray-100" : "text-gray-700"
                    }`}
                  >
                    <User size={18} /> Real Account Users
                  </button>
                  <button
                    onClick={() => handleSelectFeed("Anonymous Users")}
                    className={`flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-50 transition-all ${
                      feedType === "Anonymous Users" ? "text-[#00C4CC] font-semibold bg-gray-100" : "text-gray-700"
                    }`}
                  >
                    <Ghost size={18} /> Anonymous Users
                  </button>
                  <button
                    onClick={() => handleSelectFeed("Blend Feed")}
                    className={`flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-50 transition-all ${
                      feedType === "Blend Feed" ? "text-[#00C4CC] font-semibold bg-gray-100" : "text-gray-700"
                    }`}
                  >
                    <Layers size={18} /> Blend Feed (Both)
                  </button>
                </div>
              )}
            </div>

            {/* Right: Icons */}
            <div className="flex items-center space-x-3">
              <button
                
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell size={20} className="text-gray-600" />
              </button>
              <button
                
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <MessageSquarePlus size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>
      )}
    </section>
  );
}
