import Header from '@/components/shell/Header';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@/lib/api';
import type { LeaderboardResponse, CreatorLeaderboardEntry } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Leaderboard() {
  const { data, isLoading } = useQuery<LeaderboardResponse>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    refetchInterval: 10000,
  });

  const top3 = data?.top3 ?? [];
  const rest = data?.rest ?? [];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Leaderboard - flaunch</title>
        <meta name="description" content="Top creators and coins on flaunch — live revenue and volume leaderboard." />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <section className="grid md:grid-cols-3 gap-4 md:gap-6">
          {(isLoading ? Array.from({ length: 3 }) : top3).map((e, i) => (
            <Card key={i} className={`rounded-2xl border-border ${i === 0 ? 'md:scale-105' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{i + 1}</span>
                  <div className="size-10 rounded-xl overflow-hidden bg-muted" aria-hidden>
                    {e && <img src={e.avatar} alt="creator avatar" className="w-full h-full object-cover" loading="lazy" />}
                  </div>
                  <span className="truncate text-sm">{e?.account ?? '—'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold tracking-tight">{e ? `$${Intl.NumberFormat().format(Math.round(e.revenueUsd))}` : '—'}</div>
                <div className="mt-3 flex -space-x-2">
                  {(e?.topCoins ?? Array.from({ length: 3 })).map((c, idx) => (
                    <div key={idx} className="size-8 rounded-xl overflow-hidden border border-border bg-muted">
                      {c && <img src={c.imageUrl} alt="token" className="w-full h-full object-cover" loading="lazy" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-8">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Place</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Created</TableHead>
                    <TableHead className="text-right">Community Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rest.map((e, idx) => (
                    <TableRow key={e.account}>
                      <TableCell>{idx + 4}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-xl overflow-hidden bg-muted border border-border">
                            <img src={e.avatar} alt="avatar" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <span className="text-sm">{e.account}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{e.created}</TableCell>
                      <TableCell className="text-right">${Intl.NumberFormat().format(Math.round(e.revenueUsd))}</TableCell>
                    </TableRow>
                  ))}
                  {isLoading && Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="opacity-50">—</TableCell>
                      <TableCell className="opacity-50">Loading…</TableCell>
                      <TableCell className="text-right opacity-50">—</TableCell>
                      <TableCell className="text-right opacity-50">—</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
