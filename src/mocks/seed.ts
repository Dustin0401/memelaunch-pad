import frog from '@/assets/token-frog.jpg';
import cat from '@/assets/token-cat.jpg';
import rocket from '@/assets/token-rocket.jpg';
import { type Coin } from '@/lib/types';

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const nowIso = () => new Date().toISOString();

const creators: `0x${string}`[] = [
  '0x5c5f9f0000000000000000000000000000000000',
  '0xa11ce00000000000000000000000000000000000',
  '0xbeefbeef00000000000000000000000000000000',
] as const;

const images = [frog, cat, rocket];
const names = [
  ['GAPPY', 'Gap Tooth Lizard'],
  ['ANRCH', 'Anarchist Pepe'],
  ['JACKPOT', 'Jackpot'],
  ['COSMO', 'Cosmo'],
  ['BANG', 'BANG'],
  ['ZIGGY', 'Ziggy Frog'],
  ['MOON', 'To the Moon'],
  ['WAGMI', 'We All Gonna Make It'],
];

export function seedCoins(count = 16): Coin[] {
  const items: Coin[] = Array.from({ length: count }).map((_, i) => {
    const [name, blurb] = pick(names);
    const img = pick(images);
    const statusPool: Coin['status'][] = ['live', 'new', 'scheduled'];
    const status = pick(statusPool);
    const basePrice = Number((Math.random() * 0.01 + 0.0001).toFixed(5));
    const change = Number(((Math.random() - 0.4) * 80).toFixed(2));

    return {
      id: crypto.randomUUID(),
      name,
      symbol: name,
      address: Math.random() > 0.4 ? (`0x${(Math.random() * 1e16).toString(16).padEnd(40, '0')}` as `0x${string}`) : null,
      status,
      creator: pick(creators),
      createdAt: nowIso(),
      scheduledFor: status === 'scheduled' ? new Date(Date.now() + Math.random() * 1000*60*60).toISOString() : undefined,
      imageUrl: img,
      blurb,
      buyPriceUsd: Number((Math.random() * 25 + 1).toFixed(2)),
      sellPriceUsd: Number((Math.random() * 15 + 1).toFixed(2)),
      priceEth: basePrice,
      change24hPct: change,
      volume24hUsd: Math.floor(Math.random() * 50000 + 5000),
      marketCapUsd: Math.floor(Math.random() * 5_000_000 + 250_000),
      holders: Math.floor(Math.random() * 500 + 10),
      likes: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 50_000),
    };
  });
  return items;
}
