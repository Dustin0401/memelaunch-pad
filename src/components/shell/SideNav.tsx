import { CircleDot, Layers, Flame, BarChart3, Clock8, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const items = [
  { key: 'live', label: 'Live', icon: CircleDot },
  { key: 'all', label: 'All Coins', icon: Layers },
  { key: 'new', label: 'New', icon: Sparkles },
  { key: 'top', label: 'Top Performers', icon: BarChart3 },
  { key: 'volume', label: 'High Volume', icon: Flame },
  { key: 'scheduled', label: 'Scheduled', icon: Clock8 },
] as const;

export default function SideNav() {
  const [params, setParams] = useSearchParams();
  const active = params.get('tab') ?? 'live';

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (!n || n < 1 || n > 6) return;
      const item = items[n - 1];
      params.set('tab', item.key);
      setParams(params, { replace: true });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <nav aria-label="Primary" className="hidden lg:flex lg:flex-col w-60 shrink-0 p-4 gap-1 border-r border-border">
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.key || (active === null && it.key === 'live');
        const to = it.key === 'new' ? '/coins' : it.key === 'all' ? '/all-coins' : `/?tab=${it.key}`;
        return (
          <Link key={it.key} to={to} aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl border ${isActive ? 'bg-muted/60 border-border' : 'border-transparent hover:bg-muted/40'}`}>
            <Icon className="size-4" />
            <span className="text-sm">{it.label}</span>
            <span className="ml-auto text-xs text-muted-foreground">{items.indexOf(it)+1}</span>
          </Link>
        );
      })}

      <div className="mt-auto pt-4 flex flex-col gap-2 text-sm">
        <a href="#" className="px-3 py-2 rounded-xl border border-border hover:bg-muted/40">Feedback</a>
        <a href="#" className="px-3 py-2 rounded-xl border border-border hover:bg-muted/40">X</a>
        <a href="#" className="px-3 py-2 rounded-xl border border-border hover:bg-muted/40">Telegram</a>
      </div>
    </nav>
  );
}
