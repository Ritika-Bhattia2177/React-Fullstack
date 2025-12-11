import React from 'react'
import { motion } from 'framer-motion'

const destinations = [
  { 
    city: 'Paris', 
    tag: 'Romance, art & cafés.', 
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=80'
  },
  { 
    city: 'Goa', 
    tag: 'Beaches, nightlife & serenity.', 
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80'
  },
  { 
    city: 'Bali', 
    tag: 'Surfing, temples & rice terraces.', 
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80'
  },
  { 
    city: 'Dubai', 
    tag: 'Skyscrapers, desert & luxury.', 
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80'
  },
  { 
    city: 'Tokyo', 
    tag: 'Neon streets & culinary delights.', 
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&auto=format&fit=crop&q=80'
  },
  { 
    city: 'Santorini', 
    tag: 'Blue domes & stunning sunsets.', 
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&auto=format&fit=crop&q=80'
  }
];

export default function PopularDestinations(){
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Popular Destinations</h2>
        <p className="text-white/80 mt-2 max-w-2xl mx-auto">Explore curated destinations and discover what's popular among travelers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((d, i) => (
          <motion.div 
            key={d.city} 
            className="group rounded-2xl overflow-hidden relative h-64 shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300" 
            initial={{opacity:0, y:20}} 
            whileInView={{opacity:1, y:0}} 
            viewport={{once:true, amount:0.2}} 
            transition={{duration:0.6, delay: i*0.08}}
          >
            {/* image */}
            <div className="absolute inset-0">
              <img src={d.img} alt={`${d.city} destination`} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>
            </div>

            {/* overlay content */}
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <div className="text-white text-2xl font-extrabold drop-shadow-lg">{d.city}</div>
              <div className="text-white/90 mt-2 max-w-xs text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {d.tag}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
