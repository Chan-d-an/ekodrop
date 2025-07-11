'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Clock, Ghost, User, X, Check } from 'lucide-react';

export function NewPost() {
  const [step, setStep] = useState(1);
  const [caption, setCaption] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [location, setLocation] = useState('Current Location');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    // Create post logic here
    console.log('Creating post:', { caption, isAnonymous, selectedImage, location });
    // Reset form
    setStep(1);
    setCaption('');
    setIsAnonymous(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] to-[#E8F4FD] pt-16 pb-20">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-xl font-bold">Create Drop</h2>
              <div className="flex items-center space-x-2">
                <Clock className="text-white" size={16} />
                <span className="text-white text-sm">24h</span>
              </div>
            </div>
            
            {/* Step Indicator */}
            <div className="flex items-center justify-center mt-4 space-x-2">
              {[1, 2, 3].map((num) => (
                <motion.div
                  key={num}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= num 
                      ? 'bg-white text-[#00C4CC]' 
                      : 'bg-white/20 text-white'
                  }`}
                  animate={{ scale: step === num ? 1.1 : 1 }}
                >
                  {step > num ? <Check size={16} /> : num}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Photo (Optional)</h3>
                  
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#00C4CC] transition-colors"
                    >
                      {selectedImage ? (
                        <div className="relative h-full">
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedImage(null);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <Camera size={48} className="mb-2" />
                          <span className="text-sm">Tap to add photo</span>
                        </div>
                      )}
                    </label>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    Next
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">What's on your mind?</h3>
                  
                  <div className="relative">
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00C4CC] focus:border-transparent"
                      maxLength={220}
                    />
                    <span className="absolute bottom-2 right-2 text-xs text-gray-400">
                      {caption.length}/220
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(3)}
                      disabled={!caption.trim()}
                      className="flex-1 bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-[#00C4CC]" size={20} />
                        <div>
                          <div className="font-medium text-gray-800">Location</div>
                          <div className="text-sm text-gray-600">{location}</div>
                        </div>
                      </div>
                      <button className="text-[#00C4CC] text-sm font-medium">
                        Change
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {isAnonymous ? (
                          <Ghost className="text-[#8E44AD]" size={20} />
                        ) : (
                          <User className="text-[#00C4CC]" size={20} />
                        )}
                        <div>
                          <div className="font-medium text-gray-800">
                            {isAnonymous ? 'Anonymous Post' : 'Public Post'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {isAnonymous ? 'Your identity is hidden' : 'Your name will be shown'}
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsAnonymous(!isAnonymous)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          isAnonymous ? 'bg-[#8E44AD]' : 'bg-gray-300'
                        }`}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full"
                          animate={{ x: isAnonymous ? 28 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePost}
                      className="flex-1 bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
                    >
                      Drop It! 💧
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}