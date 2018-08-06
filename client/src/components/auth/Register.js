import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../../components/common/TextFieldGroup';

import Field from '../common/FormField';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
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
          <Icon name='user plus' circular />
          <Header.Content>Join!</Header.Content>
        </Header>
        <Form>
          <Field
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <Field
            placeholder="Email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <Field
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
          <Field
            placeholder="Confirm Password"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />
        </Form>
        <Segment padded>
          <Button primary fluid onClick={this.onSubmit}>
            Sign Up
          </Button>
          <Divider horizontal>Or</Divider>
          <Button secondary
            fluid
            onClick={() => this.props.history.push('/login') }>
              Login
          </Button>
        </Segment>
      </Container>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
