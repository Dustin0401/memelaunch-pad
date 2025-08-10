import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GainerRowProps {
  name: string;
  pct: number;
  imageUrl: string;
  onBuy?: () => void;
}

export default function GainerRow({ name, pct, imageUrl, onBuy }: GainerRowProps) {
  const positive = pct >= 0;
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <img src={imageUrl} alt={`${name} logo`} className="size-8 rounded-xl object-cover" loading="lazy" />
        <div>
          <div className="text-sm font-medium leading-4">{name}</div>
          <div className={positive ? 'text-xs text-accent' : 'text-xs text-destructive'}>{positive ? '+' : ''}{pct.toFixed(2)}%</div>
        </div>
      </div>
      <Button size="sm" variant="primary" className="rounded-full" onClick={onBuy}>
        Buy
        <ArrowUpRight className="size-4" />
      </Button>
    </div>
  );
}
