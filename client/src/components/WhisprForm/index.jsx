import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_WHISPR } from '../../utils/mutations';
import { QUERY_WHISPRS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const WhisprForm = () => {
  const [whisprText, setWhisprText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addWhispr, { error }] = useMutation
  (ADD_WHISPR, {
    refetchQueries: [
      QUERY_WHISPRS,
      'getWhisprs',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addWhispr({
        variables: {
          whisprText,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username 
          whisprAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setWhisprText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'whisprText' && value.length <= 280) {
      setWhisprText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Can't say it out loud? Go ahead and whispr</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="whisprText"
                placeholder="time to whispr..."
                value={whisprText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                whispr
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to whispr. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default WhisprForm;
