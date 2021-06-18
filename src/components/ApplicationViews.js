import React from "react";
import { Route } from "react-router-dom";
import { LocationProvider } from "./locations/LocationsProvider";
import { LocationList } from "./locations/LocationsList";
import { LocationForm } from "./locations/LocationForm";
import { LocationsDetail } from "./locations/LocationsDetail";
import { ProfileProvider } from "./profiles/ProfilesProvider";
import { ProfileDetail } from "./profiles/ProfileDetail";
import { ForecastRequestForm } from "./forecasts/ForecastRequestForm";

export const ApplicationViews = () => {
  return (
    <>
      <ProfileProvider>
        <LocationProvider>
          <Route path="/">
            <LocationList />
          </Route>
          <Route exact path="/locations/create">
            <LocationForm />
          </Route>
          <Route exact path="/locations/detail/">
            <ForecastRequestForm />
          </Route>
        </LocationProvider>

        <Route exact path="/profile/detail/profileId(\d+)">
          <ProfileDetail />
        </Route>
      </ProfileProvider>
    </>
  );
};
