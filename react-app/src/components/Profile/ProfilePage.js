import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUserProfile } from "../../store/profiles";
import { useParams, Link} from "react-router-dom";
import EditProfileModal from "./editModal";
import { getCurUserFollowers } from "../../store/follows";
import StoryPreview from "../Feed/StoryPreview";
//styles
import "./Profile.css"
// import '../comments/Comment.css';
import VerticalNavBar from '../navbar/VerticalNavBar/VerticalNavBar.js'
import HorizontalNavBar from '../navbar/HorizontalNavBar/HorizontalNavBar.js'
import  FollowingModal from "../util/FollowModal/index.js";
import FollowsModal from "../util/FollowsModal/index"

function UserProfile({Author}){
     const dispatch = useDispatch();
     const currentUser = useSelector(state => state.session.user);
     const userProfile = useSelector(state => state.profileState);
     const {userId} = useParams();
     const stories = useSelector(state => state.profileState.Stories);



console.log("!!!!!!!!!!!!!!!!", userProfile)
console.log("@@@@@@@@@@@@@@", currentUser)
     useEffect(() => {
        dispatch(getUserProfile(userId))
     },[dispatch, userId]);



    const [userStories, setUserStories] = useState(true);
    const [userComments, setUserComments] = useState(false);
    const [userBio, setUserBio] = useState(false);

    const handleStoriesPage = () => {
        setUserStories(true)
        setUserComments(false)
        setUserBio(false)
    };

    const handleCommentPage = () => {
        setUserComments(true)
        setUserBio(false)
        setUserStories(false)

    };

    const handleAboutPage = () => {
        setUserComments(false)
        setUserStories(false)
        setUserBio(true)
    };
    // if (!loaded) {
    //     return null;
    //   }
    // if (!stories) {
    //     return null;
    // }
    return (
        <div className="user-profile-page">
            { currentUser?  <VerticalNavBar />
           :<HorizontalNavBar/> }
            <div className="user-details">
                <div className="image-container">
                    {userProfile?.profile_photo ?
                    (<img className="user-image" src={userProfile.profile_photo}></img>):
                    (<img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
                        className="user-pic-placeholder"
                    >
                    </img>)}
                </div>
                <div className="details-container">
                    <h1 className="user-name">{userProfile.username}</h1>
                    {/* <h3>Following: {userProfile.num_followers}</h3>
                    <h3>Followers: {userProfile.num_follows}</h3> */}
                    <h5>{userProfile.bio}</h5>

                    <FollowingModal className="ajw" user={currentUser} Author={userProfile} />
                    <FollowsModal className="ajw" user={currentUser} Author={userProfile} />
                </div>
                { currentUser?.id === userProfile.id &&
                <div className="options-container">
                <Link to="/new-story" className="write-link">Write</Link>
                <EditProfileModal/>
                </div>
                }
            </div>
            { stories?.map((story, i) => {
              return (
              <NavLink key={i} to={`/stories/${story.id}`} style={{ textDecoration: "none" }}>
                 <StoryPreview story={story}/>
              </NavLink>
            );
          })}

            <nav className="toggle-container">
                <div className="row">
                    {/* <div className="toggles"> */}
                        {/* <button className={userStories? "toggle-button-selected": "toggle-button"} onClick={handleStoriesPage}>Stories</button> */}
                        {/* {currentUser?.id === userProfile.id && */}
                        {/* <button className={userComments? "toggle-button-selected": "toggle-button"} onClick={handleCommentPage}>My Comments</button> } */}
                       {/* <button className={userBio? "toggle-button-selected": "toggle-button"} onClick={handleAboutPage}>About</button> */}
                    {/* </div> */}
                </div>
            </nav>
            {/* <div className="pages-container">
                {userStories? <storyProfile stories={userProfile.Stories}/> : null}
                {userComments ===  true ? <UserComments comments={userProfile.Comments} sessionUserId={currentUser.id}/>: null}
                {userBio? <UserBio bio={userProfile.bio}/> : null }
            </div> */}
        </div>
    );
};
export default UserProfile;
