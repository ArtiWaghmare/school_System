import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentsList from '../students/StudentsList';
import Home from '../home/Home';
import LoginForm from '../auth/LoginForm';
import PageNotFound from '../pagenotfound/PageNotFound';
const MenuBar = () => {
  return (
    
    <Router>
   <Routes>
          
          <Route path="/" element={<LoginForm/>} />      
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/list" element={<StudentsList/>} />
           <Route path="/home" element={<Home/>} />
           <Route path="*" element={<PageNotFound/>} />
        </Routes>
      
    </Router>
  );
};

export default MenuBar;





   
    







