import React, { useState } from "react";
import styled from "styled-components";

export const Bookings = ({data}) => {
  const rowsPerPage = 10; // Número de filas por página
  const totalPages = Math.ceil(data.length / rowsPerPage); // Calcular el número total de páginas

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
    return(
        <Wrapperdashboardcontainer>
            <StyledTable>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Guest</TableHeaderCell>
                        <TableHeaderCell>Order Date</TableHeaderCell>
                        <TableHeaderCell>Check In</TableHeaderCell>
                        <TableHeaderCell>Check Out</TableHeaderCell>
                        <TableHeaderCell>Special Request</TableHeaderCell>
                        <TableHeaderCell>Room Type</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {currentData.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>`Name: {item.fullname} Id: {item.id}`</TableCell>
                        <TableCell>{item.orderdate}</TableCell>
                        <TableCell>{item.checkin}</TableCell>
                        <TableCell>{item.checkout}</TableCell>
                        <TableCell>{item.specialrequest}</TableCell>
                        <TableCell>{item.roomtype}</TableCell>
                        <TableCell>{item.status ? 'Booked' : 'Refund'}</TableCell>
                    </TableRow>
                    ))}
                </tbody>
            </StyledTable>
            <PaginationContainer>
              <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 1}>
                Prev
              </PaginationButton>
              <PaginationText>Page {currentPage} out of {totalPages}</PaginationText>
              <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </PaginationButton>
            </PaginationContainer>
        </Wrapperdashboardcontainer>
    )
}

const Wrapperdashboardcontainer = styled.section`
  position: absolute;
  top: 55px;
  right: 0%;
  width: 100%;
  z-index: -999;
  background-color: #F8F8F8;
`;

const TableHeader = styled.thead`
  height: 65px;
  border-radius: 20px;
  background-color: #FFFFFF;
`;

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  margin-left: 40px;
`;
const TableRow = styled.tr`
    background-color: #FFFFFF;
    border-radius: 20px;
    height: 90px;
  &:hover {
    background-color: #eae6e7;
  }
`;
const TableHeaderCell = styled.th`
  text-align: left;
  font-family: Poppins;
  font-size: 16px;
  font-family: 600;
  color: #393939;
  width: 13%;
`;
const TableCell = styled.td`
  text-align: left;
  font-family: Poppins;
  font-size: 14px;
  font-family: 400;
  color: #799283;
`;
const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 55px;
  align-items: center;
  margin-top: 20px;
`;
const PaginationButton = styled.button`
  width: 91px;
  height: 53px;
  border: 1px solid #799283;
  border-radius: 12px;
  background-color: #ffffff;
  font-family: Poppins;
  font-size: 16px;
  color: #799283;
  font-family: 400;
  margin-right: 30px;
`;
const PaginationText = styled.span`
  font-family: Poppins;
  font-size: 16px;
  color: #393939;
  font-family: 600;
  margin-right: 30px;
`;