
import React from 'react';
import { Alpha } from '../types';
import { CodeBracketIcon } from './icons';

interface AlphaCardProps {
  alpha: Alpha;
}

export const AlphaCard: React.FC<AlphaCardProps> = ({ alpha }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 h-full flex flex-col hover:border-cyan-400 transition-colors duration-300">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-gray-700 rounded-full mr-3">
          <CodeBracketIcon className="h-6 w-6 text-cyan-400" />
        </div>
        <h3 className="text-lg font-bold text-white">{alpha.name}</h3>
      </div>
      <p className="text-gray-400 leading-relaxed flex-grow">
        {alpha.description}
      </p>
    </div>
  );
};
