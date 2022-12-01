import React, {useState} from 'react';
import {useSelector} from 'react-redux';
// import UserStoryFeed from '../Feed/UserStoryFeed';
import AllStoriesFeed from '../Feed/AllStoriesFeed';
import SplashPage from "./SplashPage"
// import FeedSwitch from '../Feed/FeedSwitch'
import VerticalNavBar from '../navbar/VerticalNavBar/VerticalNavBar.js'

const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div>
            {sessionUser &&
            (
                <div>
                     <div className="all-stories-title">All Stories</div>
                 {/* <UserStoryFeed user={sessionUser}/>
                 <FeedSwitch user={sessionUser}/> */}
            <AllStoriesFeed />
            <VerticalNavBar  user = {sessionUser}/>
            </div>
            )}
            {!sessionUser &&
            (
            <div>
                <SplashPage />
            <AllStoriesFeed />
            </div>
            )}
        </div>
    )
}

export default HomePage;
