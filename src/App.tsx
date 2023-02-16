import React from 'react';


import { BrowserRouter, BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

import { Customerlist } from './components/customerlisting/Customerlist';
import { Traininglist } from './components/traininlisting/Traininglist';
import HomePage from './components/Home';

import './App.css';


function App() {
  return (

    <div className="App">
      <BrowserRouter>

      <AppBar position='static'>
        <Toolbar>
        <Typography variant="h4" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            PT app
          </Typography>
          <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
          <Typography variant="subtitle1" component={Link} to="/customerlist" style={{ textDecoration: 'none', color: 'inherit' }}>
            Customer List
          </Typography>
          <Typography variant="subtitle1" component={Link} to="/traininglist" style={{ textDecoration: 'none', color: 'inherit' }}>
            Traininglist
          </Typography>
        </Toolbar>
      </AppBar>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/customerlist' element={<Customerlist />} />
          <Route path='/traininglist' element={<Traininglist />} />
        </Routes>
      </BrowserRouter>



    </div>
  );
}

export default App;
