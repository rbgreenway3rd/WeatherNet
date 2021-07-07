import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import { ProfileContext } from "../profiles/ProfilesProvider";
import { useHistory } from "react-router-dom";
import "./Locations.css";
import "./LocationForm.css";

const APIKEY = "1a0c81e956eba4330e0b105645b52769";

export const LocationList = () => {
  const { getLocations, getMatchedLocations } = useContext(LocationContext);

  const [city, setCity] = useState("");
  const [result, setResult] = useState({});
  const [isHidden, setIsHidden] = useState(true);
  const [matchedLocations, setMatchedLocations] = useState([]);

  useEffect(async () => {
    getLocations().then(() =>
      getMatchedLocations().then((res) => {
        const matchedLocationsResults = res.map((locationResults) => {
          return locationResults.location;
        });
        setMatchedLocations(matchedLocationsResults);
      })
    );
  }, []);
  console.log("matched locations: LocList ===>", matchedLocations);

  const showHideDiv = () => {
    if (isHidden === true) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

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

  return (
    <>
      <div className="forecast__background">
        <section className="forecast__form__page">
          <h2>Forecasts</h2>
          <div className="location__buttons">
            {matchedLocations.map((locationMatch) => {
              return (
                <button
                  className="location__buttons__item"
                  onClick={() => setCity(locationMatch.name)}
                  key={locationMatch.name}
                >
                  {locationMatch.name}
                </button>
              );
            })}
          </div>
          <div className="forecast__form">
            <form className="forecast__form__submit" onSubmit={getWeather}>
              <div className="forecast__city__input__div">
                <label className="forecast__city__input__name">city</label>
                <input
                  className="forecast__city__input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <button className="forecast__form__getForecast" type="submit">
                Get Forecast
              </button>
            </form>
            {result && (
              <div className="forecast__results">
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
                  <button
                    className="forecast__form__showMoreInfo"
                    onClick={() => showHideDiv()}
                  >
                    Show More Info:
                  </button>
                  <div className="forecast__result__advanced" hidden={isHidden}>
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
        </section>
      </div>
    </>
  );
};
