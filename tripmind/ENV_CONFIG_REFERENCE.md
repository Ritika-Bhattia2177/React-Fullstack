# Environment Configuration - Quick Reference

## ✅ Changes Made

### 1. Frontend Environment Setup
- Created `/tripmind/.env` with `VITE_API_BASE_URL=http://localhost:4000`
- Created `/tripmind/.env.example` as a template for other developers
- Created `/tripmind/src/config/api.js` to centralize API configuration

### 2. Updated Files with Dynamic API URLs
All hardcoded backend URLs (`http://localhost:5000`) have been replaced with dynamic `API_BASE_URL`:

- ✅ `/tripmind/src/pages/Login.jsx` - Login authentication
- ✅ `/tripmind/src/pages/Signup.jsx` - User registration  
- ✅ `/tripmind/src/pages/TripPlanner.jsx` - Trip creation
- ✅ `/tripmind/src/pages/ShareAdventure.jsx` - Community post creation

### 3. Backend Configuration
- Backend `.env` has `PORT=4000`
- Backend `server.js` correctly uses `process.env.PORT || 5000`
- CORS is configured with `origin: true, credentials: true`

## 🚀 How to Use

### Local Development
1. **Backend**: Runs on `http://localhost:4000`
2. **Frontend**: Configure `.env` with:
   ```
   VITE_API_BASE_URL=http://localhost:4000
   ```

### Production Deployment
1. Update frontend `.env` (or set environment variable in hosting platform):
   ```
   VITE_API_BASE_URL=https://your-backend-domain.com
   ```
2. No code changes needed - everything is dynamic!

## 📝 Important Notes

- The `.env` file is already in `.gitignore` (won't be committed)
- Always use `.env.example` as a template for new developers
- Frontend uses Vite, so env vars MUST start with `VITE_`
- Restart dev servers after changing `.env` files

## 🔧 Commands to Restart

### Backend
```bash
cd /home/sama/Desktop/prabh/backend
npm run dev
```

### Frontend
```bash
cd /home/sama/Desktop/prabh/tripmind
npm run dev
```

## ✨ Benefits

1. **No more hardcoded URLs** - Easy to switch between dev/staging/production
2. **Single source of truth** - All API calls use the same base URL
3. **Environment-specific** - Different URLs for different environments
4. **Secure** - Sensitive URLs not committed to Git
