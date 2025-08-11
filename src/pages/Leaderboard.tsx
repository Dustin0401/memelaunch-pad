
import Header from '@/components/shell/Header';
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
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        {/* Top 3 Cards Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex bg-gray-800 rounded-full p-1">
              <button className="px-4 py-2 rounded-full bg-gray-600 text-white text-sm">Community</button>
              <button className="px-4 py-2 rounded-full text-gray-400 text-sm hover:text-white">Profit</button>
            </div>
          </div>
          
          <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {(() => {
              const cards: (CreatorLeaderboardEntry | null)[] = isLoading ? [null, null, null] : top3;
              return cards.map((e, i) => (
                <Card key={i} className={`bg-gray-900 border-gray-700 rounded-2xl ${i === 0 ? 'md:scale-105' : ''}`}>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 relative">
                      <div className="size-20 rounded-xl overflow-hidden bg-gray-800 mx-auto" aria-hidden>
                        {e && <img src={e.avatar} alt="creator avatar" className="w-full h-full object-cover" loading="lazy" />}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full size-8 flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                    </div>
                    <CardTitle className="text-white text-center">
                      <div className="truncate text-lg">{e?.account ?? '—'}</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {e ? `$${Intl.NumberFormat().format(Math.round(e.revenueUsd / 1000))}K` : '—'}
                    </div>
                    <div className="text-gray-400 text-sm mb-4">Fees Received</div>
                    
                    <div className="flex justify-between text-sm text-gray-400 mb-4">
                      <div>
                        <div className="text-white font-medium">{e?.created ?? '—'}</div>
                        <div>Created</div>
                      </div>
                      <div>
                        <div className="text-white font-medium">{e ? Math.floor(e.revenueUsd / e.created) : '—'}</div>
                        <div>Received</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center -space-x-2">
                      {(e?.topCoins ?? []).slice(0, 4).map((c, idx) => (
                        <div key={idx} className="size-8 rounded-xl overflow-hidden border-2 border-gray-700 bg-gray-800">
                          <img src={c.imageUrl} alt="token" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ));
            })()}
          </section>
        </div>

        {/* Leaderboard Table */}
        <section className="max-w-6xl mx-auto">
          <Card className="bg-gray-900 border-gray-700 rounded-2xl">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400 w-16">Place</TableHead>
                    <TableHead className="text-gray-400">Account</TableHead>
                    <TableHead className="text-gray-400 text-center">Created</TableHead>
                    <TableHead className="text-gray-400 text-center">Received</TableHead>
                    <TableHead className="text-gray-400 text-right">Community Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rest.map((e, idx) => (
                    <TableRow key={e.account} className="border-gray-700 hover:bg-gray-800">
                      <TableCell className="text-gray-400 font-medium">{idx + 4}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
                            <img src={e.avatar} alt="avatar" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <span className="text-white text-sm">{e.account}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center -space-x-1">
                          {e.topCoins.slice(0, 3).map((coin, coinIdx) => (
                            <div key={coinIdx} className="size-6 rounded-lg overflow-hidden border border-gray-700">
                              <img src={coin.imageUrl} alt="coin" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-white">—</TableCell>
                      <TableCell className="text-right text-white font-medium">
                        ${Intl.NumberFormat().format(Math.round(e.revenueUsd / 1000))}K
                      </TableCell>
                    </TableRow>
                  ))}
                  {isLoading && Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i} className="border-gray-700">
                      <TableCell className="text-gray-500">—</TableCell>
                      <TableCell className="text-gray-500">Loading…</TableCell>
                      <TableCell className="text-center text-gray-500">—</TableCell>
                      <TableCell className="text-center text-gray-500">—</TableCell>
                      <TableCell className="text-right text-gray-500">—</TableCell>
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
