import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import './App.scss';
import { Button } from 'react-bootstrap';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  //Submit Logout
  const logoutUser = async (e) => {
    e.preventDefault();
    await signOut(auth);
    navigate("/signin")
  }

  if (loading) { 
    return;
  }

  if (user) {
    return (
      <div className="App">
          <div className="Header">
            <div className="Logo"> 
              <h3>{ user.email }</h3>  
            </div>  
            <div>
                  <ul>
                    <li><Button onClick={ logoutUser }>Logout</Button></li>
                  </ul>
            </div>
          </div>
          <div className="pageDisplay">
            <Outlet />
          </div>
      </div>
    );
  }

  return(
    <div className="App">
      <div className="Header">
        <div className="Logo"><h3>User Trial App</h3></div>  
      </div>
      <div className="pageDisplay">
        <Outlet />
      </div>
    </div>
  )
}

export default App;
