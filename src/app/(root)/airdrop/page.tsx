'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, Gift, WifiOff, Lock, Unlock, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AirDropPage() {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [waitlistCount, setWaitlistCount] = useState(1257);
  const [joined, setJoined] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const totalGoal = 20000;
  const progress = Math.min((waitlistCount / totalGoal) * 100, 100);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const toggleCard = (cardId: string) => {
    setOpenCard(openCard === cardId ? null : cardId);
  };

  const handleJoin = () => {
    if (!joined) {
      setWaitlistCount(prev => prev + 1);
      setJoined(true);
      triggerConfetti();
    }
  };

  const handleSuggestionSubmit = () => {
    console.log('User suggestion:', suggestion);
    setShowSuggestion(false);
    setSuggestion('');
    triggerConfetti();
  };

  const getUnlockMessage = () => {
    if (progress >= 100) return '🎉 Unlocked! Feature is now LIVE!';
    if (progress >= 75) return '🚀 Almost there! The final push!';
    if (progress >= 50) return '🔥 Over halfway! Keep sharing!';
    return '✨ Invite friends to unlock sooner!';
  };

  const cards = [
    {
      id: 'anonymous',
      icon: <Ghost className="text-primary" size={20} />,
      title: 'Anonymous Sharing',
      content: (
        <>
          <p className="mb-2">
            Share accounts <strong>anonymously</strong> with nearby users – no personal info revealed.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Your real name stays hidden.</li>
            <li>Only your proximity is shown.</li>
            <li>Temporary alias for recipients.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'rewards',
      icon: <Gift className="text-pink-500" size={20} />,
      title: 'Rewards & Badges',
      content: (
        <>
          <p className="mb-2">
            Earn points & badges for every successful share! Unlock hidden icons and exclusive perks.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Daily streak bonuses.</li>
            <li>Exclusive “Early Bird” badge for first users.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'offline',
      icon: <WifiOff className="text-orange-400" size={20} />,
      title: 'Offline Mode',
      content: (
        <>
          <p className="mb-2">
            Share even without internet! Your presence will sync once you reconnect.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Perfect for events with weak signals.</li>
            <li>Automatic retry & sync.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <main className="pt-8 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              {progress >= 100 ? (
                <Unlock className="text-green-400" size={32} />
              ) : (
                <Lock className="text-primary" size={32} />
              )}
            </div>
            <h1 className="text-2xl font-bold text-tdark mb-1">AirDrop</h1>
            <p className="text-tdark text-sm">Share your presence with nearby users</p>
            <div className="mt-2 text-xs text-yellow-400 bg-yellow-900/20 px-3 py-1 rounded-full inline-block">
              🚧 Unlock at {totalGoal.toLocaleString()} beta waitlist users!
            </div>
            <p className="mt-2 text-xs text-secondary/60 italic">
              {waitlistCount.toLocaleString()} people already on the waitlist 🚀
            </p>

            {/* Unlock Progress Bar */}
            <div className="mt-4 w-full max-w-xs mx-auto">
              <div className="h-3 bg-secondary/20 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
              <p className="mt-1 text-xs text-secondary/60">{getUnlockMessage()}</p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ height: 55 }}
                animate={{ height: openCard === card.id ? 200 : 55 }}
                transition={{ duration: 0.4 }}
                className="bg-secondary/5 rounded-xl overflow-hidden relative border border-secondary/10"
              >
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer"
                  onClick={() => toggleCard(card.id)}
                >
                  <div className="flex items-center space-x-3">
                    {card.icon}
                    <h2 className="text-sm font-semibold text-secondary">{card.title}</h2>
                  </div>
                  <span className="text-xs text-secondary/70">
                    {openCard === card.id ? 'Hide ▲' : 'Learn More ▼'}
                  </span>
                </div>
                {openCard === card.id && (
                  <div className="px-4 pb-4 text-xs text-secondary/80 leading-relaxed">
                    {card.content}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Inline Buttons */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={handleJoin}
              disabled={joined}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                joined
                  ? 'bg-green-500 text-white'
                  : 'bg-primary text-tlight hover:bg-primary/80'
              }`}
            >
              {joined ? '✅ Joined!' : '🔓 Join Beta Waitlist'}
            </button>

            <button
              onClick={() => setShowSuggestion(true)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition bg-secondary/40 text-white hover:bg-secondary/60"
            >
              💡 Suggest a Feature
            </button>
          </div>

          {/* Suggestion Modal */}
          <AnimatePresence>
            {showSuggestion && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-dark p-5 rounded-lg shadow-lg w-80"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                >
                  <h2 className="text-lg font-bold text-white mb-2">
                    💡 Suggest a Feature
                  </h2>
                  <textarea
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    placeholder="Your idea to improve AirDrop..."
                    className="w-full p-2 rounded bg-secondary/20 text-white text-sm mb-3"
                    rows={3}
                  />
                  <button
                    onClick={handleSuggestionSubmit}
                    className="bg-primary text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-primary/80 flex items-center gap-1"
                  >
                    <Send size={14} /> Submit
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
