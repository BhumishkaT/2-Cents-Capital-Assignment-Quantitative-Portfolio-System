import React from 'react';
import { Section } from '../types';
import { ChartBarIcon, CodeBracketIcon, DocumentTextIcon, ScaleIcon, CheckCircleIcon, CubeTransparentIcon } from './icons';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const navItems = [
  { section: Section.OBJECTIVE, icon: <ScaleIcon /> },
  { section: Section.SYSTEM_ARCHITECTURE, icon: <CubeTransparentIcon /> },
  { section: Section.ALPHA_LIBRARY, icon: <CodeBracketIcon /> },
  { section: Section.RIGOROUS_TESTING, icon: <ChartBarIcon /> },
  { section: Section.REPLICATION_TEST, icon: <CheckCircleIcon /> },
  { section: Section.FINAL_REPORT, icon: <DocumentTextIcon /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="w-16 md:w-64 bg-gray-800 p-2 md:p-4 flex flex-col border-r border-gray-700">
      <div className="flex items-center mb-8">
        <DocumentTextIcon className="h-8 w-8 text-cyan-400" />
        <h1 className="text-xl font-bold ml-3 hidden md:block text-white">Quant System</h1>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.section}>
            <button
              onClick={() => setActiveSection(item.section)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                activeSection === item.section
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <div className="h-6 w-6">{item.icon}</div>
              <span className="ml-4 hidden md:block font-semibold">{item.section}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};