import React, { useState, createContext } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});

  const getProfiles = () => {
    return fetch("http://localhost:8088/profiles?_embed=locations")
      .then((res) => res.json())
      .then(setProfiles)
      .then(console.log(profiles));
  };

  const getCurrentProfile = () => {
    let id = localStorage.getItem("weathernet_user");
    console.log("............");
    fetch("http://localhost:8088/profiles?_embed=locations")
      .then((res) => res.json())
      .then(setProfiles);
    console.log("profiles = ", profiles);

    profiles.map((p) => {
      console.log("p.id = ", p.id, "   id = ", id);
      if (p.id === parseInt(id)) {
        console.log(" found = ", p);
        setCurrentProfile(p);
      }
    });
    console.log("current Profile = ", currentProfile);
    console.log(".............................");
  };

  const getProfileById = (profileId) => {
    return fetch(`http://localhost:8088/profiles/${profileId}`).then((res) =>
      res.json()
    );
  };

  // const getCurrentProfile = () => {
  //   console.log(localStorage.getItem("weathernet_user"));
  //   return fetch(
  //     `http://localhost:3000/profile/${localStorage.getItem("weathernet_user")}`
  //   ).then((res) => res.json());
  // };

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
