
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import { useAuthStore } from './stores/useAuthStore';
import { Toaster } from "../src/components/ui/toaster";


const App: React.FC = () => {
  const token = useAuthStore((state) => state.token);


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
    <Toaster />
    </>
  );
};

export default App;
