import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "./home/HomePage";
import { LocationProvider } from "./locations/LocationsProvider";
import { LocationList } from "./locations/LocationsList";
import { LocationForm } from "./locations/LocationForm";
import { LocationsDetail } from "./locations/LocationsDetail";
import { ProfileProvider } from "./profiles/ProfilesProvider";
import { ProfileDetail } from "./profiles/ProfileDetail";

export const ApplicationViews = () => {
  // const currentProfileId = localStorage.getItem("weathernet_user");

  return (
    <>
      <ProfileProvider>
        <LocationProvider>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/locations/create">
            <LocationForm />
          </Route>
          <Route exact path="/locations/detail/">
            <LocationsDetail />
          </Route>
          <Route exact path="/forecasts">
            <LocationList />
          </Route>

          <Route exact path="/profile/:profileId">
            <ProfileDetail />
          </Route>
        </LocationProvider>
      </ProfileProvider>
    </>
  );
};
