

import React from 'react'
import "./home.css";
import NavBar from '../layout/NavBar';
function Home() {
  return (
    <div className='background-color'>
      <NavBar/>
      <h2 className='text'>School Management System</h2>
 <img src='./images/school.png'  className='images'/>

    </div>
  )
}

export default Home