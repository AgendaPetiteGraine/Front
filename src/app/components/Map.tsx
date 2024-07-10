import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const mapStyles = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 0, // Default latitude
  lng: 0, // Default longitude
};

interface MyGoogleMapProps {
  address: string;
}

const MyGoogleMap: React.FC<MyGoogleMapProps> = ({ address }) => {
  const [key, setKey] = useState("");
  const [location, setLocation] = useState(defaultCenter);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { data } = await axios.get(
          `https://site--petitegraine--xj5ljztnmr2k.code.run/g3t0Gg!APIk3y`,
          {}
        );
        console.log("API key", data);
        setKey(data);
      } catch (error) {
        console.error("Error fetching Api key:", error);
      }
    };
    fetchApiKey();
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${key}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        } else {
          console.error("No results found for the specified address.");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };
    fetchCoordinates();
  }, [key, address]);

  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyGoogleMap;
