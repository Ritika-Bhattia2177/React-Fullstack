import React from 'react';

const TravelAdventures = ({ adventures }) => {
  return (
    <div className="mt-20 pt-20 border-t border-white/10">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Your Travel Stories
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {adventures.map((adv, idx) => (
          <div key={idx} className="rounded-3xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 transform transition-all duration-300 hover:scale-105">
            {adv.photo && (
              <img src={adv.photo} alt={adv.destination} className="w-full h-48 object-cover" />
            )}
            <div className="p-6">
              <h4 className="text-xl font-bold text-tripmindA mb-2">{adv.destination}</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-white">{adv.name}</span>
                <span className="text-gray-400 text-sm">{adv.startDate} → {adv.endDate}</span>
              </div>
              <p className="text-white/90 mb-2">{adv.story}</p>
              <div className="flex gap-1">
                {[...Array(adv.rating || 0)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelAdventures;