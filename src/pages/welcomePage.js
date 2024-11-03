import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

function WelcomePage() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
      return;
    }

    if (user) {
      return (
        <div className="WelcomePage">
          <Container>
            <Row className="section">
              <Col>
                <h2>You are logged in</h2>
              </Col>
            </Row>
            <Row className="section">
              <Col>
                <h3>Welcome { user.email }!</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={`/profile`}><Button>Go to Profile</Button></Link>
              </Col>
            </Row>
          </Container>
        </div>
      ); 
    }
      
    return <Navigate to="/signin"/>
}

export default WelcomePage;