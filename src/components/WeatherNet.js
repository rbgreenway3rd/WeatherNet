import React from "react";
import "./WeatherNet.css";
import { LocationProvider } from "./locations/LocationsProvider";
import { LocationList } from "./locations/LocationsList";

export const WeatherNet = () => (
  <>
    <h2>WeatherNet</h2>
    <small>SkyNet's benevolent cousin</small>
    <aside>
      <div>To get started, register a profile.</div>
      <div>From there, provide a location and get the forecast!</div>
    </aside>

    <h2>Locations</h2>
    <article className="locations">
      <LocationProvider>
        <LocationList />
      </LocationProvider>
    </article>
  </>
);
