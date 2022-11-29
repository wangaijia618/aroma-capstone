import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteAStory } from "../../store/stories"
// import EditProduct from "../EditProduct"
// import noimage from "./noimage.jpg"
import "./Profile.css"
import { useState } from "react"
// import { Modal } from "../../context/Modal"
// import { FaStar } from "react-icons/fa"

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
          {story?.img?
            (<img src={story?.img} />)
            :(<img alt="noimage" />)
          }
        </Link>

      </div>

      <div className="myproducts-product-info">
        <div>
          <div className="myproducts-product-category">
            {story?.Author?.username}
          </div>
          <div className="myproducts-product-name">
            {/* {product.name} */}
            {story?.title}
          </div>
        </div>

        <div>
          {/* <div className="myproducts-product-price">
            ${parseFloat(product.price).toFixed(2)}
          </div> */}
          <div className="myproducts-product-stock">
            {story?.story} left in stock
          </div>
        </div>

      </div>

      <div className="myproduct-buttons-container">
        {/* {seller && (
          <> */}
          {/* <Link to={`/edit-product/${product.id}`}>
            <button className="myproduct-buttons">
              Edit
            </button>
          </Link> */}
          {/* <button className="myproduct-buttons" onClick={() => editProductHandleClick(product?.id)}> Edit </button>
          <div>
            {showEditForm && (
              <Modal onClose={() => setShowEditForm(false)}>
                <EditProduct productId={productId} setShowEditForm={setShowEditForm} />
              </Modal>
            )} */}
          </div>
          <button
          className="myproduct-buttons"
          onClick={deleteProductHandleClick}>
            Delete
          </button>
          {/* </>
        )} */}
      </div>
    // </div>
  )
}

export default Mystories
