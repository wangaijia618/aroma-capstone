import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Link } from "react-router-dom"
import { getMyStories, acResetProducts } from "../../store/stories"
import Mystories from "./Mystories"
import "./Profile.css"
import VerticalNavBar from '../navbar/VerticalNavBar/VerticalNavBar.js'
import HorizontalNavBar from '../navbar/HorizontalNavBar/HorizontalNavBar.js'

const Profile = () => {
  //load user products
  const dispatch = useDispatch()
  const currentUser = useSelector(state=>state.session.user)
  const productsObj = useSelector(state=>state.storyState)
  const productsArr = Object.values(productsObj)

  useEffect(()=>{
    dispatch(getMyStories())
    // return () => {
    //   dispatch(acResetProducts())
    // }
  }, [dispatch]) //<<<<<

  if (!currentUser) return <Redirect to="/" />

  return (
    <div className="my-products-main">
      { currentUser?  <VerticalNavBar />
     :<HorizontalNavBar/> }
      <div className="my-products-upper">
        <div className="my-products-header">My Stories</div>
        {currentUser?.username &&
          <div className="my-products-shop">
              <span className="shop-manager-shop-name">Welcome Back! {currentUser?.username}</span>
              &nbsp;
              {/* <i className="fa-solid fa-angle-right"></i> */}
          </div>
        }
      </div>

      <div className="my-products-outer">
        <div className="my-products-inner">
          {
            productsArr.map((story) => (
              <Mystories key={story.id} story={story}/>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Profile
