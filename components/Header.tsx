
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 border-b border-gray-700 shadow-md flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-200">Assignment Dashboard & AI Guide</h2>
      <div className="flex items-center space-x-2">
         <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse-fast"></div>
         <span className="text-sm text-gray-400">System Status: Nominal</span>
      </div>
    </header>
  );
};
