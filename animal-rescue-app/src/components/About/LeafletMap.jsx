import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { Box } from "@mui/material";

import "leaflet/dist/leaflet.css";

const popupContent = "No Kill Animal Rescue";
const position = [43.551001502571175, 16.415121007297596];

export default function Map() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 500,
        width: '100%',
        maxWidth: 900,
        "#map": {
          height: '100%',
          minHeight: '100%',
          flex: 1,
        },
      }}
    >
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{popupContent}</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}
