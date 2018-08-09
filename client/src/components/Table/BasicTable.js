import React from 'react';
import PropTypes from 'prop-types';
import { Table, Header } from 'semantic-ui-react';

const BasicTable = ({
  header,
  subHeader,
  tableHeaders,
  tableCells,
}) => {
  const tr = [];
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
              tableHeaders.map((cell) => {
                tr.push(cell)
                return <Table.HeaderCell singleLine>{cell}</Table.HeaderCell>
              })
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            {
              tr.map((row) => tableCells.map((field, index) => {
                let cell;
                const tr = row.toLowerCase();
                // console.log(tr, field, field[tr]);
                console.log(tr, field);
                if (field.hasOwnProperty(tr)) {
                  // change the logic in the calling component so the object passed as prop here is serialized
                  console.log(tr);
                  cell = <Table.Cell singleLine>{field[tr]}</Table.Cell>;
                }

                return cell;
              }))

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
  tableHeaders: PropTypes.array.isRequired,
  tableCells: PropTypes.array.isRequired,
}

export default BasicTable;
