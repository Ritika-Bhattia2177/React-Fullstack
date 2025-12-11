import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const UNSPLASH_ACCESS_KEY = '43JSFDvPQ6tIrLoeie7ueHzk3zf-iCsoxonLgSKtBCk';

const destinations = [
  { name: 'Nepal', region: 'Asia', capital: 'Kathmandu', population: '29M' },
  { name: 'United Kingdom', region: 'Europe', capital: 'London', population: '67M' },
  { name: 'Qatar', region: 'Asia', capital: 'Doha', population: '2.8M' },
  { name: 'France', region: 'Europe', capital: 'Paris', population: '65M' },
  { name: 'Japan', region: 'Asia', capital: 'Tokyo', population: '126M' },
  { name: 'Australia', region: 'Oceania', capital: 'Canberra', population: '25M' },
];

const fetchImage = async (destination) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(destination + ' travel destination')}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape&per_page=1`
    );
    const data = await response.json();
    return data.results[0]?.urls?.regular || '';
  } catch {
    return '';
  }
};

export default function Community() {
  // State management
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showApiResults, setShowApiResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    destinations.forEach(async (dest) => {
      setLoading((prev) => ({ ...prev, [dest.name]: true }));
      const imgUrl = await fetchImage(dest.name);
      setImages((prev) => ({ ...prev, [dest.name]: imgUrl }));
      setLoading((prev) => ({ ...prev, [dest.name]: false }));
    });
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setShowApiResults(false);
      setSearchResults([]);
      return;
    }

    const searchCountries = async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(searchQuery)}?fields=name,capital,region,population`
        );
        
        if (response.ok) {
          const data = await response.json();
          const formattedResults = data.slice(0, 12).map(country => ({
            name: country.name?.common || 'Unknown',
            region: country.region || 'Unknown',
            capital: Array.isArray(country.capital) ? country.capital[0] : (country.capital || 'N/A'),
            population: country.population ? `${(country.population / 1000000).toFixed(1)}M` : 'N/A'
          }));
          setSearchResults(formattedResults);
          setShowApiResults(true);
        } else {
          setSearchResults([]);
          setShowApiResults(true);
        }
      } catch (error) {
        setSearchResults([]);
        setShowApiResults(true);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchCountries();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.capital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const shouldShowApiResults = showApiResults && searchQuery.trim();
  const displayResults = shouldShowApiResults ? searchResults : filteredDestinations;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="text-4xl font-extrabold text-white mb-6 text-center bg-gradient-to-r from-tripmindA via-blue-400 to-purple-400 bg-clip-text text-transparent">TripMind Community</h2>
      
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search any destination worldwide..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tripmindA focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-sm text-gray-300 mt-2 text-center">
            {isSearching ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-tripmindA border-t-transparent rounded-full animate-spin"></div>
                Searching worldwide...
              </span>
            ) : (
              <>
                Found {displayResults.length} {displayResults.length === 1 ? 'destination' : 'destinations'}
                {shouldShowApiResults && ' from around the world'}
              </>
            )}
          </p>
        )}
      </div>

  {displayResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayResults.map((dest, index) => {
            const bgImage = images[dest.name] || `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(dest.name)},travel,landmark`;
            return (
              <div
                key={dest.name + index}
                className="relative rounded-3xl overflow-hidden shadow-xl group h-80 flex items-end border border-white/10 bg-slate-800/30 backdrop-blur-sm cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-tripmindA/30 hover:-translate-y-2"
                style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                
                {loading[dest.name] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md">
                    <div className="w-16 h-16 rounded-full border-4 border-tripmindA border-t-transparent animate-spin"></div>
                  </div>
                )}
                
                <div className="relative z-10 w-full p-6 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-xl rounded-b-3xl border-t border-white/10 transform transition-all duration-300 group-hover:backdrop-blur-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-3xl font-extrabold text-white drop-shadow-2xl tracking-tight">{dest.name}</h3>
                    <div className="w-10 h-10 rounded-full bg-tripmindA/20 border border-tripmindA/40 flex items-center justify-center backdrop-blur-md group-hover:bg-tripmindA/40 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-5 h-5 text-tripmindA" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-white/90 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-tripmindA">📍</span>
                      <span>Region: <span className="text-white font-semibold">{dest.region}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">🏛️</span>
                      <span>Capital: <span className="text-white font-semibold">{dest.capital}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400">👥</span>
                      <span>Population: <span className="text-white font-semibold">{dest.population}</span></span>
                    </div>
                  </div>
                  
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <button 
                      onClick={() => navigate(`/destination/${dest.name}`, { 
                        state: { 
                          countryData: {
                            name: dest.name,
                            region: dest.region,
                            capital: dest.capital,
                            population: dest.population
                          }
                        }
                      })}
                      className="w-full px-4 py-2 bg-gradient-to-r from-tripmindA to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-tripmindA/50 transition-all duration-300 hover:scale-105"
                    >
                      Explore {dest.name}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No destinations found</h3>
          <p className="text-gray-400 mb-6">
            Try searching for a different country or explore our featured destinations
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-6 py-3 bg-gradient-to-r from-tripmindA to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-all"
          >
            Clear Search
          </button>
        </div>
      )}
    </section>
  );
}
