import React from "react"
import LoginPopUpModal from "../auth/LoginPopUp";
import "./HomePage.css"
import flower2 from "../../images/flower2.gif"

const SplashPage = () => {
    return (
      <div className="HomeBanner-container">


        <div className="HomeBanner-main-text">
          <div className="HomeBanner-main-header">
            <h1>Stay curious.</h1>
          </div>
          <div className="HomeBanner-sub-text">
            <h2>Discover stories, thinking, and expertise</h2>
            <h2>from writeres on any topic.</h2>
          </div>

          <LoginPopUpModal location='start-reading' />
        </div>
        <div className="medium-img">
          <img className="flower-gif" src={flower2} type='video/mp4' alt="background" >
          </img>
        </div>
      </div>
    );
}


export default SplashPage;
