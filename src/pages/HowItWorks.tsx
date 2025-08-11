import Header from '@/components/shell/Header';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>How it works - flaunch</title>
        <meta name="description" content="Flaunch features explained: fair launch, automated buybacks, and more." />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-8">Flaunch features explained</h1>
        <section className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Tokenized Memestream</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              The creator decides who receives the Memestream — an NFT that grants rights to trading fees. It can be transferred or airdropped anytime.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-2" style={{ borderColor: 'hsl(var(--primary) / 0.3)' }}>
            <CardHeader>
              <CardTitle>Fixed Price Fair Launch</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              New coins start with a fixed price window to ensure fairness. After the window or when allotment sells out, price discovery begins. Everyone who buys can sell at the same price when the window ends.
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Automated Buybacks</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Every time a coin collects enough trading fees, a buyback is triggered. Multiple buybacks can stack to meet demand, helping stabilize markets.
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
