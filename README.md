# Intelligent Personalized Academic Content Recommender System

A full-stack (MERN) AI-powered platform that recommends academic learning resources based on user interests, skill level, and learning behavior.

## 🚀 Key Features
- **AI Recommendation Engine**: Uses content-based filtering and weighted scoring.
- **Personalized Dashboards**: Tailored content for each student.
- **Admin Panel**: Complete content management system (CRUD).
- **Progress Tracking**: Analytics visualizations using Recharts.
- **Secure Auth**: JWT-based authentication with role-based access.

## 🛠 Tech Stack
- **Frontend**: React.js, Vite, Recharts, Lucide-React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Auth**: JWT, Bcrypt.js

## 🏁 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas cluster URL

### Installation

1. **Clone the repository**
2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create .env file with MONGODB_URI, JWT_SECRET, PORT
   node seed/seedData.js # Seed sample data
   npm run dev
   ```
3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   # Create .env file with VITE_API_URL
   npm run dev
   ```

## 🧠 Recommendation Logic
The system uses a weighted formula to calculate recommendation scores:
`Score = (Tag Match × 0.4) + (Skill Match × 0.3) + (Interaction Weight × 0.3)`

## 📄 License
MIT
