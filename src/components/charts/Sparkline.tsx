import { Area, AreaChart } from 'recharts';

interface SparklineProps {
  data: number[];
}

export default function Sparkline({ data }: SparklineProps) {
  const series = data.map((y, i) => ({ i, y }));
  return (
    <div className="w-28 h-9">
      <AreaChart width={112} height={36} data={series} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area dataKey="y" type="monotone" stroke="hsl(var(--primary))" fill="url(#spark)" strokeWidth={2} />
      </AreaChart>
    </div>
  );
}
