import React from "react";

const ForecastCard = ({ date, iconSrc, description, temp, humidity, wind }) => (
  <article className="forecast-card">
    <h3>{date}</h3>
    {iconSrc && <img src={iconSrc} alt={description} />}
    <p className="temp">{temp}°C</p>
    <p className="desc">{description}</p>
    <div className="details">
      {humidity !== undefined && <span>💧 {humidity}%</span>}
      {wind !== undefined && <span>🌬️ {wind} km/h</span>}
    </div>
  </article>
);

export default ForecastCard;
