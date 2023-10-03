import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <img id='home-img' src='whispr_logo.png'/>
          </Link>
          <p className="m-0">some things don't need to be said loud.</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                {Auth.getProfile().authenticatedPerson.username.toLowerCase()}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
