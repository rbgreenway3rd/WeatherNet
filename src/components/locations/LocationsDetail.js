import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import { ProfileContext } from "../profiles/ProfilesProvider";
import "./Locations.css";
import "./LocationsDetail.css";

import { useHistory } from "react-router-dom";

export const LocationsDetail = () => {
  const { deleteLocationFromProfile, getLocations, getMatchedLocations } =
    useContext(LocationContext);
  const { currentProfile, updateProfile } = useContext(ProfileContext);

  const [isHidden, setIsHidden] = useState(true);
  const [matchedLocations, setMatchedLocations] = useState([]);

  const history = useHistory();

  const showHideDiv = () => {
    if (isHidden === true) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  useEffect(async () => {
    getLocations().then(() =>
      getMatchedLocations().then((res) => {
        const matchedLocationResults = res.map((locationResults) => {
          return locationResults.location;
        });
        setMatchedLocations(matchedLocationResults);
      })
    );
  }, []);
  console.log("matched locations: LocDet ===>", matchedLocations);

  const handleDeleteLocation = (id) => {
    deleteLocationFromProfile(currentProfile, id);
    updateProfile(currentProfile);
  };

  // const renderLocations = () => {
  //   const locationResults = (currentProfile.savedCityId || []).map((cityId) => {
  //     return locations.find((location) => location.id === cityId);
  //   });

  return (
    <>
      <h2>Locations</h2>
      <section className="location__buttons">
        <div className="location__buttons__name">
          {matchedLocations.map((locationMatch) => {
            return (
              <button id={locationMatch.id} key={locationMatch.name}>
                {locationMatch.name}
              </button>
            );
          })}
          <div className="location__buttons__delete">
            {matchedLocations.map((locationMatch) => {
              return (
                <button
                  id={locationMatch.id}
                  key={locationMatch.name}
                  onClick={() => handleDeleteLocation(locationMatch.id)}
                >
                  Delete Location
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <button onClick={() => history.push("/locations/create")}>
        Add Location
      </button>
    </>
  );
};
// <button
//   id={locationMatch.id}
//   onClick={() => handleDeleteLocation(locationMatch.id)}
// >
//   Delete Location
// </button>

//     return locationResults.map((location) => (
//       <section
//         classame="location__buttons"
//         id={location.id}
//         key={location.name}
//       >
//         {location.name}
{
  /* <button id={location.id} onClick={() => handleDeleteLocation(location.id)}>
  Delete Location
</button>; */
}
//       </section>
//     ));
//   };

//   return (
{
  /* <>
  <h2 className="location__list">Locations</h2>
  <div className="location__list__items">
    {currentProfile.savedCityId && renderLocations()}
  </div>
</>; */
}
//   );
// };
