
import Header from '@/components/shell/Header';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState } from 'react';

export default function HowItWorks() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      id: 'tokenized-memestream',
      title: 'Tokenized Memestream',
      card: (
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl p-8 relative overflow-hidden h-[500px] backdrop-blur-sm border border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl"></div>
            
            {/* Floating elements illustration */}
            <div className="relative z-10">
              <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl opacity-80 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/30 rounded-lg"></div>
              </div>
              <div className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl opacity-60"></div>
              <div className="absolute bottom-32 left-8 w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg opacity-70"></div>
              <div className="absolute bottom-32 right-12 w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl opacity-50"></div>
              
              {/* Central illustration */}
              <div className="flex items-center justify-center mt-8 mb-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl border-2 border-gray-600 flex items-center justify-center">
                    <div className="text-4xl">💎</div>
                  </div>
                  
                  {/* Connected nodes */}
                  <div className="absolute -top-6 -left-6 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -top-6 -right-6 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-center mb-6 text-white">Tokenized Memestream</h3>
              
              {/* Text content inside card */}
              <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>The creator of the memecoin decides who receives the Memestream — an NFT that grants the holder the rights to the coin's trading fees.</p>
                <p>The Memestream can be airdropped to any wallet at creation, or transferred at any time after. This unlocks secondary markets for the coin's trading fees as well as Community Takeovers, charitable or private fundraising efforts and financial services like borrowing and lending.</p>
                <p>Only by tokenizing a coin's trading fees can a true memeconomy begin to form.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'fixed-price-fair-launch',
      title: 'Fixed Price Fair Launch',
      card: (
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl p-8 relative overflow-hidden h-[500px] backdrop-blur-sm border border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl"></div>
            <div className="relative z-10">
              {/* Main coin display */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-3xl">🐱</div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white">$24.56K</div>
                <div className="text-green-400 text-sm">+24.55%</div>
                <div className="text-gray-400 text-xs mt-1 flex items-center justify-center gap-1">
                  <span className="text-orange-400">👁</span> 123k
                  <span className="text-red-400 ml-2">⏱</span> 19:29
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="bg-gray-800/60 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="text-blue-400">🚀</span> Shielded launch
                  </span>
                  <span className="text-green-400 text-sm">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center text-white mb-6">Fixed Price Fair Launch</h3>
              
              {/* Text content inside card */}
              <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>When a coin is flaunched it goes into a 30 minute period where the price is fixed for everyone.</p>
                <p>Once the 30 minute period is over, or all the fair launch coins are sold, the coin moves into price discovery.</p>
                <p>Every user that buys during a Fair Launch can sell at the same price once the Fair Launch ends.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'automated-buybacks',
      title: 'Automated Buybacks',
      card: (
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl p-8 relative overflow-hidden h-[500px] backdrop-blur-sm border border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-teal-900/20 rounded-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-white text-center">Automated Buybacks</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-700/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-300">Buyback charging</span>
                    <span className="text-yellow-400 text-sm">+86.54%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: '86%'}}></div>
                  </div>
                </div>
                
                <div className="bg-gray-700/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-300">Buyback active</span>
                    <span className="text-green-400 text-sm">1.45%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                
                {/* Visual representation */}
                <div className="flex justify-center mt-8 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                      <div className="text-2xl">🔄</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Text content inside card */}
                <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                  <p>Buybacks are released every time a coin collects 0.1 ETH in trading fees. During this time the Buyback is shown as "charging".</p>
                  <p>When the buyback starts it becomes "active" and the bar will drain until the buyback is complete.</p>
                  <p>Buybacks can stack on top of each other. Large buy demand will lead to buybacks far greater than 0.1 ETH.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'rev-share',
      title: 'Rev Share',
      card: (
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl p-8 relative overflow-hidden h-[500px] backdrop-blur-sm border border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-white text-center">Rev Share</h3>
              
              {/* Revenue distribution visual */}
              <div className="space-y-6">
                <div className="bg-gray-700/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      Creator
                    </span>
                    <span className="text-blue-400 text-sm">60%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                
                <div className="bg-gray-700/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      Holders
                    </span>
                    <span className="text-green-400 text-sm">30%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{width: '30%'}}></div>
                  </div>
                </div>
                
                <div className="bg-gray-700/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                      Platform
                    </span>
                    <span className="text-purple-400 text-sm">10%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full" style={{width: '10%'}}></div>
                  </div>
                </div>
                
                {/* Central pie chart representation */}
                <div className="flex justify-center mt-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <div className="text-2xl">💰</div>
                  </div>
                </div>
                
                {/* Text content inside card */}
                <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                  <p>Trading fees are automatically distributed to stakeholders based on predetermined percentages.</p>
                  <p>Creators receive the largest share for launching successful coins, while token holders get rewarded for their participation and loyalty.</p>
                  <p>Platform fees support continued development and maintenance of the ecosystem.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">Flaunch features explained</h1>
        
        <div className="max-w-4xl mx-auto">
          <Carousel 
            className="relative"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {features.map((feature, index) => (
                <CarouselItem key={feature.id} className="pl-4 md:basis-2/3 lg:basis-3/5">
                  {feature.card}
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="left-4 bg-gray-800/80 border-gray-600 hover:bg-gray-700" />
            <CarouselNext className="right-4 bg-gray-800/80 border-gray-600 hover:bg-gray-700" />
          </Carousel>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-16 space-x-2">
          {features.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
