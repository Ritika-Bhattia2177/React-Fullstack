
const axios = require('axios');
const openaiApiKey = process.env.OPENAI_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const Trip = require('../models/Trip');

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    console.error('getAllTrips error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.createTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, budget, notes, user } = req.body;
    if (!destination) return res.status(400).json({ message: 'Destination is required.' });

    const trip = new Trip({
      destination,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      budget: budget ? Number(budget) : undefined,
      notes: notes || undefined,
      user: user || undefined,
    });

    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    console.error('createTrip error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.planTrip = async (req, res) => {
  try {
    const { destination, budget, days, interests } = req.body;
    if (!destination || !budget || !days || !interests) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // 1. Generate itinerary using OpenAI
    const openaiPrompt = `Create a ${days}-day travel itinerary for ${destination} with a budget of ${budget}. Interests: ${interests.join(', ')}. Include recommendations for activities, food, and must-see places.`;
    let itinerary = '';
    let recommendations = [];
    try {
      const openaiRes = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: openaiPrompt }],
          max_tokens: 800,
        },
        {
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      itinerary = openaiRes.data.choices[0].message.content;
      recommendations = itinerary.match(/Recommendations:(.*)/s) ? itinerary.match(/Recommendations:(.*)/s)[1].trim().split('\n') : [];
    } catch (err) {
      itinerary = 'Could not generate itinerary.';
    }

    // 2. Fetch weather from OpenWeatherMap
    let weather = {};
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(destination)}&appid=${weatherApiKey}&units=metric`
      );
      weather = {
        temp: weatherRes.data.main.temp,
        description: weatherRes.data.weather[0].description,
        icon: weatherRes.data.weather[0].icon,
      };
    } catch (err) {
      weather = { error: 'Could not fetch weather.' };
    }

    // 3. Fetch coordinates and map preview from Google Maps
    let mapUrl = '';
    try {
      // Geocoding API to get coordinates
      const geoRes = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${googleMapsApiKey}`
      );
      const location = geoRes.data.results[0].geometry.location;
      // Static Maps API for map preview
      mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=12&size=600x300&markers=color:red%7C${location.lat},${location.lng}&key=${googleMapsApiKey}`;
    } catch (err) {
      mapUrl = '';
    }

    res.json({ itinerary, weather, mapUrl, recommendations });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
