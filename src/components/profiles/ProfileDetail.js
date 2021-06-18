import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./ProfilesProvider";
import "./Profiles.css";
import { useParams } from "react-router-dom";

export const ProfileDetail = () => {
  const { getProfileById, profiles } = useContext(ProfileContext);
  const [profile, setProfile] = useState({ name: {} });

  const { profileId } = useParams();

  useEffect(() => {
    getProfileById(profileId).then((thisProfile) => setProfile(thisProfile));
  }, [profileId]);

  //   debugger;
  return (
    <section className="profile">
      <h3 className="profile__name">{profile.name}</h3>
      <div className="profile__email">email: {profile.email}</div>
    </section>
  );
};
