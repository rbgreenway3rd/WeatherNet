import React, { useState } from "react";
const APIKEY = "";
export const ForecastRequestForm = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState({});
  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) {
      return;
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
    );
    const { main } = await res.json();
    setResult(main);
  };
  return (
    <div>
      <form onSubmit={getWeather}>
        <div>
          <label>city</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <button type="submit">get weather</button>
      </form>
      {result && (
        <div>
          <p>temperature: {result.temp}</p>
          <p>feels like: {result.feels_like}</p>
          <p>high: {result.temp_max}</p>
          <p>low: {result.temp_min}</p>
          <p>humidity: {result.humidity}</p>
          <p>pressure: {result.pressure}</p>
        </div>
      )}
    </div>
  );
};
