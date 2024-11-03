import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { registerUser, setUserEmail, setUserPassword } from '../store/reducers';
import { registerFirebaseUser } from '../firebase';
import { store } from '../store/store';
import { Card } from 'react-bootstrap';

function SignUpPage(props) {
    const [currentEmail, setEmail] = useState("");
    const [currentPassword1, setPassword1] = useState("");
    const [currentPassword2, setPassword2] = useState("");

    const { dispatch } = props;

    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const isInvalidEmail = (email) => {
        return !email.match(validEmailRegex);
    }

    const isInvalidPassword = (password) => {
        return password.length < 6;
    }

    const passwordsDoNotMatch = (password1, password2) => {
        return password1 !== password2;
    }

    const isFormInvalid = () => {
        return isInvalidEmail(currentEmail) || 
            isInvalidPassword(currentPassword1) || 
            passwordsDoNotMatch(currentPassword1, currentPassword2)
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

    const onPassword1ChangeHandler = (e) => {
        const userInput = e.target.value;
        setPassword1(userInput);

        if (isInvalidPassword(userInput) || passwordsDoNotMatch(userInput, currentPassword2)) {
            return;
        }

        dispatch(setUserPassword(userInput));
    }
    

    const onPassword2ChangeHandler = (e) => {
        const userInput = e.target.value;
        setPassword2(userInput);

        if (isInvalidPassword(userInput) || passwordsDoNotMatch(currentPassword1, userInput)) {
            return;
        }

        dispatch(setUserPassword(userInput));
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const result = await registerFirebaseUser(store.getState().userEmail, store.getState().userPassword);
        dispatch(registerUser(result));
    }

    return (
      <div className="SignUpPage">
        <Container>
            <Row className='section'>
                <Col lg={{ span:4, offset:4 }}>
                    <h3>Register</h3>
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
                                        onChange={ onPassword1ChangeHandler }
                                        isInvalid={ isInvalidPassword(currentPassword1) }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Password must be at least 6 characters.
                                    </Form.Control.Feedback>
                                </Form.Group>              

                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Confirm Password" 
                                        onChange={ onPassword2ChangeHandler }
                                        isInvalid={ passwordsDoNotMatch(currentPassword1, currentPassword2) }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Passwords must match.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={isFormInvalid()}>
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>  
                </Col>
            </Row>
            <Row className='section'>
                <Col lg={{ span:4, offset:4 }}>
                    <Link to='/signin'>
                            Already have an account? Sign In
                    </Link>
                </Col>
            </Row>
        </Container>
      </div>
    );
  }
  
  export default SignUpPage;