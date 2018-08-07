import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
  Header,
  Segment,
  Button,
  Container,
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

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
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
      <div className="dashboard">
        <Container text>
          <Header as='h2' icon textAlign='center'>
            <Icon name='settings' />
            Dashboard
            <Header.Subheader>
              Once you have a profile, this is the place where you
              will be customizing your settings.
            </Header.Subheader>
          </Header>
          {dashboardContent}
        </Container>
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
