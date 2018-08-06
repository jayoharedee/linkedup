import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  state = { activeItem: 'login' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.setState({ activeItem: 'join' });
  }

  render() {
    const { activeItem } = this.state
    const { isAuthenticated, user } = this.props.auth;

    console.log(activeItem);

    const authLinks = (
      <React.Fragment>
        {
          isAuthenticated ?
            <Menu.Item as={Link} to="/logout"
              name='logout'
              className="ui right floated"
              // active={activeItem === 'logout'}
              onClick={this.onLogoutClick}
            />
          :
            <Menu.Item as={Link} to="/login"
              name='login'
              className="ui right floated"
              // active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
        }
      </React.Fragment>
    )

    const guestLinks = (
      <React.Fragment>
        {
          !isAuthenticated && activeItem === 'join' ?
              <Menu.Item as={Link} to="/login"
                name='login'
                className="ui right floated"
                onClick={this.handleItemClick}
              />
            :
              <Menu.Item as={Link} to="/register"
                name='join'
                className="ui right floated"
                onClick={this.handleItemClick}
              />
        }
      </React.Fragment>
    )

    return (
      <Menu inverted style={{ marginBottom: '1rem' }}>
        <Menu.Item as={Link} to="/"
          name='LinkedUp'
          active={activeItem === 'linked'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={Link} to="/profiles"
          name='profiles'
          active={activeItem === 'profiles'}
          onClick={this.handleItemClick}
        />
        {isAuthenticated ? authLinks : guestLinks}
      </Menu>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logoutUser,
  clearCurrentProfile,
})(Navbar);
