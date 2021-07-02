import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./ProfilesProvider";
import "./Profiles.css";
import { useParams } from "react-router-dom";

export const ProfileDetail = () => {
  const { getProfileById, profiles } = useContext(ProfileContext);
  const [profile, setProfile] = useState({ email: [] });

  const { profileId } = useParams();

  useEffect(() => {
    console.log("stinky");
    getProfileById(profileId).then((thisProfile) => setProfile(thisProfile));
  }, [profileId]);
  //dependancy array is set to id so that useEffect is called whenever the profile id changes

  //   debugger;
  return (
    <section className="profile">
      <h3 className="profile__name">{profile.name}</h3>
      <div className="profile__email">email: {profile.email}</div>
    </section>
  );
};
