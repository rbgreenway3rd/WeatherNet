import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import "./Locations.css";
import { useParams } from "react-router-dom";

export const LocationsDetail = () => {
  const { getLocationById, locations, deleteLocation, getLocations } =
    useContext(LocationContext);
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

    getLocationById(locationId).then((thisLocation) =>
      setLocation(thisLocation)
    );
  }, [locationId]);

  //   debugger;

  return (
    <section className="location__collection">
      <h3 className="location__list">
        {locations.map((location) => (
          <div className="location" key={location.name} id={location.id}>
            {location.name}
            <button>Delete Location</button>
          </div>
        ))}
      </h3>
    </section>
  );
};
