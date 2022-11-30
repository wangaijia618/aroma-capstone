import React, { useState } from "react"
import { Modal } from "../../../context/Modal"
import CreateComment from "./CreateComment"

import "./CreateComment.css"

const CreateCommentModal = ({storyId, showNewReviewModal, setShowNewReviewModal}) => {

  return (
    <div className="create-review-modal-wrap">
      <button
      className="create-review-button"
      // onClick={() => setShowModal(true)}>
      onClick={() => setShowNewReviewModal(true)}>
        Leave a Comment
      </button>


      {showNewReviewModal && (
        <Modal onClose={() => setShowNewReviewModal(false)}>

          <CreateComment
            onCreation={() => setShowNewReviewModal(false)}
            storyId={storyId}
            setShowNewReviewModal={setShowNewReviewModal}
          />

        </Modal>
      )}

    </div>
  )
}

export default CreateCommentModal
