import React from 'react';
import { ReplicationResults, AlphaResult } from '../types';

interface ResultsDisplayProps {
  results: ReplicationResults;
}

const MatchBadge: React.FC<{ match: 'PASS' | 'FAIL' }> = ({ match }) => (
  <span className={`px-3 py-1 text-sm font-bold rounded-full ${
    match === 'PASS' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
  }`}>
    {match}
  </span>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const { portfolio_pnl, alphas } = results;

  return (
    <div className="space-y-8">
      {/* Portfolio P&L Section */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Portfolio P&L Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Sandbox P&L</p>
            <p className="text-2xl font-mono text-white">${portfolio_pnl.sandbox_pnl.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Backtest P&L</p>
            <p className="text-2xl font-mono text-white">${portfolio_pnl.backtest_pnl.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col items-center justify-center">
            <p className="text-sm text-gray-400 mb-2">P&L Match</p>
            <MatchBadge match={portfolio_pnl.pnl_match} />
          </div>
        </div>
      </div>

      {/* Alphas Breakdown Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        <h3 className="text-xl font-bold text-white p-6">Alphas Replication Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="p-4 font-semibold text-gray-300">Alpha Name</th>
                <th className="p-4 font-semibold text-gray-300 text-right">Trades</th>
                <th className="p-4 font-semibold text-gray-300 text-right">P&L</th>
                <th className="p-4 font-semibold text-gray-300 text-center">Match</th>
                <th className="p-4 font-semibold text-gray-300">Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {(Object.entries(alphas) as [string, AlphaResult][]).map(([name, result]) => (
                <tr key={name} className="hover:bg-gray-700/30">
                  <td className="p-4 font-mono text-cyan-400">{name}</td>
                  <td className="p-4 font-mono text-white text-right">{result.trades}</td>
                  <td className={`p-4 font-mono text-right ${result.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${result.pnl.toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <MatchBadge match={result.match} />
                  </td>
                  <td className={`p-4 text-sm ${result.match === 'FAIL' ? 'text-red-300' : 'text-gray-400'}`}>
                    {result.analysis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};