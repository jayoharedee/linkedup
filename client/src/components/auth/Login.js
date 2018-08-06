import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  // Checkbox,
  Form,
  Container,
  Header,
  Divider,
  Button,
  Segment,
  Icon,
  // Image,
 } from 'semantic-ui-react'

import { loginUser } from '../../actions/authActions';

import Field from '../common/FormField';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {},
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password,
    }

    this.props.loginUser(credentials);
  }

  render() {
    const { errors } = this.state;

    return (
      <Container text>
        <Header as='h2'
          icon
          textAlign='center'
          dividing
        >
          <Icon name='users' circular />
          <Header.Content>Link Up!</Header.Content>
        </Header>

        <Form onSubmit={this.onSubmit}>
          <Field
            label="Your Email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <Field
            label="Your Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
        </Form>
        <Segment padded>
          <Button primary fluid onClick={this.onSubmit}>
            Login
          </Button>
          <Divider horizontal>Or</Divider>
          <Button secondary
            fluid
            onClick={() => this.props.history.push('/register') }>
              Sign Up Now
          </Button>
        </Segment>
      </Container>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
