import React from 'react';
import ReactDOM from 'react-dom/client';
import './colors.scss';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { ROUTER } from './routing';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={ROUTER} />
  </React.StrictMode>
);