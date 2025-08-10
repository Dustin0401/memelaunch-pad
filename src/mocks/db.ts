import { seedCoins } from './seed';
import type { Coin } from '@/lib/types';

// Event bus for mock SSE
export const bus = new EventTarget();
export type StreamEvent = { type: 'price' | 'volume' | 'like'; payload: Partial<Coin> & { id: string } };

class DB {
  coins: Coin[] = [];
  constructor() {
    this.coins = seedCoins(20);
  }

  list(params: { status?: 'live' | 'new' | 'scheduled' | 'all'; sort?: 'volume' | 'gainers'; cursor?: string | null; limit?: number }) {
    const { status = 'live', sort, cursor = null, limit = 10 } = params;
    let items = [...this.coins];
    if (status !== 'all') {
      items = items.filter((c) => c.status === status);
    }
    if (sort === 'volume') items.sort((a, b) => b.volume24hUsd - a.volume24hUsd);
    if (sort === 'gainers') items.sort((a, b) => b.change24hPct - a.change24hPct);

    let start = 0;
    if (cursor) {
      const idx = items.findIndex((c) => c.id === cursor);
      start = idx >= 0 ? idx + 1 : 0;
    }
    const page = items.slice(start, start + limit);
    const nextCursor = page.length === limit ? page[page.length - 1].id : null;
    return { items: page, nextCursor };
  }

  get(id: string) {
    return this.coins.find((c) => c.id === id) ?? null;
  }
}

export const db = new DB();

// Price drift simulator
let timer: number | undefined;
export function startPriceDrift() {
  if (timer) return;
  timer = window.setInterval(() => {
    // Pick 3 random coins to drift
    for (let i = 0; i < 3; i++) {
      const c = db.coins[Math.floor(Math.random() * db.coins.length)];
      const dPct = (Math.random() - 0.5) * 0.1; // ±5%
      const newPrice = Math.max(0.00001, c.priceEth * (1 + dPct));
      const newChange = Math.max(-95, Math.min(9999, c.change24hPct + dPct * 100));
      c.priceEth = Number(newPrice.toFixed(6));
      c.change24hPct = Number(newChange.toFixed(2));
      c.volume24hUsd += Math.floor(Math.random() * 500);
      // Dispatch stream event
      const evt: StreamEvent = { type: 'price', payload: { id: c.id, priceEth: c.priceEth, change24hPct: c.change24hPct, volume24hUsd: c.volume24hUsd } };
      bus.dispatchEvent(new CustomEvent('stream', { detail: evt }));
    }
  }, 5000);
}
