import React, { useContext, useEffect } from "react";
import { LocationContext } from "./LocationsProvider";
import { Link, useHistory } from "react-router-dom";
import "./Locations.css";

export const LocationList = () => {
  const { locations, getLocations } = useContext(LocationContext);

  useEffect(() => {
    console.log("LocationList: useEffect - getLocations");
    getLocations();
  }, []);
  const history = useHistory();

  return (
    <>
      <h2>Locations</h2>
      <button onClick={() => history.push("/locations/create")}>
        Add Location
      </button>
      <div className="locations">
        {locations.map((location) => (
          <Link to={`/locations/detail/${location.id}`} key={location.id}>
            {location.name}
          </Link>
        ))}
      </div>
    </>
  );
};
