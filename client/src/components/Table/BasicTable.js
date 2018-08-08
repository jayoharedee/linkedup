import React from 'react';
import { Table, Header } from 'semantic-ui-react';

export default ({
  header,
  subheader,
  tableHeaders,
  tableCells,
}) => {
  return (
    <div>
      <Header as='h4' image>
        <Header.Content>
          {header}
        <Header.Subheader>{subheader}</Header.Subheader>
        </Header.Content>
      </Header>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            {
              tableHeaders.map((cell) => <Table.HeaderCell singleLine>{cell}</Table.HeaderCell>)
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
