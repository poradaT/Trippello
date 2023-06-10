import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect, useRef, useState } from "react";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";

function MapWithSearch() {
  const position = [-33.8688, 151.2093]; // [latitude, longitude] of the initial map center
  const searchControlRef = useRef(null);
  const [pinLocations, setPinLocations] = useState([]);

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: false,
      style: "bar",
      autoComplete: true,
      autoCompleteDelay: 250,
      autoClose: true,
      searchLabel: "Enter address, place, or coordinates",
      keepResult: true,
    });

    searchControlRef.current = searchControl;
  }, []);

  function SearchControl() {
    const map = useMap();

    useEffect(() => {
      if (searchControlRef.current) {
        const searchControl = searchControlRef.current;
        map.addControl(searchControl);
      }

      return () => {
        if (searchControlRef.current) {
          const searchControl = searchControlRef.current;
          map.removeControl(searchControl);
        }
      };
    }, [map]);

    return null;
  }

  function AddPinMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const newLocation = [lat, lng];
        setPinLocations((prevLocations) => [...prevLocations, newLocation]);
      },
    });

    const deletePin = (index, e) => {
      e.stopPropagation(); // Stop click event propagation
      setPinLocations((prevLocations) => prevLocations.filter((_, i) => i !== index));
    };

    return (
      <>
        {pinLocations.map((location, index) => (
          <Marker key={index} position={location}>
            <Popup>
              A pinned location on the map.
              <br />
              <button onClick={(e) => deletePin(index, e)}>Delete</button>
            </Popup>
          </Marker>
        ))}
      </>
    );
  }

  return (
    <div>
      <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>A marker indicating the location on the map.</Popup>
        </Marker>
        <SearchControl />
        <AddPinMarker />
      </MapContainer>
    </div>
  );
}

export default MapWithSearch;
