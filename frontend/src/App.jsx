import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import AdminCredientials from './components/AdminCredientials';
import Admin from './components/Admin';
import AddCandidates from './components/AddCandidates';
import AddVoters from './components/AddVoters';
import LoginForm from './components/LoginForm';
// import SignIn from './components/SignIn';
import Results from './components/Results';
import './App.css';
import NotFound from './components/NotFound';

function App() {
  

 

  

  return (
    
      <BrowserRouter>
        
       
          <Routes>
            <Route path="/" element={<LoginForm />} />
            {/* <Route path="/signIn" element={<SignIn />} /> */}
            <Route path="/admin-login" element={<AdminCredientials />} /> 
            <Route path="/admin" element={<Admin />} /> 
           <Route path="/addCandidates" element={<AddCandidates />} />
            <Route path="/addVoters" element={<AddVoters />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        
      </BrowserRouter>
   
  );
}

export default App;
