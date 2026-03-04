import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// reusable components
import SearchForm from "../../Components/UI/SearchForm.jsx";
import ForecastCard from "../../Components/UI/ForecastCard.jsx";

// rename imports to camelCase
import searchIcon from "/src/assets/search.png";
import humidityIcon from "/src/assets/humidity.png";
import windIcon from "/src/assets/wind.png";
import "./HourlyForecast.css";

const HourlyForecast = () => {
  const navigate = useNavigate();
  const { city: paramCity } = useParams();

  const [city, setCity] = useState(paramCity || "");
  const [hourlyData, setHourlyData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const geocodeCity = async (query) => {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${key}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Geocoding failed");
    const list = await res.json();
    if (list.length === 0) throw new Error("City not found");
    return { lat: list[0].lat, lon: list[0].lon };
  };

  const fetchHourly = async ({ lat, lon }) => {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${key}`;
    const res = await fetch(onecallUrl);
    if (!res.ok) throw new Error("Hourly forecast fetch failed");
    const d = await res.json();
    return d.hourly.slice(0, 24);
  };

  const search = async (searchCity = city) => {
    if (!searchCity) return;
    setLoading(true);
    setError(null);
    try {
      const coords = await geocodeCity(searchCity);
      const hourly = await fetchHourly(coords);
      setHourlyData(hourly);
      setCity(searchCity);
      navigate(`/hourly/${encodeURIComponent(searchCity)}`);
    } catch (err) {
      setError(err.message);
      setHourlyData([]);
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
    <main className="hourly-container">
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

      {hourlyData.length > 0 && (
        <section className="hourly-data-container">
          {hourlyData.map((hour, index) => (
            <ForecastCard
              key={index}
              date={new Date(hour.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              iconSrc={null}
              description={hour.weather[0].description}
              temp={Math.round(hour.temp)}
              humidity={hour.humidity}
              wind={Math.round(hour.wind_speed)}
            />
          ))}
        </section>
      )}

      {!loading && !error && hourlyData.length === 0 && (
        <div className="no-data-message">No data available</div>
      )}
    </main>
  );
};

export default HourlyForecast;
