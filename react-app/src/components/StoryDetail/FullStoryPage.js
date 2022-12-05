import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSingleStory } from "../../store/stories";
import OneStory from "./OneStory";
import AuthorSideBar from "./AuthorSideBar";
import "./index.css";
import LoadStoryComments from "../comments/LoadStoryComments";
import VerticalNavBar from '../navbar/VerticalNavBar/VerticalNavBar.js'
import HorizontalNavBar from '../navbar/HorizontalNavBar/HorizontalNavBar.js'
function FullStoryPage() {
  const { storyId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const story = useSelector((state) => state.storyState[parseInt(storyId)])
  const dispatch = useDispatch();
  const history = useHistory();
  const commentsArr = Object.values(useSelector(state =>state.commentState.comments))
  console.log("heyheyheyheyheyhey", storyId)
  console.log("heyheyheyheyheyhey", typeof(parseInt(storyId)))
  console.log("heyheyheyheyheystory", story)
  useEffect(() => {
     dispatch(getSingleStory(parseInt(storyId)));

  }, [dispatch, storyId, commentsArr.length]);

  return (
<div>
    { sessionUser?  <VerticalNavBar />
     :<HorizontalNavBar/> }

    <div className="full-page-story-div">

      <div className="full-page-story-details-div">
        <OneStory story={story} storyId={storyId} />
      </div>


      <div className="author-side-div">
          <AuthorSideBar Author={story?.Author}/>
      </div>

      </div>
    </div>
  );
}

export default FullStoryPage;
