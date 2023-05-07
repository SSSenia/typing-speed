import React from 'react';
import './Header.scss';
import { NavLink } from "react-router-dom";
import { Logo } from '../../assets/img/Logo';

export function Header() {
  return (
    <header className='header'>
      <div className="logo">
        <div className='logo__img'><Logo /></div>
        <h1 className="logo__title">Typing speed</h1>
      </div>
      <nav className='navigation'>
        <NavLink
          to='type/setup'
          className={({ isActive }) => 'navigation__link' + (isActive ? ' navigation__link--active' : '')}
        >
          <h2 className="navigation__title">
            Type!
          </h2>
        </NavLink>
        <NavLink
          to='statistic'
          className={({ isActive }) => 'navigation__link' + (isActive ? ' navigation__link--active' : '')}
        >
          <h2 className="navigation__title">
            Statistic
          </h2>
        </NavLink>
      </nav>
    </header>
  );
}