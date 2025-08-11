
import { useEffect, useMemo, useRef } from 'react';
import Header from '@/components/shell/Header';
import SideNav from '@/components/shell/SideNav';
import RightRail from '@/components/shell/RightRail';
import CoinCard from '@/components/cards/CoinCard';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { apiStart, getCoins, subscribeStream } from '@/lib/api';
import { useSearchParams } from 'react-router-dom';
import { useFilters } from '@/store/useFilters';
import type { Coin } from '@/lib/types';
import TradeModal from '@/components/forms/TradeModal';
import { useTrade } from '@/store/useTrade';
apiStart();

const tabToParams = (tab: string | null): { status?: 'live' | 'new' | 'scheduled' | 'all'; sort?: 'gainers' | 'volume' } => {
  switch (tab) {
    case 'all':
      return { status: 'all' };
    case 'new':
      return { status: 'new' };
    case 'top':
      return { status: 'all', sort: 'gainers' };
    case 'volume':
      return { status: 'all', sort: 'volume' };
    case 'scheduled':
      return { status: 'scheduled' };
    case 'live':
    default:
      return { status: 'live' };
  }
};

const Index = () => {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') ?? 'live';
  const { setTab } = useFilters();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { openTrade } = useTrade();

  useEffect(() => setTab(tab as any), [tab]);

  const qParams = useMemo(() => tabToParams(tab), [tab]);

  const query = useInfiniteQuery({
    queryKey: ['coins', qParams],
    queryFn: ({ pageParam }) => getCoins({ ...qParams, cursor: pageParam ?? null, limit: 10 }),
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
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto flex gap-0">
        <SideNav />
        <main className="flex-1 p-4 md:p-6">
          {coins.map((c) => (
            <CoinCard key={c.id} coin={c} onBuy={(coin) => openTrade('buy', coin)} />
          ))}
          {query.hasNextPage && (
            <div ref={sentinelRef} className="py-8 text-center text-sm text-muted-foreground">Loading more…</div>
          )}
        </main>
        <RightRail />
      </div>
      <TradeModal />
    </div>
  );
};

export default Index;
