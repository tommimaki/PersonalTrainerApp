import React from 'react';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Customerlist } from './components/customerlisting/Customerlist';

import './App.css';

function App() {
  return (
    <div className="App">
        <Customerlist />
    </div>
  );
}

export default App;
