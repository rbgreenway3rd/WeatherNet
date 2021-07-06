import React, { useState, createContext } from "react";

export const LocationContext = createContext();

export const LocationProvider = (props) => {
  const apiURL = "http://localhost:8088";
  const locationsURL = apiURL + "/locations";
  const [locations, setLocations] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const getLocations = () => {
    return fetch("http://localhost:8088/locations?")
      .then((res) => res.json())

      .then((re) => {
        setLocations(re);
      });
  };

  const addLocation = (locationObj) => {
    return (
      fetch("http://localhost:8088/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationObj),
      })
        .then((res) => res.json())
        // .then((res) => {
        //   locationObj.id = res.id;
        // })
        .then((res) => {
          addLocationToLocationMatcher(res.id);
          getLocations();
        })
    );
  };

  const deleteLocationFromProfile = (prof, id) => {
    let index = prof.savedCityId.indexOf(id);
    if (index > -1) {
      prof.savedCityId.splice(index, 1);
    }
  };

  const deleteLocation = (locationId) => {
    return fetch("http://localhost:8088/profiles")
      .then((res) => res.json())
      .then((re) => {
        setProfiles(re);
      });
  };

  const getMatchedLocations = () => {
    const id = localStorage.getItem("weathernet_user");
    return fetch(
      `http://localhost:8088/locationMatcher?profileId=${id}&_expand=location`
    )
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };

  const getLocationById = () => {
    return fetch(locationsURL + "?_embed=profiles").then((res) => res.json());
  };

  const addLocationToLocationMatcher = (locId) => {
    let id = localStorage.getItem("weathernet_user");
    console.log(locId);
    let obj = {
      id: 0,
      profileId: parseInt(id),
      locationId: locId,
    };
    return fetch(
      `http://localhost:8088/locationMatcher?profileId=${id}&_expand=location`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
  };

  return (
    <LocationContext.Provider
      value={{
        locations,
        getLocations,
        addLocation,
        getLocationById,
        deleteLocation,
        deleteLocationFromProfile,
        getMatchedLocations,
        addLocationToLocationMatcher,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
