import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Users, Utensils, Landmark, Globe, Heart } from 'lucide-react';

// Destination details data
const destinationData = {
  'Nepal': {
    name: 'Nepal',
    region: 'Asia',
    capital: 'Kathmandu',
    population: '29M',
    language: 'Nepali',
    currency: 'Nepalese Rupee (NPR)',
    bestTime: 'October to December',
    culture: 'Nepal is known for its rich cultural heritage, ancient temples, and warm hospitality. The country is the birthplace of Lord Buddha and home to many UNESCO World Heritage Sites.',
    attractions: [
      'Mount Everest - Highest peak in the world',
      'Pokhara Valley - Beautiful lakes and mountains',
      'Pashupatinath Temple - Sacred Hindu temple',
      'Boudhanath Stupa - Largest stupa in Nepal',
      'Chitwan National Park - Wildlife and jungle safaris'
    ],
    cuisine: [
      'Dal Bhat - Traditional lentil soup with rice',
      'Momos - Steamed dumplings',
      'Thukpa - Noodle soup',
      'Sel Roti - Sweet rice bread',
      'Gundruk - Fermented leafy greens'
    ],
    festivals: ['Dashain', 'Tihar', 'Holi', 'Buddha Jayanti'],
    tips: 'Respect local customs, dress modestly at temples, carry cash as cards may not be accepted everywhere.'
  },
  'United Kingdom': {
    name: 'United Kingdom',
    region: 'Europe',
    capital: 'London',
    population: '67M',
    language: 'English',
    currency: 'British Pound (GBP)',
    bestTime: 'May to September',
    culture: 'The UK has a rich history spanning centuries, from medieval castles to modern innovation. Known for tea culture, royal heritage, and diverse multicultural communities.',
    attractions: [
      'Big Ben & Houses of Parliament - Iconic London landmarks',
      'Buckingham Palace - Royal residence',
      'Stonehenge - Ancient stone circle',
      'Edinburgh Castle - Historic fortress',
      'Lake District - Scenic natural beauty'
    ],
    cuisine: [
      'Fish and Chips - Classic British dish',
      'Sunday Roast - Traditional meal',
      'Afternoon Tea - Tea with scones and cakes',
      'Full English Breakfast - Hearty morning meal',
      'Shepherd\'s Pie - Meat and potato dish'
    ],
    festivals: ['Notting Hill Carnival', 'Edinburgh Fringe', 'Glastonbury', 'Bonfire Night'],
    tips: 'Weather can be unpredictable, always carry an umbrella. Public transport is excellent in major cities.'
  },
  'Qatar': {
    name: 'Qatar',
    region: 'Asia',
    capital: 'Doha',
    population: '2.8M',
    language: 'Arabic',
    currency: 'Qatari Riyal (QAR)',
    bestTime: 'November to April',
    culture: 'Qatar blends traditional Bedouin culture with ultra-modern development. Known for Islamic architecture, pearl diving heritage, and warm Arab hospitality.',
    attractions: [
      'Museum of Islamic Art - Stunning architecture',
      'Souq Waqif - Traditional marketplace',
      'The Pearl-Qatar - Luxury island',
      'Katara Cultural Village - Arts and culture',
      'Desert Safari - Dune bashing experience'
    ],
    cuisine: [
      'Machboos - Spiced rice with meat',
      'Harees - Wheat and meat dish',
      'Luqaimat - Sweet dumplings',
      'Balaleet - Sweet vermicelli',
      'Madrouba - Creamy rice porridge'
    ],
    festivals: ['Eid al-Fitr', 'Eid al-Adha', 'Qatar National Day', 'Ramadan'],
    tips: 'Dress modestly, avoid public displays of affection, and respect prayer times. Summer is extremely hot.'
  },
  'France': {
    name: 'France',
    region: 'Europe',
    capital: 'Paris',
    population: '65M',
    language: 'French',
    currency: 'Euro (EUR)',
    bestTime: 'April to June, September to October',
    culture: 'France is celebrated for its art, fashion, cuisine, and wine. Known as the cultural heart of Europe with a rich history of philosophy, literature, and revolution.',
    attractions: [
      'Eiffel Tower - Iconic Paris landmark',
      'Louvre Museum - World\'s largest art museum',
      'Palace of Versailles - Royal château',
      'French Riviera - Mediterranean coastline',
      'Mont Saint-Michel - Island abbey'
    ],
    cuisine: [
      'Croissants & Baguettes - French bread',
      'Coq au Vin - Chicken in wine',
      'Ratatouille - Vegetable stew',
      'Crème Brûlée - Caramelized dessert',
      'Escargots - Snails in garlic butter'
    ],
    festivals: ['Bastille Day', 'Cannes Film Festival', 'Tour de France', 'Fête de la Musique'],
    tips: 'Learn basic French phrases, tipping is optional. Museums often have free entry on first Sunday of month.'
  },
  'Japan': {
    name: 'Japan',
    region: 'Asia',
    capital: 'Tokyo',
    population: '126M',
    language: 'Japanese',
    currency: 'Japanese Yen (JPY)',
    bestTime: 'March to May (Cherry Blossoms), September to November',
    culture: 'Japan beautifully balances ancient traditions with cutting-edge technology. Known for tea ceremonies, samurai heritage, anime, and deep respect for nature.',
    attractions: [
      'Mount Fuji - Sacred mountain',
      'Fushimi Inari Shrine - Thousands of torii gates',
      'Tokyo Skytree - Modern tower',
      'Hiroshima Peace Memorial - Historic site',
      'Arashiyama Bamboo Grove - Bamboo forest'
    ],
    cuisine: [
      'Sushi & Sashimi - Raw fish delicacies',
      'Ramen - Noodle soup',
      'Tempura - Deep-fried seafood and vegetables',
      'Okonomiyaki - Savory pancake',
      'Matcha - Green tea desserts'
    ],
    festivals: ['Cherry Blossom Festival', 'Golden Week', 'Gion Matsuri', 'Tanabata'],
    tips: 'Remove shoes when entering homes, bow when greeting, carry cash as many places don\'t accept cards.'
  },
  'Australia': {
    name: 'Australia',
    region: 'Oceania',
    capital: 'Canberra',
    population: '25M',
    language: 'English',
    currency: 'Australian Dollar (AUD)',
    bestTime: 'September to November, March to May',
    culture: 'Australia is known for its laid-back lifestyle, beach culture, and Aboriginal heritage. A melting pot of cultures with a strong outdoor and sports tradition.',
    attractions: [
      'Great Barrier Reef - Largest coral reef',
      'Sydney Opera House - Iconic architecture',
      'Uluru - Sacred rock formation',
      'Great Ocean Road - Coastal drive',
      'Bondi Beach - Famous beach'
    ],
    cuisine: [
      'Meat Pies - Australian classic',
      'Vegemite - Savory spread',
      'Barramundi - Grilled fish',
      'Lamingtons - Sponge cake',
      'Tim Tams - Chocolate biscuits'
    ],
    festivals: ['Australia Day', 'Melbourne Cup', 'Sydney Festival', 'Vivid Sydney'],
    tips: 'Sun protection is essential, tipping is not mandatory. Watch out for wildlife and ocean safety.'
  }
};

export default function DestinationDetail() {
  const { country } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);

  // Get data from navigation state or local database
  const passedData = location.state?.countryData;

  useEffect(() => {
    const initializeDestination = async () => {
      // Check if country exists in our local database
      if (destinationData[country]) {
        setDestination(destinationData[country]);
        return;
      }

      // If data was passed via navigation state, use it
      if (passedData) {
        setFetchingData(true);
        try {
          // Fetch additional details from REST Countries API
          const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`
          );
          
          if (response.ok) {
            const data = await response.json();
            const countryInfo = data[0];
            
            // Create a generic destination object with available data
            const genericDestination = {
              name: countryInfo.name?.common || passedData.name,
              region: countryInfo.region || passedData.region,
              capital: Array.isArray(countryInfo.capital) ? countryInfo.capital[0] : (countryInfo.capital || passedData.capital),
              population: countryInfo.population ? `${(countryInfo.population / 1000000).toFixed(1)}M` : passedData.population,
              language: countryInfo.languages ? Object.values(countryInfo.languages)[0] : 'Various',
              currency: countryInfo.currencies ? Object.values(countryInfo.currencies)[0]?.name : 'Local Currency',
              bestTime: 'Year-round (varies by region)',
              culture: `${countryInfo.name?.common || passedData.name} is a fascinating destination with rich cultural heritage and diverse traditions. This beautiful country offers unique experiences for every traveler.`,
              attractions: [
                `${countryInfo.capital?.[0] || passedData.capital} - Capital city with major landmarks`,
                'Historical monuments and heritage sites',
                'Natural landscapes and scenic beauty',
                'Local markets and shopping districts',
                'Cultural museums and art galleries'
              ],
              cuisine: [
                'Traditional local dishes',
                'Regional specialties',
                'Street food delicacies',
                'Fresh local produce',
                'International cuisine options'
              ],
              festivals: ['National Day celebrations', 'Cultural festivals', 'Religious holidays', 'Local traditions'],
              tips: 'Research local customs and traditions before visiting. Check visa requirements and travel advisories. Learn basic phrases in the local language.'
            };
            
            setDestination(genericDestination);
          } else {
            // Fallback to basic data from passed state
            setDestination({
              name: passedData.name,
              region: passedData.region,
              capital: passedData.capital,
              population: passedData.population,
              language: 'Various',
              currency: 'Local Currency',
              bestTime: 'Year-round',
              culture: `${passedData.name} is a wonderful destination waiting to be explored!`,
              attractions: ['Explore the capital city', 'Visit local landmarks', 'Experience the culture'],
              cuisine: ['Traditional dishes', 'Local specialties'],
              festivals: ['Cultural celebrations'],
              tips: 'Plan ahead and enjoy your trip!'
            });
          }
        } catch (error) {
          console.error('Error fetching country data:', error);
          // Fallback to basic data
          setDestination({
            name: passedData.name,
            region: passedData.region,
            capital: passedData.capital,
            population: passedData.population,
            language: 'Various',
            currency: 'Local Currency',
            bestTime: 'Year-round',
            culture: `${passedData.name} is a wonderful destination waiting to be explored!`,
            attractions: ['Explore the capital city', 'Visit local landmarks', 'Experience the culture'],
            cuisine: ['Traditional dishes', 'Local specialties'],
            festivals: ['Cultural celebrations'],
            tips: 'Plan ahead and enjoy your trip!'
          });
        } finally {
          setFetchingData(false);
        }
      } else {
        // Fallback to Nepal if nothing is available
        setDestination(destinationData['Nepal']);
      }
    };

    initializeDestination();
  }, [country, passedData]);

  useEffect(() => {
    if (!destination) return;
    
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(destination.name + ' travel destination')}&client_id=43JSFDvPQ6tIrLoeie7ueHzk3zf-iCsoxonLgSKtBCk&orientation=landscape&per_page=1`
        );
        const data = await response.json();
        setImageUrl(data.results[0]?.urls?.regular || '');
      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [destination?.name]);

  // Show loading state while fetching data
  if (!destination || fetchingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-tripmindA border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading destination details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 bg-gradient-to-r from-tripmindA/20 to-blue-500/20 animate-pulse"></div>
        ) : (
          <>
            <img 
              src={imageUrl} 
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
          </>
        )}
        
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/community')}
          className="absolute top-8 left-8 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Community
        </motion.button>

        {/* Title */}
        <div className="absolute bottom-8 left-8 right-8">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {destination.name}
          </motion.h1>
          <div className="flex flex-wrap gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-tripmindA" />
              <span>{destination.region}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>{destination.population} people</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              <span>{destination.language}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Calendar className="w-8 h-8 text-tripmindA mb-3" />
            <h3 className="text-white font-bold text-lg mb-2">Best Time to Visit</h3>
            <p className="text-white/80">{destination.bestTime}</p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MapPin className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-white font-bold text-lg mb-2">Capital City</h3>
            <p className="text-white/80">{destination.capital}</p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Globe className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-white font-bold text-lg mb-2">Currency</h3>
            <p className="text-white/80">{destination.currency}</p>
          </motion.div>
        </div>

        {/* Culture Section */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Heart className="w-8 h-8 text-tripmindA" />
            Culture & Heritage
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">{destination.culture}</p>
        </motion.div>

        {/* Attractions */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Landmark className="w-8 h-8 text-blue-400" />
            Top Attractions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destination.attractions.map((attraction, index) => (
              <motion.div
                key={index}
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-white/90">✨ {attraction}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cuisine */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Utensils className="w-8 h-8 text-purple-400" />
            Must-Try Cuisine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destination.cuisine.map((food, index) => (
              <motion.div
                key={index}
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-white/90">🍽️ {food}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Festivals & Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">🎉 Festivals</h2>
            <div className="space-y-2">
              {destination.festivals.map((festival, index) => (
                <div key={index} className="text-white/90 bg-white/5 rounded-lg p-3">
                  {festival}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">💡 Travel Tips</h2>
            <p className="text-white/90 leading-relaxed">{destination.tips}</p>
          </motion.div>
        </div>

        {/* Plan Trip Button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={() => navigate('/trip-planner', { state: { destination: destination.name } })}
            className="px-8 py-4 bg-gradient-to-r from-tripmindA to-blue-500 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-tripmindA/50 transition-all duration-300 hover:scale-105"
          >
            Plan Your Trip to {destination.name}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
