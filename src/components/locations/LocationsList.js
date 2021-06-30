import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import { ProfileContext } from "../profiles/ProfilesProvider";
import { useHistory } from "react-router-dom";
import "./Locations.css";

const APIKEY = "1a0c81e956eba4330e0b105645b52769";

export const LocationList = () => {
  const { locations, getLocations } = useContext(LocationContext);
  const { profiles, getCurrentProfile } = useContext(ProfileContext);
  const [city, setCity] = useState("");
  const [result, setResult] = useState({});
  const [isHidden, setIsHidden] = useState(true);

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) {
      return;
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`
    );
    const { main } = await res.json();
    setResult(main);
  };
  useEffect(() => {
    getCurrentProfile(profile);
    console.log(profile);
    getLocations(locations);
    console.log("LocationList: useEffect - getLocations");
  }, []);

  const history = useHistory();

  const showHideDiv = () => {
    if (isHidden === true) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  //test-code for matching up location.id and profile.savedCityId

  const profile = getCurrentProfile();

  const savedLocation = [];

  const updateSavedLocation = () => {};

  return (
    <>
      <h2>Locations</h2>
      <button onClick={() => history.push("/locations/create")}>
        Add Location
      </button>
      <div className="locations">
        {locations.map((location) => (
          <button
            type="submit"
            id={location.name}
            value={location.name}
            key={location.name}
          >
            {location.name}
          </button>
        ))}
      </div>
      <div>
        <form onSubmit={getWeather}>
          <div>
            <label>city</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <button type="submit">get weather</button>
        </form>
        {result && (
          <div className="forecast__result">
            <div className="forecast__result__simple">
              <p className="forecast__result__description">
                Description: {result.coord}
              </p>
              <p>temperature: {result.temp}</p>
              <p>feels like: {result.feels_like}</p>
              <p>high: {result.temp_max}</p>
              <p>low: {result.temp_min}</p>
            </div>
            <div className="forecast__result__advanced">
              <button onClick={() => showHideDiv()}>Show More Info:</button>
              <div hidden={isHidden}>
                <p>humidity: {result.humidity}</p>
                <p>visibility: {result.visibility}</p>
                <p>wind speed: {result.speed}</p>
                <p>pressure: {result.pressure}</p>
                <p>sunrise: </p>
                <p>sunset: </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
