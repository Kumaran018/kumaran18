# Personalized Content Recommender Platform

An intelligent learning platform that recommends educational content based on user preferences, learning history, and skill level. Features an AI-powered resource collector and comprehensive admin dashboard.

## 🚀 Features

- **Smart Content Recommendations**: AI-driven personalized learning paths
- **Multi-Subject Support**: Computer Science, Web Development, AI/ML, Mathematics, Physics, Cyber Security
- **Difficulty Levels**: Beginner, Intermediate, Advanced content for progressive learning
- **Content Types**: Videos, PDFs, Quizzes, Coding challenges
- **AI Resource Collector**: Real-time educational resource discovery from GitHub, YouTube, and learning platforms
- **Admin Dashboard**: Complete content management with create, edit, delete capabilities
- **User Analytics**: Track learning progress and engagement
- **Bookmarks**: Save favorite resources for later
- **Interactive UI**: Modern, responsive design with smooth animations

## 📊 Content Library

- **54 Educational Resources** across 6 subjects
- **18 Videos** from top educational platforms
- **18 PDF Guides** and documentation
- **18 Interactive Quizzes** for assessment

## 🛠️ Tech Stack

### Frontend
- React 19 with Vite
- React Router for navigation
- Axios for API calls
- Recharts for analytics visualization
- Lucide React for icons
- Modern CSS with animations

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- Helmet for security
- Morgan for logging

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/Kumaran018/kumaran18.git
cd kumaran18
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/academic-recommender
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Seed the database:
```bash
node seed/seedData.js
```

Start backend:
```bash
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔐 Default Users

**Admin Account:**
- Email: kit28.24bad082@gmail.com
- Password: kums@1807

**Student Account:**
- Email: john@example.com
- Password: password123

## 🚀 Deployment to Vercel

### For Vercel Dashboard:

**Frontend Deployment:**
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Environment Variables (Frontend):**
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

**Backend Deployment (Recommended: Railway or Render):**
```
Root Directory: backend
Start Command: node server.js
Install Command: npm install
```

**Environment Variables (Backend):**
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & error middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── seed/            # Database seeding scripts
│   ├── services/        # Business logic
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── api/         # API client
│   │   ├── components/  # React components
│   │   ├── context/     # Context providers
│   │   ├── pages/       # Page components
│   │   └── main.jsx     # Entry point
│   └── vite.config.js
└── vercel.json          # Vercel configuration
```

## 🎯 Key Features Explained

### AI Resource Collector
- Fetches real-time educational resources from GitHub API
- Generates curated links to YouTube tutorials
- Provides access to learning platforms (freeCodeCamp, MDN, Dev.to)
- Includes Stack Overflow Q&A and official documentation
- One-click add to platform

### Admin Dashboard
- User management with role assignment
- Content creation and editing
- Platform analytics and statistics
- AI agent for resource discovery
- Bulk content operations

### Recommendation Engine
- Collaborative filtering based on user interactions
- Content-based filtering using tags and subjects
- Skill level matching
- Learning path suggestions

## 🔧 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Content
- GET `/api/content` - Get all content (with filters)
- GET `/api/content/:id` - Get single content
- POST `/api/content` - Create content (Admin)
- PUT `/api/content/:id` - Update content (Admin)
- DELETE `/api/content/:id` - Delete content (Admin)

### Recommendations
- GET `/api/recommendations` - Get personalized recommendations

### Admin
- GET `/api/admin/users/list` - Get all users
- GET `/api/admin/stats` - Platform statistics
- POST `/api/admin/agent/collect` - AI resource collector

## 🧠 Recommendation Logic
The system uses a weighted formula to calculate recommendation scores:
`Score = (Tag Match × 0.4) + (Skill Match × 0.3) + (Interaction Weight × 0.3)`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Kumaran**
- Email: kit28.24bad082@gmail.com
- GitHub: [@Kumaran018](https://github.com/Kumaran018)

## 🙏 Acknowledgments

- Educational content sourced from various open platforms
- Icons by Lucide React
- UI inspiration from modern learning platforms
