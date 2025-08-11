import { useEffect, useRef } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getCoins, subscribeStream } from '@/lib/api';
import type { Coin } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/shell/Header';
import SideNav from '@/components/shell/SideNav';
import RightRail from '@/components/shell/RightRail';

const CoinGridCard = ({ coin }: { coin: Coin }) => {
  const marketCapFormatted = (coin.marketCapUsd / 1000).toFixed(1) + 'K';
  const positive = coin.change24hPct >= 0;
  
  return (
    <Card className="relative p-4 bg-card/80 border border-border/50 hover:bg-card transition-all duration-200 group">
      {/* Coin Image and Info */}
      <div className="flex items-start gap-3 mb-3">
        <img 
          src={coin.imageUrl} 
          alt={coin.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">{coin.name}</h3>
          <p className="text-xs text-muted-foreground">{coin.symbol}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-muted rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-pink-500 to-orange-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(85, Math.max(15, coin.marketCapUsd / 1000))}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">Market Cap</span>
          <span className="text-xs font-medium">${marketCapFormatted}</span>
        </div>
      </div>

      {/* Price Change */}
      <div className="mb-3">
        <div className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {positive ? '+' : ''}{coin.change24hPct.toFixed(2)}%
        </div>
        <div className="text-xs text-muted-foreground">24h change</div>
      </div>

      {/* Action Button */}
      <Button 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-xs py-1.5 h-auto"
        size="sm"
      >
        ALL REVENUE TO @{coin.creator.slice(2, 8).toUpperCase()}
      </Button>

      {/* Creator Badge */}
      <div className="absolute top-2 right-2">
        <div className="w-6 h-6 bg-muted rounded-full border border-border flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full" />
        </div>
      </div>
    </Card>
  );
};

const Coins = () => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ['coins', { status: 'new' }],
    queryFn: ({ pageParam }) => getCoins({ status: 'new', cursor: pageParam ?? null, limit: 20 }),
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">New Coins</h1>
            <p className="text-muted-foreground">Recently launched tokens ready for trading</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {coins.map((coin) => (
              <CoinGridCard key={coin.id} coin={coin} />
            ))}
          </div>
          
          {query.hasNextPage && (
            <div ref={sentinelRef} className="py-8 text-center text-sm text-muted-foreground">
              Loading more coins...
            </div>
          )}
        </main>
        <RightRail />
      </div>
    </div>
  );
};

export default Coins;