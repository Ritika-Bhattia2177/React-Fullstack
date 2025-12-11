import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Map control component to handle map movements
function MapController({ center, zoom }) {
  const map = useMap()
  
  useEffect(() => {
    if (center && center.length === 2) {
      map.flyTo(center, zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      })
    }
  }, [center, zoom, map])
  
  return null
}

const popularDestinations = [
  { name: "Paris", coordinates: [48.8566, 2.3522], country: "France", description: "City of Light & Romance", emoji: "🗼" },
  { name: "Tokyo", coordinates: [35.6895, 139.6917], country: "Japan", description: "Modern meets Traditional", emoji: "🗾" },
  { name: "New York", coordinates: [40.7128, -74.0060], country: "USA", description: "The City That Never Sleeps", emoji: "🗽" },
  { name: "Dubai", coordinates: [25.2048, 55.2708], country: "UAE", description: "Luxury & Innovation", emoji: "🏙️" },
  { name: "Sydney", coordinates: [-33.8688, 151.2093], country: "Australia", description: "Harbor City Beauty", emoji: "🦘" },
  { name: "London", coordinates: [51.5074, -0.1276], country: "UK", description: "Historic Royal Capital", emoji: "🏰" },
]

export default function PromoSection(){
  const [showMap, setShowMap] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  
  // Map center and zoom for Leaflet (latitude, longitude format)
  const [mapCenter, setMapCenter] = useState([20, 0]) // [lat, lng]
  const [mapZoom, setMapZoom] = useState(2)
  const [searchError, setSearchError] = useState('')
  const [currentMarkers, setCurrentMarkers] = useState(popularDestinations)
  
  // USE REF FOR INPUT - This will work!
  const searchInputRef = useRef(null)

  // const handleDestinationClick = (dest) => {
  //   setSelectedDestination(dest)
  //   console.log('✅ Selected destination:', dest.name)
    
  //   // Zoom map to destination (Leaflet format: [lat, lng])
  //   setMapCenter(dest.coordinates)
  //   setMapZoom(10)
  // }
  


  
  // Reset map view
  const resetMapView = () => {
    setMapCenter([20, 0])
    setMapZoom(2)
    setSelectedDestination(null)
    setSearchResults([])
    setCurrentMarkers(popularDestinations)
  }

  // Search using OpenStreetMap Nominatim API
  const performSearch = async (query) => {
    console.log('🔍 ========== SEARCH STARTED ==========')
    console.log('Query received:', query)
    
    if (!query || query.trim().length < 2) {
      console.log('❌ Query too short')
      setSearchError('Please type at least 2 characters')
      return
    }

    console.log('✅ Query valid, fetching data from Nominatim API...')
    setIsSearching(true)
    setSearchError('')
    
    try {
      // OpenStreetMap Nominatim API
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=10&addressdetails=1`
      console.log('📡 API URL:', url)
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'TripMind-App'
        }
      })
      console.log('📡 Response status:', response.status)
      
      if (response.ok) {
        const locations = await response.json()
        console.log('✅ Locations received:', locations)
        
        if (locations && locations.length > 0) {
          // Take first result
          const firstResult = locations[0]
          const lat = parseFloat(firstResult.lat)
          const lon = parseFloat(firstResult.lon)
          const displayName = firstResult.display_name
          const locationType = firstResult.type || 'location'
          
          console.log('🎯 First result:', { lat, lon, displayName })
          
          // Create marker for search result
          const searchMarker = {
            name: firstResult.name || displayName.split(',')[0],
            country: firstResult.address?.country || '',
            coordinates: [lat, lon],
            description: `Explore ${displayName.split(',')[0]}`,
            emoji: '📍',
            isSearchResult: true,
            displayName: displayName
          }
          
          // Update markers and map position
          setSearchResults([searchMarker])
          setCurrentMarkers([searchMarker])
          setMapCenter([lat, lon])
          setMapZoom(12)
          setSelectedDestination(searchMarker)
          
          console.log('✅ Map moved to:', displayName)
        } else {
          console.log('❌ No locations found')
          setSearchError(`Location not found: "${query}"`)
          setSearchResults([])
        }
      } else {
        console.log('❌ API error, status:', response.status)
        setSearchError('Search failed. Please try again.')
        setSearchResults([])
      }
    } catch (err) {
      console.error('❌ ERROR:', err)
      setSearchError('Location not found. Please check your spelling and try again.')
      setSearchResults([])
    }
    
    setIsSearching(false)
    console.log('🔍 ========== SEARCH ENDED ==========')
  }

  // Handle search button click
  const handleSearchClick = () => {
    // Get value from ref instead of state
    const query = searchInputRef.current?.value || ''
    console.log('🔘 Search button clicked! Query from input:', query)
    
    if (query.trim().length > 0) {
      console.log('✅ Starting search...')
      setSearchQuery(query) // Update display
      performSearch(query)
    } else {
      console.log('❌ Empty query!')
      setSearchError('Please type a country or city name first!')
    }
  }

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('⏎ Enter key pressed!')
      handleSearchClick()
    }
  }

  const displayDestinations = searchResults.length > 0 
    ? searchResults 
    : popularDestinations

  return (
    <motion.section 
      className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-16 sm:py-20 lg:py-24" 
      initial={{opacity:0, y:12}} 
      whileInView={{opacity:1, y:0}} 
      viewport={{once:true, amount:0.3}} 
      transition={{duration:0.7}}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4"
          initial={{opacity:0, y:8}}
          whileInView={{opacity:1, y:0}}
          viewport={{once:true}}
          transition={{delay:0.2, duration:0.6}}
        >
          Let AI Plan Your Perfect Trip.
        </motion.h2>
        
        <motion.p 
          className="text-lg sm:text-xl text-white/95 mb-8 max-w-2xl mx-auto"
          initial={{opacity:0, y:8}}
          whileInView={{opacity:1, y:0}}
          viewport={{once:true}}
          transition={{delay:0.3, duration:0.6}}
        >
          Just tell us your destination, budget, and interests — we'll do the rest.
        </motion.p>
        
        <motion.div
          initial={{opacity:0, y:8}}
          whileInView={{opacity:1, y:0}}
          viewport={{once:true}}
          transition={{delay:0.4, duration:0.6}}
        >
          <button 
            onClick={() => setShowMap(!showMap)}
            type="button"
            className="px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-xl shadow-2xl hover:shadow-white/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer z-50 relative"
            style={{ position: 'relative', zIndex: 50 }}
          >
            {showMap ? '✕ Hide Map' : '🗺️ Start Planning Now'}
          </button>
        </motion.div>
      </div>

      {/* SEARCH BAR - COMPLETELY SEPARATE FROM MAP */}
      {showMap && (
        <div className="mt-8 max-w-2xl mx-auto px-4" style={{ position: 'relative', zIndex: 9999, pointerEvents: 'auto' }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            position: 'relative',
            zIndex: 9999,
            pointerEvents: 'auto'
          }}>
            <h3 style={{ 
              color: 'black', 
              fontSize: '28px', 
              fontWeight: 'bold', 
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              🔍 Search for any location:
            </h3>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const input = e.target.elements.searchInput;
              const query = input.value.trim();
              if (!query) {
                setSearchError('Please type a city or country name!');
                return;
              }
              setIsSearching(true);
              setSearchError('');
              try {
                // Use OpenStreetMap Nominatim API for both cities and countries
                const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`;
                const response = await fetch(url, {
                  headers: { 'User-Agent': 'TripMind-App' }
                });
                if (!response.ok) throw new Error('Location not found');
                const locations = await response.json();
                if (!locations || locations.length === 0) throw new Error('Location not found');
                const loc = locations[0];
                const lat = parseFloat(loc.lat);
                const lon = parseFloat(loc.lon);
                const displayName = loc.display_name;
                setMapCenter([lat, lon]);
                setMapZoom(10);
                const marker = {
                  name: displayName.split(',')[0],
                  country: loc.address?.country || '',
                  coordinates: [lat, lon],
                  description: displayName,
                  emoji: '📍',
                  isSearchResult: true,
                  displayName: displayName
                };
                setCurrentMarkers([marker]);
                setSelectedDestination(marker);
              } catch (err) {
                setSearchError('Location not found');
              }
              setIsSearching(false);
            }}>
              <input
                name="searchInput"
                type="text"
                placeholder="Type: Paris, London, Tokyo..."
                autoComplete="off"
                style={{
                  width: '100%',
                  padding: '20px',
                  fontSize: '24px',
                  border: '4px solid #3B82F6',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  outline: 'none',
                  position: 'relative',
                  zIndex: 10000,
                  pointerEvents: 'auto',
                  background: 'white',
                  color: 'black'
                }}
              />
              
              <button
                type="submit"
                disabled={isSearching}
                style={{
                  width: '100%',
                  padding: '20px',
                  fontSize: '24px',
                  backgroundColor: isSearching ? '#9CA3AF' : '#10B981',
                  color: 'white',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: isSearching ? 'not-allowed' : 'pointer'
                }}
              >
                {isSearching ? '⏳ Searching...' : '🔍 SEARCH NOW'}
              </button>
              
              {searchError && (
                <div style={{
                  marginTop: '16px',
                  padding: '16px',
                  backgroundColor: '#FEE2E2',
                  border: '2px solid #EF4444',
                  borderRadius: '8px',
                  color: '#991B1B',
                  fontWeight: 'bold'
                }}>
                  ❌ {searchError}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Interactive World Map */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="mt-12 max-w-6xl mx-auto px-4 sm:px-6"
          >
            <div className="bg-gradient-to-br from-slate-900/90 via-blue-900/90 to-slate-900/90 backdrop-blur-lg rounded-3xl border-2 border-white/30 shadow-2xl p-8">
              <h3 className="text-3xl font-bold text-white mb-2 text-center">
                🌍 Explore Popular Destinations
              </h3>
              <p className="text-white/80 text-center mb-6">
                Click destinations below to explore
              </p>
              
              {/* Selected Destination Info */}
              <AnimatePresence>
                {selectedDestination && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    className="mb-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400 rounded-2xl p-6 text-center shadow-2xl"
                  >
                    <div className="text-6xl mb-3">{selectedDestination.emoji}</div>
                    <h4 className="text-3xl font-extrabold text-white mb-2">
                      {selectedDestination.name}, {selectedDestination.country}
                    </h4>
                    <p className="text-white/90 text-lg mb-4">{selectedDestination.description}</p>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <button
                        onClick={() => {
                          setShowMap(false);
                        }}
                        className="px-6 py-3 bg-white/20 backdrop-blur-lg border border-white/30 text-white font-bold rounded-xl hover:bg-white/30 transition-all"
                      >
                        ✕ Close
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LARGE Clickable Destination Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayDestinations.map((dest, index) => {
                  const isSelected = selectedDestination?.name === dest.name
                  return (
                    <motion.button
                      key={dest.name + index}
                      onClick={() => handleDestinationClick(dest)}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-2xl border-3 transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-300 shadow-2xl shadow-yellow-500/50'
                          : 'bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 hover:border-tripmindA hover:shadow-xl'
                      }`}
                      style={{ 
                        border: isSelected ? '3px solid #fbbf24' : '2px solid rgba(255,255,255,0.3)',
                      }}
                    >
                      <div className={`text-6xl mb-3 transition-transform ${isSelected ? 'scale-125' : ''}`}>
                        {dest.emoji}
                      </div>
                      <div className={`text-xl font-extrabold mb-1 ${isSelected ? 'text-white' : 'text-white'}`}>
                        {dest.name}
                      </div>
                      <div className={`text-sm ${isSelected ? 'text-white/90' : 'text-white/70'}`}>
                        {dest.country}
                      </div>
                      {dest.isSearchResult && (
                        <div className="mt-2 text-xs bg-tripmindA/30 text-white px-2 py-1 rounded-full inline-block">
                          Search Result
                        </div>
                      )}
                      {isSelected && (
                        <div className="mt-3 text-white text-xs font-semibold">
                          ✓ SELECTED
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
              
              {/* Interactive World Map with Leaflet */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-white/20">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xl font-bold text-white">
                    🗺️ Interactive World Map
                  </h4>
                  {mapZoom > 2 && (
                    <button
                      onClick={() => {
                        setMapCenter([20, 0]);
                        setMapZoom(2);
                        setSelectedDestination(null);
                        setCurrentMarkers(popularDestinations);
                        setSearchResults([]);
                      }}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                      🌍 Reset View
                    </button>
                  )}
                </div>
                <p className="text-white/60 text-sm text-center mb-4">
                  {mapZoom > 2
                    ? `Zoomed in on ${selectedDestination?.name || 'location'} • Click "Reset View" to see full world map`
                    : 'Search for any location or click destinations below to zoom in'}
                </p>
                
                <div style={{ width: '100%', height: '500px', borderRadius: '1rem', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1 }}
                    scrollWheelZoom={true}
                    zoomControl={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapController center={mapCenter} zoom={mapZoom} />
                    
                    {/* Markers for current destinations */}
                    {currentMarkers.map((dest, idx) => (
                      <LeafletMarker
                        key={dest.name + idx}
                        position={dest.coordinates}
                        eventHandlers={{
                          click: () => handleDestinationClick(dest)
                        }}
                      >
                        <Popup>
                          <div className="text-center">
                            <div className="text-3xl mb-2">{dest.emoji}</div>
                            <div className="font-bold text-lg">{dest.name}</div>
                            <div className="text-sm text-gray-600">{dest.country}</div>
                            {dest.displayName && (
                              <div className="text-xs text-gray-500 mt-1">{dest.displayName}</div>
                            )}
                          </div>
                        </Popup>
                      </LeafletMarker>
                    ))}
                  </MapContainer>
                </div>
              </div>
              
              {/* Call to action */}
              <div className="mt-6 text-center flex flex-wrap justify-center gap-3">
                {selectedDestination && (
                  <button
                    onClick={() => {
                      setSelectedDestination(null);
                      setCurrentMarkers(popularDestinations);
                      setMapCenter([20, 0]);
                      setMapZoom(2);
                      setSearchResults([]);
                      setShowMap(false);
                    }}
                    className="px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                  >
                    ✕ Clear Selection
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
