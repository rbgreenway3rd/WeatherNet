import React, { useState, createContext } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});

  const getProfiles = () => {
    return fetch("http://localhost:8088/profiles")
      .then((res) => res.json())
      .then((theProfiles) => setProfiles(theProfiles))
      .then(console.log(profiles, "this is profiles =====>"));
  };

  const getCurrentProfile = () => {
    let id = localStorage.getItem("weathernet_user");
    return fetch(`http://localhost:8088/profiles/${id}`)
      .then((res) => res.json())
      .then((re) => {
        setCurrentProfile(re);
      });
  };

  const updateProfile = (prof) => {
    let id = localStorage.getItem("weathernet_user");
    return fetch(`http://localhost:8088/profiles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prof),
    }).then(getCurrentProfile);
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

  const addLocationToProfile = (id) => {
    getCurrentProfile()
      .then(currentProfile.savedCityId.push(id))
      .then(updateProfile(currentProfile))
      .then(getProfiles())
      .then(getCurrentProfile());
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        getProfiles,
        addProfile,
        addLocationToProfile,
        getCurrentProfile,
        getProfileById,
        updateProfile,
        currentProfile,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
