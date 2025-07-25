'use client';

import { useState } from 'react';

interface DescriptionToggleProps {
  text: string;
  limit?: number;
}

export default function DescriptionToggle({ text, limit = 100 }: DescriptionToggleProps) {
  const [showMore, setShowMore] = useState(false);

  const isLongText = text.length > limit;
  const displayText = showMore || !isLongText ? text : text.slice(0, limit) + '...';

  return (
    <div className="text-sm text-gray-800">
      <p>{displayText}</p>
      {isLongText && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-blue-500 hover:underline mt-1"
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}