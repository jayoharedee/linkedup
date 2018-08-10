import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions/profileActions';

import Table from '../Table/';

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id)
  }

  render() {
    console.log(this.props)
    const experience = this.props.experience.map((exp) => ({
      key: exp._id,
      company: exp.company,
      title: exp.title,
      from: <Moment format="YYYY/MM/DD">{exp.from}</Moment>,
      to: (exp.to !== null ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : 'Now'),
      years: `${this.from} - ${this.to}`,
      delete: <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, exp._id)}>Delete</button>,
    }));

    return (
      <div>
        <Table
          header="Education Credentials"
          subHeader="Your education portfolio"
          tableHeaders={['Company', 'Title', 'Years', 'Delete']}
          tableCells={experience}
        />
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
}


export default connect(null, { deleteExperience })(Experience);
