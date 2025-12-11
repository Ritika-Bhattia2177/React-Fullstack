import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import WhySection from './components/WhySection.jsx'
import PopularDestinations from './components/PopularDestinations.jsx'
import PromoSection from './components/PromoSection.jsx'
import Footer from './components/Footer.jsx'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix Leaflet marker icons for Vite/React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})
import PlanTrip from './pages/PlanTrip.jsx'
import Community from './pages/Community.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import TripNotes from './pages/TripNotes.jsx'
import TripPlanner from './pages/TripPlanner.jsx'
import ShareAdventure from './pages/ShareAdventure.jsx'
import DestinationDetail from './pages/DestinationDetail.jsx'

function HomePage() {
  return (
    <>
      <Hero />
      <WhySection />
      <PopularDestinations />
      <PromoSection />
    </>
  )
}

export default function App(){
  const location = useLocation()

  // show or hide nav/footer for specific routes (login/signup)
  // previously this variable was referenced but not defined which caused a runtime
  // ReferenceError and resulted in a blank page. Keep nav visible by default,
  // hide on auth pages to match the original behaviour.
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className={`flex-grow pt-16`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plan-trip" element={<PlanTrip />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trip-notes" element={<TripNotes />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/share-adventure" element={<ShareAdventure />} />
          <Route path="/destination/:country" element={<DestinationDetail />} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </div>
  )
}
