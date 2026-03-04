import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">WeatherApp</Link>
        </div>

        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          {
            // list of links we render dynamically
          }
          {[
            { to: "/", label: "Home" },
            { to: "/weekForecast", label: "7 Days" },
            { to: "/hourly", label: "Hourly" },
            { to: "/map", label: "Map" },
            { to: "/blog", label: "Blog" },
          ].map((item) => (
            <li key={item.to}>
              <Link to={item.to} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              <li>
                <span className="welcome-text">
                  Welcome, {user.email || user.name}
                </span>
              </li>
              <li>
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Register / Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
