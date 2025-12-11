
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Loader, CheckCircle, Plane, Globe, MapPin } from 'lucide-react'
import { API_BASE_URL } from '../config/api'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate password length
  const validatePassword = (password) => {
    return password.length >= 6
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate inputs
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Real authentication against backend
    setIsLoading(true)
    try{
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      })
      const data = await res.json()
  // Debug: log the raw response and parsed body so we can inspect what the server returned
  console.log('Login response status:', res.status, 'body:', data)
      // Accept either HTTP error (res.ok === false) or explicit success:false from API
      if (!res.ok || (data && data.success === false)) {
        // Check if the error is "Invalid email or password" which means user doesn't exist
        const errorMessage = data.message || 'Login failed'
        if (errorMessage.toLowerCase().includes('invalid email') || errorMessage.toLowerCase().includes('invalid email or password')) {
          setErrors(prev => ({ ...prev, server: 'accountNotFound' }))
        } else {
          setErrors(prev => ({ ...prev, server: errorMessage }))
        }
        setIsLoading(false)
        return
      }
      // Save token+user to localStorage
      localStorage.setItem('tripmind_auth', JSON.stringify({ token: data.token, user: data.user }))
      setLoginSuccess(true)
      setTimeout(() => navigate('/'), 1200)
    }catch(err){
      // If backend is down or unreachable, offer a local demo fallback so UI remains usable.
      const isNetworkError = err.message && (err.message.toLowerCase().includes('failed to fetch') || err.message.toLowerCase().includes('network'))
      const demoCreds = { email: 'demo@tripmind.com', password: 'demo123' }
      if (isNetworkError && formData.email === demoCreds.email && formData.password === demoCreds.password) {
        // simulate successful login for demo credentials
        const demoUser = { name: 'Demo User', email: demoCreds.email, id: 'demo-user' }
        localStorage.setItem('tripmind_auth', JSON.stringify({ token: 'demo-token', user: demoUser }))
        setLoginSuccess(true)
        setTimeout(() => navigate('/'), 800)
      } else if (isNetworkError) {
        setErrors(prev => ({ ...prev, server: `Unable to reach auth server. Start the backend (${API_BASE_URL}) or use demo credentials.` }))
      } else {
        setErrors(prev => ({ ...prev, server: err.message }))
      }
    }finally{
      setIsLoading(false)
    }
  }

  // Floating background elements
  const FloatingElement = ({ delay, duration, children, className }) => (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundImage: [
              'radial-gradient(circle at 20% 50%, rgba(0, 194, 168, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          style={{ backgroundSize: '200% 200%' }}
        />
      </div>

      {/* Floating Icons */}
      <FloatingElement delay={0} duration={5} className="absolute top-20 left-10 text-tripmindA/20">
        <Plane size={60} />
      </FloatingElement>
      <FloatingElement delay={1} duration={6} className="absolute top-40 right-20 text-blue-400/20">
        <Globe size={50} />
      </FloatingElement>
      <FloatingElement delay={2} duration={7} className="absolute bottom-32 left-20 text-purple-400/20">
        <MapPin size={55} />
      </FloatingElement>
      <FloatingElement delay={0.5} duration={5.5} className="absolute bottom-20 right-32 text-tripmindA/20">
        <Plane size={45} className="transform -scale-x-100" />
      </FloatingElement>

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
          {/* Logo & Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-tripmindA to-blue-500 rounded-2xl flex items-center justify-center mx-auto transform rotate-6 hover:rotate-12 transition-transform">
                <Plane className="w-8 h-8 text-white transform -rotate-6" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              Welcome to TripMind 🌍
            </h1>
            <p className="text-gray-300">Plan your next adventure with AI</p>
          </motion.div>

          {/* Server / global errors */}
          <AnimatePresence>
            {errors.server && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 bg-red-600/10 border border-red-600/30 rounded-xl p-4 text-red-200"
              >
                {errors.server === 'accountNotFound' ? (
                  <div className="space-y-2">
                    <p className="font-semibold text-sm">❌ Invalid email or password</p>
                    <p className="text-xs text-red-300">
                      Don't have an account yet?{' '}
                      <button
                        onClick={() => navigate('/signup')}
                        className="underline font-semibold hover:text-white transition-colors"
                      >
                        Sign up first
                      </button>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm">{errors.server}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {loginSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 bg-green-500/20 border border-green-500/50 rounded-xl p-4 flex items-center gap-3"
              >
                <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                <div>
                  <p className="text-white font-semibold">Login Successful!</p>
                  <p className="text-sm text-gray-300">Redirecting to your dashboard...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-white font-semibold mb-2 text-sm">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border ${
                    errors.email ? 'border-red-500' : 'border-white/30'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tripmindA focus:border-transparent transition-all`}
                  disabled={isLoading || loginSuccess}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm mt-1 ml-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3 rounded-xl bg-white/20 border ${
                    errors.password ? 'border-red-500' : 'border-white/30'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tripmindA focus:border-transparent transition-all`}
                  disabled={isLoading || loginSuccess}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading || loginSuccess}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm mt-1 ml-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <button
                type="button"
                className="text-sm text-tripmindA hover:text-tripmindA/80 transition-colors font-medium"
                disabled={isLoading || loginSuccess}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-tripmindA to-blue-500 text-white font-bold text-lg py-4 rounded-xl shadow-2xl hover:shadow-tripmindA/50 transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading || loginSuccess ? 1 : 1.02 }}
              whileTap={{ scale: isLoading || loginSuccess ? 1 : 0.98 }}
              disabled={isLoading || loginSuccess}
            >
              <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Logging in...
                  </>
                ) : loginSuccess ? (
                  <>
                    <CheckCircle size={20} />
                    Success!
                  </>
                ) : (
                  'Login'
                )}
              </span>
            </motion.button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-gray-300">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-tripmindA hover:text-tripmindA/80 font-semibold transition-colors"
                disabled={isLoading || loginSuccess}
              >
                Sign Up
              </button>
            </p>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-xs text-gray-400 text-center mb-2">Demo Credentials:</p>
            <p className="text-sm text-white text-center font-mono">
              Email: demo@tripmind.com
            </p>
            <p className="text-sm text-white text-center font-mono">
              Password: demo123
            </p>
          </motion.div>
        </div>

        {/* Footer Text */}
        <motion.p
          className="text-center text-gray-400 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          By logging in, you agree to our Terms & Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  )
}
