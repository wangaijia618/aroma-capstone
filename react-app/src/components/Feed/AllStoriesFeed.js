import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllStories } from "../../store/stories"
import StoryPreview from "./StoryPreview";
import "./AllStoriesFeed.css";

function AllStoriesFeed() {
    const dispatch = useDispatch();
    const stories = Object.values(useSelector((state) => state.storyState));
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        dispatch(getAllStories());
        setLoaded(true);
    }, [dispatch]);


    if (!loaded) {
      return null;
    }


    return (
      <div className="feed-div">
    {/* <div className="all-stories-title">All Stories</div> */}
        <div className="feed-preview-stories">

          {loaded && stories?.map((story, i) => {
              return (
              <NavLink key={i} to={`/stories/${story.id}`} style={{ textDecoration: "none" }}>
                 <StoryPreview story={story}/>
              </NavLink>
            );
          })}
        </div>
      </div>
    );
}

export default AllStoriesFeed;
