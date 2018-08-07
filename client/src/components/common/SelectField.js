import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// import { languageOptions } from '../common'
// const languageOptions = [
//   { key: 'Arabic', text: 'Arabic', value: 'Arabic' }
// ]

const SelectField = ({
  value,
  searchQuery,
  handleChange,
  handleSearchChange,
  options,
}) => (
  <Dropdown
    fluid
    basic
    multiple
    onChange={handleChange}
    onSearchChange={handleSearchChange}
    options={options}
    placeholder="State"
    search
    searchQuery={searchQuery}
    selection
    value={value}
    multiple={false}
  />
)

export default SelectField