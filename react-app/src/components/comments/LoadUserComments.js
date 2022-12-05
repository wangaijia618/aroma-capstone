import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { getUserComments } from "../../store/comments"
import MyComments from "./MyComments"
import VerticalNavBar from '../navbar/VerticalNavBar/VerticalNavBar.js'
import HorizontalNavBar from '../navbar/HorizontalNavBar/HorizontalNavBar.js'

const LoadUserComments = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state)=>state.session.user)
  const reviewsObj = useSelector((state) => state.commentState.comments) // {1:{x}, 2:{y}, 3:{z}}
  const commentsArr = Object.values(reviewsObj) // [{x}, {y}, {z}]
// console.log("RRRRRRRRRRRRRRRReviewsObj", reviewsObj)
  useEffect(()=>{
    dispatch(getUserComments())
  }, [dispatch, currentUser,
    // reviewsObj])
    commentsArr.length])

  if (!currentUser) return <Redirect to="/" />

  return (
    <div className="my-reviews-main">
        { currentUser?  <VerticalNavBar />
     :<HorizontalNavBar/> }
      <div className="my-reviews-upper">
        <div className="my-reviews-header">My Comments</div>
        {currentUser?.username &&
          <div className="my-reviews-name">
              <span>{currentUser?.username}</span>
              &nbsp;
          </div>
        }
      </div>
      {/* <div>
        {
          reviewsArr.length === 0 ?
          (<>
            <h4>You Don't Have Any Reviews!</h4>
          </>):
          <h1></h1>
        }
      </div> */}

      <div className="my-reviews-outer">
        <div className="my-reviews-inner">
          {
            commentsArr.map((comment) => (
              <MyComments key={comment.id} comment={comment} user={currentUser}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default LoadUserComments
