"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GetStarted() {
  const helloBuddy = "Hello Buddy".split("");
  const welcomeLine = "Welcome in Ekodrop".split("");

  const [showWelcome, setShowWelcome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setShowWelcome(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(#202020_1px,transparent_1px)] [background-size:20px_20px] flex flex-col items-center justify-center text-white px-4">

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
        className="max-w-xl text-center text-gray-300 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        Drop anonymous thoughts, confessions, or questions and watch them spread across your campus. Stay curious, stay anonymous.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5, duration: 0.8 }}
      >
        <button
          onClick={() => router.push("/sign-in")}
          className="bg-[#72ff50] text-black px-6 py-2 rounded-full font-medium hover:bg-green-400 transition-all"
        >
          Get Started
        </button>
        <button
          onClick={() => router.push("/sign-up")}
          className="border border-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-black transition-all"
        >
          Sign Up
        </button>
      </motion.div>
    </div>
  );
}
