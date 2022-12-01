import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import EditStoryBtn from "../StoryComponent/EditStory/EditStoryBtn";
import { useHistory, NavLink } from "react-router-dom";
// import LikeStory from "../util/LikeButton/LikeStory/index"
// import Ellipse from "../util/EditEllipses/index";
// import CommentsButton from "../comments/CommentsButton";
import LoadStoryComments from "../comments/LoadStoryComments";
import "./index.css"
import "../comments/comments.css"
import CreateCommentModal from "../comments/CreateCommentModal"


function OneStory({ story, storyId }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [showNewReviewModal, setShowNewReviewModal] = useState(false)
  let EditedDate;
  let CreatedDate;
  let StoryImg;
  let editStoryBtn;

//   if(sessionUser){
//     if (sessionUser.id === story?.user_id) {
//       editStoryBtn = <Ellipse story={story} />;
//     }
//   }
  let writer = false
  if (sessionUser?.id == story?.user_id) writer = true

  if (story?.updated_at !== story?.created_at) {
    const editedDate = new Date(story?.updated_at);
    const editedDay = editedDate.getDate();
    const editedMonth = editedDate.toLocaleString("default", {
      month: "short",
    });
    const editedYear = editedDate.getFullYear();
    const editedStr = `${editedDay} ${editedMonth}, ${editedYear}`;
    EditedDate = <p className="full-story-edited">- Edited: {editedStr}</p>;
  }

  if (story?.created_at) {
    const date = new Date(story?.created_at);
    const createdDay = date.getDate();
    const createdMonth = date.toLocaleString("default", { month: "short" });
    const createdYear = date.getFullYear();
    const createdStr = `${createdDay} ${createdMonth}, ${createdYear}`;
    CreatedDate = <p className="full-story-created">{createdStr}</p>;
  }

  if (story?.img !== "" && story?.img !== null) {
    StoryImg = (
      <div
        className="full-story-image-container"
        style={{ backgroundImage: `url('${story?.img}')` }}
      ></div>
    );
  }


  return (
    <>
    {/* {sessionUser && <VerticalNavNar/>} */}
    <div className="full-story-container">
      <div className="full-story-heading-container">
        <div className="full-story-author-container">
        {/* <NavLink to={`/profiles/${story?.Author?.id}`} style={{ textDecoration: "none" }}> */}
          <div
            className="full-story-profile-image-container"
            style={{
              backgroundImage: `url('${
                story?.Author?.profile_photo
                  ? story?.Author?.profile_photo
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
              }')`,
            }}
          ></div>
           {/* </NavLink> */}
          <div className="full-story-next-to-profile-pic">
          {/* <NavLink to={`/profiles/${story?.Author?.id}`} style={{ textDecoration: "none" }}> */}
            <div className="full-story-author-name">
              {`${story?.Author?.username}`}
            </div>
            {/* </NavLink> */}
            <div className="full-story-dates">
              {CreatedDate}
              {EditedDate}
            </div>
          </div>
          {/* {story && sessionUser && sessionUser.id === story?.user_id ? (
            <Ellipse story={story} />
          ) : null} */}
        </div>
      </div>
      <div className="full-story-title">
        <p className="full-story-title-text">{story?.title}</p>
      </div>
      {StoryImg}
      <div className="full-story-text-container">
        <div className="full-story-content">
          <p className="full-story-content-text">{story?.story}</p>
        </div>
      </div>
      <div className="story-reactions-container">
        <div className="likes-count">
          {/* <LikeStory story={story} storyId={storyId} /> */}
        </div>
        {/* <span className="reactions">{story?.num_likes} likes</span> */}
        {/* <div className="comment-count"> */}
          {/* <CommentsButton id={storyId} /> */}
        {/* </div> */}
        <span className="reactions"><i className="fa-regular fa-comment"></i>
          &nbsp; {story?.num_comments}</span>
</div>
<div>




                {
                sessionUser &&
                !writer &&
                // !story.comment.includes(sessionUser.id) &&
                // (<div>
                //     <button
                //         className="create-new-review-button"
                //         onClick={()=>history.push(`/products/${productId}/new-review`)}
                //     >
                //         Create a new review
                //         {/* <CreateReviewForm productId={productId}/> */}
                //     </button>
                // </div>)
                <CreateCommentModal
                    storyId={storyId}
                    showNewReviewModal={showNewReviewModal}
                    setShowNewReviewModal={setShowNewReviewModal}
                />
                }
                <div className="story-review-section">
        <div className="one-story-comments-container">
                <LoadStoryComments storyId={storyId}/>
            </div>
            </div>
            </div>


    </div>
    </>
  );
}

export default OneStory;
