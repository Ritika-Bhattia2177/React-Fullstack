import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, CloudRain, DollarSign, Users } from 'lucide-react'

function FeatureCard({Icon, title, desc, delay=0, gradient='bg-gradient-to-br from-tripmindA to-tripmindB', glowColor='rgba(0,194,168,0.4)'}){
  return (
    <motion.div 
      className={`p-6 rounded-2xl shadow-lg ${gradient} transition-shadow duration-300`} 
      initial={{opacity:0, y:12}} 
      whileInView={{opacity:1, y:0}} 
      viewport={{once:true, amount:0.2}} 
      whileHover={{scale:1.05, boxShadow: `0 20px 60px ${glowColor}`}} 
      transition={{duration:0.6, delay}}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-white/10">
          <Icon className="w-7 h-7 text-white" aria-hidden="true" />
        </div>
        <div>
          <div className="font-bold text-white text-lg">{title}</div>
          <div className="text-white/80 mt-1 text-sm">{desc}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function WhySection(){
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why TripMind?</h2>
        <p className="text-white/80 mt-2 max-w-2xl mx-auto">Smart, AI-driven travel planning that adapts to your preferences and keeps you informed on the go.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard Icon={Cpu} title="AI Itinerary Planner" desc="Personalized day-by-day plans created in seconds." delay={0.05} gradient={'bg-gradient-to-br from-[#00c2a8] to-[#7ee7d6]'} glowColor={'rgba(0,194,168,0.5)'} />
        <FeatureCard Icon={CloudRain} title="Real-Time Weather & Flight Updates" desc="Live alerts for weather and flight changes so you stay ahead." delay={0.12} gradient={'bg-gradient-to-br from-[#3b82f6] to-[#60a5fa]'} glowColor={'rgba(59,130,246,0.5)'} />
        <FeatureCard Icon={DollarSign} title="Smart Expense Tracker" desc="Track spending and get budget-friendly suggestions." delay={0.18} gradient={'bg-gradient-to-br from-[#f59e0b] to-[#f97316]'} glowColor={'rgba(245,158,11,0.5)'} />
        <FeatureCard Icon={Users} title="Community Itineraries" desc="Discover popular plans from fellow travelers and customize them." delay={0.24} gradient={'bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4]'} glowColor={'rgba(139,92,246,0.5)'} />
      </div>
    </section>
  )
}
