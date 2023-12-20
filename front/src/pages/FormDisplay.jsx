import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';
import config from '../../config';
import LoginForm from '../components/Forms/LoginForm'
import SignupForm from '../components/Forms/SignupForm'
import { logout } from '../slices/authSlice';



const FormDisplay = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showButtons, setShowButtons] = useState(true);

    const dispatch = useDispatch();

    const handleLoginClick = () => {
            setShowLogin(true);
            setShowSignup(false);
            setShowButtons(false);
            };

    const handleSignupClick = () => {
            setShowLogin(false);
            setShowSignup(true);
            setShowButtons(false);
            };

    const handleGoBack = () => {
         setShowLogin(false);
         setShowSignup(false);
         setShowButtons(true);
         dispatch(logout());
       };

    return (
    <>

          <div className="main">
           {showButtons && (
           <>
           <h1>Welcome to G5's Card Shop!</h1>
           <p className="read-the-docs">
             Create your account and discover our endless inventory!
           </p>
            <div>
              <button onClick={handleSignupClick}>Sign up</button>
            </div>
            <br></br>
            <div>
              <button onClick={handleLoginClick}>Log in</button>
            </div>
            </>
            )}
           </div>

          {showLogin && (
            <div>
              <LoginForm/>
              <br></br>
              <button onClick={handleGoBack}>Go Back</button>
            </div>
          )}

          {showSignup && (
            <div>
              <SignupForm/>
              <br></br>
              <button onClick={handleGoBack}>Go Back</button>
            </div>
          )}

</>

    )

}

export default FormDisplay;