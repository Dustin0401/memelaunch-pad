export type Coin = {
  id: string;
  name: string;
  symbol: string;
  address: `0x${string}` | null;
  status: 'live' | 'new' | 'scheduled' | 'ended';
  creator: `0x${string}`;
  createdAt: string;
  scheduledFor?: string;
  imageUrl: string;
  blurb: string;
  buyPriceUsd: number;
  sellPriceUsd: number;
  priceEth: number;
  change24hPct: number;
  volume24hUsd: number;
  marketCapUsd: number;
  holders: number;
  likes: number;
  views: number;
};

export type CoinListResponse = {
  items: Coin[];
  nextCursor: string | null;
};
