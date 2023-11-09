import React from 'react';
import styled from 'styled-components';
import { useCustomSelector } from '../hooks/redux/index';

interface TableColumn {
  property: string;
  label: string;
  display?: (row: Record<string, any>) => React.ReactNode;
}

interface TableProps {
  cols: TableColumn[];
  data: Record<string, any>[];
}
interface TableContainerProps {
  width: string;
}

const Table = (props: TableProps) => {
  const width = useCustomSelector(state => state.visual.width);

  const displayRow = (row: Record<string, any>, rowIndex: number) => (
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

const TableContainer = styled.div<TableContainerProps>`
  width: ${({ width }) => width}px;
  background-color: #dddddd;
  border-radius: 8px;
`;

const StyledTable = styled.div`
  display: table;
  width: 98%;
  table-layout: fixed;
  margin: auto;
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