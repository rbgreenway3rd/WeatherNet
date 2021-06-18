import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import "./Locations.css";
import { useParams } from "react-router-dom";

export const LocationsDetail = () => {
  const { getLocationById, locations } = useContext(LocationContext);
  const [location, setLocation] = useState({ zipcode: {} });

  const { locationId } = useParams();

  useEffect(() => {
    getLocationById(locationId).then((thisLocation) =>
      setLocation(thisLocation)
    );
  }, [locationId]);

  //   debugger;
  return (
    <section className="location">
      <h3 className="location__name">{location.name}</h3>
      <div className="location__zipcode">
        Location Zipcode: {location.zipcode}
      </div>
    </section>
  );
};
