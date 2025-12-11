import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

const heroVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } }
};
const item = { hidden: { opacity:0, y:8 }, show: { opacity:1, y:0, transition: {duration:0.45, ease: 'easeOut'} } };

export default function Hero(){
  const particlesInit = async (engine) => { await loadFull(engine); }
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
  }

  return (
    <section className="min-h-screen relative flex items-center">
      <div className="absolute inset-0 hero-bg-image" aria-hidden="true"></div>
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div className="glass-card p-8 rounded-2xl shadow-2xl" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/5 text-tripmindA font-bold">AI · Travel</span>
              <div className="text-white/90 font-semibold">Welcome to TripMind</div>
            </div>

            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-3" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6}}>
              <motion.span variants={heroVariants} initial="hidden" animate="show" className="block overflow-hidden">
                <span className="bg-gradient-to-r from-white via-blue-50 to-tripmindA bg-clip-text text-transparent">
                  {Array.from('Plan Your Next Adventure with AI ✈️').map((c,i)=> (
                    <motion.span key={i} variants={item} className="inline-block">{c}</motion.span>
                  ))}
                </span>
              </motion.span>
            </motion.h1>

            <motion.p className="text-white/90 text-lg mb-6 max-w-xl" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.35, duration:0.6}}>
              Smart itineraries, real-time travel insights, and AI-powered planning.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}>
              <Link to="/trip-planner">
                <motion.button 
                  whileHover={{scale:1.05}} 
                  whileTap={{scale:0.98}} 
                  className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-tripmindA to-tripmindB text-gray-900 shadow-lg hover:shadow-tripmindA/50 hover:shadow-2xl transition-all duration-300 relative group"
                >
                  {/* Glowing effect on hover */}
                  <span className="absolute inset-0 rounded-xl bg-tripmindA/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">Plan My Trip</span>
                </motion.button>
              </Link>
              <Link to="/community">
                <motion.button 
                  whileHover={{scale:1.05}} 
                  whileTap={{scale:0.98}} 
                  className="px-6 py-3 rounded-xl font-semibold bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 hover:border-tripmindA hover:shadow-lg hover:shadow-tripmindA/50 transition-all duration-300 relative group"
                >
                  {/* Glowing border effect on hover */}
                  <span className="absolute inset-0 rounded-xl bg-tripmindA/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">Explore Community</span>
                </motion.button>
              </Link>
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
  )
}
