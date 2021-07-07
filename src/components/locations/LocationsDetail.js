import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import { ProfileContext } from "../profiles/ProfilesProvider";
import "./Locations.css";
import "./LocationsDetail.css";

import { useHistory } from "react-router-dom";

export const LocationsDetail = () => {
  const { deleteLocation, getLocations, getMatchedLocations } =
    useContext(LocationContext);

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

  const refreshPage = () => {
    window.location.reload();
  };

  const handleDeleteLocation = (id) => {
    deleteLocation(id)
      .then(() => getMatchedLocations())
      .then(() => refreshPage());
  };

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
