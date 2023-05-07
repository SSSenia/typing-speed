import React from 'react';
import { Outlet, RouterProvider } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.scss';


function App() {
  return (
    <div className='wrapper'>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default App;
