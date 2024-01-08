import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} 
      from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

import Dashboard from './components/Dashboard';
import TambahPasien from './components/TambahPasien';
import RincianDataPasien from './components/RincianDataPasien';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component =
                              {Dashboard}></Route>
                          <Route path = "/dashboard" component = 
                              {Dashboard}></Route>
                          <Route path = "/add-pasien/:id" component = 
                              {TambahPasien}></Route>
                          <Route path = "/view-pasien/:id" component = 
                              {RincianDataPasien}></Route>
                    </Switch>
                </div>
              {/* <FooterComponent /> */}
        </Router>
    </div>
    
  );
}

export default App;
