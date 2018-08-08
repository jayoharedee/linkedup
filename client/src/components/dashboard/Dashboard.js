import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
  Header,
  Segment,
  Button,
  Grid,
  Divider,
  Icon,
} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

import ProfileActions from './ProfileActions';
import Spinner from '../common/Spinner';

import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount()
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let profilesExist;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      profilesExist = Object.keys(profile).length > 0;
      if (profilesExist) {
        dashboardContent = (
          <Grid centered>
            <Grid.Row>
              <Grid.Column>
                <p className="lead text-muted">
                  Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                </p>
              </Grid.Column>
            </Grid.Row>
                
            <ProfileActions />
            
            <Grid.Row centered column={1}>
              <Grid.Column>
                <Education education={profile.education} />
              </Grid.Column>
            </Grid.Row>
            
            <Grid.Row centered column={1}>
              <Grid.Column>
                <Experience experience={profile.experience} />
              </Grid.Column>
            </Grid.Row>
            
            <Grid.Row centered column={1}>
              <Button
                negative 
                onClick={this.onDeleteClick.bind(this)}
              >
                Negative Button
              </Button>
            </Grid.Row>
          </Grid>
        );
      } else {
        dashboardContent = (
          <div>
            <Header as='h2' attached='top' textAlign='center'>
              Welcome { user.name }!
            </Header>

            <Segment attached>
            <Header as='h3' textAlign='center'>
              You have not setup a profile yet, please add some info.
            </Header>

              <Button content='Create'
                primary
                fluid
                onClick={() => this.props.history.push('/create-profile')}
              />
            </Segment>
          </div>
        )
      }
    }

    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='settings' />
          Dashboard
          <Header.Subheader>
            {
              profilesExist ?
                `Add, Edit or complete credentials for your profile. All the tools
                are here for you to get LinkedUp!`
              :
                `Once you have a profile, this is the place where you
                will be customizing your settings.`
            }
          </Header.Subheader>
        </Header>
        {dashboardContent}
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    deleteAccount,
  }
)(Dashboard);
