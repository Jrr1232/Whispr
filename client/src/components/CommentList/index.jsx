import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from '../../utils/mutations';


const CommentList = ({ comments = [], whisprId}) => {
  const [removeComment] = useMutation(REMOVE_COMMENT);
  
  const handleDeleteComment = async (commentId) => {
    console.log(commentId)
    console.log(whisprId)
  try {
      await removeComment({
        variables: {
          whisprId,
          commentId
        },
      });


    } catch (error) {
      console.error(error);
    }

  }; 
  if (!comments.length) {
    return <h3>no comments yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.commentAuthor.toLowerCase()} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt.toLowerCase()}
                  </span>
                </h5>
<<<<<<< HEAD
                <p className="card-body">{comment.commentText.toLowerCase()}</p>
=======
                <p className="card-body">{comment.commentText}</p>
                <button
                className="delete-button"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </button>
>>>>>>> origin/main
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
