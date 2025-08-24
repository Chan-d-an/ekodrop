'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Ghost, User, X } from 'lucide-react';
import Image from 'next/image';

export  function NewPost() {
  const [caption, setCaption] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [location] = useState('Current Location');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setSelectedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handlePost = () => {
    console.log('Post created:', { caption, isAnonymous, selectedImage, location });
    setCaption('');
    setIsAnonymous(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-dark pt-16 pb-20">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark rounded-2xl shadow-lg p-5 space-y-5"
        >
          <h2 className="text-tdark text-xl font-bold">Create Drop 💧</h2>

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="block w-full h-44 border border-secondary/30 rounded-lg cursor-pointer hover:border-primary transition-colors overflow-hidden"
            >
              {selectedImage ? (
                <div className="relative h-full">
                  <Image
                    src={selectedImage}
                    alt="Selected"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedImage(null);
                    }}
                    className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-tdark">
                  <Camera size={36} className="mb-2" />
                  <span className="text-sm">Tap to add photo</span>
                </div>
              )}
            </label>
          </div>

          {/* Caption */}
          <div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 rounded-lg border border-secondary/30 bg-transparent text-secondary resize-none h-28 focus:outline-none focus:ring-1 focus:ring-primary"
              maxLength={220}
            />
            <div className="text-xs text-tdark text-right mt-1">
              {caption.length}/2200
            </div>
          </div>

          {/* Privacy & Location */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-secondary/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="text-primary" size={20} />
                <span className="text-sm text-tdark">{location}</span>
              </div>
              <button className="text-xs text-primary">Change</button>
            </div>

            <div className="flex items-center justify-between p-3 border border-secondary/30 rounded-lg">
              <div className="flex items-center space-x-2">
                {isAnonymous ? (
                  <Ghost className="text-primary" size={20} />
                ) : (
                  <User className="text-tdark" size={20} />
                )}
                <span className="text-sm text-tdark">
                  {isAnonymous ? 'Anonymous Post' : 'Public Post'}
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`w-10 h-5 rounded-full relative ${
                  isAnonymous ? 'bg-primary' : 'bg-secondary/40'
                }`}
              >
                <motion.div
                  layout
                  className="w-4 h-4 bg-dark rounded-full absolute top-0.5"
                  animate={{ x: isAnonymous ? 20 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>

          {/* Post Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handlePost}
            disabled={!caption.trim()}
            className="w-full bg-primary text-tdark py-3 rounded-lg font-medium disabled:opacity-50"
          >
            Drop It! 💧
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
