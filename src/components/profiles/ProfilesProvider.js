import React, { useState, createContext } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});

  const getProfiles = () => {
    return fetch("http://localhost:8088/profiles?_embed=locations")
      .then((res) => res.json())
      .then((theProfiles) => setProfiles(theProfiles))
      .then(console.log(profiles));
  };

  const getCurrentProfile = () => {
    let id = localStorage.getItem("weathernet_user");
    return fetch(`http://localhost:8088/profiles/${id}`)
      .then((res) => res.json())
      .then((theProfile) => {
        return setCurrentProfile(theProfile);
      })
      .then(console.log(currentProfile));
  };

  const getProfileById = (profileId) => {
    return fetch(`http://localhost:8088/profiles/${profileId}`).then((res) =>
      res.json()
    );
  };

  const addProfile = (profileObj) => {
    return fetch("http://localhost:8088/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileObj),
    }).then(getProfiles);
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        getProfiles,
        addProfile,
        getCurrentProfile,
        getProfileById,
        currentProfile,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
