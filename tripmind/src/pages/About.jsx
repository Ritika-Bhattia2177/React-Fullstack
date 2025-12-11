import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, Globe, CloudRain, DollarSign, MapPin, 
  Cpu, TrendingUp, Users, Mail, Send, Linkedin, 
  CheckCircle, Plane
} from 'lucide-react'

export default function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const missionIcons = [
    { Icon: Cpu, label: 'AI-Powered', color: 'text-purple-400' },
    { Icon: Globe, label: 'Global Reach', color: 'text-blue-400' },
    { Icon: MapPin, label: 'Smart Routes', color: 'text-tripmindA' },
    { Icon: CloudRain, label: 'Live Weather', color: 'text-cyan-400' }
  ]

  const steps = [
    {
      number: '01',
      title: 'AI Planning',
      description: 'Tailored itineraries using your preferences, budget, and travel style. Our AI understands what you love.',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '02',
      title: 'Real-Time Insights',
      description: 'Live weather updates, flight delays, and local events integrated seamlessly into your plans.',
      icon: CloudRain,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '03',
      title: 'Smart Budgeting',
      description: 'Cost-effective suggestions that maximize value without compromising on experiences.',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      linkedin: '#'
    },
    {
      name: 'Marcus Chen',
      role: 'CTO & AI Lead',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      linkedin: '#'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      linkedin: '#'
    },
    {
      name: 'David Kim',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      linkedin: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-tripmindA via-blue-500 to-purple-500"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{ backgroundSize: '200% 200%' }}
          />
        </div>

        {/* Floating Plane Icons */}
        <motion.div
          className="absolute top-20 left-10 text-tripmindA opacity-30"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Plane size={40} />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-20 text-blue-400 opacity-30"
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Plane size={50} />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              About TripMind —{' '}
              <span className="bg-gradient-to-r from-tripmindA via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Smarter Travel with AI
              </span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              TripMind combines cutting-edge artificial intelligence with real-time data to transform 
              how you plan and experience travel. No more hours of research — just personalized, 
              intelligent itineraries tailored to your dreams and budget.
            </motion.p>

            {/* Share Your Adventure Button */}
            <motion.button
              onClick={() => window.location.href = '/share-adventure'}
              className="mx-auto mb-10 px-8 py-4 bg-gradient-to-r from-tripmindA to-blue-500 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-tripmindA/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Send size={24} />
              Share Your Adventure
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Cpu className="text-tripmindA" size={20} />
                <span className="text-white font-semibold">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Globe className="text-blue-400" size={20} />
                <span className="text-white font-semibold">150+ Countries</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Users className="text-purple-400" size={20} />
                <span className="text-white font-semibold">50K+ Travelers</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We believe travel should be effortless and exciting. TripMind helps travelers save time, 
              personalize their journeys, and discover experiences they'll cherish forever — all powered 
              by AI, live weather data, and smart budgeting tools.
            </p>
          </motion.div>

          {/* Icon Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {missionIcons.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center group hover:border-tripmindA/50 transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 194, 168, 0.3)' }}
              >
                <item.Icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
                <p className="text-white font-semibold">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
  <section id="contact-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-center gap-8 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 group hover:border-tripmindA/50 transition-all"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center relative`}>
                    <span className="absolute -top-3 -left-3 text-6xl font-black text-white/10">
                      {step.number}
                    </span>
                    <step.icon className="w-12 h-12 text-white relative z-10" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-12 top-full h-12 w-0.5 bg-gradient-to-b from-tripmindA to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Passionate travelers and tech innovators working together to revolutionize trip planning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 group hover:border-tripmindA/50 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 194, 168, 0.3)' }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* LinkedIn overlay on hover */}
                  <motion.a
                    href={member.linkedin}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-12 h-12 text-white" />
                  </motion.a>
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-tripmindA font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-300">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tripmindA focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tripmindA focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us what's on your mind..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tripmindA focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-tripmindA to-blue-500 text-white font-bold text-lg py-4 rounded-xl shadow-2xl hover:shadow-tripmindA/50 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Send size={20} />
                Send Message
              </span>
            </motion.button>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 bg-green-500/20 border border-green-500/50 rounded-xl p-4 flex items-center gap-3"
              >
                <CheckCircle className="text-green-400" size={24} />
                <p className="text-white font-semibold">
                  Thanks for reaching out! We'll get back to you soon.
                </p>
              </motion.div>
            )}
          </motion.form>

          {/* Footer Note */}
          <motion.p
            className="text-center text-gray-400 mt-12 text-lg flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Plane className="text-tripmindA" size={20} />
            Let's make your next adventure unforgettable ✈️
          </motion.p>
        </div>
      </section>
    </div>
  )
}
