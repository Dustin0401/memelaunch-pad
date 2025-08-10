import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTrade } from '@/store/useTrade';
import { toast } from '@/components/ui/use-toast';
import { tradeBuy, tradeSell } from '@/lib/api';

export default function TradeModal() {
  const { open, side, coin, amountEth, slippagePct, setSide, setAmountEth, setSlippage, close } = useTrade();
  const [loading, setLoading] = useState(false);

  const price = coin?.priceEth ?? 0;
  const amountNum = parseFloat(amountEth) || 0;
  const estTokens = useMemo(() => (price > 0 ? amountNum / price : 0), [amountNum, price]);
  const minReceived = useMemo(() => (side === 'buy' ? estTokens * (1 - slippagePct / 100) : amountNum * (1 - slippagePct / 100)), [estTokens, amountNum, slippagePct, side]);

  if (!coin) return <Dialog open={open} onOpenChange={(o) => !o && close()} />;

  const onConfirm = async () => {
    if (amountNum <= 0) {
      toast({ title: 'Enter an amount', description: 'Amount must be greater than 0' });
      return;
    }
    setLoading(true);
    try {
      if (side === 'buy') {
        const res = await tradeBuy(coin.id, amountNum);
        toast({ title: 'Buy submitted', description: `Tx: ${res.txHash.slice(0,10)}… • Received ~${res.receivedTokens.toLocaleString()} ${coin.symbol}` });
      } else {
        const res = await tradeSell(coin.id, amountNum);
        toast({ title: 'Sell submitted', description: `Tx: ${res.txHash.slice(0,10)}… • Received ~${res.receivedEth} ETH` });
      }
      close();
    } catch (e: any) {
      toast({ title: 'Trade failed', description: e.message ?? 'Please try again' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Trade {coin.name}</DialogTitle>
        </DialogHeader>

        <Tabs value={side} onValueChange={(v) => setSide(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eth">Amount (ETH)</Label>
              <Input id="eth" type="number" min="0" step="0.0001" value={amountEth} onChange={(e) => setAmountEth(e.target.value)} placeholder="0.0" />
            </div>
            <div className="text-xs text-muted-foreground">Price ≈ {price} ETH • Est. Tokens ≈ {estTokens.toLocaleString(undefined, { maximumFractionDigits: 2 })} {coin.symbol}</div>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tokens">Amount ({coin.symbol})</Label>
              <Input id="tokens" type="number" min="0" step="0.01" value={amountEth} onChange={(e) => setAmountEth(e.target.value)} placeholder="0.0" />
            </div>
            <div className="text-xs text-muted-foreground">Price ≈ {price} ETH • Est. ETH ≈ {(amountNum * price).toFixed(6)} ETH</div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="slippage">Slippage (%)</Label>
            <Input id="slippage" type="number" min="0" step="0.1" value={slippagePct} onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)} />
          </div>
          <div className="space-y-2">
            <Label>Min received</Label>
            <div className="h-10 rounded-md border border-border px-3 flex items-center text-sm text-muted-foreground">
              {side === 'buy' ? `${minReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${coin.symbol}` : `${minReceived.toFixed(6)} ETH`}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Est. gas</span>
          <span>~0.00021 ETH</span>
        </div>

        <Button onClick={onConfirm} disabled={loading} className="w-full rounded-full">
          {loading ? 'Confirming…' : side === 'buy' ? 'Confirm Buy' : 'Confirm Sell'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
