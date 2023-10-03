import { Link } from 'react-router-dom';
import React, { useState } from 'react'; 
import { useMutation } from '@apollo/client';
import { REMOVE_WHISPR, UPDATE_WHISPR } from '../../utils/mutations';
import Auth from '../../utils/auth';

const WhisprList = ({
  whisprs,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  let loggedInUser;

  if (Auth.loggedIn()) {
    loggedInUser = Auth.getProfile().authenticatedPerson.username;
    if (loggedInUser) {
    } else {
      console.log("no user loggedIn");
    }
  }

  const [removeWhispr] = useMutation(REMOVE_WHISPR);

  const handleDeleteWhispr = async (whisprId) => {
    try {
      console.log(whisprId);
      const { data } = await removeWhispr({
        variables: {
          whisprId,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const showEditForm = async () => {
    document.getElementById('edit-whisper-form').style.display = "block"
  }

  const [editedWhispr, setEditedWhispr] = useState(''); 
  const [updateWhispr] = useMutation(UPDATE_WHISPR);

  const handleUpdateWhispr = async (whisprId, editedWhispr) => {
    try {
    if (!editedWhispr.trim()) {
      alert("Whispr cannot be empty.");
      return; 
    }
      const whisprText = editedWhispr.toLowerCase()
      console.log(whisprId);
      console.log(editedWhispr);

      const { data } = await updateWhispr({
        variables: {
          whisprId,
          whisprText: editedWhispr.toLowerCase(),
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (!whisprs.length) {
    return <h3>no whisprs yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      <div id="edit-whisper-form">
        <h4>edit Whispr</h4>
      <textarea
                  id="edited-whispr"
                  value={editedWhispr}
                  placeholder='New Whispr'
                  onChange={(e) => setEditedWhispr(e.target.value)}
                ></textarea>
                
                </div>
      {whisprs &&
        whisprs.map((whispr) => (
          <div key={whispr._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <>
                  <Link
                    className="text-light"
                    to={`/profiles/${whispr.whisprAuthor}`}
                  >
                    {whispr.whisprAuthor} <br />
                    <span style={{ fontSize: '1rem' }}>
                      whispred on {whispr.createdAt}
                    </span>
                    
                  </Link>
                  <span style={{ float: 'right' }}>
                    <Link to={whispr.category}>
                      <button className='btn btn-link'>
                        {whispr.whisprType}
                      </button>
                    </Link>
                  </span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    you whispred on {whispr.createdAt}
                  </span>
                  <span className='ml-1'>
                    {/* <Link>
                      <button className='btn btn-link'>
                        {whispr.category ? whispr.category : '-'}
                      </button>
                    </Link> */}
                  </span>
                  <span style={{ float: 'right' }}>
                    <Link>
                      <button className='btn btn-info'>
                        edit
                      </button>
                    </Link>
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{whispr.whisprText}</p>
            </div>
            {loggedInUser === whispr.whisprAuthor && (
              <>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteWhispr(whispr._id,)}
                >
                  delete
                </button>
                <button className="edit-button" onClick={showEditForm}>edit</button>
                <button
                  className="save-button"
                  onClick={() => handleUpdateWhispr(whispr._id, editedWhispr)}
                >
                  save
                </button>
              </>
            )}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/whisprs/${whispr._id}`}
            >
              join the conversation on this whispr.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default WhisprList;
