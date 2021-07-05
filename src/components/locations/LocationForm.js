import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import { ProfileContext } from "../profiles/ProfilesProvider";
import "./Locations.css";
import { useHistory } from "react-router-dom";

export const LocationForm = () => {
  const { addLocation } = useContext(LocationContext);
  const { locations, getLocations } = useContext(LocationContext);
  const { addLocationToProfile } = useContext(ProfileContext);

  const [location, setLocation] = useState({
    name: "",
    address: "",
  });

  const history = useHistory();

  useEffect(() => {
    getLocations();
  }, []);

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newLocation = { ...location };

    /*Set the property to the new value
    using object bracket notation. */

    newLocation[event.target.id] = event.target.value;
    // update state
    setLocation(newLocation);
  };

  const handleClickSaveLocation = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form

    if (location.name === "") {
      window.alert("Please Give a Name for the New Location");
    } else {
      const newLocation = {
        name: location.name,
        zipcode: location.zipcode,
        id: "",
      };
      addLocation(newLocation)
        .then(addLocationToProfile(newLocation.id))
        .then(() => history.push("/forecasts"));
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
