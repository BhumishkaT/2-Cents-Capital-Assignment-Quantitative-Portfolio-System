import { Section, Alpha, ReplicationResults } from '../types';

// --- MOCK GEMINI SERVICE ---
// In a real app, this would be wired up to @google/genai

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const explanations: Record<Section, string> = {
  [Section.OBJECTIVE]: `The primary objective is not to build a profitable portfolio, but to engineer a scientifically rigorous, event-driven trading system. The system must be capable of managing a diverse portfolio of alphas across multiple assets (Crypto, Equities, FX) and timeframes. The absolute core challenge is **replication**: ensuring that the portfolio-level results from a backtest can be perfectly reproduced in a live-trading simulation using logged market data. This validates the entire system, from data handling to execution logic, removing any chance of look-ahead bias or simulation artifacts.`,
  [Section.SYSTEM_ARCHITECTURE]: `The system must be designed for robustness and scalability. Key components include:
<br/><br/>
1.  **Broker Connectivity Layer:** Abstracted modules for connecting to Binance, Interactive Brokers, and Zerodha. Each module handles authentication, data subscription, and order execution specific to its API.
2.  **Event-Driven Core:** A central event queue (e.g., using asyncio or a message broker) that processes market data, signals, order fills, and risk updates sequentially. This ensures chronological integrity.
3.  **Data Handler:** A sophisticated component responsible for requesting, storing, and synchronizing data across multiple assets and timeframes (e.g., 1-minute bars, 1-hour bars, tick data). It must provide a unified data interface to the strategies.
4.  **Portfolio Manager:** Tracks positions, calculates P&L, and manages overall portfolio risk. It aggregates positions from all individual alphas.
5.  **Execution Handler:** Translates signals from alphas into actual orders, considering slippage and transaction costs.
6.  **Logging & Monitoring:** Comprehensive logging of all events is critical for the replication test.`,
  [Section.RIGOROUS_TESTING]: `Rigorous testing is performed at both the individual alpha and portfolio levels to ensure robustness and prevent overfitting.
<br/><br/>
-   **Backtesting:** Historical data is used to simulate strategy performance. A full \`quantstats\` report provides metrics like Sharpe Ratio, Sortino Ratio, Max Drawdown, etc. An alpha correlation matrix is generated to ensure diversification.
-   **Hyper-Parameter Tuning (HPT):** Using libraries like Optuna, key parameters of alphas (e.g., lookback periods, z-score thresholds) are systematically optimized to find the best performing configurations.
-   **Walk-Forward Optimization (WFO):** This is a more robust testing method. The system is optimized on a historical data segment ("in-sample") and then tested on the subsequent unseen segment ("out-of-sample"). This process is repeated, rolling forward through time. Plotting the In-Sample vs. Out-of-Sample equity curves demonstrates if the strategy is adaptable to new market conditions.`,
  [Section.REPLICATION_TEST]: `This is the ultimate validation of the trading system. The process is as follows:
<br/><br/>
1.  **Sandbox Deployment:** The complete system with all 5 alphas is deployed on a server, connecting to the sandbox/paper trading environments of the brokers.
2.  **Live Logging:** For a set period (e.g., one week), the system runs live, logging every single market data tick, order, and fill with precise timestamps.
3.  **Replay Backtest:** The system's backtester is run in a special "replay" mode. Instead of using historical database queries, it is fed the exact, raw, timestamped market data stream that was logged during the sandbox run.
4.  **The "Must-Match" Requirement:** The trade log, final P&L, and equity curve from this replay backtest must perfectly match the results from the sandbox run. Any discrepancy, no matter how small, indicates a flaw in the system (e.g., look-ahead bias, incorrect latency handling, or non-deterministic logic) and must be investigated.`,
  [Section.FINAL_REPORT]: `The final submission is a professional, 15-20 page PDF report that consolidates all your work. It's not just about presenting results, but demonstrating the rigor of your process. It must include:
<br/><br/>
1.  **System Architecture:** A clear, detailed diagram of your system (e.g., using UML or a similar standard). This diagram must visually explain the flow of data and events between components like the Broker Connectivity Layer, Data Handler, Event Core, Portfolio Manager, and Execution Handler. Special attention should be given to how the multi-source data handler synchronizes data from different assets and timeframes.
<br/><br/>
2.  **Alpha Library:** A complete mathematical and logical description of each of your five alphas. For each alpha, you must specify the exact formulas used (e.g., z-score calculation), the parameters (lookback periods, thresholds), the entry/exit conditions, and the risk management rules (stop-loss, take-profit).
<br/><br/>
3.  **Backtest Results:** This section presents the empirical evidence for your portfolio's performance. It must include the Walk-Forward Optimization (WFO) equity curves (In-Sample vs. Out-of-Sample) for the entire portfolio. You must also include the alpha correlation matrix to prove that your strategies are diversified and not redundant.
<br/><br/>
4.  **The Replication Analysis:** This is the most critical section. You must present your \`results.json\` file and provide a detailed discussion. If all tests passed, explain why you believe your architecture succeeded. If any test failed (like the example 'alpha_5_orderbook'), you must conduct a deep root-cause analysis. This analysis is mandatory and demonstrates a higher level of understanding than a perfect result with no explanation. Pinpoint the exact cause of the mismatch (e.g., latency, data tick differences, order queue position) and propose a solution.`,
  [Section.ALPHA_LIBRARY]: '' // This is handled by generateAlphaStrategies
};

export const getSectionExplanation = async (section: Section): Promise<string> => {
  await delay(500);
  if (explanations[section]) {
    return explanations[section];
  }
  throw new Error('Section not found');
};

export const generateAlphaStrategies = async (): Promise<Alpha[]> => {
  await delay(800);
  return [
    {
      name: 'Alpha 1: Pairs Trading Mean-Reversion',
      description: 'This strategy identifies two highly correlated assets (e.g., BTC and ETH). It calculates a rolling z-score of the spread between their prices. When the z-score exceeds a certain threshold (+2 or -2), it assumes the spread will revert to the mean, and enters a market-neutral position: shorting the overperforming asset and longing the underperforming one.',
    },
    {
      name: 'Alpha 2: Breakout Momentum',
      description: 'This strategy operates on intraday timeframes (e.g., 15-min bars). It identifies a "Donchian Channel" (the highest high and lowest low over a lookback period). When the price breaks above the upper channel, a long position is initiated. When it breaks below the lower channel, a short position is initiated. A trailing stop-loss is used to manage risk.',
    },
    {
      name: 'Alpha 3: Multi-Timeframe (MTF) Trend',
      description: 'This alpha confirms trend direction on a higher timeframe (e.g., 4-hour) using a moving average crossover. It then seeks entry points on a lower timeframe (e.g., 5-minute) in the direction of the established trend. For example, if the 4H trend is bullish, it will only look for long entries on dips during the 5-minute timeframe.',
    },
    {
      name: 'Alpha 4: Cross-Asset Correlation',
      description: 'This strategy exploits short-term lead-lag effects between different asset classes. For example, it might monitor a risk-on/risk-off indicator like the VIX or DXY (US Dollar Index). A sharp move in the indicator might predict a subsequent move in a correlated asset like the S&P 500 or a specific FX pair, prompting a trade.',
    },
    {
      name: 'Alpha 5: Order Book Imbalance',
      description: 'This high-frequency alpha analyzes Level 2 (L2) order book data. It calculates the Volume Order Book Imbalance (VOBI) by comparing the weighted volume of bids and asks at the top levels of the book. A significant imbalance suggests strong buying or selling pressure, and the strategy places a short-term limit order anticipating a micro-price movement.',
    },
  ];
};

export const simulateReplicationResults = async (): Promise<ReplicationResults> => {
    // Simulate network latency before fetching the static results log.
    await delay(1000); 
    const response = await fetch('results.json');
    if (!response.ok) {
        console.error("Failed to fetch results.json. Make sure the file exists at the root.");
        throw new Error('Failed to load replication results log.');
    }
    return response.json();
};
