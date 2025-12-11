import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { createRoot } from 'https://cdn.skypack.dev/react-dom/client';
import { motion, AnimatePresence } from 'https://cdn.skypack.dev/framer-motion';
import { Cpu, CloudRain, DollarSign, Users, Instagram, Twitter, Linkedin } from 'https://cdn.skypack.dev/lucide-react';
import Particles from 'https://cdn.skypack.dev/react-tsparticles';
import { loadFull } from 'https://cdn.skypack.dev/tsparticles';

function NavBar(){
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  },[]);

  return (
    <header className={`fixed w-full z-40 transition-colors duration-300 ${scrolled? 'bg-black/70 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-white font-extrabold text-lg">TripMind</div>
            <div className="hidden md:flex items-center gap-6 ml-6">
              <NavLink>Home</NavLink>
              <NavLink>Plan Trip</NavLink>
              <NavLink>Community</NavLink>
              <NavLink>About</NavLink>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-tripmindA to-tripmindB text-black shadow-md hover:scale-105 transform transition" aria-label="Plan trip">Plan Trip</button>
            <button className="text-sm text-white/90">Login</button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={()=>setOpen(v=>!v)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30" aria-label="Toggle menu">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{opacity:0, y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} className="md:hidden bg-black/75 backdrop-blur-sm">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <MobileLink onClick={()=>setOpen(false)}>Home</MobileLink>
              <MobileLink onClick={()=>setOpen(false)}>Plan Trip</MobileLink>
              <MobileLink onClick={()=>setOpen(false)}>Community</MobileLink>
              <MobileLink onClick={()=>setOpen(false)}>About</MobileLink>
              <div className="pt-2 border-t border-white/5">
                <button className="w-full text-left px-3 py-2 rounded-lg mt-2 bg-gradient-to-r from-tripmindA to-tripmindB text-black font-semibold">Plan Trip</button>
                <button className="w-full text-left px-3 py-2 rounded-lg mt-2 text-white/90">Login</button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({children}){
  return <a href="#" className="text-white/90 hover:text-white transition text-sm font-medium">{children}</a>;
}
function MobileLink({children, onClick}){
  return <a onClick={onClick} href="#" className="block text-white py-2 text-base">{children}</a>;
}

const heroVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } }
};
const item = { hidden: { opacity:0, y:8 }, show: { opacity:1, y:0, transition: {duration:0.45, ease: 'easeOut'} } };

function Hero(){
  // particles init for tsparticles
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesOptions = {
    fpsLimit: 60,
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 28, density: { enable: true, area: 900 } },
      color: { value: ['#00c2a8', '#3b82f6', '#7ee7d6'] },
      shape: { type: 'circle' },
      opacity: { value: 0.24, random: { enable: true, minimumValue: 0.12 } },
      size: { value: { min: 3, max: 8 }, random: true },
      move: { enable: true, speed: 0.35, direction: 'none', outModes: { default: 'out' } }
    },
    interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } }, detectsOn: 'canvas' },
    detectRetina: true
  };

  return (
    <section className="min-h-screen relative flex items-center">
      {/* background image layer */}
      <div className="absolute inset-0 hero-bg-image" aria-hidden="true"></div>

      {/* particles layer (subtle, behind content) */}
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-10" />

      {/* content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div className="glass-card p-8 rounded-2xl shadow-2xl" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/5 text-tripmindA font-bold">AI · Travel</span>
              <div className="text-white/90 font-semibold">Welcome to TripMind</div>
            </div>

            <motion.h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-3" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6}}>
              <motion.span variants={heroVariants} initial="hidden" animate="show" className="block overflow-hidden">
                {Array.from('Plan Your Next Adventure with AI ✈️').map((c,i)=> (
                  <motion.span key={i} variants={item} className="inline-block">{c}</motion.span>
                ))}
              </motion.span>
            </motion.h1>

            <motion.p className="text-white/90 mb-6 max-w-xl" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.35, duration:0.6}}>
              Smart itineraries, real-time travel insights, and AI-powered planning.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-3" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}>
              <button className="px-5 py-3 rounded-lg font-semibold bg-gradient-to-r from-tripmindA to-tripmindB text-black shadow hover:scale-105 transform transition">Plan My Trip</button>
              <button className="px-4 py-2 rounded-lg bg-transparent border border-white/10 text-white/90">Learn More</button>
            </motion.div>

            <p className="text-white/80 mt-4 text-sm">Try TripMind — get tailored itineraries in seconds with live updates and recommendations.</p>
          </motion.div>

          <motion.aside className="space-y-4" initial={{opacity:0, x:12}} animate={{opacity:1, x:0}} transition={{delay:0.3}}>
            <div className="p-4 rounded-xl bg-white/3">
              <div className="text-tripmindA font-bold">Personalized Itineraries</div>
              <div className="text-white/90">AI creates day-by-day plans based on your tastes and pace.</div>
            </div>
            <div className="p-4 rounded-xl bg-white/3">
              <div className="text-tripmindA font-bold">Real-Time Alerts</div>
              <div className="text-white/90">Weather, transit delays, and local events — updated live.</div>
            </div>
            <div className="p-4 rounded-xl bg-white/3">
              <div className="text-tripmindA font-bold">Budget Smart</div>
              <div className="text-white/90">Get recommendations that match your budget and priorities.</div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="pt-16 flex-grow">
        <Hero />
        <WhySection />
        <PopularDestinations />
        <PromoSection />
      </main>
      <Footer />
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));

/* ---------- Why TripMind Section (Feature Cards) ---------- */

function FeatureCard({Icon, title, desc, delay=0, gradient='bg-gradient-to-br from-tripmindA to-tripmindB'}){
  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-lg ${gradient}`}
      initial={{opacity:0, y:12}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true, amount:0.2}}
      whileHover={{scale:1.03, boxShadow:'0 18px 40px rgba(59,130,246,0.16)'}}
      transition={{duration:0.6, delay}}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-white/10">
          <Icon className="w-7 h-7 text-white" aria-hidden="true" />
        </div>
        <div>
          <div className="font-bold text-white">{title}</div>
          <div className="text-white/80 mt-1 text-sm">{desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

function WhySection(){
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why TripMind?</h2>
        <p className="text-white/80 mt-2 max-w-2xl mx-auto">Smart, AI-driven travel planning that adapts to your preferences and keeps you informed on the go.</p>
      </div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard Icon={Cpu} title="AI Itinerary Planner" desc="Personalized day-by-day plans created in seconds." delay={0.05} gradient={'bg-gradient-to-br from-[#00c2a8] to-[#7ee7d6]'} />
        <FeatureCard Icon={CloudRain} title="Real-Time Weather & Flight Updates" desc="Live alerts for weather and flight changes so you stay ahead." delay={0.12} gradient={'bg-gradient-to-br from-[#3b82f6] to-[#60a5fa]'} />
        <FeatureCard Icon={DollarSign} title="Smart Expense Tracker" desc="Track spending and get budget-friendly suggestions." delay={0.18} gradient={'bg-gradient-to-br from-[#f59e0b] to-[#f97316]'} />
        <FeatureCard Icon={Users} title="Community Itineraries" desc="Discover popular plans from fellow travelers and customize them." delay={0.24} gradient={'bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4]'} />
      </motion.div>
    </section>
  );
}

/* ---------- Popular Destinations Section ---------- */

const destinations = [
  { city: 'Paris', tag: 'Romance, art & cafés.', img: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6a2b8e8b6a0e1f1e8a3b3a6f2f8b4c7d' },
  { city: 'Goa', tag: 'Beaches, nightlife & serenity.', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=8c0a3d387f8c5b7a8f3b6f0e7a955f2e' },
  { city: 'Bali', tag: 'Surfing, temples & rice terraces.', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4f3c8b6c3a1f0e1f2d3c4b5a6e7f8a9b' },
  { city: 'Dubai', tag: 'Skyscrapers, desert & luxury.', img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c6d5a7b2e8c9f0b1a2d3e4f5a6b7c8d' },
  { city: 'Tokyo', tag: 'Neon streets & culinary delights.', img: 'https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7c9a8b6d5e4f3a2b1c0d9e8f7a6b5c4d' }
];

function PopularDestinations(){
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Popular Destinations</h2>
        <p className="text-white/80 mt-2 max-w-2xl mx-auto">Explore curated destinations and discover what's popular among travelers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((d, i) => (
          <motion.div key={d.city} className="group rounded-2xl overflow-hidden relative h-64 shadow-lg" initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.6, delay: i*0.08}}>
            {/* image */}
            <div className="absolute inset-0">
              <img src={d.img} alt={d.city} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* overlay content */}
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <div className="text-white text-2xl font-extrabold">{d.city}</div>
              <motion.div className="text-white/90 mt-2 max-w-xs text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {d.tag}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Promo / CTA Section ---------- */

function PromoSection(){
  return (
    <motion.section className="promo-gradient" initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.3}} transition={{duration:0.7}}>
      <div className="promo-container">
        <div className="glow-border inline-block mb-4">
          <h3 className="promo-headline"><span className="typing">Let AI Plan Your Perfect Trip.</span></h3>
        </div>
        <p className="promo-sub">Just tell us your destination, budget, and interests — we’ll do the rest.</p>
        <motion.a href="/plan-trip" className="promo-button" whileHover={{scale:1.03}} transition={{type:'spring', stiffness:260}}>Start Planning Now</motion.a>
      </div>
    </motion.section>
  );
}

/* ---------- Footer ---------- */

function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="bg-gradient-to-r from-transparent via-white/5 to-transparent h-0.5"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-2xl font-extrabold">TripMind</div>
            <div className="text-white/80 mt-1">AI-powered travel planning for modern explorers.</div>
          </div>

          <nav className="flex items-center gap-6">
            <a href="#" className="text-white/80 hover:text-white transition">Home</a>
            <a href="#" className="text-white/80 hover:text-white transition">About</a>
            <a href="#" className="text-white/80 hover:text-white transition">Contact</a>
            <a href="#" className="text-white/80 hover:text-white transition">Privacy Policy</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#" className="p-2 rounded-md hover:bg-white/6 transition" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="p-2 rounded-md hover:bg-white/6 transition" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="p-2 rounded-md hover:bg-white/6 transition" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        <div className="mt-8 text-center text-white/70 text-sm">© {year} TripMind. All rights reserved.</div>
      </div>
    </footer>
  );
}
