import React from 'react';
import { Link } from 'react-router-dom'
import { Button, } from 'semantic-ui-react'

const ProfileActions = () => {
  return (
      <Button.Group color='blue'>
        <Button as={Link} to="/edit-profile">
          Edit Profile
        </Button>    
        <Button as={Link} to="/add-experience">
          Add Experience
        </Button>
        <Button as={Link} to="/add-education">
          Add Education
        </Button>
      </Button.Group>
  );

      {/* <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link> */}
};

export default ProfileActions;
