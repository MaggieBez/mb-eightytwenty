import React, { useState } from 'react';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { Card, Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

function ProfilePage() {
  const [user, loading] = useAuthState(auth);
  const initialDisplayName = user && user.displayName ? user.displayName : "";
  const [currentUserName, setCurrentUserName] = useState(initialDisplayName);
  
  const updateUserName = () => {
    if (currentUserName.length === 0) {
      return;
    }
    updateProfile(user, {
      displayName: currentUserName
    }).then(() => {
      console.log('Successfully update username')
    }).catch((error) => {
      console.log(error);
    })
  }

  if (loading) {
    return;
  }

  if (user) {
    return (
      <div className="ProfilePage">
            <Container>
              <h3>User Profile</h3>
              <Row className='section'>
                <Col>
                  <Card>
                      <Card.Body>
                        <InputGroup className="mb-3">
                          <Form.Control
                            placeholder={ "User name" }
                            value={ currentUserName }
                            aria-label="User Name"
                            aria-describedby="basic-addon2"
                            onChange={ e => setCurrentUserName(e.target.value) }
                          />
                          <Button variant="outline-secondary" id="button-addon2" onClick={ updateUserName }>
                            Update Name
                          </Button>
                        </InputGroup>
                      </Card.Body> 
                  </Card>
                </Col>
              </Row>
            </Container>
      </div>
      )
  }
  
  return <Navigate to='/signin'/>
}
  
export default ProfilePage;