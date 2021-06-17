import React from "react";
import "./WeatherNet.css";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import { Route, Redirect } from "react-router-dom";

export const WeatherNet = () => (
  <>
    <NavBar />
    <ApplicationViews />
  </>
);
