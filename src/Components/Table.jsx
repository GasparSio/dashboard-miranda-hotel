import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Table = (props) => {
  const width = useSelector(state => state.visual.width);

  const displayRow = (row, rowIndex) => (
    <TableRow key={rowIndex}>
      {props.cols.map(col => 
        <TableCell key={col.property}>
          {col.display ? col.display(row) : row[col.property]}
        </TableCell>)}
    </TableRow>
  );

  return (
    <TableContainer width={width}>
      <StyledTable>
        <TableHeader>
          <TableRow>
            {props.cols.map(col => <TableHeaderCell key={col.property}>{col.label}</TableHeaderCell>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((row, rowIndex) => displayRow(row, rowIndex))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  width: ${({ width }) => width}px;
`;

const StyledTable = styled.div`
  display: table;
  width: 100%;
  table-layout: fixed;
`;

const TableHeader = styled.div`
  display: table-header-group;
  background-color: #FFFFFF;
`;

const TableBody = styled.div`
  display: table-row-group;
  background-color: #FFFFFF;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  height: auto;
  min-height: 120px;
  transition: transform 0.2s;
  &:hover {
    background-color: #effff0;
  }
`;

const TableHeaderCell = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  color: #393939;
  width: 12%;
  padding-left: 20px;
`;

const TableCell = styled.div`
  display: flex;  
  flex: 1;
  flex-direction: column;
  text-align: left;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 400;
  color: #799283;
  width: 10%;
  padding-left: 20px;
  transition: transform 0.2s;
  &:hover {
    background-color: #effff0;
  }
`;