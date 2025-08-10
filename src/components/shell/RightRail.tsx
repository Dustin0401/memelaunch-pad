import { useQuery } from '@tanstack/react-query';
import { getGainers } from '@/lib/api';
import GainerRow from '@/components/cards/GainerRow';

export default function RightRail() {
  const { data } = useQuery({ queryKey: ['gainers'], queryFn: getGainers, refetchInterval: 5000 });

  return (
    <aside className="hidden xl:block w-80 shrink-0 p-4 space-y-4">
      <section className="rounded-2xl border border-border bg-[linear-gradient(180deg,hsl(var(--muted)/.35),transparent)] p-4">
        <h3 className="text-sm font-medium mb-2">Users have earned</h3>
        <div className="h-2 w-full rounded-full bg-muted/60">
          <div className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: '62%' }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Weekly points progress</p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4">
        <h3 className="text-sm font-medium mb-3">Top Gainers</h3>
        <div className="divide-y divide-border/60">
          {data?.map((c) => (
            <div key={c.id} className="py-2 first:pt-0 last:pb-0">
              <GainerRow name={c.name} pct={c.change24hPct} imageUrl={c.imageUrl} />
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
