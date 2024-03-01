import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn, useAuth } from '../../store/auth';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(useAuth);

  const redirectToHome = () => {
    navigate('/home');
  };

  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogIn = () => {
    if (formData.username.trim() !== '' && formData.password.trim() !== '') {
      dispatch(logIn({
        username: formData.username,
        password: formData.password,
        token: '45C4A5451321B4C88F',
      }));

      redirectToHome();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="d-flex align-items-center flex-column">
      <h2>Login</h2>

      <div className="mb-3">
        <label
          htmlFor="username"
          className="form-label"
        >
          Username *
        </label>

        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control"
          placeholder={user.username}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="password"
          className="form-label"
        >
          Password *
        </label>

        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <button
          onClick={handleLogIn}
          className="btn btn-primary"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
