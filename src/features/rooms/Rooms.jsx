import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, fetchRooms } from './roomSlice';
import { NavContainer } from "./NavContainer";


export const Rooms = () => {
  const dispatch = useDispatch()
  const rooms = useSelector(state => state.rooms.rooms);
  const width = useSelector(state => state.visual.width);

  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  const onDeleteRoom = (roomId) => {
    dispatch(deleteRoom(roomId))
  }

  //Pagination Logic
  const rowsPerPage = 10; // Número de filas por página
  const totalPages = Math.ceil(rooms.length / rowsPerPage); // Calcular el número total de páginas
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = rooms.slice(startIndex, endIndex);
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
        <Wrapperdashboardcontainer width={width}>
        <NavContainer/>
          <StyledTable>
              <TableHeader>
                  <TableRow>
                      <TableHeaderCell>Room Name</TableHeaderCell>
                      <TableHeaderCell>Bed Type</TableHeaderCell>
                      <TableHeaderCell>Room Floor</TableHeaderCell>
                      <TableHeaderCell>Facilities</TableHeaderCell>
                      <TableHeaderCell>Price</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Delete</TableHeaderCell>
                  </TableRow>
              </TableHeader>
              <tbody>
                  {currentData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.photo}{item.id}</TableCell>
                      <TableCell>{item.bedType}</TableCell>
                      <TableCell>{item.roomNumber}</TableCell>
                      <TableCell>{item.facilities}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.status ? <Booked/> : <Available/>}</TableCell>
                      <TableCell onClick={() => onDeleteRoom(item.id)}>Delete</TableCell>
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

export const Booked = () => {
  return(
    <SpanBooked>Booked</SpanBooked>
  )
}
const SpanBooked = styled.span`
  background-color: red;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Available = () => {
  return(
    <SpanAvailable>Available</SpanAvailable>
  )
}
const SpanAvailable = styled.span`
  background-color: #3cae43;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;



const Wrapperdashboardcontainer = styled.section`
  position: absolute;
  top: 66px;
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
