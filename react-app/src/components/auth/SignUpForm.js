import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = ({closeModal, switchPage}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
        setErrors(["Please Confirm Password"])
      }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  //new add
  const exitFromModal = (e) => {
    closeModal();
  }

  const switchToLogin = (e) => {
    switchPage();
  };
  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-container">
    <button className="exit-icon" onClick={exitFromModal}>
      <i className="fa-solid fa-xmark"></i>
    </button>
    <span className="signup-modal-heading">Join Medium.</span>
    <form onSubmit={onSignUp} className="signup-form">
      <div className="signup-errors-outer">
        {errors.map((error, ind) => (
          <div className="signup-errors" key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label className="signup-label">User Name</label>
        <input
          className="signup-input"
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label className="signup-label">Email</label>
        <input
          className="signup-input"
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label className="signup-label">Password</label>
        <input
          className="signup-input"
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label className="signup-label">Repeat Password</label>
        <input
          className="signup-input"
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit' className="signup-btn-modal">Sign Up</button>
    </form>
     <div className='switch-to-login'>
     <span>Already have an account ?<button className="switch-to-signin-btn" onClick={switchToLogin}>Sign in</button></span>
   </div>
   </div>
  );
};

export default SignUpForm;
