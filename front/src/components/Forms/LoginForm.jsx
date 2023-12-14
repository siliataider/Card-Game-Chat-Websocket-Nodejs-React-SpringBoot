import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../slices/authSlice';
import config from '../../../config';

const LoginForm = () => {
  const [username_input, setUsername] = useState('');
  const [password_input, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const logUser = async (data) => {
    try {
      const response = await fetch(`${config.BASE_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setError('Invalid credentials');
        return;
      }

      const userId = await response.json();
      console.log("User ID: ", userId);
      dispatch(loginSuccess(userId));

    } catch (error) {
      console.error('Error during POST request:', error);
      setError('Network or server error');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (username_input && password_input) {
      const data = {
        username: username_input,
        password: password_input
      };
      console.log('Logging in with:', data);
      logUser(data);

    } else {
      alert('Dont be silly, fill in all the fields or I will delete your money!')
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
          {error && <div className="error-message">{error}</div>}
           <form>
           <div className="main" >
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="username"
                  value={username_input}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="password"
                  value={password_input}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                onClick={handleLogin}
              >
                Let's go!
              </button>
            </div>
            </form>
    </div>
  );
};

export default LoginForm;