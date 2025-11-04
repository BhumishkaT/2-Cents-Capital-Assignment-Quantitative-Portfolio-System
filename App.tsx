
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SectionCard } from './components/SectionCard';
import { AlphaCard } from './components/AlphaCard';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Section, Alpha, ReplicationResults } from './types';
import {
  getSectionExplanation,
  generateAlphaStrategies,
  simulateReplicationResults
} from './services/geminiService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.OBJECTIVE);
  const [explanation, setExplanation] = useState<string>('');
  const [alphas, setAlphas] = useState<Alpha[]>([]);
  const [results, setResults] = useState<ReplicationResults | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSectionContent = useCallback(async () => {
    setIsLoading(true);
    try {
      if (activeSection === Section.ALPHA_LIBRARY) {
        const generatedAlphas = await generateAlphaStrategies();
        setAlphas(generatedAlphas);
      } else if (activeSection === Section.REPLICATION_TEST) {
        const simulatedResults = await simulateReplicationResults();
        setResults(simulatedResults);
      } else {
        const content = await getSectionExplanation(activeSection);
        setExplanation(content);
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
      setExplanation("Failed to load content. Please try refreshing the page.");
    } finally {
      setIsLoading(false);
    }
  }, [activeSection]);

  useEffect(() => {
    fetchSectionContent();
  }, [fetchSectionContent]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner />
        </div>
      );
    }

    switch (activeSection) {
      case Section.ALPHA_LIBRARY:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {alphas.map((alpha, index) => (
              <AlphaCard key={index} alpha={alpha} />
            ))}
          </div>
        );
      case Section.REPLICATION_TEST:
        return results ? <ResultsDisplay results={results} /> : null;
      default:
        return <SectionCard title={activeSection} content={explanation} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 font-sans">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <h1 className="text-3xl font-bold text-white mb-6 capitalize">{activeSection.replace(/_/g, ' ')}</h1>
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
