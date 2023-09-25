import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const Table = ({ columnas, datos }) => {
  const width = useSelector(state => state.visual.width);
  return (
    <Wrapperdashboardcontainer width={width}>
      <StyledTable>
        <TableHeader>
          <TableRow>
            {columnas.map((columna, index) => (
              <TableHeaderCell key={index}>{columna}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <tbody>
          {datos.map((fila, index) => (
            <TableRow key={index}>
              {columnas.map((columna, columnIndex) => (
                <TableCell key={columnIndex}>{fila[columna]}</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </Wrapperdashboardcontainer>
  );
};



const Wrapperdashboardcontainer = styled.section`
  position: absolute;
  top: 53%;
  right: 2%;
  width: ${(props) => (props.width === '75%' ? '70%' : '96%')};
  z-index: 999;
  background-color: #F8F8F8;
`;

const TableHeader = styled.thead`
  height: 65px;
  background-color: #FFFFFF;
`;

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
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
