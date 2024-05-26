// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function NavBar() {
  return (
    <nav className='container navbar'>
      <ul className='align'>
        <li className='item'><Link to="/home">Candidates</Link></li>
        <li className='item'><Link to="/admin-login">Admin</Link></li>
        <li className='item'><Link to="/results">Results</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
