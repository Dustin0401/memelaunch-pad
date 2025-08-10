import { create } from 'zustand';
import type { Coin } from '@/lib/types';

export type TradeSide = 'buy' | 'sell';

interface TradeState {
  open: boolean;
  side: TradeSide;
  coin: Coin | null;
  amountEth: string;
  slippagePct: number;
  openTrade: (side: TradeSide, coin: Coin) => void;
  close: () => void;
  setAmountEth: (v: string) => void;
  setSide: (s: TradeSide) => void;
  setSlippage: (n: number) => void;
}

export const useTrade = create<TradeState>((set) => ({
  open: false,
  side: 'buy',
  coin: null,
  amountEth: '',
  slippagePct: 1,
  openTrade: (side, coin) => set({ open: true, side, coin }),
  close: () => set({ open: false }),
  setAmountEth: (amountEth) => set({ amountEth }),
  setSide: (side) => set({ side }),
  setSlippage: (slippagePct) => set({ slippagePct }),
}));
