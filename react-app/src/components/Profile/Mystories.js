import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteAStory } from "../../store/stories"
import EditStory from "../EditStory"
import noimage from "./noimage.jpg"
import "./Profile.css"
import { useState } from "react"
import { Modal } from "../../context/Modal"
// import { FaStar } from "react-icons/fa"
import StoryPreview from "../Feed/StoryPreview";


const Mystories = ({ story }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  //verify if currentUser is seller of product
  const currentUser = useSelector((state) => state.session.user)
  let seller = false
  if (currentUser?.id === story.user_id) seller = true

  //handle delete product click
  const deleteProductHandleClick = async () => {
    if (window.confirm("Are you sure you want to delete this Story?")) {
      await dispatch(deleteAStory(story.id))
    }
  }

  //handle edit product click
  const [storyId, setStoryId] = useState()
  const [showEditForm, setShowEditForm] = useState(false)

  const editProductHandleClick = (id) => {
    setStoryId(id)
    setShowEditForm(true)
  }

  return (
    <div className="myproducts-product-container">


      <div className="myproducts-product-image-container">
      <Link style={{ textDecoration: "none", color: "black" }} to={`/stories/${story.id}`}>
        <StoryPreview story={story}/>
        </Link>
        {/* <Link style={{ textDecoration: "none", color: "black" }} to={`/stories/${story.id}`}>
          {story?.img?
            (<img src={story?.img} />)
            :(<img src={noimage} alt="noimage" />)
          }
        </Link>

      </div>

      <div className="myproducts-product-info">
        <div>
          <div className="myproducts-product-title">
            {story?.title}
          </div>
          <div className="myproducts-product-story">
            {story?.story}
          </div>
        </div> */}

        {/* <div>
          <div className="myproducts-product-price">
            ${parseFloat(product.price).toFixed(2)}
          </div>
          <div className="myproducts-product-stock">
            {story?.story}
          </div>
        </div> */}

      </div>

      <div className="myproduct-buttons-container">
        {seller && (
          <>
          {/* <Link to={`/stories/${story.id}`}>
            <button className="myproduct-buttons">
              Edit
            </button>
          </Link> */}
           <button className="myproduct-buttons" onClick={() => editProductHandleClick(story?.id)}> Edit </button>
          <div>
            {showEditForm && (
              <Modal onClose={() => setShowEditForm(false)}>
                <EditStory storyId={storyId} setShowEditForm={setShowEditForm} />
              </Modal>
            )}
          </div>
          <button
          className="myproduct-buttons"
          onClick={deleteProductHandleClick}>
            Delete
          </button>
           </>
        )}
      </div>
     </div>
  )
}

export default Mystories
