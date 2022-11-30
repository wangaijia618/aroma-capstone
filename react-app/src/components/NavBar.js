
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoAccount from './auth/DemoAccount'
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/new-story' exact={true} activeClassName='active'>
            New Story
          </NavLink>
        </li>
        <li>
          <NavLink to='/myprofile' exact={true} activeClassName='active'>
            My Stories
          </NavLink>
        </li>
        <li>
          <NavLink to='/my-comments' exact={true} activeClassName='active'>
            My Comments
          </NavLink>
        </li>
        <li>

            <DemoAccount/>

        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
