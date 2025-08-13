import Header from '@/components/shell/Header';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard, getCoins } from '@/lib/api';
import type { LeaderboardResponse, CreatorLeaderboardEntry, Coin } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// Import the 3D avatars
import avatar3D1 from '@/assets/avatar-3d-1.png';
import avatar3D2 from '@/assets/avatar-3d-2.png';
import avatar3D3 from '@/assets/avatar-3d-3.png';

const TopPerformerCard = ({ coin }: { coin: Coin }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/60 border border-border/40 hover:bg-card/80 transition-all">
      <img 
        src={coin.imageUrl} 
        alt={coin.name}
        className="w-10 h-10 rounded-lg object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-foreground truncate">{coin.name}</div>
        <div className="text-xs text-muted-foreground">{coin.symbol}</div>
      </div>
      <Button 
        size="sm" 
        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-auto rounded-lg"
      >
        Buy ${coin.buyPriceUsd.toFixed(2)}
      </Button>
    </div>
  );
};

const FeatureCreatorCard = ({ 
  rank, 
  username, 
  avatar, 
  feesReceived, 
  created, 
  received 
}: {
  rank: number;
  username: string;
  avatar: string;
  feesReceived: string;
  created: number;
  received: number;
}) => {
  return (
    <Card className="bg-card/80 border border-border/50 rounded-2xl overflow-hidden">
      <CardContent className="p-6 text-center">
        {/* 3D Avatar */}
        <div className="relative mx-auto mb-6 w-32 h-32">
          <img 
            src={avatar} 
            alt={username}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {rank}
          </div>
        </div>
        
        {/* Username */}
        <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
          {username}
        </h3>
        
        {/* Fees Received */}
        <div className="text-4xl font-bold text-foreground mb-1">
          {feesReceived}
        </div>
        <div className="text-sm text-muted-foreground mb-6">
          Fees Received
        </div>
        
        {/* Stats */}
        <div className="flex justify-between text-sm mb-4">
          <div>
            <div className="text-foreground font-medium">{created}</div>
            <div className="text-muted-foreground">Created</div>
          </div>
          <div>
            <div className="text-foreground font-medium">{received}</div>
            <div className="text-muted-foreground">Received</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'Community' | 'Profit'>('Community');
  
  const { data: leaderboardData, isLoading } = useQuery<LeaderboardResponse>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    refetchInterval: 10000,
  });

  const { data: coinsData } = useQuery({
    queryKey: ['coins', { status: 'live' }],
    queryFn: () => getCoins({ status: 'live', cursor: null, limit: 6 }),
    refetchInterval: 5000,
  });

  const topCoins = coinsData?.items?.slice(0, 6) ?? [];
  const top3 = leaderboardData?.top3 ?? [];
  const rest = leaderboardData?.rest ?? [];

  // Mock data for featured creators matching the reference
  const featuredCreators = [
    {
      rank: 1,
      username: '@flaunchy',
      avatar: avatar3D1,
      feesReceived: '$119K',
      created: 4,
      received: 267
    },
    {
      rank: 2,
      username: '0x642a...e04e63',
      avatar: avatar3D2,
      feesReceived: '$98K',
      created: 3,
      received: 453
    },
    {
      rank: 3,
      username: '3g01f303a6.eth',
      avatar: avatar3D3,
      feesReceived: '$33K',
      created: 2,
      received: 89
    }
  ];

  // Mock data for the detailed leaderboard
  const detailedLeaderboard = [
    { place: 4, account: 'aca.eth', avatar: '/api/placeholder/32/32', created: ['🎯'], received: '—', revenue: '$239K' },
    { place: 5, account: '0x3cbe...6e7f63', avatar: '/api/placeholder/32/32', created: ['🎨', '🚀'], received: '—', revenue: '$189K' },
    { place: 6, account: '@poan-banse.eth', avatar: '/api/placeholder/32/32', created: ['—'], received: ['🎯', '🚀', '💎', '🎨'], revenue: '$20K' },
    { place: 7, account: '0xbc39...1d4d56', avatar: '/api/placeholder/32/32', created: ['👤'], received: '—', revenue: '$19K' },
    { place: 8, account: '0x291d...e6fd60', avatar: '/api/placeholder/32/32', created: ['🌟'], received: '—', revenue: '$18K' },
    { place: 9, account: '@omochi', avatar: '/api/placeholder/32/32', created: ['⚫'], received: ['💎', '🎯', '🚀'], revenue: '$18K' },
    { place: 10, account: 'parafigtoose.base.eth', avatar: '/api/placeholder/32/32', created: ['🔵'], received: '—', revenue: '$14K' },
    { place: 11, account: 'giantslypalin.base.eth', avatar: '/api/placeholder/32/32', created: ['🔵'], received: '—', revenue: '$7K' },
    { place: 12, account: '@tweetor', avatar: '/api/placeholder/32/32', created: ['🔘'], received: '—', revenue: '$6.5K' },
    { place: 13, account: '@adalk.eth', avatar: '/api/placeholder/32/32', created: ['—'], received: ['🎯'], revenue: '$5.9K' },
    { place: 14, account: '@WadWowd', avatar: '/api/placeholder/32/32', created: ['—'], received: ['🎨'], revenue: '$4.6K' },
    { place: 15, account: '@cowcorner', avatar: '/api/placeholder/32/32', created: ['⚫'], received: '—', revenue: '$4.5K' },
    { place: 16, account: '@spacebookhazard', avatar: '/api/placeholder/32/32', created: ['🌟'], received: '—', revenue: '$4.3K' },
    { place: 17, account: 'berryeth', avatar: '/api/placeholder/32/32', created: ['⚫'], received: '—', revenue: '$4.4K' },
    { place: 18, account: '@thied', avatar: '/api/placeholder/32/32', created: ['🔵'], received: '—', revenue: '$3.9K' },
    { place: 19, account: '@freedo', avatar: '/api/placeholder/32/32', created: ['🌟', '🎯', '🎨'], received: '—', revenue: '$3.5K' },
    { place: 20, account: '@hershegger', avatar: '/api/placeholder/32/32', created: ['⚫'], received: '—', revenue: '$3.6K' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Top Performers Navigation Bar */}
      <div className="border-b border-border/50 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 py-3 overflow-x-auto">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 whitespace-nowrap">
              ● Live
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap">All Coins</Badge>
            <Badge variant="outline" className="whitespace-nowrap">🆕 New</Badge>
            <Badge variant="outline" className="whitespace-nowrap">📈 Top Performers</Badge>
            <Badge variant="outline" className="whitespace-nowrap">📊 High Volume</Badge>
            <Badge variant="outline" className="whitespace-nowrap">⏰ Scheduled</Badge>
          </div>
        </div>
      </div>

      {/* Top Performers Strip */}
      <div className="border-b border-border/50 bg-card/30">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {topCoins.map((coin) => (
              <TopPerformerCard key={coin.id} coin={coin} />
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto p-4 md:p-6">
        {/* Community/Profit Tab Toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex bg-muted/60 rounded-full p-1 border border-border/50">
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'Community' 
                  ? 'bg-foreground text-background' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('Community')}
            >
              Community
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'Profit' 
                  ? 'bg-foreground text-background' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('Profit')}
            >
              Profit
            </button>
          </div>
        </div>

        {/* Featured Creators Section */}
        <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {featuredCreators.map((creator) => (
            <FeatureCreatorCard key={creator.rank} {...creator} />
          ))}
        </section>

        {/* Detailed Leaderboard */}
        <section className="max-w-6xl mx-auto">
          <Card className="bg-card/80 border border-border/50 rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-medium">Place</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Account</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-center">Created</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-center">Received</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">Community Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedLeaderboard.map((entry) => (
                    <TableRow key={entry.place} className="border-border/50 hover:bg-muted/20">
                      <TableCell className="text-muted-foreground font-medium">
                        {entry.place}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted border border-border overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/40" />
                          </div>
                          <span className="text-foreground text-sm">{entry.account}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          {Array.isArray(entry.created) ? (
                            entry.created.map((emoji, idx) => (
                              <span key={idx} className="text-sm">{emoji}</span>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-sm">{entry.created}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          {Array.isArray(entry.received) ? (
                            entry.received.map((emoji, idx) => (
                              <span key={idx} className="text-sm">{emoji}</span>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-sm">{entry.received}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-foreground font-medium">
                        {entry.revenue}
                      </TableCell>
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