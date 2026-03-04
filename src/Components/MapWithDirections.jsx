import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const MapWithDirections = ({ originCity, destinationCity }) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [response, setResponse] = useState(null);
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [loadingOrigin, setLoadingOrigin] = useState(false);
  const [loadingDestination, setLoadingDestination] = useState(false);

  const directionsCallback = useCallback((res) => {
    if (res !== null) {
      if (res.status === "OK") {
        setResponse(res);
      } else {
        console.error("Response:", res);
      }
    }
  }, []);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: origin?.lat || 50.851368,
    lng: origin?.lng || 5.690973,
  };

  // helper that wraps the geocoder in a promise so we can await it and catch errors
  const geocodeCity = async (city) => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: city }, (results, status) => {
          if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            resolve({ lat: location.lat(), lng: location.lng() });
          } else {
            reject(status);
          }
        });
      } else {
        reject("Google maps not available");
      }
    });
  };

  useEffect(() => {
    if (isLoaded && originCity) {
      setLoadingOrigin(true);
      setError(null);
      geocodeCity(originCity)
        .then((coords) => setOrigin(coords))
        .catch((e) => setError(`Origin geocode error: ${e}`))
        .finally(() => setLoadingOrigin(false));
    }
  }, [originCity, isLoaded]);

  useEffect(() => {
    if (isLoaded && destinationCity) {
      setLoadingDestination(true);
      setError(null);
      geocodeCity(destinationCity)
        .then((coords) => setDestination(coords))
        .catch((e) => setError(`Destination geocode error: ${e}`))
        .finally(() => setLoadingDestination(false));
    }
  }, [destinationCity, isLoaded]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
      onLoad={() => setIsLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {origin && destination && (
          <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: "DRIVING",
            }}
            callback={directionsCallback}
          />
        )}
        {response !== null && (
          <DirectionsRenderer
            options={{
              directions: response,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithDirections;
