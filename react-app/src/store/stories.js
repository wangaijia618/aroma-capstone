//constants
const GET_ALL_STORIES = "GET_ALL_STORIES";
const GET_USER_STORIES = "GET_USER_STORIES";
const GET_FEED = "GET_FEED";
const GET_STORY_DETAILS = "GET_STORY_DETAILS";
const CREATE_STORY = "CREATE_STORY";
const UPDATE_STORY = "UPDATE_STORY";
const DELETE_STORY = "DELETE_STORY";

//ACTION CREATORS
const getStories = (stories) => {
  return {
    type: GET_ALL_STORIES,
    stories,
  };
};

const getUserStories = (stories) => {
  return {
    type: GET_USER_STORIES,
    stories,
  };
};

const getMyFeed = (stories) => {
  return {
    type: GET_FEED,
    stories,
  };
};

const getStoryDetails = (story) => {
  return {
    type: GET_STORY_DETAILS,
    story,
  };
};

const addStory = (story) => {
  return {
    type: CREATE_STORY,
    story,
  };
};

const updateStory = (story) => {
  return {
    type: UPDATE_STORY,
    story,
  };
};

const deleteStory = (storyId) => {
  return {
    type: DELETE_STORY,
    storyId,
  };
};


//Thunks

//GET ALL STORIES
export const getAllStories = () => async (dispatch) => {
  const res = await fetch("/api/stories");

  if (res.ok) {
    const data = await res.json();
    dispatch(getStories(data.Stories));
  }
  return res;
};

//GET User Stories
// export const userStories = (userId) => async (dispatch) => {
//   const res = await fetch(`/api/profiles/${userId}/`);

//   if (res.ok) {
//     const data = await res.json();
//     dispatch(getUserStories(data.Stories));
//   }
// };
//GET CURRENT user stories
export const getMyStories = () => async (dispatch) => {
  const response = await fetch("/api/stories/current")
  if (response.ok) {
      const stories = await response.json()
      dispatch(getUserStories(stories))
  }
}

//GET FEED
export const getProfileFeed = () => async (dispatch) => {
  const res = await fetch("/api/feed/myfollows");

  if (res.ok) {
    const data = await res.json();
    dispatch(getMyFeed(data.Stories));
  }
};

//Get SINGLE STORY
export const getSingleStory = (storyId) => async (dispatch) => {
  const res = await fetch(`/api/stories/${storyId}`);

  if (res.ok) {
    const story = await res.json();
    dispatch(getStoryDetails(story));
    return story;
  }

};

//CREATE STORY
export const createNewStory = (storydata) => async (dispatch) => {
  const { title, story, img } = storydata;
console.log("#####################", storydata.title)
console.log("#####################", storydata.story)
console.log("#####################", storydata.img)
  const res = await fetch("/api/stories/new-story", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
      title, story, img
    }),
  });
 console.log("###################RES", res)
  if (res.ok) {
    const newStory = await res.json();
    dispatch(addStory(newStory));
    return res;
  }
};

//UPDATE STORY
export const editStory = (storydata, id) => async (dispatch) => {
  const { title, story, img } = storydata;
  const res = await fetch(`/api/stories/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title, story, img
    }),
  })
    if (res.ok) {
      const updatedStory = await res.json();
      dispatch(updateStory(updatedStory));
      return res;
    }
};


//DELETE STORY
export const deleteAStory = (storyId) => async (dispatch) => {
  const res = await fetch(`/api/stories/${storyId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteStory(storyId));
  }

};

const initialState = {};

//Stories REDUCER
export default function storyReducer(state = initialState, action) {
  let newState = {...state };
  switch (action.type) {
    case GET_ALL_STORIES:
      action.stories.forEach((story) => newState[story.id] = story);
      console.log('@@@@@@@@@@@@@@@@@',action.stories)
      return newState;
    case GET_USER_STORIES:
      newState = {};
      action.stories.Stories.forEach((story) => newState[story.id] = story);
      return newState;
    case GET_FEED:
      let feed = {};
      action.stories.forEach((story) => feed[story.id] = story);
      // let feed = [];
      // feed = [...action.stories];
      return feed;
    case GET_STORY_DETAILS:
      newState = {}
      newState[action.story.id] = action.story;
      return newState;
    case CREATE_STORY:
      newState[action.story.id] = action.story;
      return newState;
    case UPDATE_STORY:
      newState[action.story.id] = action.story;
      return newState;
    case DELETE_STORY:
      delete newState[action.storyId];
      return newState;
    default:
      return state;
  }
}
