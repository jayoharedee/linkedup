import React from 'react';
import PropTypes from 'prop-types';
import { Table, Header } from 'semantic-ui-react';

const BasicTable = ({
  header,
  subHeader,
  tableHeaders,
  tableCells,
}) => {
  return (
    <div>
      <Header as='h4' image>
        <Header.Content>
          {header}
        <Header.Subheader>{subHeader}</Header.Subheader>
        </Header.Content>
      </Header>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            {
              tableHeaders.map((cell) => <Table.HeaderCell>{cell}</Table.HeaderCell>)
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            {
              tableCells.map((cell) => <Table.Cell>{cell}</Table.Cell>)
            }
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

BasicTable.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  tableHeaders: PropTypes.string.isRequired,
  tableCells: PropTypes.string.isRequired,
}

export default BasicTable;
