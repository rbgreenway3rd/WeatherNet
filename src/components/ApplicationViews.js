import React from "react";
import { Route } from "react-router-dom";
import { LocationProvider } from "./locations/LocationsProvider";
import { LocationList } from "./locations/LocationsList";
import { WeatherForm } from "./forecasts/ForecastRequestForm";

export const ApplicationViews = () => {
  return (
    <>
      <LocationProvider>
        <Route path="/">
          <LocationList />
        </Route>
      </LocationProvider>
    </>
  );
};
