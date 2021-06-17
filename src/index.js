import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { WeatherNet } from "./components/WeatherNet.js";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <WeatherNet />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
