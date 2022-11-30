import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editStory, getAllStories } from "../../store/stories";
import "./EditStory.css"
import { getMyStories } from "../../store/stories";



const EditStory = ({ storyId, setShowEditForm}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const storyObj = useSelector((state)=> state.storyState[storyId])
    const [title, setTitle] = useState(storyObj?.title);
    const [story, setStory] = useState(storyObj?.story);
    const [img, setImg] = useState(storyObj?.img);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        // dispatch(getMyStories()) add dispatch in [] line 31
        const errors = []
        if (title.length > 100) errors.push("Title: Title must not exceed 100 characters");
        else if (title.length < 1)
            errors.push("Title: Please provide a title for your story.");
        if (story.length > 5000)
             errors.push("Story: Story must not exceed 5000 characters");
        else if (story.length < 1)
            errors.push("Story: Please provide a story to publish.");
        if (!img) errors.push("Image: Please provide an image for your story.");
        setErrors(errors)
        }, [ title, story, img])

    const editSubmit = async(e) => {
        e.preventDefault()
        if (errors.length > 0) return

        const payload = {title, story, img}

        const response = await dispatch(editStory(payload, storyId))
        if (response) setShowEditForm(false)
        // history.push(`/store-manager`)
    }

    return (
        <div className='editproduct-wrapper'>
            <div className='editproduct-form-title'>Edit Story</div>
            <form className='editproduct-form' onSubmit={editSubmit}>
                {/* <div className='eidtproduct-errors'>
                    <ul>
                        {errors && errors.map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div> */}
                <div className='editproduct-content'>
                        <label className='editproduct-label'>
                            <span className="editproduct-title">Title * </span>
                            {/* <span className="editproduct-sub-title">Update the keywords used to search for your item.</span> */}
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Title')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <input className='editproduct-input'
                                type="text"
                                value={title}
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <br></br>
                        {/* <label className='editproduct-label'>
                            <span className="editproduct-title">Category* </span>
                            <span className="editproduct-sub-title">Change the category your product is listed under.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Category')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <select
                                htmlFor='category'
                                name='category'
                                className='editproduct-input-select'
                                required
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            <option disabled selected value={category}>-- Select a Category --</option>
                                {categories.map((category) => {
                                    return (
                                        <option
                                            value={category}
                                        >{category}</option>)
                                })}
                    </select>
                        </label>*/}
                        {/* <br></br>
                        <label className='editproduct-label'>
                            <span className="editproduct-title">Price* </span>
                            <span className="editproduct-sub-title">Update the price of your product.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Price')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <input className='editproduct-input'
                                type="text"
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        <br></br>*/}
                        <label className='editproduct-label'>
                            <span className="editproduct-title">Image * </span>
                            {/* <span className="editproduct-sub-title">Update the stock of your product.</span> */}
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Image')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <input className='editproduct-input'
                                type="text"
                                value={img}
                                required
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label className='editproduct-label'>
                            <span className="editproduct-title">Story * </span>
                            {/* <span className="editproduct-sub-title">Modify the description of your product.</span> */}
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Story')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <textarea className='editproduct-input-description'
                                type="text"
                                value={story}
                                required
                                onChange={(e) => setStory(e.target.value)}
                            />
                        </label>
                        <br></br>
                    <button className="editproduct-button" type="submit">Edit</button>
                </div>
            </form>
        </div>
    )
}

export default EditStory;
