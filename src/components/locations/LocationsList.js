import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationsProvider";
import { ProfileContext } from "../profiles/ProfilesProvider";
import { useHistory } from "react-router-dom";
import "./Locations.css";
import "./LocationForm.css";

const APIKEY = "1a0c81e956eba4330e0b105645b52769";

export const LocationList = () => {
  const { locations, getLocations, deleteLocation, getMatchedLocations } =
    useContext(LocationContext);
  const { profiles, getProfiles, currentProfile, getCurrentProfile } =
    useContext(ProfileContext);

  const [city, setCity] = useState("");
  const [result, setResult] = useState({});
  const [isHidden, setIsHidden] = useState(true);
  const [buttonList, setButtonList] = useState([]);
  const [matchedLocations, setMatchedLocations] = useState([]);

  const history = useHistory();

  useEffect(async () => {
    getLocations().then(() =>
      getMatchedLocations().then((res) => {
        const matchedLocationsResults = res.map((locationResults) => {
          return locationResults.location;
        });
        setMatchedLocations(matchedLocationsResults);
      })
    );
    // [getLocations(), getCurrentProfile()].then(
    //   () => {
    //     console.log(currentProfile);

    //     console.log(buttonList);
    //     //console.log(locationResults);
    //   }
    // );
  }, []);
  console.log(matchedLocations);

  // const renderButtons = () => {
  //   const locationResults = (currentProfile.savedCityId || []).map((cityId) => {
  //     const renderButtonsArray = locations.find(
  //       (location) => location.id === cityId
  //     );
  //     return renderButtonsArray;
  //   });

  //   return locationResults.map((location) => (
  //     <button
  //       classame="location__buttons"
  //       type="submit"
  //       id={location.name}
  //       value={city}
  //       key={location.name}
  //     >
  //       {location.name}
  //     </button>
  //   ));
  // };

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

  /**
   * Trying to display a list of buttons for each location related to the current user
   *  on click: the value={city} gets set to the location.name tied to the button
   * Need to convert the data to only an array of locations
   *  then we can map over the result to display the correct buttons
   */

  return (
    <>
      <div className="forecast__background">
        <section className="forecast__form__page">
          <h2>Forecasts</h2>
          <div className="location__buttons">
            {/* {currentProfile.savedCityId && renderButtons()} */}
            {matchedLocations.map((locationMatch) => {
              return <button>{locationMatch.name}</button>;
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
              <button type="submit">get weather</button>
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
        </section>
      </div>
    </>
  );
};
