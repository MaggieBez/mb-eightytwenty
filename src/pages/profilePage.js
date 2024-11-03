import React, { useState } from 'react';
import { auth } from '../firebase';
import { updatePassword, updateProfile } from 'firebase/auth';
import { Card, Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
  const [user, loading] = useAuthState(auth);
  const initialDisplayName = user && user.displayName ? user.displayName : "";
  const [currentUserName, setCurrentUserName] = useState(initialDisplayName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentConfirmPassword, setCurrentConfirmPassword] = useState("");
  
  // Submit Update User DisplayName
  const updateUserName = () => {
    if (currentUserName.length === 0) {
      return;
    }
    updateProfile(user, {
      displayName: currentUserName
    }).then(() => {
      toast.success('Updated user display name')
    }).catch((error) => {
      toast.error(error);
    })
  }
  // Password Validation
  const isInvalidPassword = () => {
    return currentPassword.length < 6;
  }

  const passwordsDoNotMatch = () => {
      return currentPassword !== currentConfirmPassword;
  }
  const isNewPasswordInvalid = () => {
    return  isInvalidPassword() || passwordsDoNotMatch()
  }
  // Submit Update User Password
  const updateUserPassword = () => {
    if (currentPassword.length === 0 ) {
      return;
    }
    updatePassword(user, currentPassword).then(() => {
      toast.success('Updated password');
    }).catch((error) => {
      toast.error(error)
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
              <Row className="section">
                <Col lg={{ span:6, offset:3 }}>
                  <Card>
                      <Card.Body>
                      <h6>User Display Name</h6>
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
                      </Card.Body> 
                  </Card>
                </Col>
              </Row>
              <Row className="section">
                <Col lg={{ span:6, offset:3 }}>
                  <Card>
                    <Card.Body>
                    <h6>Update Password</h6>
                          <Form.Control
                            type="password"
                            placeholder="New Password"
                            value={ currentPassword }
                            aria-label="New Password"
                            aria-describedby="basic-addon2"
                            onChange={ e => setCurrentPassword(e.target.value) }
                            isInvalid={ isInvalidPassword() }
                          />
                          <Form.Control.Feedback type="invalid">
                            Password must be at least 6 characters.            
                          </Form.Control.Feedback>
                          <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={ currentConfirmPassword }
                            aria-label="Confirm Password"
                            aria-describedby="basic-addon2"
                            onChange={ e => setCurrentConfirmPassword(e.target.value) }
                            isInvalid={ passwordsDoNotMatch() }
                          />
                          <Form.Control.Feedback type="invalid">
                            Passwords must match.
                          </Form.Control.Feedback>
                          <Button variant="outline-secondary" id="button-addon2" onClick={ updateUserPassword } disabled={isNewPasswordInvalid()}>
                            Update Password
                          </Button>
                          <ToastContainer 
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar
                            newestOnTop
                            closeOnClick={false}
                            theme="dark"/>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
      </div>
      )
  }
  
  return <Navigate to="/signin"/>
}
  
export default ProfilePage;