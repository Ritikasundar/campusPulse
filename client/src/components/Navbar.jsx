// client/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="nav">
    <div className="brand">CampusPulse</div>
    <div>
      <Link to="/">Home</Link> | <Link to="/complaints/new">Report Issue</Link>
    </div>
  </nav>
);

export default Navbar;
