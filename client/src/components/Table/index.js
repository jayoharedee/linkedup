import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BasicTable from './BasicTable'

class Table extends Component {
  render() {
    const { header, subHeader, tableHeaders, tableCells } = this.props;
    return (
      <div>
        {
          <BasicTable 
            header={header}
            subHeader={subHeader}
            tableHeaders={tableHeaders}
            tableCells={tableCells}
          />
        }
      </div>
    )
  }
}

Table.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  tableHeaders: PropTypes.string.isRequired,
  tableCells: PropTypes.string.isRequired,
}

export default Table;
