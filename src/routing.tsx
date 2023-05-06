import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Setup } from "./components/Setup/Setup";
import { Typing } from "./components/Typing/Typing";
import { Results } from "./components/Results/Results";
import { Statistic } from "./components/Statistic/Statistic";

export const ROUTER = createBrowserRouter([
  { path: '/setup', element: <Setup /> },
  { path: '/typing', element: <Typing /> },
  { path: '/results', element: <Results /> },
  { path: '/statistic', element: <Statistic /> },
  { path: '*', element: <Navigate to="/setup" /> }
]);