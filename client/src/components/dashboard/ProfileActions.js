import React from 'react';
import { Button, } from 'semantic-ui-react'

const ProfileActions = () => {
  return (
      <Button.Group color='blue'>
        <Button onClick={() => this.props.history('/edit-profile')}>Edit Profile</Button>
        <Button>Add Experience</Button>
        <Button>Add Education</Button>
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
