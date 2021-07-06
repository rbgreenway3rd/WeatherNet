import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import { ProfileContext } from "../profiles/ProfilesProvider";
import "./Locations.css";
import "./LocationForm.css";
import { useHistory } from "react-router-dom";

export const LocationForm = () => {
  const { addLocation } = useContext(LocationContext);
  const { locations, getLocations } = useContext(LocationContext);
  const { addLocationToProfile, currentProfile, getCurrentProfile } =
    useContext(ProfileContext);

  const [location, setLocation] = useState({
    name: "",
  });

  const history = useHistory();

  useEffect(async () => {
    Promise.all([getCurrentProfile()]);
    console.log("inside useEffect");
  }, []);

  console.log("outside useEffect");

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
      let newLocation = {
        name: location.name,

        id: 0,
      };
      addLocation(newLocation)
        .then(console.log(newLocation, "LocationForm handleClickSaveLocation"))
        .then(addLocationToProfile(newLocation.id));
    }
  };

  /**
   * first we need the currently logged in user's id.
   *    this can be retrieved through localStorage
   * We need a way to capture the new location name
   *    this can be done through 'handleControlInputChange'
   * We need the id of the new location before creating the relationship
   *    addLocation
   *    collect new location id (from the POST's response)
   * Now create a relationship object that contains the user's id and the new location id
   *
   */

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
