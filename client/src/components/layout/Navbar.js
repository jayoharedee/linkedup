import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

// const authLinks = (
//   <ul className="navbar-nav ml-auto">
//     <li className="nav-item">
//       <Link className="nav-link" to="/dashboard">Dashboard</Link>
//     </li>
//     <li className="nav-item">
//       <a href=""
//         onClick={this.onLogoutClick.bind(this)}
//         className="nav-link"
//       >
//         <img src={user.avatar}
//           className="rounded-circle"
//           alt={user.name}
//           style={{ width: '25px', marginRight: '5px' }}
//         />{' '}
//         Logout
//       </a>
//     </li>
//   </ul>
// );

// return (
//   <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
//     <div className="container">
//       <Link className="navbar-brand" to="/">LinkedUp</Link>
//       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="mobile-nav">
//         <ul className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link className="nav-link" to="/profiles">
//               {' '}
//               Developers
//             </Link>
//           </li>
//         </ul>
//         {isAuthenticated ? authLinks : guestLinks}
//       </div>
//     </div>
//   </nav>
// )
// }

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
      <div>
        <Menu inverted>
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
      </div>
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
