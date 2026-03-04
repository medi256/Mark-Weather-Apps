import { useState } from "react";
import "./WeatherPlusApp.css";
import SearchForm from "../../Components/UI/SearchForm.jsx";
import searchIcon from "/src/assets/search.png";
import clearIcon from "/src/assets/clear.png";
import cloudIcon from "/src/assets/cloud.png";
import drizzleIcon from "/src/assets/drizzle.png";
import rainIcon from "/src/assets/rain.png";
import snowIcon from "/src/assets/snow.png";
import windIcon from "/src/assets/wind.png";
import humidityIcon from "/src/assets/humidity.png";

const WeatherPlusApp = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [location, setLocation] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [wicon, setWicon] = useState(cloudIcon);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getIconForCode = (code) => {
    if (!code) return cloudIcon;
    if (code.startsWith("01")) return clearIcon;
    if (code.startsWith("02") || code.startsWith("03") || code.startsWith("04"))
      return cloudIcon;
    if (code.startsWith("09") || code.startsWith("10")) return rainIcon;
    if (code.startsWith("13")) return snowIcon;
    return clearIcon;
  };

  const search = async (query = city) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const key = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Weather fetch failed");
      const data = await res.json();

      setTemp(Math.round(data.main.temp));
      setLocation(data.name);
      setHumidity(data.main.humidity);
      setWind(Math.round(data.wind.speed));
      setWicon(getIconForCode(data.weather[0].icon));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <header className="top-bar">
        <SearchForm
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
          placeholder="City"
        />
      </header>

      {loading && <div className="loading">Loading…</div>}
      {error && <div className="error-message">{error}</div>}

      {location && (
        <section className="weather-display">
          <div className="weather-image">
            <img src={wicon} alt="Weather" />
          </div>
          <div className="weather-temp">{temp}°C</div>
          <div className="weather-location">{location}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidityIcon} alt="Humidity" className="icon" />
              <div className="data">
                <div className="humidity-percent">{humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>

            <div className="element">
              <img src={windIcon} alt="Wind" className="icon" />
              <div className="data">
                <div className="wind-rate">{wind} km/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default WeatherPlusApp;
