import { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { ADD_WHISPR } from '../../utils/mutations';
import { QUERY_WHISPRS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const WhisprForm = () => {
  // const [whisprText, setWhisprText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  // const [selectedWhisprType, setSelectedWhisprType] = useState('Text'); // Default whispr type
  const [formData, setFormData] = useState({ whisprText: '', whisprType: 'Uncategorized' });

  const [addWhispr, { error }] = useMutation(ADD_WHISPR, {
    refetchQueries: [
      QUERY_WHISPRS,
      { query: QUERY_WHISPRS },
      { query: QUERY_ME },
    ],
  });

  const whisprTypes = ['Uncategorized', 'First World Problems 👽', 'Tea ☕️', 'Gamers 👾', 'Fur Friends 😼']; // type of whisprs

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const { data } = await addWhispr({
        variables: {
          whisprText: formData.whisprText,
          whisprType: formData.whisprType, 
        },
      });

      setFormData({ whisprText: '', whisprType: 'Uncategorized' });
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData.whisprType);

    if (name === 'whisprText' && value.length <= 280) {
      setFormData({ ...formData, [name]: value });
      setCharacterCount(value.length);
    } else if (name === 'whisprText' && value.length > 280) {
      const truncatedValue = value.slice(0, 280);
      setFormData({ ...formData, [name]: truncatedValue });
      setCharacterCount(280); 
    }
  };

  return (
    <div>
      <h3>Can't say it out loud? Go ahead and whispr</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''}`}
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
                placeholder="Here's a new whispr..."
                value={formData.whisprText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-3">
              <label htmlFor="whisprType">Select Whispr Type:</label>
              <select
                id="whisprType"
                name="whisprType"
                value={formData.whisprType}
                className="form-select"
                onChange={handleChange}
              >
                {whisprTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
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