import React, {Fragment, useState} from 'react';
import './App.css';
import {
  BrowserRouter, 
  Routes, 
  Route,
  Navigate,  
} from "react-router-dom"; 

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {  
  const [isAuth, setisAuth] = useState(false); 

  const setAuth = (bool) => {
    setisAuth(bool); 
  }; 

  return (
    <Fragment>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route exact path="/login" element={ !isAuth ? (<Login setAuth={setAuth}/>) : <Navigate to="/dashboard" replace/>} />
            <Route exact path="/register" element={!isAuth ? (<Register setAuth={setAuth}/>) : <Navigate to="/dashboard" replace/>} />
            <Route exact path="/dashboard" element={isAuth ? (<Dashboard setAuth={setAuth}/>) : <Navigate to="/login" replace/>} />
          </Routes>
        </div>
      </BrowserRouter>
      
    </Fragment>
  );
}

export default App;
