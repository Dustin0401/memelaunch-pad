import { Eye, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sparkline from '@/components/charts/Sparkline';
import type { Coin } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

interface CoinCardProps {
  coin: Coin;
  onBuy: (coin: Coin) => void;
}

export default function CoinCard({ coin, onBuy }: CoinCardProps) {
  const nav = useNavigate();
  const positive = coin.change24hPct >= 0;
  const spark = Array.from({ length: 24 }).map((_, i) => Number((coin.priceEth * (1 + (Math.sin(i) * 0.02))).toFixed(6)));

  return (
    <article className="rounded-2xl border border-border bg-card/60 hover:bg-card transition-colors shadow-sm p-4 md:p-5 mb-4 md:mb-6">
      <div className="flex gap-4">
        <button aria-label={`Open ${coin.name}`} onClick={() => nav(`/coin/${coin.id}`)} className="shrink-0">
          <img src={coin.imageUrl} alt={`${coin.name} meme`} className="size-20 md:size-24 rounded-xl object-cover hover-scale" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg md:text-xl font-semibold tracking-tight cursor-pointer hover:opacity-90" onClick={() => nav(`/coin/${coin.id}`)}>{coin.name}</h3>
            {coin.status !== 'ended' && (
              <span className="text-xs px-2 py-0.5 rounded-full border border-border" aria-label={`status ${coin.status}`}>{coin.status.toUpperCase()}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{coin.blurb}</p>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{coin.address ? `${coin.address.slice(0, 6)}…${coin.address.slice(-4)}` : 'Not deployed'}</span>
            <span className="inline-flex items-center gap-1"><Eye className="size-3.5" />{coin.views}</span>
            <span className="inline-flex items-center gap-1"><Heart className="size-3.5" />{coin.likes}</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <div className={`text-sm font-medium ${positive ? 'text-accent' : 'text-destructive'}`}>{positive ? '+' : ''}{coin.change24hPct.toFixed(2)}%</div>
            <Sparkline data={spark} />
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="tertiary" className="rounded-full" onClick={() => nav(`/coin/${coin.id}`)}>Trade</Button>
            <Button variant="primary" className="rounded-full" onClick={() => onBuy(coin)}>Buy</Button>
          </div>
        </div>
      </div>
      {/* Mobile actions */}
      <div className="mt-3 flex md:hidden items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`text-sm font-medium ${positive ? 'text-accent' : 'text-destructive'}`}>{positive ? '+' : ''}{coin.change24hPct.toFixed(2)}%</div>
          <Sparkline data={spark} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="glass" size="sm" className="rounded-full" onClick={() => nav(`/coin/${coin.id}`)}>Trade</Button>
          <Button variant="primary" size="sm" className="rounded-full" onClick={() => onBuy(coin)}>Buy</Button>
          <Button variant="ghost" size="icon" aria-label="share"><Share2 /></Button>
        </div>
      </div>
    </article>
  );
}
