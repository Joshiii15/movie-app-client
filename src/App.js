import { useEffect, useState } from "react";
import "./App.css";
import { UserProvider } from "./UserContext";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  //Check token on mount and update isLoggedIn
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsLoggedIn(true);
      //Check if isAdmin
      const decodedToken = jwtDecode(token);
      if (decodedToken.isAdmin) {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <div className="App">
      <UserProvider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
        <Router>
          <AppNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/getMovie/:movieId" element={<MovieDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
