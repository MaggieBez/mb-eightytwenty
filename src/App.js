import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './App.scss';

function App() {
  return (
    <div className="App">
        <div className='Header'>
          <div className='Logo'>Marguerite B</div>  
          <div>
              <ul>
                <li><Link to={`/`}>Home</Link></li>
                <li><Link to={`signup`}>Sign Up</Link></li>
                <li><Link to={`signin`}>Sign In</Link></li>
              </ul>
          </div>
        </div>
        <div className='pageDisplay'>
          <Outlet />
        </div>
    </div>
  );
}

export default App;
