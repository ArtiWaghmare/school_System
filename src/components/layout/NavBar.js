

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const NavBar = ({ onLogout }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
 
    navigate('/login'); 
  };

  return (
    <div className='header'>
      <Link to={'/home'}><button type="button" className="btn btn-warning">Home</button></Link>
      <Link to={'/list'}><button type="button" className="btn btn-warning">Student Data</button></Link>
      <button type="button" className="btn btn-warning logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default NavBar;
