import React from 'react';
import { Link } from 'react-router-dom';
import { Customerlist } from './customerlisting/Customerlist';
import { Traininglist } from './traininlisting/Traininglist';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Personal Trainer App</h1>
      <p>This app provides tools for personal trainers to manage their clients and schedules.</p>
      <nav>
        <ul>
          <li>
            <Link to="./customerlist">View Clients</Link>
          </li>
          <li>
            <Link to="./traininglist">View Training</Link>
          </li>
          <li>
            <Link to="/schedule">View Schedule</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
