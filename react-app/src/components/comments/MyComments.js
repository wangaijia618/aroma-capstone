import { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserComments, thunkRemoveReview } from "../../store/comments"
import EditCommentForm from "./EditCommentForm"
import "./Comments.css"

const MyComments = ({comment, user}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [showEditReview, setShowEditReview] = useState(false)

  const deleteReviewHandleClick = async () => {
    if (window.confirm("Are you sure you want to remove this comment?")){
      await dispatch(thunkRemoveReview(comment?.id))
    }
  }

  useEffect(()=>{
    dispatch(getUserComments())
  }, [dispatch])


  if (!comment) return null

  return (
    <div className="myreviews-review-container">
      <div div className="myreviews-image-container">
        <Link style={{ textDecoration: "none", color: "black" }} to={`/stories/${comment?.Story?.id}`}>
          <img src={comment?.Story?.img} />
        </Link>
        <div className="review-button-wrap">
          <span>
            <button
            className="review-button"
            // onClick={()=>history.push(`/products/${review?.Product.id}/edit-review`)}>
            onClick={()=>setShowEditReview(!showEditReview)}>
              Edit
            </button>
          </span>
          <span>
            <button
            className="review-button"
            onClick={deleteReviewHandleClick}>
              Delete
            </button>
          </span>
        </div>
      </div>

      <div className="my-single-info">
        <div className="my-single-header">
          Review For
          <div className="my-single-product-name">
          <Link style={{ textDecoration: "none", color: "black" }} to={`/stories/${comment?.Story?.id}`}>
                {comment?.Story?.title}
          </Link>
          </div>
        </div>
        <div className="my-single-stats">
          <div className="my-single-review-date">
          <Link style={{ textDecoration: "none", color: "black" }} to={`/stories/${comment?.Story?.id}`}>
              {new Date(comment?.createdAt).toString().slice(3,-42)}
          </Link>
          </div>
          {!showEditReview &&
          <>
            {/* <div className="my-single-rating">
                {
                  [...Array(review?.stars)].map((star) => (<i className="fa-solid fa-star"></i>))
                }
            </div> */}
            <div className="my-single-review">
              {/* <i className="fa fa-quote-left fa-lg" aria-hidden="true"></i> */}
                {comment?.content}
              {/* <i className="fa fa-quote-right fa-lg" aria-hidden="true"></i> */}
            </div>
          </>
          }
        </div>

        <div>
          {showEditReview &&
              <EditCommentForm
                mycomment={comment}
                showEditReview={showEditReview}
                setShowEditReview={setShowEditReview}
                />
          }
        </div>
      </div>
    </div>
  )
}

export default MyComments
