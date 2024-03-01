import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn, useAuth } from '../../store/auth';
import axios from 'axios';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(useAuth);

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogIn = async () => {
    if (formData.username.trim() !== '' && formData.password.trim() !== '') {
      try {
        setLoading(true);
        setErrorMessage('');

        const { data } = await axios.post('/token', {
          username: formData.username,
          password: formData.password,
        });

        const token = data.access;

        dispatch(logIn({
          username: formData.username,
          password: formData.password,
        }));

        localStorage.setItem('token', token);

        // Redireciona para a página de home após o login
        navigate('/home');
      } catch (error) {
        setErrorMessage('Invalid username or password.');
        console.error('Error logging in:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="d-flex align-items-center flex-column p-10">
      <h1>Login</h1>

      <div className="d-grid col-3 my-3">
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
          className="form-control mb-3"
          disabled={loading}
          onChange={handleChange}
          value={formData.username}
          placeholder={user.username}
        />

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
          className="form-control"
          disabled={loading}
          onChange={handleChange}
          value={formData.password}
        />

        {
          errorMessage &&
          <div className="text-red-600">
            {errorMessage}
          </div>
        }

        <button
          onClick={handleLogIn}
          className="btn btn-primary mt-3"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
