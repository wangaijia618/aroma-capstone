//constants
const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS';
const GET_ALL_REPLIES = 'GET_ALL_REPLIES'
const SINGLE_COMMENT = 'GET_SINGLE_COMMENT'
const CREATE_COMMENT = 'CREATE_COMMENT';
const CREATE_REPLY = 'CREATE_REPLY';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const LOAD_USER_COMMENTS = "LOAD_USER_COMMENTS"

//ACTION CREATORS
const getComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        comments
    }
};

const getReplies = (replies, parentId) => {
  return {
      type: GET_ALL_REPLIES,
      replies,
      parentId
  }
};

const getSingleComment = (comment) => {
    return {
        type: SINGLE_COMMENT,
        comment
    };
};

const addComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment,
    }
};

const addReply = (reply, parentId) => {
  return {
      type: CREATE_REPLY,
      reply,
      parentId
  }
};

// const updateComment = (comment, parentId) => {
//     return {
//         type: UPDATE_COMMENT,
//         comment,
//         parentId
//     }
// };

// const deleteComment = (commentId, parentId) => {
//     return {
//         type: DELETE_COMMENT,
//         commentId,
//         parentId
//     }
// };
const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
};
const deleteComment = (commentId) => {
        return {
            type: DELETE_COMMENT,
            commentId
        }
    };
const acLoadUserReviews = (comments) => {
    return {
      type: LOAD_USER_COMMENTS,
      comments
    }
  }

//Thunks

    //GET ALL Comments
export const getAllComments = (storyId) => async (dispatch) => {
    const res = await fetch(`/api/stories/${storyId}/comments`);
    if(res.ok){
        const comments = await res.json();
        dispatch(getComments(comments));
    }
    return res;
};

    //GET ALL Replies
    export const getAllReplies = (commentId) => async (dispatch) => {
      const res = await fetch(`/api/comments/${commentId}/replies`);

      if(res.ok){
          const replies = await res.json();
          dispatch(getReplies(replies, commentId));
      }
      return res;
  };

//SINGLE COMMENT
export const getComment = (commentId) => async(dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`)

    if(res.ok){
        const comment =  await res.json();
        dispatch(getSingleComment(comment))
    };
};
// load all user reviews thunk
export const getUserComments = () => async (dispatch) => {
    const response = await fetch("/api/comments/current")
    if (response.ok) {
      const data = await response.json() //object
    //   const reviewsArr = data.Comments //array [{}, {}]
      dispatch(acLoadUserReviews(data))
    //   return data
    }
  }
    //CREATE Comment
export const createComment = (comment, storyId) => async(dispatch) =>  {
    const {content} =  comment;
    // console.log("#####################", content)
    // console.log("#####################", storyId)
    const res = await fetch(`/api/stories/${storyId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            content
        })
    });
// console.log("RRRRRRRRRRRRRRRRes", res)
    if(res.ok){
        const newComment = await res.json();
        dispatch(addComment(newComment));
        return res
    }
};

    //CREATE Reply
export const createReply = (comment, commentId) => async(dispatch) =>  {
  const {content} = comment;

  const res = await fetch(`/api/comments/${commentId}/replies`, {
      method: 'POST',
      body: JSON.stringify({
          content
      })
  });

  if(res.ok){
      const newComment = await res.json();
      dispatch(addReply(newComment, commentId));
      return res
  }
};

//     //UPDATE Comment
// export const editComment = (comment, commentId, parentId) => async(dispatch) =>  {
//     const {content} = comment;
//     const res = await fetch(`/api/comments/${commentId}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//           content
//         }),
//     });

//     if(res.ok){
//         const updatedComment = await res.json();
//         dispatch(updateComment(updatedComment, parentId));
//         return res
//     }
// };


//     //DELETE Comment
// export const deleteAComment = (commentId, parentId) => async (dispatch) => {
//     const res = await fetch(`/api/comments/${commentId}`, {
//         method: 'DELETE'
//     });
//     const response = await res.json();
//     if(res.status === 200){
//         dispatch(deleteComment(commentId, parentId));
//     }
//     return response;
// };
// update review thunk
export const thunkEditReview = (myreview, reviewId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${reviewId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(myreview)
    })
    if (response.ok) {
      const review = await response.json()
      dispatch(updateComment(review))
      return review
    }
  }

  // delete review thunk
  export const thunkRemoveReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${reviewId}`, {
      method: "DELETE"
    })
    if (response.ok){
      dispatch(deleteComment(reviewId))
    }
  }

const initialState = {comments: {}, replies: {}};

//Comments REDUCER
export default function commentsReducer(state = initialState, action){
    let newState = {comments: {...state.comments}, replies: {...state.replies}}
    switch(action.type){
        case  GET_ALL_COMMENTS:
            newState.comments = {}
            action.comments.Comments.forEach((comment) => newState.comments[comment.id] = comment);
            newState.replies = {}
            return newState
        case  GET_ALL_REPLIES:
            newState.replies[action.parentId] = action.replies
            return newState
        case SINGLE_COMMENT:
            const {comment} = action;
            if(comment.parent_id) {
              newState.replies[comment.parent_id].replies[comment.id] = comment;
            } else {
              newState.comments[comment.id] = comment;
            }
            return newState;
        case CREATE_COMMENT:
            newState.comments[action.comment.id] = action.comment
            return newState;
        case CREATE_REPLY:
            newState.replies[action.parentId].replies[action.reply.id] = action.reply
            return newState;
        // case UPDATE_COMMENT:
        //     if(action.parentId && newState.replies[action.parentId]) {
        //       newState.replies[action.parentId].replies[action.comment.id] = action.comment;
        //     } else if(newState.comments[action.comment.id]) {
        //       newState.comments[action.comment.id] = action.comment;
        //     }
        //     return  newState;
        // case DELETE_COMMENT:
        //   if(action.parentId && newState.replies[action.parentId]) {
        //     delete newState.replies[action.parentId].replies[action.commentId]
        //   } else if(newState.comments[action.commentId]) {
        //     delete newState.comments[action.commentId]
        //   }
        //     return newState;

        case LOAD_USER_COMMENTS:
            newState.comments = {}
            //payload = reviews = [{}, {}]
            action.comments.Comments.forEach((comment) => newState.comments[comment.id] = comment)
            // newState.user = normalizedUserReviews
            // newState.product = {}
            return newState
            case UPDATE_COMMENT:
            // newState = {...state}
            // newState.product = {...state.product}
            // newState.user = {...state.user}
            newState.comments[action.comment.id] = action.comment
            // newState.user[action.review.id] = action.review
            return newState

        case DELETE_COMMENT:
            // newState = {...state}
            // newState.product = {...state.product}
            // newState.user = {...state.user}
            delete newState.comments[action.commentId]
            // delete newState.user[action.reviewId]
            return newState

        default:
            return state;
        };
};
