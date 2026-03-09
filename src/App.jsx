import { useState } from 'react'

/* ─── SVG Icons ─── */
const icons = {
  server: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  zap: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  headphones: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 12h.01M8.464 8.464a5 5 0 000 7.072M6.343 6.343a8 8 0 000 11.314M17.657 6.343a8 8 0 010 11.314" />
    </svg>
  ),
  gamepad: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  chevron: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
}

/* ─── Data ─── */
const plans = [
  {
    name: 'Starter VPS',
    price: '$9.99',
    period: '/mo',
    desc: 'Ideal for small servers & testing',
    popular: false,
    features: ['2 vCPU Cores', '4 GB RAM', '50 GB NVMe SSD', 'DDoS Protection', '1 Gbps Network', '24/7 Support'],
  },
  {
    name: 'Pro VPS',
    price: '$24.99',
    period: '/mo',
    desc: 'For medium communities & clans',
    popular: true,
    features: ['4 vCPU Cores', '8 GB RAM', '100 GB NVMe SSD', 'DDoS Protection', '2.5 Gbps Network', 'Priority Support', 'Free Backups'],
  },
  {
    name: 'Mu Online Managed',
    price: '$39.99',
    period: '/mo',
    desc: 'Pre-configured Mu Online server',
    popular: false,
    features: ['Mu Online Pre-Installed', 'Auto-Updates', 'DDoS Protection', 'Daily Backups', 'One-Click Installer', 'Dedicated Resources', 'Migration Assistance'],
  },
]

const features = [
  { icon: 'shield', title: 'DDoS Protection', desc: 'Enterprise-grade protection keeps your servers online during attacks.' },
  { icon: 'clock', title: '99.9% Uptime', desc: 'Redundant infrastructure ensures your game servers are always available.' },
  { icon: 'globe', title: 'Low-Latency Network', desc: 'Global network with optimized routing for minimal ping.' },
  { icon: 'zap', title: 'Instant Setup', desc: 'Your server is ready in under 60 seconds after payment.' },
  { icon: 'headphones', title: '24/7 Support', desc: 'Expert gaming support team available around the clock.' },
  { icon: 'gamepad', title: 'One-Click Mu Online', desc: 'Deploy a fully configured Mu Online server with one click.' },
]

const steps = [
  { num: '01', title: 'Choose Your Plan', desc: 'Select the VPS or managed hosting plan that fits your needs.' },
  { num: '02', title: 'Configure Server', desc: 'Customize your server settings, location, and game configuration.' },
  { num: '03', title: 'Start Playing', desc: 'Your server is live. Share the IP with your community and play!' },
]

const testimonials = [
  { name: 'Alex R.', role: 'Mu Online Server Owner', text: 'Switched from another host and the difference is night and day. Zero lag, amazing support.', rating: 5 },
  { name: 'Maria K.', role: 'Gaming Community Lead', text: 'The managed Mu Online plan saved us hours of configuration. Everything just works.', rating: 5 },
  { name: 'Jake T.', role: 'Clan Leader', text: 'Best ping I\'ve ever had. Our 200+ player community runs smooth as butter.', rating: 5 },
]

const faqs = [
  { q: 'What VPS specs are available?', a: 'We offer plans ranging from 2 vCPU / 4GB RAM to custom enterprise configurations. All plans include NVMe SSD storage, DDoS protection, and a high-speed network connection.' },
  { q: 'Which Mu Online versions do you support?', a: 'We support all major Mu Online server versions including Season 6, Season 16+, and custom builds. Our one-click installer handles the setup automatically.' },
  { q: 'Do you offer migration help?', a: 'Yes! Our team will help you migrate your existing game server to our platform at no extra cost. We handle database transfers, configuration, and DNS updates.' },
  { q: 'What is your refund policy?', a: 'We offer a 7-day money-back guarantee on all plans. If you\'re not satisfied, contact support for a full refund — no questions asked.' },
  { q: 'Can I upgrade my plan later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time from your control panel. Changes take effect immediately with prorated billing.' },
]

/* ─── Components ─── */
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Plans', '#plans'],
    ['Features', '#features'],
    ['How It Works', '#how'],
    ['FAQ', '#faq'],
  ]
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] bg-clip-text text-transparent">
          GameHost
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</a>
          ))}
          <a href="#plans" className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Get Started
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0a0a0f]/95 border-t border-white/5 px-4 pb-4">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block py-3 text-gray-400 hover:text-white transition-colors">{label}</a>
          ))}
          <a href="#plans" onClick={() => setOpen(false)} className="block mt-2 text-center px-5 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white font-semibold">
            Get Started
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08),transparent_70%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 text-[#00d4ff] text-sm font-medium mb-8">
          🎮 Premium Game Server Hosting
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
          Game Hosting,{' '}
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] bg-clip-text text-transparent">
            Zero Lag
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Low-latency VPS and managed Mu Online server hosting.
          Deploy in seconds, play with zero interruptions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#plans" className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#00d4ff]/20">
            Get Started →
          </a>
          <a href="#features" className="px-8 py-4 rounded-xl border border-white/10 text-white font-semibold text-lg hover:bg-white/5 transition-colors">
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}

function Plans() {
  return (
    <section id="plans" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your <span className="text-[#00d4ff]">Plan</span></h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Powerful hosting for every scale. All plans include DDoS protection and 24/7 support.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className={`card-glow relative rounded-2xl p-8 bg-[#12121a] border ${plan.popular ? 'border-[#00d4ff]/50 popular-glow' : 'border-white/5'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-xs font-bold text-white">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    {icons.check} {f}
                  </li>
                ))}
              </ul>
              <a href="#" className={`block text-center py-3 rounded-xl font-semibold transition-all ${plan.popular
                ? 'bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white hover:opacity-90'
                : 'border border-white/10 text-white hover:bg-white/5'}`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24 bg-[#0d0d14]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why <span className="text-[#8b5cf6]">GameHost</span>?</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Everything you need for a lag-free gaming experience.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="card-glow p-8 rounded-2xl bg-[#12121a] border border-white/5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00d4ff]/10 to-[#8b5cf6]/10 flex items-center justify-center text-[#00d4ff] mb-5">
                {icons[f.icon]}
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It <span className="text-[#00d4ff]">Works</span></h2>
          <p className="text-gray-400 text-lg">Get your game server running in 3 simple steps.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="text-6xl font-black bg-gradient-to-b from-[#00d4ff]/30 to-transparent bg-clip-text text-transparent mb-4">{s.num}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 bg-[#0d0d14]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Gamers <span className="text-[#8b5cf6]">Say</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="card-glow p-8 rounded-2xl bg-[#12121a] border border-white/5">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }, (_, i) => <span key={i}>{icons.star}</span>)}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-sm text-gray-400">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section id="faq" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked <span className="text-[#00d4ff]">Questions</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-[#12121a] overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold hover:text-[#00d4ff] transition-colors"
              >
                {f.q}
                <span className={`transition-transform ${openIdx === i ? 'rotate-180' : ''}`}>{icons.chevron}</span>
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 bg-[#08080d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] bg-clip-text text-transparent">GameHost</a>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">Premium game server hosting with zero lag. Built for gamers, by gamers.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#plans" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Control Panel</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Acceptable Use</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 GameHost. All rights reserved.</p>
          <div className="flex gap-4">
            {['Discord', 'Twitter', 'GitHub'].map((s) => (
              <a key={s} href="#" className="text-sm text-gray-500 hover:text-white transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Plans />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  )
}
