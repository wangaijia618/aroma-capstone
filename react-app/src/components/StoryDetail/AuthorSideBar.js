import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { followAUser } from "../../store/follows";
// import  FollowingModal from "../util/FollowModal/index.js";
// import  FollowButton from "../util/FollowButton/index"
// import { getCurUserFollowers } from "../../store/follows";
// import FollowsModal from "../util/FollowsModal/index"
import './index.css'
function AuthorSideBar({ Author }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

//   useEffect(()=>{
//     if(sessionUser) dispatch(getCurUserFollowers(sessionUser.id))
//   })

  let FollowBtn;

  if (sessionUser?.id !== Author?.id) {
    FollowBtn = <button
                    className="follow-btn"
                    onClick={(e) => {
                        e.preventDefault()
                        dispatch(followAUser(Author?.id))
                  }}>Follow</button>;
  }

  return (
    <div className="author-side-bar-container">
      <div className="black-bar"> </div>
      {/* <NavLink to={`/profiles/${Author?.id}`} style={{ textDecoration: "none" }}> */}
      <div
        className="author-sidebar-profile-image-container"
        style={{
          backgroundImage: `url('${
            Author?.profile_photo
              ? Author?.profile_photo
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
          }')`,
        }}
      ></div>
      <div className="author-sidebar-name">
        {`${Author?.username}`}
      </div>
      <div className="author-sidebar-bio">
        {`${Author?.bio}`}
      </div>
      {/* </NavLink> */}
      {/* <div className="followers-count-container"> */}
        {/* <p>{Author?.num_followers} Followers</p> */}
        {/* <FollowingModal user={sessionUser} Author={Author} /> */}
        {/* <FollowsModal user={sessionUser} Author={Author} /> */}
        {/* {FollowBtn} */}
      {/* </div> */}
      {/* {sessionUser ? (<FollowButton followerId={Author?.id} />) : null } */}
      {/* <div className="author-bio-container">About Me: {Author?.bio}</div> */}
    </div>
  );
}

export default AuthorSideBar;
