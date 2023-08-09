export interface TickerQuoteRestResponse {
  indexes: Index[];
  stocks: Stock[];
}

export interface Index {
  stock: string;
  name: string;
}

export interface Stock {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap?: number;
  logo: string;
  sector?: string;
  closeDay: 'positive' | 'negative';
}
