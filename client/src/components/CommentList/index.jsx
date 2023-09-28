import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../../utils/mutations';

const CommentList = ({ comments = [], thoughtId  }) => {
    const [deleteComment] = useMutation(DELETE_COMMENT);
  
    const handleDeleteComment = async (commentId) => {
      console.log(commentId)
      console.log(thoughtId)
    try {
        await deleteComment({
          variables: {
            thoughtId,
            commentId
          },
        });

  
      } catch (error) {
        console.error(error);
      }

    }; 
  
  
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
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
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
                <button
                className="delete-button"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};



export default CommentList;
