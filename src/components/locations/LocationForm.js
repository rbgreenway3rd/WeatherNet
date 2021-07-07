import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import { ProfileContext } from "../profiles/ProfilesProvider";
import "./Locations.css";
import "./LocationForm.css";
import { useHistory } from "react-router-dom";

export const LocationForm = () => {
  const { addLocation } = useContext(LocationContext);
  const { getCurrentProfile } = useContext(ProfileContext);

  const [location, setLocation] = useState({
    name: "",
    profileId: 0,
  });

  const history = useHistory();

  useEffect(async () => {
    getCurrentProfile();
    console.log("inside useEffect");
  }, []);

  console.log("outside useEffect");

  const handleControlledInputChange = (event) => {
    const newLocation = { ...location };
    newLocation[event.target.id] = event.target.value;
    setLocation(newLocation);
  };

  const handleClickSaveLocation = (event) => {
    event.preventDefault();
    if (location.name === "") {
      window.alert("Please Give a Name for the New Location");
    } else {
      let newLocation = {
        name: location.name,
      };
      addLocation(newLocation);
      history.push("/locations/detail/");
    }
  };

  return (
    <form className="locationForm">
      <h2 className="locationForm__title">New Location</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">City name:</label>
          <input
            type="text"
            id="name"
            required
            autoFocus
            className="form-control"
            placeholder="Location name"
            value={location.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="address">Location Zipcode: optional</label>
          <input
            type="text"
            id="address"
            required
            autoFocus
            className="form-control"
            placeholder="Location address"
            value={location.zipcode}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <button className="btn btn-primary" onClick={handleClickSaveLocation}>
        Save Location
      </button>
    </form>
  );
};
