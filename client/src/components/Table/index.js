import React, { Component } from 'react'
import BasicTable from './BasicTable'

class Table extends Component {
  render() {
    return (
      <div>
        {
          <BasicTable 
            header="Education Credentials" 
            subheader="Your education portfolio"
            tableHeaders={['School', 'Degree', 'Years']} 
          />
        }
      </div>
    )
  }
}

export default Table;
