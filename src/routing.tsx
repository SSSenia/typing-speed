import React from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Setup } from "./components/Type/Setup/Setup";
import { Typing } from "./components/Type/Typing/Typing";
import { Results } from "./components/Type/Results/Results";
import { Statistic } from "./components/Statistic/Statistic";
import App from "./App";

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'type', element: <Outlet />,
        children: [
          { path: 'setup', element: <Setup /> },
          { path: 'typing', element: <Typing /> },
          { path: 'results', element: <Results /> }
        ]
      },
      { path: 'statistic', element: <Statistic /> },
      { path: '/', element: <Navigate to="type/setup" /> }
    ]
  },
  { path: '*', element: <Navigate to="type/setup" /> }
]);

