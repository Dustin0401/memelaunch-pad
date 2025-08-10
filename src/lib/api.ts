import { db, startPriceDrift, bus, type StreamEvent } from '@/mocks/db';
import type { Coin, CoinListResponse } from './types';

export function apiStart() {
  startPriceDrift();
}

export async function getCoins(params: { status?: 'live' | 'new' | 'scheduled' | 'all'; sort?: 'volume' | 'gainers'; cursor?: string | null; limit?: number }): Promise<CoinListResponse> {
  await delay(200);
  return db.list(params);
}

export async function getGainers(): Promise<Coin[]> {
  await delay(150);
  return [...db.coins].sort((a, b) => b.change24hPct - a.change24hPct).slice(0, 5);
}

export async function getCoin(id: string): Promise<Coin | null> {
  await delay(100);
  return db.get(id);
}

export function subscribeStream(cb: (e: StreamEvent) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<StreamEvent>).detail);
  bus.addEventListener('stream', handler as EventListener);
  return () => bus.removeEventListener('stream', handler as EventListener);
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
