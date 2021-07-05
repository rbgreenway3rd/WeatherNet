import React, { useState, createContext } from "react";

export const LocationContext = createContext();

export const LocationProvider = (props) => {
  const apiURL = "http://localhost:8088";
  const locationsURL = apiURL + "/locations";
  const [locations, setLocations] = useState([]);

  const getLocations = () => {
    return fetch("http://localhost:8088/locations")
      .then((res) => res.json())

      .then((re) => {
        setLocations(re);
        console.log(re, "this is re=====>");
      });
  };

  console.log(locations, "locationsProvider===>");

  // if(locations.length>0&&  locations&&location)
  // {locations.length>0&&  locations&&location?locations.map:"loading..."}
  const addLocation = (locationObj) => {
    return fetch("http://localhost:8088/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationObj),
    }).then(getLocations());
  };

  const deleteLocation = (locationId) => {
    return fetch(`http://localhost:8088/locations/${locationId}`, {
      method: "DELETE",
    }).then(getLocations);
  };

  // const deleteLocation = (locationObj) => {
  //   return fetch("http://localhost:8088/locations/(+d)", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(locationObj),
  //   })
  //     .then((res) => res.json())
  //     .then(getLocations);
  // };

  const getLocationById = () => {
    return fetch(locationsURL + "?_embed=profiles").then((res) => res.json());
  };

  return (
    <LocationContext.Provider
      value={{
        locations,
        getLocations,
        addLocation,
        getLocationById,
        deleteLocation,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
