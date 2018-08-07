import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  // Checkbox,
  Form,
  Container,
  Header,
  Dropdown,
  Divider,
  Button,
  Segment,
  Icon,
  Select,
  // Image,
 } from 'semantic-ui-react'
import PropTypes from 'prop-types';

import Field from '../common/FormField';
import SelectField from '../common/SelectField';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      searchQuery: '',
      value: '',
      selected: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e, data) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = (e, { searchQuery, value }) =>
    this.setState({ searchQuery, status: value });

  render() {
    const {
      errors,
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
     } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <Field
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <Field
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <Field
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <Field
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <Field
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { key: Math.random(), text: '* Select Professional Status', value: 0 },
      { key: Math.random(), text: 'Developer', value: 'Developer' },
      { key: Math.random(), text: 'Junior Developer', value: 'Junior Developer' },
      { key: Math.random(), text: 'Senior Developer', value: 'Senior Developer' },
      { key: Math.random(), text: 'Manager', value: 'Manager' },
      { key: Math.random(), text: 'Student or Learning', value: 'Student or Learning' },
      { key: Math.random(), text: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { key: Math.random(), text: 'Intern', value: 'Intern' },
      { key: Math.random(), text: 'Other', value: 'Other' }
    ];

    return (
      <Container text>
        <h1 className="display-4 text-center">Create Your Profile</h1>
        <p className="lead text-center">
          Let's get some information to make your profile stand out
        </p>
        <small className="d-block pb-3">* = required fields</small>
        <Form>
          <Field
            placeholder="* Profile Handle"
            name="handle"
            value={handle}
            onChange={this.onChange}
            error={errors.handle}
            info="A unique handle for your profile URL. Your full name, company name, nickname"
          />
          <SelectField
            value={status}
            handleChange={this.handleChange}
            options={options}
            placeholder="Status"
          />
          <Field
            placeholder="Company"
            name="company"
            value={company}
            onChange={this.onChange}
            error={errors.company}
            info="Could be your own company or one you work for"
          />
          <Field
            placeholder="Website"
            name="website"
            value={website}
            onChange={this.onChange}
            error={errors.website}
            info="Could be your own website or a company one"
          />
          <Field
            placeholder="Location"
            name="location"
            value={location}
            onChange={this.onChange}
            error={errors.location}
            info="City or city & state suggested (eg. Boston, MA)"
          />
          <Field
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={this.onChange}
            error={errors.skills}
            info="Please use comma separated values (eg.
              HTML,CSS,JavaScript,PHP"
          />
          <Field
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={this.onChange}
            error={errors.githubusername}
            info="If you want your latest repos and a Github link, include your username"
          />
          <Field
            placeholder="Short Bio"
            name="bio"
            value={bio}
            onChange={this.onChange}
            error={errors.bio}
            info="Tell us a little about yourself"
          />

          <Button
            content='Include Your Social Media Links'
            icon='retweet'
            labelPosition='left'
            label="Optional"
            onClick={() => {
              this.setState(prevState => ({
                displaySocialInputs: !prevState.displaySocialInputs
              }));
            }}
          />
          {socialInputs}
          <Divider />
          <Button positive
            onClick={this.onSubmit}
            floated='right'
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
