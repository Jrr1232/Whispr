import { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const ThoughtForm = () => {
  // const [thoughtText, setThoughtText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  // const [selectedThoughtType, setSelectedThoughtType] = useState('Text'); // Default thought type
  const [formData, setFormData] = useState({ thoughtText: '', thoughtType: 'Uncategorized' });

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: [
      QUERY_THOUGHTS,
      { query: QUERY_THOUGHTS },
      { query: QUERY_ME },
    ],
  });

  const thoughtTypes = ['Uncategorized', 'First World Problems 👽', 'Tea ☕️', 'Gamers 👾', 'Fur Friends 😼']; // type of thoughts

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const { data } = await addWhispr({
        variables: {
          thoughtText: formData.thoughtText,
          thoughtType: formData.thoughtType, // Use selectedThoughtType here
          // thoughtAuthor: Auth.getProfile().authenticatedPerson.username,
        },
      });

      setFormData({ thoughtText: '', thoughtType: 'Uncategorized' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData.thoughtType);
    // if (name === 'thoughtText' && value.length <= 280) {
    //   setThoughtText(value);
    //   setCharacterCount(value.length);
    // }
  };

  return (
    <div>
      <h3>Can't say it out loud? Go ahead and whispr</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
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
                name="thoughtText"
                placeholder="Here's a new thought..."
                value={formData.thoughtText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-3">
              <label htmlFor="thoughtType">Select Thought Type:</label>
              <select
                id="thoughtType"
                name="thoughtType"
                value={formData.thoughtType}
                className="form-select"
                onChange={handleChange}
              >
                {thoughtTypes.map((type) => (
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
