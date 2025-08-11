import { Search, Timer } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';
import { useFilters } from '@/store/useFilters';
import { useUI } from '@/store/useUI';
import { motion } from 'framer-motion';
export default function Header() {
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const { setSearch } = useFilters();
  const { setRightRailOpen } = useUI();
  const [q, setQ] = useState(params.get('q') ?? '');

  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(q);
      if (q) params.set('q', q); else params.delete('q');
      setParams(params, { replace: true });
    }, 300);
    return () => clearTimeout(id);
  }, [q]);

  const chainPill = useMemo(() => (
    <div className="px-2.5 py-1 rounded-full border border-border bg-muted/40 text-xs">Base</div>
  ), []);

  const loc = useLocation();
  const isActive = (to: string) => (to === '/coins' ? (loc.pathname === '/' || loc.pathname.startsWith('/coins')) : loc.pathname.startsWith(to));
  const navClass = (to: string) => `px-3 py-1.5 rounded-full border text-sm ${isActive(to) ? 'bg-muted/60 border-border' : 'border-transparent hover:bg-muted/40'}`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto flex items-center gap-3 py-3">
        <Link to="/" className="flex items-center gap-2 mr-2" aria-label="flaunch home">
          <div className="size-6 rounded-md" style={{ background: 'var(--gradient-primary)' }} />
          <span className="font-semibold tracking-tight">flaunch</span>
        </Link>
        {chainPill}

        <nav className="hidden md:flex items-center gap-2 ml-3" aria-label="Main">
          <Link to="/coins" className={navClass('/coins')}>Coins</Link>
          <Link to="/leaderboard" className={navClass('/leaderboard')}>Leaderboard</Link>
          <Link to="/how-it-works" className={navClass('/how-it-works')}>How it works</Link>
        </nav>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              aria-label="Search coins, symbols, or addresses"
              placeholder="Search coins, symbols, or addresses"
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-muted/60 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <motion.div className="hidden md:flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-border bg-muted/40">
            <Timer className="size-3.5" />
            348ms
          </div>
          <Button variant="primary" className="rounded-full" onClick={() => nav('/launch')}>Flaunch a coin</Button>
          <Button variant="glass" onClick={() => nav('/profile')}>Sign in</Button>
        </motion.div>

        {/* Mobile right-rail toggle */}
        <Button variant="glass" className="md:hidden" onClick={() => setRightRailOpen(true)}>Right Rail</Button>
      </div>
    </header>
  );
}
