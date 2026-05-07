# FlashType ⚡
A fullstack typing speed platform built with React, Node.js, Express, and MongoDB. FlashType allows users to test their typing speed, track performance statistics, compete on leaderboards, and manage their typing history through a modern dashboard experience.

## 🚀 Features

### Authentication & Security
- JWT-based authentication
- Secure login & signup flow
- Protected frontend routes
- Persistent user sessions

### Typing Test Engine
- Real-time typing speed calculation
- Accuracy tracking
- Dynamic word generation
- Live WPM updates
- Timer-based tests

### Dashboard & Analytics
- Personal performance dashboard
- Best WPM tracking
- Average typing statistics
- Test history visualization
- User profile system

### Competitive Features
- Global leaderboard
- Ranking system
- Performance comparison

### Backend Functionality
- RESTful API architecture
- MongoDB database integration
- Express middleware structure
- Authentication middleware
- Scalable backend organization

## 🛠 Tech Stack

### Frontend
- React
- Vite
- CSS Modules
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

## 📂 Project Structure

```txt
flashtype/
│
├── flashtype-react/        # Frontend (React + Vite)
│
├── typing-backend/         # Backend (Node.js + Express)
│
├── README.md
└── .gitignore
```

## ⚙️ Environment Variables

### Frontend (`flashtype-react/.env`)
```env
VITE_API_URL=http://localhost:5000
```

### Backend (`typing-backend/.env`)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## 📦 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/flashtype.git
cd flashtype
```

### 2. Install Frontend Dependencies
```bash
cd flashtype-react
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../typing-backend
npm install
```

## ▶️ Running the Application

### Start Backend
```bash
cd typing-backend
npm run dev
```
Backend runs on: http://localhost:5000

### Start Frontend
Open another terminal:
```bash
cd flashtype-react
npm run dev
```
Frontend runs on: http://localhost:5173

## 🔐 Authentication Flow
- Users can create accounts securely
- Passwords are hashed using bcrypt
- JWT tokens are generated during login
- Protected routes require authentication
- Tokens are stored locally for persistent sessions

## 📈 Performance Metrics
FlashType tracks:
- Words Per Minute (WPM)
- Accuracy percentage
- Total tests completed
- Best typing performance
- Historical typing data

## 🌐 Future Improvements
- Real-time multiplayer typing races
- Friend system
- Achievement badges
- Advanced analytics charts
- Theme customization
- Typing difficulty modes
- Admin dashboard
- Redis caching
- Docker deployment

## 📸 Screenshots
Add screenshots here after deployment.

Example:
```md
![Dashboard](./screenshots/dashboard.png)
```

## 🧠 What I Learned
This project helped strengthen my understanding of:
- Fullstack application architecture
- REST API development
- Authentication & authorization
- MongoDB data modeling
- React state management
- Protected routing
- Backend middleware
- Error handling
- Environment configuration
- Git & GitHub workflows

## 📄 License
This project is open-source and available under the MIT License.

## 👨‍💻 Author
Built by Bixo B S.