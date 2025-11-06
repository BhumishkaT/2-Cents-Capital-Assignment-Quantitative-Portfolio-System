export enum Section {
  OBJECTIVE = 'Objective',
  SYSTEM_ARCHITECTURE = 'System Architecture',
  ALPHA_LIBRARY = 'Alpha Library',
  RIGOROUS_TESTING = 'Rigorous Testing',
  REPLICATION_TEST = 'Deployment & Replication Test',
  FINAL_REPORT = 'Final Report',
}

export interface Alpha {
  name: string;
  description: string;
}

export interface AlphaResult {
  trades: number;
  pnl: number;
  match: 'PASS' | 'FAIL';
  analysis: string;
}

export interface ReplicationResults {
  portfolio_pnl: {
    sandbox_pnl: number;
    backtest_pnl: number;
    pnl_match: 'PASS' | 'FAIL';
  };
  alphas: {
    [key: string]: AlphaResult;
  };
}