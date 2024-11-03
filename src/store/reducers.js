export const initialEmail = '';
export const initialPassword = '';
export const initialRegisteredUser = 'unregistered';
export const initialSignedInUser = { email: "", uid: "", accessToken: ""};
//Reducers
export const emailReducer = (userEmail = initialEmail, action) => {
    switch (action.type) {
        case 'setUserEmail':
            return action.payload;
        default: 
            return userEmail;
    }
}

export const passwordReducer = (userPassword = initialPassword, action) => {
    switch (action.type) {
        case 'setUserPassword':
            return action.payload;
        default:
            return userPassword;
    }
}

export const registerUserReducer = (registeredUser = initialRegisteredUser, action) => {
    switch (action.type) {
        case 'setRegisteredUser':
            return action.payload;
        default:
            return registeredUser;
    }
}

export const signinUserReducer = (signedInUser = initialSignedInUser, action) => {
    switch (action.type) {
        case 'setSignedInUser':
            return action.payload;
        default:
            return signedInUser;
    }
}

//Actions
export function setUserEmail(email) {
    return {
        type: 'setUserEmail',
        payload: email
    }
}

export function setUserPassword(password) {
    return {
        type: 'setUserPassword',
        payload: password
    }
}

export function registerUser(registeredUser) {
    return {
        type: 'setRegisteredUser',
        payload: registeredUser
    }
}

export function signinUser(signedInUser) {
    return {
        type: 'setSignedInUser',
        payload: signedInUser
    }
}