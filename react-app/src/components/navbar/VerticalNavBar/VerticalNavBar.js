
import React from "react";
import { NavLink } from "react-router-dom";
import "./VerticalNavBar.css";
import { FiEdit, FiHome } from "react-icons/fi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi"
// import ProfileButton from "../ProfileButton";
import favicon from "./favicon.png"
import LogoutButton from "../../auth/LogoutButton";


const VerticalNavBar = ({ user }) => {
  return (
    <div className="SideBar">
      <nav>
        <NavLink
          to="/"
          exact={true}
          activeClassName="active"
          style={{ textDecoration: "none" }}
          className="logo-btn"
        >
          {/* <i className="fa-brands fa-medium medlogo"></i> */}
          <img className="vertical_favicon" src={favicon} width='70px' height='70px'/>
        </NavLink>
        <ul>
          <li>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <FiHome className="navbaricon" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/myprofile`}
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <BsJournalBookmarkFill className="navbaricon" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/my-comments`}
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <BiCommentDetail className="navbaricon" />
               <div className="hide">My Comments</div>
            </NavLink>

          </li>
          <li>
            <NavLink to="/new-story" exact={true} activeClassName="active" style={{ textDecoration: "none" }}>
              <FiEdit className="navbaricon" />
            </NavLink>
          </li>
        </ul>
        <div className="vertical-logout-button">
            <LogoutButton />
        </div>
        {/* <ProfileButton user={user} /> */}
      </nav>
    </div>
  );
};

export default VerticalNavBar;
