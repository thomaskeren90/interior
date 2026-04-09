'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔮</span>
            <span className="text-xl font-bold gradient-text">SpaceCraft</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <Link href="/app" className="btn-primary text-sm">Launch App</Link>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <a href="#features" className="text-gray-300 hover:text-white">Features</a>
            <a href="#gallery" className="text-gray-300 hover:text-white">Gallery</a>
            <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
            <Link href="/app" className="btn-primary text-sm text-center">Launch App</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">AI-Powered • Instant Results</span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Transform Your Space</span><br />
          <span className="gradient-text">In Seconds, Not Months</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload a photo of any room. Our AI instantly redesigns it in 50+ styles — 
          from minimalist to maximalist, with cost estimates built in.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/app" className="btn-primary text-lg px-8 py-4">
            ✨ Start Designing Free
          </Link>
          <a href="#demo" className="px-8 py-4 rounded-xl font-semibold border border-white/10 hover:border-white/30 transition-all">
            Watch Demo
          </a>
        </div>
        <div className="mt-16 relative">
          <div className="glass rounded-3xl p-2 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-2 gap-1 p-4">
                <div className="rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-3">📷</div>
                    <p className="text-gray-400 text-sm">Upload your room</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e94560]/20 to-[#f5a623]/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-3 animate-float">✨</div>
                      <p className="text-white font-semibold">AI-Designed Interior</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#e94560] to-[#f5a623] flex items-center justify-center animate-glow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-8 text-sm text-gray-500">
            <span>⚡ ~30s generation</span>
            <span>🎨 50+ styles</span>
            <span>🏠 35+ room types</span>
            <span>📐 6 design modes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: '🎨', title: 'Interior Redesign', desc: 'Transform any room with AI. Upload a photo, pick a style, get photorealistic results in seconds.' },
    { icon: '🏠', title: 'Virtual Staging', desc: 'Furnish empty rooms for real estate listings. Staged homes sell 87% faster and for 15% more.' },
    { icon: '✏️', title: 'Sketch to Image', desc: 'Turn rough sketches into photorealistic renders. Perfect for client presentations.' },
    { icon: '🖌️', title: 'Style Transfer', desc: 'Love a style from Pinterest? Upload it and we\'ll apply it to your room while keeping the layout.' },
    { icon: '💰', title: 'Cost Estimator', desc: 'Get instant ballpark renovation costs for your design. Plan your budget before committing.' },
    { icon: '📐', title: 'Mood Board Builder', desc: 'Collect and organize your favorite designs into mood boards. Share with designers or clients.' },
    { icon: '🎬', title: '3D Flythrough', desc: 'Turn your designs into immersive 3D walkthrough videos. Experience your space before building.' },
    { icon: '🌍', title: 'Outdoor Design', desc: 'Redesign gardens, patios, and outdoor spaces. Not just interiors.' },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to <span className="gradient-text">Design</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Six powerful AI modes, cost estimation, mood boards, and more — all in one platform.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 glass-hover transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    { room: 'Living Room', style: 'Modern', emoji: '🏠' },
    { room: 'Bedroom', style: 'Scandinavian', emoji: '🌲' },
    { room: 'Kitchen', style: 'Industrial', emoji: '🏗️' },
    { room: 'Bathroom', style: 'Zen', emoji: '🧘' },
    { room: 'Office', style: 'Minimalist', emoji: '🪟' },
    { room: 'Dining Room', style: 'Art Deco', emoji: '🎨' },
  ];

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">See What <span className="gradient-text">SpaceCraft</span> Can Do</h2>
          <p className="text-gray-400">Real transformations across every room and style.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.room} className="glass rounded-2xl overflow-hidden group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-500">{item.emoji}</div>
                    <div className="px-4 py-2 rounded-full glass inline-block">
                      <span className="text-sm font-medium">{item.room}</span>
                      <span className="text-gray-500 mx-2">•</span>
                      <span className="text-sm text-[#e94560]">{item.style}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/app" className="btn-primary">Try It Yourself →</Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Upload', desc: 'Take a photo of your room or upload from your gallery. Any angle works.', icon: '📱' },
    { num: '02', title: 'Customize', desc: 'Pick your room type, design style, and mode. Add optional prompts.', icon: '⚙️' },
    { num: '03', title: 'Generate', desc: 'Our AI processes your image in ~30 seconds. Get multiple variations.', icon: '✨' },
    { num: '04', title: 'Refine', desc: 'Save favorites, estimate costs, build mood boards, share with others.', icon: '🎯' },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It <span className="gradient-text">Works</span></h2>
          <p className="text-gray-400">From photo to design in under a minute.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#e94560]/50 to-transparent" />
              )}
              <div className="text-6xl mb-4">{s.icon}</div>
              <div className="text-[#e94560] text-sm font-mono mb-2">{s.num}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      desc: 'Try it out',
      features: ['5 designs/month', '3 styles', 'Basic resolution', 'Watermarked'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      desc: 'For hobbyists',
      features: ['100 designs/month', 'All 50+ styles', 'HD resolution', 'No watermark', 'Cost estimator'],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Pro',
      price: '$99',
      period: '/month',
      desc: 'For professionals',
      features: ['1,000 designs/month', 'All styles & modes', '4K resolution', 'API access', 'Mood boards', 'Priority support'],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'For teams',
      features: ['Unlimited designs', 'Custom styles', '8K resolution', 'White label', 'Dedicated support', 'SLA'],
      cta: 'Contact Us',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent <span className="gradient-text">Pricing</span></h2>
          <p className="text-gray-400">Start free. Upgrade when you love it.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'rounded-2xl p-8 transition-all duration-300',
                plan.highlighted
                  ? 'bg-gradient-to-b from-[#e94560]/20 to-[#0f3460]/30 border border-[#e94560]/50 scale-105'
                  : 'glass'
              )}
            >
              {plan.highlighted && (
                <div className="text-xs font-semibold text-[#e94560] mb-4 uppercase tracking-wider">Most Popular</div>
              )}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={cn(
                'w-full py-3 rounded-xl font-semibold transition-all',
                plan.highlighted
                  ? 'btn-primary'
                  : 'border border-white/10 hover:border-white/30'
              )}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔮</span>
              <span className="text-lg font-bold gradient-text">SpaceCraft</span>
            </div>
            <p className="text-gray-500 text-sm">AI-powered interior design for everyone.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SpaceCraft AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
}
