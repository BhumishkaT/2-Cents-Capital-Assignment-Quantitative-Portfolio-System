
import React from 'react';

interface SectionCardProps {
  title: string;
  content: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, content }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
      <div
        className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
