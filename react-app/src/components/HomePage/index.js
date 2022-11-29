import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import UserStoryFeed from '../Feed/UserStoryFeed';
import AllStoriesFeed from '../Feed/AllStoriesFeed';
import SplashPage from "./SplashPage"
import FeedSwitch from '../Feed/FeedSwitch'

const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div>
            {sessionUser &&
            (
            // <UserStoryFeed user={sessionUser}/>
            // <FeedSwitch user={sessionUser}/>
            <AllStoriesFeed />
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
