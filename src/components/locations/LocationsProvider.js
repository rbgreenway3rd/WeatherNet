import React, { useState, createContext } from "react";

export const LocationContext = createContext();

export const LocationProvider = (props) => {
  const apiURL = "http://localhost:8088";
  const locationsURL = apiURL + "/locations";
  const [locations, setLocations] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});

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

  //       profiles.map((p) => {
  //         let index = p.savedCityId.indexOf(locationId);
  //         if (index > -1) {
  //           p.savedCityId.splice(index, 1);
  //         }
  //       })
  //     )
  //     .then(
  //       fetch("http://localhost:8088/profiles", {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(profiles),
  //       })
  //     );
  // };
  //       )`http://localhost:8088/locations/${locationId}`,
  //     {
  //       method: "DELETE",
  //     }.then(getLocations)
  //   );
  // };

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
        deleteLocationFromProfile,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
