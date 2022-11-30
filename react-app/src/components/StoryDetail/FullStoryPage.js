import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSingleStory } from "../../store/stories";
import OneStory from "./OneStory";
import AuthorSideBar from "./AuthorSideBar";
import "./index.css";
import LoadStoryComments from "../comments/LoadStoryComments";

function FullStoryPage() {
  const { storyId } = useParams();
  // const storyId = parseInt(Id)
  const story = useSelector((state) => state.storyState.[+storyId])
  const dispatch = useDispatch();
  const history = useHistory();
  const commentsArr = Object.values(useSelector(state =>state.commentState.comments))
  console.log("heyheyheyheyheyhey", storyId)
  // console.log("heyheyheyheyheyhey", typeof(storyId))
  console.log("heyheyheyheyheystory", story)
  useEffect(async() => {
    dispatch(getSingleStory(storyId));

  }, [dispatch, storyId, commentsArr.length]);

  return (
    <div className="full-page-story-div">
      <div className="full-page-story-details-div">
        <OneStory story={story} storyId={storyId} />
      </div>

      <div className="author-side-div">
          <AuthorSideBar Author={story?.Author}/>
      </div>
     <div className="story-review-section">
        <div className="one-story-comments-container">
                <LoadStoryComments storyId={storyId}/>
            </div>
            </div>

    </div>
  );
}

export default FullStoryPage;
