import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ROUTER } from './routing';
import './App.scss';


function App() {
  return (
    <>
      <Header></Header>
      <RouterProvider router={ROUTER} />
      <Footer></Footer>
    </>
  );
}

export default App;
