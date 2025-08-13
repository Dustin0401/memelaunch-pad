import { useEffect, useRef } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getCoins, subscribeStream } from '@/lib/api';
import type { Coin } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/shell/Header';
import SideNav from '@/components/shell/SideNav';

const CoinCard = ({ coin }: { coin: Coin }) => {
  const positive = coin.change24hPct >= 0;
  const progressValue = Math.min(85, Math.max(15, (coin.marketCapUsd / 100000) * 100));
  const ethAmount = (coin.volume24hUsd / 3000).toFixed(4); // Mock ETH calculation
  
  return (
    <Card className="relative p-4 bg-card/80 border border-border/50 hover:bg-card transition-all duration-200 group">
      {/* Coin Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img 
            src={coin.imageUrl} 
            alt={coin.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg text-foreground">{coin.name}</h3>
            <p className="text-xs text-muted-foreground">
              CA: {coin.address ? coin.address.slice(0, 6) : '0x0000'}...{coin.address ? coin.address.slice(-6) : '000000'}
            </p>
          </div>
        </div>
        <div className={`text-sm font-medium px-2 py-1 rounded ${positive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
          {positive ? '+' : ''}{coin.change24hPct.toFixed(2)}%
        </div>
      </div>

      {/* Holders */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">👥</span>
          <span className="text-sm font-medium">{coin.holders}</span>
        </div>
      </div>

      {/* Buyback Progress */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm opacity-80" />
          </div>
          <span className="text-xs text-muted-foreground">Buyback charging</span>
          <span className="text-xs font-medium text-purple-400">{ethAmount} ETH</span>
        </div>
        
        <div className="relative">
          <Progress 
            value={progressValue} 
            className="h-2 bg-muted/40"
          />
          <div 
            className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>

      {/* Revenue Share */}
      <div className="text-center py-2 px-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/20">
        <span className="text-xs font-medium text-foreground">
          💰 ALL REVENUE TO @{coin.creator.slice(2, 8).toUpperCase()}
        </span>
      </div>
    </Card>
  );
};

const AllCoins = () => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ['coins', { status: 'live' }],
    queryFn: ({ pageParam }) => getCoins({ status: 'live', cursor: pageParam ?? null, limit: 20 }),
    initialPageParam: null as string | null,
    getNextPageParam: (last) => last.nextCursor,
    refetchInterval: 10000,
  });

  // SSE-like updates -> merge into cache
  useEffect(() => {
    const unsub = subscribeStream((evt) => {
      if (evt.type !== 'price') return;
      queryClient.setQueriesData({ queryKey: ['coins'] }, (data: any) => {
        if (!data) return data;
        const pages = data.pages.map((p: any) => ({
          ...p,
          items: p.items.map((c: Coin) => (c.id === evt.payload.id ? { ...c, ...evt.payload } : c)),
        }));
        return { ...data, pages };
      });
    });
    return () => unsub();
  }, [queryClient]);

  // infinite scroll with IntersectionObserver
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) query.fetchNextPage();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [sentinelRef.current]);

  const coins = query.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto flex gap-0">
        <SideNav />
        <main className="flex-1 p-4 md:p-6">
          {/* Header with sorting */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">All Coins</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by</span>
                  <select className="bg-muted border border-border rounded-lg px-3 py-1.5 text-sm">
                    <option>Marketcap</option>
                    <option>Volume</option>
                    <option>Performance</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Order by</span>
                  <select className="bg-muted border border-border rounded-lg px-3 py-1.5 text-sm">
                    <option>Descending</option>
                    <option>Ascending</option>
                  </select>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">Coins that have migrated to Raydium</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {coins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>
          
          {query.hasNextPage && (
            <div ref={sentinelRef} className="py-8 text-center text-sm text-muted-foreground">
              Loading more coins...
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllCoins;