import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from './store/store';
import ErrorPage from './error-page';
import SignUpPage from './pages/signupPage';
import SigninPage from './pages/signinPage';
import WelcomePage from './pages/welcomePage';
import ProfilePage from './pages/profilePage';

const state = store.getState();
const dispatch = store.dispatch;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App state={state} dispatch={dispatch} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SignUpPage userEmail={state.userEmail} userPassword={state.userPassword} dispatch={dispatch} replace/>
      },
      {
        path: '/signin',
        element: <SigninPage userEmail={state.userEmail} userPassword={state.userPassword} signedInUser={state.signedInUser} dispatch={dispatch}/>
      },
      {
        path: '/welcome',
        element: <WelcomePage signedInUser={state.signedInUser}/>
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
    ]
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
const render = () => {
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

render()

store.subscribe(render);
