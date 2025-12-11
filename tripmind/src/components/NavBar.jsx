import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function NavBar(){
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
              <Link to="/" className="text-white/90 hover:text-white transition text-sm font-medium">Home</Link>                                                                  
              {/* <Link to="/plan-trip" className="text-white/90 hover:text-white transition text-sm font-medium">Plan Trip</Link> */}
              <Link to="/community" className="text-white/90 hover:text-white transition text-sm font-medium">Community</Link>                                                                                      
              <Link to="/about" className="text-white/90 hover:text-white transition text-sm font-medium">About</Link>
              <Link to="/trip-notes" className="text-white/90 hover:text-white transition text-sm font-medium">Trip Notes</Link>
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* <Link to="/plan-trip">
              <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-tripmindA to-tripmindB text-black shadow-md hover:scale-105 transform transition" aria-label="Plan trip">Plan Trip</button>
            </Link> */}
            <Link to="/login">
              <button className="text-sm text-white/90 hover:text-white transition-colors font-medium">Login</button>
            </Link>
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
              <Link to="/" onClick={()=>setOpen(false)} className="block text-white py-2 text-base">Home</Link>
              {/* <Link to="/plan-trip" onClick={()=>setOpen(false)} className="block text-white py-2 text-base">Plan Trip</Link> */}
              <Link to="/community" onClick={()=>setOpen(false)} className="block text-white py-2 text-base">Community</Link>
              <Link to="/about" onClick={()=>setOpen(false)} className="block text-white py-2 text-base">About</Link>
              <Link to="/trip-notes" onClick={()=>setOpen(false)} className="block text-white py-2 text-base">Trip Notes</Link>
              <div className="pt-2 border-t border-white/5">
                {/* <Link to="/plan-trip" onClick={()=>setOpen(false)}>
                  <button className="w-full text-left px-3 py-2 rounded-lg mt-2 bg-gradient-to-r from-tripmindA to-tripmindB text-black font-semibold">Plan Trip</button>
                </Link> */}
                <Link to="/login" onClick={()=>setOpen(false)}>
                  <button className="w-full text-left px-3 py-2 rounded-lg mt-2 text-white/90 hover:text-white transition-colors">Login</button>
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
