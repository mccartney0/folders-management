import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn, useAuth } from '../../store/auth';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(useAuth);
  const isLoginSuccess = user.token;

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
          token,
        }));
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

  useEffect(() => {
    if (isLoginSuccess) {
      navigate('/home');
    }
  }, [isLoginSuccess, navigate])

  return (
    <section className="d-flex align-items-center flex-column p-10">
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
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </div>
    </section>
  );
};

export default LoginForm;
