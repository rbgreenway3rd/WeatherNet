import React, { useState, createContext } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});

  const getProfiles = () => {
    return fetch("http://localhost:8088/profiles?_embed=locations")
      .then((res) => res.json())
      .then(setProfiles);
  };

  const getProfileById = (profileId) => {
    return fetch(`http://localhost:8088/profiles/${profileId}`).then((res) =>
      res.json()
    );
  };

  const getCurrentProfile = () => {
    return fetch(
      `http://localhost:8088/profiles/${localStorage.getItem(
        "weathernet_user"
      )}`
    )
      .then((res) => res.json())
      .then(setCurrentProfile);
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
