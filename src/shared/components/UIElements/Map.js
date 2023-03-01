import React from "react";
import "./Map.css";
import { useRef, useEffect } from "react";

function Map({ center, zoom, className, style }) {
  const ref = useRef();
  // const uluru = { lat: -25.344, lng: 131.031 };

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    // const marker = new window.google.maps.Marker({
    //   position: center,
    //   map: map,
    // });
  }, [center, zoom]);

  return (
    <div ref={ref} className={`map ${className}`} style={style}>
      Map
    </div>
  );
}
export default Map;
