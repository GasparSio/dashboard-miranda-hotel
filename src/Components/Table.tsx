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
  border-collapse: collapse;
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
  min-height: 145px;
  transition: transform 0.2s;
  border: 1px solid #ddd;
  &:hover {
    background-color: #effff0;
    transform: scale(1.003);
    box-shadow: 2px 2px 10px rgb(79 152 117 / 45%);
  }
`;

const TableHeaderCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  color: #393939;
  width: 12%;
  text-align: center;
`;

const TableCell = styled.div`
  display: flex;  
  flex: 1;
  flex-direction: column;
  align-items: center;
  text-align: left;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  color: #799283;
  width: 10%;
  // padding-left: 20px;
  transition: transform 0.2s;
  &:hover {
    background-color: #effff0;
  }
`;