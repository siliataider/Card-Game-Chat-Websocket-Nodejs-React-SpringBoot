import { useState, useEffect  } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../slices/authSlice';
import config from '../../../config';
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [new_username, setNewUsername] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [last_name, setLastName] = useState('');
  const [surname, setSurName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUser = async (data) => {
    try {
      const response = await fetch(`${config.BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      // Send a request to connect the user directly after signup (pas ouf)
      // TODO modifier le backend pour retourner le userID et éviter ça
      const loginData = { username: data.login, password: data.pwd };
      const loginResponse = await fetch(`${config.BASE_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!loginResponse.ok) {
        throw new Error('Login after signup failed');
      }

      const userId = await loginResponse.json();
      dispatch(loginSuccess(userId));
      navigate('/');

    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (new_username && new_password && last_name && surname && email) {
      const data = {
        login: new_username,
        pwd: new_password,
        lastName: last_name,
        surName: surname,
        email: email,
        account: 100.0,
        cardList: []
      };
      console.log('Signing up with:', data);   
      createUser(data);
    } else {
      alert('Fill all the fields or I will raise the cards price!')
    }
  };
  

  return (
    <div>
      <h2>Signup Form</h2>
      <form>
      <div className="main" >
        <div className="mb-3">
          <label htmlFor="newUsername" className="form-label">
            New Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="newUsername"
            value={new_username}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={new_password}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="surname" className="form-label">
            Surname:
          </label>
          <input
            type="text"
            className="form-control"
            id="surname"
            value={surname}
            onChange={(e) => setSurName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="button"
          
          onClick={handleSignup}
        >
          Let's go!
        </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

/*
className="btn btn-primary"
*/