import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import { ProfileContext } from "../profiles/ProfilesProvider";
import "./Locations.css";
import { useParams } from "react-router-dom";

export const LocationsDetail = () => {
  const {
    getLocationById,
    locations,
    deleteLocation,
    deleteLocationFromProfile,
    getLocations,
  } = useContext(LocationContext);
  const { currentProfile, getCurrentProfile, updateProfile } =
    useContext(ProfileContext);
  const [location, setLocation] = useState({ zipcode: {} });
  const [isHidden, setIsHidden] = useState(true);
  const { locationId } = useParams();

  const showHideDiv = () => {
    if (isHidden === true) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  useEffect(() => {
    getLocations();
    getCurrentProfile();
  }, []);

  const handleDeleteLocation = (id) => {
    deleteLocationFromProfile(currentProfile, id);
    updateProfile(currentProfile);
  };

  const renderLocations = () => {
    const locationResults = (currentProfile.savedCityId || []).map((cityId) => {
      return locations.find((location) => location.id === cityId);
    });

    return locationResults.map((location) => (
      <section
        classame="location__buttons"
        id={location.id}
        key={location.name}
      >
        {location.name}
        <button
          id={location.id}
          onClick={() => handleDeleteLocation(location.id)}
        >
          Delete Location
        </button>
      </section>
    ));
  };

  return (
    <>
      <h2 className="location__list">Locations</h2>
      <div className="location__list__items">
        {currentProfile.savedCityId && renderLocations()}
      </div>
    </>
  );
};
