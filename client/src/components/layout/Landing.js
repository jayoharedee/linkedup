import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  Image,
  Header,
  Button,
  Divider,
} from 'semantic-ui-react';

import Showcase from '../../img/showcase.jpg';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <Container text className="landing">
        <Header
          as='h1'
          content='LinkedUp'
          subheader='Get LinkedUp with other developers, professionals and code enthusiasts'
          textAlign='center'
        />
        <Image src={Showcase} rounded fluid />
        <Divider />
        <Button.Group fluid>
          <Button positive onClick={this.props.history.push('/register')}>Sign Up</Button>
          <Button.Or />
          <Button onClick={this.props.history.push('/login')}>Login</Button>
        </Button.Group>
      </Container>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
