import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
// import { Table, Header } from 'semantic-ui-react';

import { deleteEducation } from '../../actions/profileActions';

import Table from '../Table/';

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id)
  }

  render() {
    let education;
    if (this.props.education) {
      education = this.props.education.map((edu) => ({
        key: edu._id,
        school: edu.school,
        degree: edu.degree,
        from: <Moment format="YYYY/MM/DD">{edu.from}</Moment>,
        to: (edu.to !== null ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : 'Now'),
        years: `${this.from} - ${this.to}`,
        delete: <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, edu._id)}>Delete</button>,
      }));
    }

    return (
      <div>
        <Table
          header="Education Credentials"
          subHeader="Your education portfolio"
          tableHeaders={['School', 'Degree', 'Years', 'Delete']}
          tableCells={education}
        />
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
}


export default connect(null, { deleteEducation })(Education);
