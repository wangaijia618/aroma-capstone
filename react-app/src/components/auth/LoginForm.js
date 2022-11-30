import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = ({closeModal, switchPage}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
//new added
  const exitFromModal = (e) => {
    closeModal();
  };

  const switchToSignUp = (e) => {
    switchPage();
  }
  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-container">
      <button className="exit-icon" onClick={exitFromModal}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <span className="login-modal-heading">Welcome back.</span>
    <form onSubmit={onLogin} className="signin-form">
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit' className="login-btn-modal">Login</button>
      </div>
    </form>
    <div className="switch-to-signup">
        <span>
          No Account?
          <button className="switch-to-signup-btn" onClick={switchToSignUp}>Create one</button>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
