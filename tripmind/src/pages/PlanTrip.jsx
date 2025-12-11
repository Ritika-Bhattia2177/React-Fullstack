import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, DollarSign, Sparkles } from 'lucide-react'

export default function PlanTrip() {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    interests: []
  })

  const interestOptions = [
    { id: 'beach', label: '🏖️ Beach', color: 'from-cyan-400 to-blue-500' },
    { id: 'adventure', label: '🏔️ Adventure', color: 'from-orange-400 to-red-500' },
    { id: 'culture', label: '🏛️ Culture', color: 'from-purple-400 to-pink-500' },
    { id: 'food', label: '🍜 Food', color: 'from-yellow-400 to-orange-500' },
    { id: 'nature', label: '🌲 Nature', color: 'from-green-400 to-emerald-500' },
    { id: 'shopping', label: '🛍️ Shopping', color: 'from-pink-400 to-rose-500' },
    { id: 'nightlife', label: '🌃 Nightlife', color: 'from-indigo-400 to-purple-500' },
    { id: 'relaxation', label: '🧘 Relaxation', color: 'from-teal-400 to-cyan-500' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: Implement actual itinerary generation
    alert('Generating your personalized itinerary! 🎉')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Plan Your Dream Trip
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Let AI create the perfect itinerary for you ✨
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Destination */}
          <div className="mb-6">
            <label className="flex items-center text-white font-semibold mb-2 text-lg">
              <MapPin className="mr-2 text-tripmindA" size={24} />
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="Where do you want to go?"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tripmindA focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center text-white font-semibold mb-2 text-lg">
                <Calendar className="mr-2 text-tripmindA" size={24} />
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-tripmindA focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-white font-semibold mb-2 text-lg">
                <Calendar className="mr-2 text-tripmindA" size={24} />
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-tripmindA focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Budget */}
          <div className="mb-8">
            <label className="flex items-center text-white font-semibold mb-2 text-lg">
              <DollarSign className="mr-2 text-tripmindA" size={24} />
              Budget (USD)
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Enter your budget"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tripmindA focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Interests */}
          <div className="mb-8">
            <label className="flex items-center text-white font-semibold mb-4 text-lg">
              <Sparkles className="mr-2 text-tripmindA" size={24} />
              Select Your Interests
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {interestOptions.map((interest, index) => (
                <motion.button
                  key={interest.id}
                  type="button"
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`px-4 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                    formData.interests.includes(interest.id)
                      ? `bg-gradient-to-r ${interest.color} scale-105 shadow-lg`
                      : 'bg-white/10 hover:bg-white/20 border border-white/30'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {interest.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-tripmindA to-blue-500 text-white font-bold text-xl py-4 rounded-xl shadow-2xl hover:shadow-tripmindA/50 transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {/* Glowing effect */}
            <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center">
              <Sparkles className="mr-2" size={24} />
              Generate Itinerary
            </span>
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}
