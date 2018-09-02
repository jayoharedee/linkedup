import React from 'react';
import PropTypes from 'prop-types';
import { Table, Header } from 'semantic-ui-react';

const renderRow = (row) => <Table.Row>{row}</Table.Row>;

const BasicTable = ({
  header,
  subHeader,
  tableHeaders,
  tableCells,
}) => {

  this.state = {
    numRows: 0,
    rows: [],
  };

  const numRows = () => this.setState({ numRows: (tableHeaders.length + 1) });
  const renderRow = (row) => <Table.Row>{row}</Table.Row>;

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
                return <Table.HeaderCell singleLine>{cell}</Table.HeaderCell>
              })
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            {
              // tr.forEach((row, index) => {
              //   if ((index + 1) === tr.length) {
              //     console.log('should be done here.', tr, index);
              //     return undefined;
              //   }

              //   tableCells.map((field, index) => {
              //     let cell;
              //     const tRow = row.toLowerCase();

                  // Table cells have to be collected in an array
                  // Once the cells accumulate the number of table headers
                  // New rows must be introduced.

                  // if (field.hasOwnProperty(tRow)) {
                  //   cell = (
                  //     <Table.Row>
                  //       <Table.Cell singleLine>{field[tRow]}</Table.Cell>
                  //     </Table.Row>
                  //   )
                  // }
              //   })
              // })
            }
            {/* {
              tr.map((row) => tableCells.map((field, index) => {
                let cell;
                const tr = row.toLowerCase();
                // console.log(tr, field, field[tr]);
                console.log(tr, field);
                if (field.hasOwnProperty(tr)) {
                  console.log(tr);
                  cell = <Table.Cell singleLine>{field[tr]}</Table.Cell>;
                }

                return cell;
              }))

            } */}
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
