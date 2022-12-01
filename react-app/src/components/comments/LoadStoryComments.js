import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllComments } from "../../store/comments"
// import EditReviewForm from "./EditReviewForm"
import"./comments.css"

  const LoadStoryComments = ({ storyId }) => {
  const dispatch = useDispatch()
  const productReviews = useSelector((state)=>state.commentState.comments) //normalized obj
  const reviewsArr = Object.values(productReviews) //array
//   const [showEditReview, setShowEditReview] = useState(false)
    console.log("AAAAAAAAAAAAAAAreview", productReviews)
    console.log("AAAAAAAAAAAAAAAreview", reviewsArr)

  useEffect(() => {
    dispatch(getAllComments(storyId))
  }, [dispatch, storyId])

  if (!reviewsArr.length) return null

  return (
    <>
      {/* [{},{}], each {} is:
      { id, userId, productId, review, stars,
        User: { id, firstName, lastName } } */}

      {
        reviewsArr?.map((review)=>(
           <div key={review?.id}>
          <div className="single-review">
            <div className="single-review-name" >{review?.User?.username}</div>
            <div className="my-single-review-date">
              {new Date(review.createdAt).toString().slice(3,-42)}
            </div>

            <p className="single-review-review">
              {/* <i className="fa fa-quote-left fa-lg" aria-hidden="true"></i> */}
              <span>
                {review?.content}
              </span>
              {/* <i className="fa fa-quote-right fa-lg" aria-hidden="true"></i> */}
            </p>

            {/* {
              review?.userId==user?.id &&
              <div className="product-review-button-wrap">
               <span>
                  <button
                  className="product-review-button"
                  onClick={()=>setShowEditReview(!showEditReview)}
                  >
                    Edit
                  </button>
                </span>
                 <span>
                  <button
                  className="product-review-button"
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to remove this review?")){
                      await dispatch(thunkRemoveReview(review?.id))
                    }
                  }}
                  >
                    Delete
                  </button>
                </span>
              </div>
              }
               {
                showEditReview &&
                review?.userId==user.id &&
                <EditReviewForm
                  myreview={review}
                  showEditReview={showEditReview}
                  setShowEditReview={setShowEditReview}
                />
              }  */}
              </div>
          </div>
        ))
      }
    </>
  )
}

export default LoadStoryComments
