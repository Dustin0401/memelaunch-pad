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

export async function tradeBuy(id: string, amountEth: number): Promise<{ txHash: string; receivedTokens: number }> {
  await delay(300);
  const coin = db.get(id);
  if (!coin) throw new Error('Coin not found');
  const tokens = amountEth / Math.max(coin.priceEth, 0.000001);
  coin.volume24hUsd += Math.floor(amountEth * 3500);
  const evt: StreamEvent = { type: 'volume', payload: { id: coin.id, volume24hUsd: coin.volume24hUsd } };
  bus.dispatchEvent(new CustomEvent('stream', { detail: evt }));
  return { txHash: '0x' + Math.random().toString(16).slice(2).padEnd(64, '0'), receivedTokens: Number(tokens.toFixed(2)) };
}

export async function tradeSell(id: string, amountTokens: number): Promise<{ txHash: string; receivedEth: number }> {
  await delay(300);
  const coin = db.get(id);
  if (!coin) throw new Error('Coin not found');
  const receivedEth = amountTokens * Math.max(coin.priceEth, 0.000001);
  coin.volume24hUsd += Math.floor(receivedEth * 3500);
  const evt: StreamEvent = { type: 'volume', payload: { id: coin.id, volume24hUsd: coin.volume24hUsd } };
  bus.dispatchEvent(new CustomEvent('stream', { detail: evt }));
  return { txHash: '0x' + Math.random().toString(16).slice(2).padEnd(64, '0'), receivedEth: Number(receivedEth.toFixed(6)) };
}
