import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createComment } from "../../../store/comments"


import "./CreateComment.css"

const CreateComment = ({storyId, setShowNewReviewModal}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [content, setContent] = useState("")

  const [errors, setErrors] = useState([])

  const [hasSubmitted, setHasSubmitted] = useState(false)

  const currentUser = useSelector((state) => state.session.user)

  // const commentsArr = useSelector((state => state.commentState))
  // console.log("??????????????????????",commentsArr)

  useEffect(() => {
    if (currentUser) setErrors([])
    else setErrors(["You must be logged in to leave a review"])
  }, [currentUser])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    // setHasSubmitted(true)

    const errorsArr = []
    if (content?.length > 1000) errorsArr.push("please enter a valid review fewer than 1000 characters long")
    // if (content?.length < 5) errorsArr.push("please enter a valid review more than 5 characters long")
    setErrors(errorsArr)

    if (errorsArr.length) return

    const reviewInfo = { content: content }
// console.log("RRRRRRRRRRRRRRRReviewinfo", reviewInfo)
console.log("RRRRRRRRRRRRRRRcontent", content)
    const newReview = await dispatch(createComment(reviewInfo, +storyId))
    // if (newReview) {
    //     setErrors(Object.values(newReview));
    //   } else {

    //     setErrors([]);

    //   }

    if (newReview) setShowNewReviewModal(false)
    reset()
    // history.push(`/stories/${storyId}`) //<<<<<
  }

  const reset = () => {
    setContent("")
    setErrors([])
    setHasSubmitted(false)
  }

  return (
    <div className="create-review-modal-whole">
      <div className="review-modal-subheader">What do you think about this story?</div>

      <div className="validation-errors">
        {
        hasSubmitted &&
        errors &&
        errors.map((error, ind)=>(<div key={ind}>{error}</div>))
        }
      </div>

      {/* <div className="create-review-form"> */}
      <form onSubmit={handleSubmit}>
      <div className="create-form-input-wrapper">

            {/* <label className="create-review-field">
              Rating:&nbsp; */}
              {/* <select
                type="number"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              >
                {[1,2,3,4,5].map((num)=>(<option>{num}</option>))}
              </select> */}
              {/* <div className="create-hover">
                <HoverStars stars={stars} setStars={setStars}/>
              </div> */}
            {/* </label> */}
            {/* <div className="form-input-break"></div> */}
            <label className="review-field">
              Comment:
              <textarea
                type="text"
                value={content}
                placeholder="Review Content"
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </label>
        </div>
        <div className="create-modal-button-wrap">
        <button
        // disabled={
        //   hasSubmitted &&
        //   errors.length > 0 ? true : false
        // }
        className="modal-submit-button"
        >
          Create Review
        </button>
        </div>

      </form>
      </div>
    // </div>
  )
}

export default CreateComment
