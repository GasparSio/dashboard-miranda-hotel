import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

 const Table = (props) => {
  const width = useSelector(state => state.visual.width);

  const displayRow = row => (
    <TableRow>
      {props.cols.map(col => 
        <TableCell>
          {col.display ? col.display(row) : row[col.property]}
        </TableCell>)}
    </TableRow>
  )

  return (
    <div width={width}>
      <StyledTable>
        <TableHeader>
          <TableRow>
            {props.cols.map(col => <TableHeaderCell>{col.label}</TableHeaderCell>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map(displayRow)}
        </TableBody>
      </StyledTable>
    </div>
  );
};
export default Table;

const StyledTable = styled.table`
width: 100%;
border-spacing: 0;
`;
const TableHeader = styled.thead`
  height: 65px;
  background-color: #FFFFFF;
`;
const TableBody = styled.tbody`
  height: 65px;
  background-color: #FFFFFF;
`;
const TableRow = styled.tr`
    background-color: #FFFFFF;
    height: 90px;
    transition: transform 0.2s;
  &:hover {
    transform: scale(1.02); 
    background-color: #effff0;
  }
`;
const TableHeaderCell = styled.th`
  text-align: left;
  font-family: Poppins;
  font-size: 16px;
  font-family: 600;
  color: #393939;
  width: 10%;
  padding-left: 20px;
`;
const TableCell = styled.td`
  text-align: left;
  font-family: Poppins;
  font-size: 14px;
  font-family: 400;
  color: #799283;
  width: 10%;
  padding-left: 20px;
`;
