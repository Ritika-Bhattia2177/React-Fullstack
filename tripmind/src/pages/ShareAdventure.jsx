import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, MapPin, Calendar, Image as ImageIcon, FileText, Upload, CheckCircle } from 'lucide-react'
import { API_BASE_URL } from '../config/api'

export default function ShareAdventure(){
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', destination: '', startDate: '', endDate: '', story: '' })
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [submittedStories, setSubmittedStories] = useState([])
  const [saveStatus, setSaveStatus] = useState('idle') // 'idle' | 'saving' | 'success' | 'error'
  const [saveError, setSaveError] = useState(null)
  
  // Clear stories when navigating away
  React.useEffect(() => {
    return () => {
      setSubmittedStories([])
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setPhoto(file)
    const reader = new FileReader()
    reader.onload = () => setPhotoPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.destination.trim() || !form.startDate || !form.endDate || !form.story.trim()) return
    
    const newAdventure = { 
      ...form, 
      photo: photoPreview,
      id: Date.now() // Add unique ID
    }
    
    // Add to local state (not localStorage - only temporary)
    setSubmittedStories(prev => [newAdventure, ...prev])

    // Also POST to backend community endpoint using Axios and handle success/error states
    ;(async () => {
      setSaveStatus('saving')
      setSaveError(null)
      try{
        const auth = JSON.parse(localStorage.getItem('tripmind_auth') || 'null')
        const payload = {
          title: `${form.name} - ${form.destination}`,
          description: form.story,
          destination: form.destination,
          imageUrl: photoPreview,
          createdBy: auth?.user?.id || undefined
        }

        const res = await axios.post(`${API_BASE_URL}/api/community/create`, payload, {
          headers: {
            'Content-Type': 'application/json',
            ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {})
          },
          timeout: 10000,
        })

        if (res.status === 201) {
          setSaveStatus('success')
          // Optionally replace the temporary story with server-side returned post (has _id, createdAt, etc.)
          const serverPost = res.data
          const merged = { ...newAdventure, serverId: serverPost._id }
          setSubmittedStories(prev => [merged, ...prev])
        } else {
          setSaveStatus('error')
          setSaveError(`Unexpected response: ${res.status}`)
        }
      }catch(err){
        console.error('Failed to save community post:', err)
        setSaveStatus('error')
        setSaveError(err.response?.data?.message || err.message || 'Network error')
      }
      // Clear status after a short delay so user can see success
      setTimeout(() => setSaveStatus('idle'), 2500)
    })()
    
    // Reset form
    setForm({ name: '', destination: '', startDate: '', endDate: '', story: '' })
    setPhoto(null)
    setPhotoPreview(null)
    
    // Scroll to see the new story
    setTimeout(() => {
      document.getElementById('stories-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const isValid = form.name.trim() && form.destination.trim() && form.startDate && form.endDate && form.story.trim()

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-sky-50 to-slate-50 py-12 px-4 flex items-start justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-3">
            Share Your Adventure
          </h1>
          <p className="text-slate-600 text-lg">Inspire travelers worldwide with your unique journey</p>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl shadow-2xl p-[1px] bg-gradient-to-r from-indigo-200 via-blue-200 to-cyan-200"
        >
          <div className="rounded-2xl bg-white p-6 md:p-10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traveler Name */}
              <div className="md:col-span-2">
                <label className="flex items-center text-sm font-semibold text-slate-800 mb-2">
                  <User className="w-4 h-4 mr-2 text-indigo-500" />
                  Traveler Name
                </label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                  placeholder="Your name" 
                  required
                />
              </div>

              {/* Destination */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-800 mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  Destination
                </label>
                <input 
                  name="destination" 
                  value={form.destination} 
                  onChange={handleChange} 
                  className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                  placeholder="e.g., Paris, France" 
                  required
                />
              </div>

              {/* Trip Dates */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-800 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
                  Trip Dates
                </label>
                <div className="flex gap-2">
                  <input 
                    name="startDate" 
                    value={form.startDate} 
                    onChange={handleChange} 
                    type="date" 
                    className="w-1/2 rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-sm text-slate-900" 
                    required
                  />
                  <input 
                    name="endDate" 
                    value={form.endDate} 
                    onChange={handleChange} 
                    type="date" 
                    className="w-1/2 rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-sm text-slate-900" 
                    required
                  />
                </div>
              </div>

              {/* Upload Photo */}
              <div className="md:col-span-2">
                <label className="flex items-center text-sm font-semibold text-slate-800 mb-2">
                  <ImageIcon className="w-4 h-4 mr-2 text-purple-500" />
                  Upload Photo
                </label>
                <div className="relative">
                  <input 
                    onChange={handleFile} 
                    accept="image/*" 
                    type="file" 
                    id="photo-upload"
                    className="hidden" 
                  />
                  <label 
                    htmlFor="photo-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition group"
                  >
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-2" />
                    <span className="text-sm text-slate-500 group-hover:text-indigo-600">Click to upload a photo</span>
                    <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</span>
                  </label>
                </div>
                {photoPreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 relative rounded-lg overflow-hidden shadow-lg"
                  >
                    <img src={photoPreview} alt="preview" className="w-full max-h-80 object-cover" />
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-lg">
                      <CheckCircle className="w-4 h-4" />
                      Uploaded
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Short Story */}
              <div className="md:col-span-2">
                <label className="flex items-center text-sm font-semibold text-slate-800 mb-2">
                  <FileText className="w-4 h-4 mr-2 text-orange-500" />
                  Your Travel Story
                </label>
                <textarea 
                  name="story" 
                  value={form.story} 
                  onChange={handleChange} 
                  rows={6} 
                  className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-y text-slate-900 placeholder-slate-400" 
                  placeholder="Share your experience, memorable moments, tips for travelers..."
                  required
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                <button 
                  className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 ${
                    isValid 
                      ? 'bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 hover:shadow-indigo-400/50 hover:scale-[1.02]' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  type="submit"
                  disabled={!isValid}
                >
                  Submit Story
                </button>
                <button 
                  type="button" 
                  onClick={() => { 
                    setForm({ name:'', destination:'', startDate:'', endDate:'', story:'' }); 
                    setPhoto(null); 
                    setPhotoPreview(null); 
                  }} 
                  className="px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Submitted Stories Section */}
        {submittedStories.length > 0 && (
          <motion.div
            id="stories-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
                Your Shared Stories
              </h2>
              <p className="text-slate-600">
                Stories you share here will be visible only on this page and will disappear when you navigate away
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {submittedStories.map((story) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl shadow-2xl overflow-hidden bg-white border-2 border-purple-100 hover:border-purple-300 transition-all duration-300"
                >
                  {story.photo && (
                    <div className="relative h-72 md:h-96">
                      <img src={story.photo} alt={story.destination} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 text-white mb-2">
                          <MapPin className="w-5 h-5 text-cyan-300" />
                          <span className="text-2xl md:text-3xl font-bold">{story.destination}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {story.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-lg font-bold text-slate-800">{story.name}</div>
                          <div className="text-sm text-slate-500 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {story.startDate} → {story.endDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{story.story}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Submitted Story Card */}
        <AnimatePresence>
          {false && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              {/* Old single story display - kept for backwards compatibility but disabled */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
