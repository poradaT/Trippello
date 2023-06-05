import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";

import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoutes from "./components/PrivateRoutes";
import Trip from "./components/Trip";
import Section from "./components/Section";
import Idea from "./components/Idea";
import "./App.css";

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <Link to="/">My Trips</Link>
              </li>
              <br />

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <br />
              <li>
                <Link to="/register">Register</Link>
              </li>
              <br />
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes redirectTo="/login" />}>
          <Route path="/" element={<Home />} />
          <Route path="/trips/:tripId/sections" element={<Trip />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
