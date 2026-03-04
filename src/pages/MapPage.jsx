import { useState } from "react";
import MapWithDirections from "../Components/MapWithDirections";

import "./MapPage.css";

const MapPage = () => {
  const [originCity, setOriginCity] = useState("Maastricht");
  const [destinationCity, setDestinationCity] = useState("Utrecht");

  const handleOriginChange = (e) => {
    setOriginCity(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestinationCity(e.target.value);
  };
  return (
    <main className="map-container">
      <header>
        <h1>Map</h1>
      </header>

      <form
        className="map-form"
        onSubmit={(e) => {
          e.preventDefault();
          // nothing else needed, origin/destination state is already updated
        }}
      >
        <label htmlFor="originCity">Origin City:</label>
        <input
          type="text"
          id="originCity"
          value={originCity}
          onChange={handleOriginChange}
        />

        <label htmlFor="destinationCity">Destination City:</label>
        <input
          type="text"
          id="destinationCity"
          value={destinationCity}
          onChange={handleDestinationChange}
        />

        <button type="submit" className="map-submit">
          Show Route
        </button>
      </form>

      <section className="map-wrapper" aria-label="Route Map">
        <MapWithDirections
          originCity={originCity}
          destinationCity={destinationCity}
        />
      </section>
    </main>
  );
};

export default MapPage;
