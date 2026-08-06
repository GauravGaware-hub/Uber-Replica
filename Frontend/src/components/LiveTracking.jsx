import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const LiveTracking = () => {
  const [location, setLocation] = useState({
    latitude: 18.5204,
    longitude: 73.8567,
    zoom: 15,
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 15,
        });
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <Map
      initialViewState={location}
      longitude={location.longitude}
      latitude={location.latitude}
      zoom={location.zoom}
      style={{ width: "100%", height: "100%" }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
    >
      <Marker longitude={location.longitude} latitude={location.latitude} />
    </Map>
  );
};

export default LiveTracking;
