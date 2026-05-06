import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Typingtest from "./pages/TypingTest.jsx";
import ProtectedRoute from "./assets/components/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute> <Leaderboard /> </ProtectedRoute>} />
            <Route path="/test" element={<ProtectedRoute> <Typingtest/> </ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        </Routes>
       </BrowserRouter>
   );
}

export default App;