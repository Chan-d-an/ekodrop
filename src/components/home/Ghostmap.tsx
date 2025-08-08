'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type GhostMapProps = {
  lat: number;
  lng: number;
};

// Fix for missing marker icons in Leaflet

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

const GhostMap = ({ lat, lng }: GhostMapProps) => {
  useEffect(() => {
    // Example only: Uncomment if you plan to use geocoder later
    // const loadGeocoder = async () => {
    //   const leaflet = (await import('leaflet')).default;
    //   const { Geocoder } = await import('leaflet-control-geocoder');
    //   leaflet.Control.geocoder().addTo(leafletMap);
    // };
    // loadGeocoder();
  }, []);

  return (
    <div className="w-full h-[90vh] max-w-md mx-auto rounded-t-2xl text-tdark px-4 py-3">
      <input
        type="text"
        placeholder="Search for a location..."
        className="w-full px-4 py-2 mb-3 rounded-md bg-[#1e1e1e] text-tdark/90 placeholder:text-tdark/50 border border-gray-600"
      />

      <div className="w-full h-[70%] rounded-lg overflow-hidden">
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]} />
          <Circle
            center={[lat, lng]}
            radius={5000}
            pathOptions={{
              color: '#00bcd4',
              fillColor: '#00bcd4',
              fillOpacity: 0.2,
            }}
          />
        </MapContainer>
      </div>

      <p className="text-sm text-tdark/50 mt-3">
        Only posts within 5km radius are visible.
      </p>
    </div>
  );
};

export default GhostMap;
