import React from 'react';
import logo from './logo.svg';
import './App.css';

import Textfield from './Textfield'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <h3>Logo</h3>
      <ul>
        <Link to="/home">
        <li>Home</li>
        </Link>
        <Link to="/abt">
        <li>About</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
