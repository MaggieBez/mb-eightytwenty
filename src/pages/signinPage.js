import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { signinUser, setUserEmail, setUserPassword } from '../store/reducers';
import { store } from '../store/store';
import { signinFirebaseUser } from '../firebase';
import { Card } from 'react-bootstrap';

function SigninPage(props) {
  const [currentEmail, setEmail] = useState("");
  const [currentPassword, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const { dispatch } = props;
  const navigate = useNavigate();
  const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const isInvalidEmail = (email) => {
    return !email.match(validEmailRegex);
  }

  const isInvalidPassword = (password) => {
      return password.length < 6;
  }

  const isFormInvalid = () => {
    return isInvalidEmail(currentEmail) || 
        isInvalidPassword(currentPassword)
  }

  const onEmailChangeHandler = (e) => {
    const userInput = e.target.value;
    
    if (userInput.length === 0) {
        return;
    }

    setEmail(userInput);
    
    if(isInvalidEmail(userInput)) {
        return;
    }

    dispatch(setUserEmail(userInput));
  }

  const onPasswordChangeHandler = (e) => {
    const userInput = e.target.value;
    setPassword(userInput);

    if (isInvalidPassword(userInput)) {
        return;
    }

    dispatch(setUserPassword(userInput));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const result = await signinFirebaseUser(store.getState().userEmail, store.getState().userPassword);
    if (result.uid) {
      dispatch(signinUser(result));
      navigate('/welcome');
    } else {
      setLoginError(result);
    }
  }

  return (
    <div className="SigninPage">   
      <Container>
          <Row className='section'>
              <Col lg={{ span:4, offset:4 }}>
                  <h3>Sign In</h3>
                  <Card>
                    <Card.Body>
                        <Form 
                          noValidate 
                          onSubmit={ async (e) => await submitHandler(e) }>
                          <Form.Group className="mb-3" controlId="formEmail">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control 
                                  type="email" 
                                  placeholder="Enter email"  
                                  onChange={ onEmailChangeHandler }
                                  isInvalid={ isInvalidEmail(currentEmail) }
                              />
                              <Form.Control.Feedback type="invalid">
                                  Please provide a valid email address.
                              </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control 
                                  type="password" 
                                  placeholder="Password" 
                                  onChange={ onPasswordChangeHandler }
                                  isInvalid={ isInvalidPassword(currentPassword) }
                              />
                              <Form.Control.Feedback type="invalid">
                                  Password must be at least 6 characters.
                              </Form.Control.Feedback>
                          </Form.Group>              
                          <Button variant="primary" type="submit" disabled={isFormInvalid()}>
                              Sign In
                          </Button>
                        </Form>
                        <div>{loginError}</div>
                    </Card.Body>
                  </Card>  
              </Col>
          </Row>
          <Row className='section'>
              <Col lg={{ span:4, offset:4 }}>
                  <Link to='/'>
                          Don't have and account yet? Register.
                  </Link>
              </Col>
          </Row>
      </Container>
    
    </div>
  );
}
  
export default SigninPage;