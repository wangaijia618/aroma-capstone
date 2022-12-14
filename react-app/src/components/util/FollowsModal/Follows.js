import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowers } from "../../../store/follows";
import { NavLink } from "react-router-dom";
import FollowButton from "../FollowButton/index";
import "./Follows.css";
import { getCurUserFollowers } from "../../../store/follows";

const FollowsForm = ({ Author, user }) => {
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.followsState.follows);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(getUserFollowers(Author.id));
    dispatch(getCurUserFollowers(user.id));
  }, [dispatch, Author]);

  return (
    <div className="follows-modal-container">
      <span className="follows-header">Following</span>
      <div className="list-follows-container">
        {follows &&
          Object.values(follows)?.map((follow, i) => {
            return (
              <div className="individual-follows-container" key={i}>
                <div className="profile-img">
                  <NavLink
                    key={`${follow?.user.id}`}
                    to={`/profiles/${follow?.user.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={follow?.user.profile_photo ? follow?.user.profile_photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"}
                      // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
                      className="profile-img"
                    />
                  </NavLink>
                </div>
                <div className="name-info-card">
                  <span>{follow?.user.username}</span>
                  <span> </span>

                </div>
                <div className="follow-btn-card">
                  <FollowButton followerId={follow.user.id} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FollowsForm;
