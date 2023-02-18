import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Personal Trainer App</h1>
      <p>This app provides tools for personal trainers to manage their clients and schedules.</p>
      <nav style={{ textDecoration: 'none' }}>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <Link to="./customerlist">View Clients</Link>
          </li>
          <li>
            <Link to="./traininglist">View Training</Link>
          </li>
          <li>
            <Link to="/calendar">View Schedule</Link>
          </li>
          <li>
            <Link to="/stats">View statistics</Link>
          </li>
        </ul>
      </nav>
    </div >
  );
};

export default HomePage;
