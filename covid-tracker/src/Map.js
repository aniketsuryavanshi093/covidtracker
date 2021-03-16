import React from "react";
import { MapContainer, TileLayer} from "react-leaflet";
import "./Map.css"
import {showDataOnMap} from "./utils"
function Map({casesType , countries , center, zoom}) {
    // console.log(props.center[1] , props.center[0])
  return (
    <div className="map">
      <MapContainer  center={center} zoom={zoom} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries , casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
