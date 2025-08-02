"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EMOJIS = ["👻", "🧠", "🎭", "👀", "🤖", "💭", "🔮", "😶"];

export default function GetStarted() {
  const helloBuddy = "Hello Buddy".split("");
  const welcomeLine = "Welcome in Ekodrop".split("");

  const [showWelcome, setShowWelcome] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState([
    { id: 1, emoji: "👻", x: "10%", y: "10%" },
    { id: 2, emoji: "🧠", x: "80%", y: "75%" },
    { id: 3, emoji: "🎭", x: "30%", y: "85%" },
  ]);

  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setShowWelcome(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  const handleEmojiClick = (id, x, y) => {
  const baseX = parseFloat(x);
  const baseY = parseFloat(y);
  const newEmojis = Array.from({ length: Math.floor(Math.random() * 4) + 2 }).map((_, i) => {
    const offsetX = (Math.random() - 0.5) * 10; // +/-5%
    const offsetY = (Math.random() - 0.5) * 10; // +/-5%
    return {
      id: Date.now() + i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: `${Math.min(95, Math.max(0, baseX + offsetX))}%`,
      y: `${Math.min(95, Math.max(0, baseY + offsetY))}%`,
    };
  });
  setFloatingEmojis(prev => [...prev, ...newEmojis]);
};

  return (
    <div className="min-h-screen relative overflow-hidden bg-black bg-[conic-gradient(at_top_left,_#0f0c29,_#302b63,_#24243e)] flex flex-col items-center justify-center text-white px-4">
      {/* Floating Emojis */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] [background-size:20px_20px] opacity-30 animate-pulse" />
        {floatingEmojis.map(({ id, emoji, x, y }) => (
          <motion.div
            key={id}
            className="absolute text-3xl cursor-pointer pointer-events-auto"
            style={{ top: y, left: x }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            onClick={() => handleEmojiClick(id, x, y)}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="z-10">
        {/* Animated Word Section */}
        <div className="h-24 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!showWelcome ? (
              <motion.div
                key="hello"
                className="flex text-4xl md:text-5xl font-bold"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                  hidden: {},
                  exit: { opacity: 0, transition: { duration: 0.5 } },
                }}
              >
                {helloBuddy.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: 50 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="welcome"
                className="flex text-4xl md:text-5xl font-bold"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {welcomeLine.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: 50 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Description */}
        <motion.p
          className="max-w-xl text-center text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          Drop anonymous thoughts, confessions, or questions and watch them spread across your campus. Stay curious, stay anonymous.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5, duration: 0.8 }}
        >
          <button
            onClick={() => router.push("/sign-in")}
            className="bg-[#72ff50] text-black px-6 py-2 rounded-full font-medium hover:bg-green-400 transition-all shadow-lg hover:shadow-green-500/50"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push("/sign-up")}
            className="border border-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-black transition-all shadow-lg hover:shadow-white/30"
          >
            Sign Up
          </button>
        </motion.div>
      </div>

      {/* Ambient glitch/flicker effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="w-full h-full animate-flicker bg-black/5" />
      </div>
    </div>
  );
}
