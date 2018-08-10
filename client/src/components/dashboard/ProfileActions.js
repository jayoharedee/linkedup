import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Grid } from 'semantic-ui-react'

const ProfileActions = () => {
  return (
    <Grid.Row stackable relaxed stretched>
      <Button.Group inverted>
        <Grid.Column>
          <Button as={Link} to="/edit-profile"  color='blue' basic content='Blue'>
            Edit Profile
          </Button>
        </Grid.Column>

        <Grid.Column>
          <Button as={Link} to="/add-experience" color='blue' basic content='Blue'>
            Add Experience
          </Button>
        </Grid.Column>

        <Grid.Column>
          <Button as={Link} to="/add-education" color='blue' basic content='Blue'>
            Add Education
          </Button>
        </Grid.Column>
      </Button.Group>
    </Grid.Row>
  );
};

export default ProfileActions;
