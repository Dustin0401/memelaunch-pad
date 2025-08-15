import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getCoins, subscribeStream } from '@/lib/api';
import type { Coin } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Header from '@/components/shell/Header';
import SideNav from '@/components/shell/SideNav';

const HighVolumeCard = ({ coin, timeframe }: { coin: Coin; timeframe: string }) => {
  const marketCapFormatted = (coin.marketCapUsd / 1000).toFixed(1) + 'K';
  
  // Simulate different volume for different timeframes
  const getVolumeForTimeframe = (timeframe: string) => {
    const base = coin.volume24hUsd;
    switch (timeframe) {
      case '5m': return base * 0.05;
      case '1h': return base * 0.2;
      case '6h': return base * 0.6;
      case '24h': return base;
      default: return base;
    }
  };
  
  const volume = getVolumeForTimeframe(timeframe);
  const volumeFormatted = volume > 1000000 ? `$${(volume / 1000000).toFixed(1)}M` : `$${(volume / 1000).toFixed(1)}K`;
  const positive = coin.change24hPct >= 0;
  
  return (
    <Card className="relative p-4 bg-card/80 border border-border/50 hover:bg-card transition-all duration-200 group">
      {/* Volume Rank Badge */}
      <div className="absolute top-2 right-2">
        <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          #{Math.floor(Math.random() * 10) + 1}
        </div>
      </div>

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

      {/* Volume Display */}
      <div className="mb-3">
        <div className="text-lg font-bold text-blue-400">
          {volumeFormatted}
        </div>
        <div className="text-xs text-muted-foreground">{timeframe} volume</div>
      </div>

      {/* Volume Bar */}
      <div className="mb-3">
        <div className="w-full bg-muted rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(95, Math.max(25, (volume / 100000)))}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">Volume Trend</span>
          <span className="text-xs font-medium">High</span>
        </div>
      </div>

      {/* Price Change */}
      <div className="mb-3">
        <div className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {positive ? '+' : ''}{coin.change24hPct.toFixed(2)}%
        </div>
        <div className="text-xs text-muted-foreground">24h change</div>
      </div>

      {/* Market Cap */}
      <div className="mb-3">
        <div className="text-sm font-medium">${marketCapFormatted}</div>
        <div className="text-xs text-muted-foreground">Market Cap</div>
      </div>

      {/* Action Button */}
      <Button 
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 text-xs py-1.5 h-auto"
        size="sm"
      >
        HIGH VOLUME - @{coin.creator.slice(2, 8).toUpperCase()}
      </Button>
    </Card>
  );
};

const HighVolume = () => {
  const [timeframe, setTimeframe] = useState('24h');
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ['highVolume', timeframe],
    queryFn: ({ pageParam }) => getCoins({ 
      sort: 'volume', 
      cursor: pageParam ?? null, 
      limit: 20 
    }),
    initialPageParam: null as string | null,
    getNextPageParam: (last) => last.nextCursor,
    refetchInterval: 5000, // More frequent updates for volume tracking
  });

  // SSE-like updates
  useEffect(() => {
    const unsub = subscribeStream((evt) => {
      if (evt.type !== 'price') return;
      queryClient.setQueriesData({ queryKey: ['highVolume'] }, (data: any) => {
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

  // Infinite scroll
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
            <h1 className="text-2xl font-bold mb-2">High Volume</h1>
            <p className="text-muted-foreground">Coins with the highest trading volume</p>
          </div>
          
          {/* Time Period Tabs */}
          <Tabs value={timeframe} onValueChange={setTimeframe} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="5m">5 Min</TabsTrigger>
              <TabsTrigger value="1h">1 Hour</TabsTrigger>
              <TabsTrigger value="6h">6 Hours</TabsTrigger>
              <TabsTrigger value="24h">24 Hours</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {coins.map((coin) => (
              <HighVolumeCard key={coin.id} coin={coin} timeframe={timeframe} />
            ))}
          </div>
          
          {query.hasNextPage && (
            <div ref={sentinelRef} className="py-8 text-center text-sm text-muted-foreground">
              Loading more high volume coins...
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HighVolume;