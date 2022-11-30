import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { thunkEditReview } from "../../store/comments"
import LoadUserComments from "./LoadUserComments"

import "./Comments.css"

const EditCommentForm = ({mycomment, showEditReview, setShowEditReview}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [editReview, setEditReview] = useState(mycomment.content)
//   const [editStars, setEditStars] = useState(myreview.stars)
  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const commentId = mycomment?.id


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setHasSubmitted(true)

    const errorsArr = []

    if (editReview.length > 1000) errorsArr.push("please enter a valid review fewer than 1000 characters long")

    setErrors(errorsArr)

    if (errorsArr.length) return

    setShowEditReview(false)

    const reviewInfo = { "content": editReview}
    const editedReview = await dispatch(thunkEditReview(reviewInfo, commentId))
      .then(()=>history.push(`/my-comments`))
      .catch(async (res) => {
        const message = await res.json()
        const messageErrors = []
        if (message) {
          messageErrors.push(message.message)
          setErrors(messageErrors)
        }
      })
    if (editedReview) history.push(`/my-comments`)
    reset()
  }

  const reset = () => {
    setEditReview("")
    setErrors([])
    setHasSubmitted(false)
  }

  return (
    <div className="edit-review-form">
      <div className="validation-errors">
        {
        hasSubmitted &&
        errors &&
        errors.map((error)=>(<div key={error}>{error}</div>))
        }
      </div>

      <form onSubmit={handleSubmit}>
      <div className="form-input-wrapper">

            <label className="review-field">
              {/* Rating:&nbsp; */}
              {/* <select
                type="number"
                value={editStars}
                onChange={(e) => setEditStars(e.target.value)}
              >
                {[1,2,3,4,5].map((num)=>(<option key={num}>{num}</option>))}
              </select> */}
              {/* <HoverStars stars={editStars} setStars={setEditStars}/> */}
            </label>
            <div className="form-input-break"></div>
            <label className="review-field">
              Review Content:
              <textarea
                type="text"
                placeholder="leave a review"
                value={editReview}
                onChange={(e) => setEditReview(e.target.value)}
              />
            </label>
        </div>

        <button
        // disabled={
        //   hasSubmitted &&
        //   errors.length > 0 ? true : false
        // }
        className="modal-submit-button"
        onClick={handleSubmit}
        >
          Update Review
        </button>

      </form>
    </div>
  )
}

export default EditCommentForm
