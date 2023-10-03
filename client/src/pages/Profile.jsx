import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import WhisprForm from '../components/WhisprForm';
import WhisprList from '../components/WhisprList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (
    Auth.loggedIn() && 
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        you need to be logged in to see this. use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          someone is whispring to themselves 🤫
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <WhisprList
            whisprs={user.whisprs}
            title={`${user.username}'s whisprs...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <WhisprForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
