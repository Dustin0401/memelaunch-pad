
import Header from '@/components/shell/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">Flaunch features explained</h1>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Tokenized Memestream */}
          <div className="space-y-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Tokenized Memestream</h3>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p>The creator of the memecoin decides who receives the Memestream — an NFT that grants the holder the rights to the coin's trading fees.</p>
              <p>The Memestream can be airdropped to any wallet at creation, or transferred at any time after. This unlocks secondary markets for the coin's trading fees as well as Community Takeovers, charitable or private fundraising efforts and financial services like borrowing and lending.</p>
              <p>Only by tokenizing a coin's trading fees can a true memeconomy begin to form.</p>
            </div>
          </div>

          {/* Fixed Price Fair Launch */}
          <div className="space-y-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900 to-cyan-900 rounded-3xl p-8 text-center relative overflow-hidden border-2 border-purple-500/30">
                <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <div className="text-3xl">🚀</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Fixed Price Fair Launch</h3>
                  
                  <div className="space-y-3 text-left">
                    <div className="bg-gray-800 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Shielded launch</span>
                        <span className="text-green-400 text-sm">85%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">$24.56K</div>
                      <div className="text-green-400 text-sm">+24.55%</div>
                      <div className="text-gray-400 text-xs mt-1">⏱ 19:29</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p>When a coin is flaunched it goes into a 30 minute period where the price is fixed for everyone.</p>
              <p>Once the 30 minute period is over, or all the fair launch coins are sold, the coin moves into price discovery.</p>
              <p>Every user that buys during a Fair Launch can sell at the same price once the Fair Launch ends.</p>
            </div>
          </div>

          {/* Automated Buybacks */}
          <div className="space-y-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-green-900 to-teal-900 rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-white">Automated Buybacks</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded-xl p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">Buyback charging</span>
                        <span className="text-yellow-400 text-sm">+86.54%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '86%'}}></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">Buyback active</span>
                        <span className="text-green-400 text-sm">1.45%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p>Buybacks are released every time a coin collects 0.1 ETH in trading fees. During this time the Buyback is shown as "charging".</p>
              <p>When the buyback starts it becomes "active" and the bar will drain until the buyback is complete.</p>
              <p>Buybacks can stack on top of each other. Large buy demand will lead to buybacks far greater than 0.1 ETH.</p>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-16 space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        </div>
      </main>
    </div>
  );
}
