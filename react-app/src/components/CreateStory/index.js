import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewStory } from "../../store/stories.js";
// import uploadImg from "../../icons/uploadImg.png";
import "./CreateStory.css";
import VerticalNavBar from '../navbar/VerticalNavBar/VerticalNavBar.js'
import HorizontalNavBar from '../navbar/HorizontalNavBar/HorizontalNavBar.js'

function CreateStory() {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [img, setImg] = useState("");
  const [imgLoading, setImgLoading] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];

    if (title.length > 100) errors.push("Title must not exceed 100 characters");
    else if (title.length < 1)
      errors.push("Please provide a title for your story.");
    if (story.length > 5000)
      errors.push("Story must not exceed 5000 characters");
    else if (story.length < 1)
      errors.push("Please provide a story to publish.");
    if (!img) errors.push("Please provide an image for your story.");
    else if(!img.includes('https://'))
      errors.push("Please provide one image with 'https://'");
    else if(!img.includes('jpeg') && !img.includes('jpg') && !img.includes('png'))
      errors.push('Provide a valid image url')

    setErrors(errors);
  }, [title, story, img]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.length > 0) {
      return
  }
    let newStory = {
        user_id: Number(sessionUser.id),
        title,
        story,
        img
    }
    console.log("NNNNNNNNNNNNew Story", newStory)
    const data = await dispatch(createNewStory(newStory));
    history.push('/')
    // if (data) {
    //   setErrors(data);
    // }
  }

//   const updateImage = (e) => {
//     const file = e.target.files[0];
//     setImg(e.target.value);
//   };

  if(!sessionUser){
    return null
}
  return (
    <div>
      { sessionUser?  <VerticalNavBar />
    :<HorizontalNavBar/> }
    <div className="story-form-container">
      <form onSubmit={handleSubmit}>
        <div className="story-form-top-div">
          <div className="story-form-top-div-left">
            <p className="draft-in-user">Draft in {sessionUser.username}</p>
            <p className="new-story-edit-story-text">Creating...</p>
          </div>
          <div className="story-form-top-div-right">
            <button className="publish-btn" type="submit">
              Publish
            </button>
          </div>
        </div>
        <div className="story-form">
          <input
            name="title"
            className="story-form-inputs"
            id="story-form-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={"Title"}
            required
          ></input>

          <div className="upload-and-story-cntner">

            <textarea
              name="story"
              className="story-form-inputs"
              id="story-form-story"
              type="text"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder={"Tell your story..."}
              required
            ></textarea>

              <input
                name="img"
                className="img-inputs"
                type="text"
                placeholder={"upload image"}
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              ></input>

          </div>

          <div className="form-btm-text-and-errors-div">
            {!errors.includes("Please provide one image with 'https://'") &&
            !errors.includes("Provide a valid image url") &&
            img ? (
              <p
                className="form-btm-text-and-errors"
                id="img-upload-successful"
              >
                Image upload successful!
              </p>
            ) : null}
            <ul
              className="story-errors"
              style={{ listStyleType: "none", padding: "0px" }}
            >
              {errors?.map((error, idx) => (
                <li
                  className="form-btm-text-and-errors"
                  id="story-errors-li"
                  key={idx}
                >
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}

export default CreateStory;
