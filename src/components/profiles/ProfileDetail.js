import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./ProfilesProvider";
import "./Profiles.css";
import { useParams } from "react-router-dom";

export const ProfileDetail = () => {
  const { getProfileById } = useContext(ProfileContext);
  const [profile, setProfile] = useState({});

  const { profileId } = useParams();

  useEffect(() => {
    console.log("stinky");
    getProfileById(profileId).then((thisProfile) => setProfile(thisProfile));
  }, [profileId]);
  //dependancy array is set to id so that useEffect is called whenever the profile id changes

  //   getCurrentProfile().then(setProfile);
  // }, []);

  //   debugger;

  return (
    <section className="profile">
      <h3 className="profile__name">{profile.name}</h3>
      <div className="profile__email">email: {profile.email}</div>
    </section>
  );
};

//   return (
//     <section className="profile">
//       {id.map((profile) => {
//         return (
//           <div
//             className="profile"
//             id={`profile--${profile.id}`}
//             key={`${profile.id}`}
//           >
//             <div className="profile__content">
//               <div className="profile__email">email:{profile.email}</div>
//             </div>
//           </div>
//         );
//       })}
//     </section>
//   );
// };
