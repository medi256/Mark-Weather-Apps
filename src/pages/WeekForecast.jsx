import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./WeekForecast.css";
import SearchForm from "../Components/UI/SearchForm.jsx";
import ForecastCard from "../Components/UI/ForecastCard.jsx";

// icon imports renamed to camelCase
import drizzleIcon from "../assets/drizzle.png";
import searchIcon from "/src/assets/search.png";
import clearIcon from "/src/assets/clear.png";
import cloudIcon from "/src/assets/cloud.png";
import rainIcon from "/src/assets/rain.png";
import snowIcon from "/src/assets/snow.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";

const WeeklyWeather = () => {
  const navigate = useNavigate();
  const { city: paramCity } = useParams();

  const [city, setCity] = useState(paramCity || "");
  const [weeklyData, setWeeklyData] = useState([]);
  const [wicon, setWicon] = useState(cloudIcon);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // helper functions
  const getIconForCode = (code) => {
    if (!code) return cloudIcon;
    if (code.startsWith("01")) return clearIcon;
    if (code.startsWith("02") || code.startsWith("03") || code.startsWith("04"))
      return cloudIcon;
    if (code.startsWith("09") || code.startsWith("10")) return rainIcon;
    if (code.startsWith("13")) return snowIcon;
    return clearIcon;
  };

  const geocodeCity = async (query) => {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${key}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Geocoding failed");
    const list = await res.json();
    if (list.length === 0) throw new Error("City not found");
    return { lat: list[0].lat, lon: list[0].lon };
  };

  const fetchWeekly = async ({ lat, lon }) => {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${key}`;
    const res = await fetch(onecallUrl);
    if (!res.ok) throw new Error("Weekly forecast fetch failed");
    const d = await res.json();
    return d.daily.slice(0, 7);
  };

  const search = async (searchCity = city) => {
    if (!searchCity) return;
    setLoading(true);
    setError(null);
    try {
      const coords = await geocodeCity(searchCity);
      const daily = await fetchWeekly(coords);
      setWeeklyData(daily);
      setWicon(getIconForCode(daily[0]?.weather[0]?.icon));
      setCity(searchCity);
      navigate(`/weekForecast/${encodeURIComponent(searchCity)}`);
    } catch (err) {
      setError(err.message);
      setWeeklyData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paramCity) {
      search(paramCity);
    }
  }, [paramCity]);

  return (
    <main className="container">
      <header className="top-bar">
        {/* Reusable search form component */}
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

      <div className="weather-image">
        <img src={wicon} alt="Weather Icon" />
      </div>

      {loading && <div className="loading">Loading…</div>}
      {error && <div className="error-message">{error}</div>}

      {weeklyData.length > 0 && (
        <section className="forecast-list">
          {weeklyData.map((day, index) => (
            <ForecastCard
              key={index}
              date={new Date(day.dt * 1000).toLocaleDateString()}
              iconSrc={getIconForCode(day.weather[0].icon)}
              description={day.weather[0].description}
              temp={Math.round(day.temp.day)}
              humidity={day.humidity}
              wind={Math.round(day.wind_speed)}
            />
          ))}
        </section>
      )}

      {!loading && !error && weeklyData.length === 0 && (
        <div className="no-data-message">No data available</div>
      )}
    </main>
  );
};

export default WeeklyWeather;
