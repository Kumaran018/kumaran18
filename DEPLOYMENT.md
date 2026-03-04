# Deployment Guide for Vercel

## Option 1: Deploy Frontend and Backend Separately (Recommended)

### Deploy Frontend (Vercel)

1. **In Vercel Dashboard:**
   - Click "Add New Project"
   - Import your GitHub repository: `https://github.com/Kumaran018/kumaran18`
   - Configure as follows:

   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

2. **Environment Variables for Frontend:**
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

### Deploy Backend (Vercel or Railway/Render)

#### Option A: Vercel (Serverless)
1. Create a new project in Vercel
2. Import the same repository
3. Configure:
   ```
   Root Directory: backend
   Build Command: (leave empty)
   Output Directory: (leave empty)
   Install Command: npm install
   ```

4. **Environment Variables for Backend:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=production
   PORT=5000
   ```

#### Option B: Railway (Better for Backend)
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set Root Directory: `backend`
5. Add environment variables (same as above)

#### Option C: Render (Free Tier Available)
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   ```
   Root Directory: backend
   Build Command: npm install
   Start Command: node server.js
   ```
5. Add environment variables

---

## Option 2: Deploy as Monorepo (Single Vercel Project)

### Configuration Already Added (vercel.json)

**Environment Variables to Add in Vercel:**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
VITE_API_URL=/api
```

**Vercel Settings:**
```
Framework Preset: Other
Root Directory: (leave empty - root of repo)
Build Command: cd frontend && npm install && npm run build
Output Directory: frontend/dist
Install Command: npm install --prefix backend && npm install --prefix frontend
```

---

## MongoDB Setup (Required)

### Option 1: MongoDB Atlas (Free Tier)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Vercel
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/academic-recommender?retryWrites=true&w=majority
   ```

### Option 2: Railway MongoDB
1. Add MongoDB plugin in Railway
2. Copy the connection string from Railway

---

## Quick Start Commands

### Test Locally First:
```bash
# Backend
cd backend
npm install
node seed/seedData.js  # Seed the database
npm start

# Frontend (in new terminal)
cd frontend
npm install
npm run dev
```

### Push to GitHub:
```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

---

## Recommended Deployment Strategy

**Best Practice: Split Deployment**

1. **Frontend on Vercel** (Free, Fast CDN)
2. **Backend on Railway/Render** (Better for Node.js servers)
3. **Database on MongoDB Atlas** (Free tier available)

This gives you:
- Better performance
- Easier debugging
- More control over backend
- Free hosting for all components

---

## After Deployment

1. Update `frontend/.env` with production API URL
2. Run seed script to populate database:
   ```bash
   node backend/seed/seedData.js
   ```
3. Test the application
4. Monitor logs in respective platforms

---

## Troubleshooting

**CORS Issues:**
- Make sure backend allows your frontend domain in CORS settings
- Check `backend/server.js` CORS configuration

**Database Connection:**
- Verify MongoDB connection string
- Check if IP whitelist includes 0.0.0.0/0

**Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies are in package.json
