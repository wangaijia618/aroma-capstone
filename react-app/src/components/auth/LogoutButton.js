import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import {useHistory} from "react-router-dom"
import "./LoginForm.css"
const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <button className="logout-btn" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
