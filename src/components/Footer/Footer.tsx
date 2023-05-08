import React from "react";
import './Footer.scss';
import { LinkedIn } from "../../assets/img/LinkedIn";
import { GitHub } from "../../assets/img/GitHub";

export function Footer() {
  return (
    <footer className='footer'>
      <h3 className="developed-by">
        Developed by: Synytsyn Semen
      </h3>
      <ul className="links">
        <a href="https://www.linkedin.com/in/semen-synytsyn/">
          <li className="links__link">
            <LinkedIn />
            <span className="links__name">LinkedIn</span>
          </li>
        </a>
        <a href="https://github.com/SSSenia">
          <li className="links__link">
            <GitHub />
            <span className="links__name">GitHub</span>
          </li>
        </a>
      </ul>
    </footer>
  );
}