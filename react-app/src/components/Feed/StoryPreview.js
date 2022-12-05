import React from "react";
import noimage from "./noimage.jpg"
function StoryPreview({ story }) {
    let CreatedDate;

    if(story?.created_at){
        const date = new Date(story?.created_at);
        const createdDay = date.getDate();
        const createdMonth = date.toLocaleString('default', { month: 'short'});
        const createdYear = date.getFullYear();
        const createdStr = `${createdDay} ${createdMonth}, ${createdYear}`;
        CreatedDate = <p className="full-story-created">{createdStr}</p>;
      }

  return (
    <div className="story-preview-container">
      <div className="text-container">
        <div className="author-container">
          <div
            className="profile-image-container"
            style={{
              backgroundImage: `url('${
                story?.Author?.profile_photo
                  ? story?.Author?.profile_photo
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
              }')`,
            }}
          ></div>
          <div className="author-name">
            {`${story?.Author?.username}`}
          </div>
        </div>
        <div className="story-text-preview-container">
          <div className="story-title-preview">
            <p className="story-title-preview-text">{story?.title}</p>
          </div>
          <div className="story-content-preview">
            <p className="story-content-preview-text">{story?.story}</p>
          </div>
        </div>
        <div className="created-date">{CreatedDate}</div>
      </div>
      <div
        className="image-container"
        /* {story?.img ?
          (<img src={story.img} />) :
          (<img src={noimage} alt="noimage" />)
        } */
         style={{ backgroundImage: `url('${story?.img}')` }}
      ></div>
    </div>
  );
}

export default StoryPreview;
