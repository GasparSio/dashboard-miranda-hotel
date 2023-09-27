import React, { useEffect } from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, fetchRooms } from '../../features/rooms/roomSlice';
import { RoomsNavContainer } from "./RoomsNavContainer";
import { CellContainer, LineContainer, LineContainerComment, ValueText, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import Table from "../Table";


export const Rooms = () => {
  const dispatch = useDispatch()
  const rooms = useSelector(state => state.rooms.rooms);
  const width = useSelector(state => state.visual.width);

  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  // const onDeleteRoom = (roomId) => {
  //   dispatch(deleteRoom(roomId))
  // }
  const cols = [
    {
      property: 'roomname',
      label: 'Room Name',
      display: (row) => (
        <CellContainer>
          <LineContainer><ValueText>Number Room: </ValueText><PropertyText>{row.roomNumber}</PropertyText></LineContainer>
          <LineContainer><ValueText>Id: </ValueText><PropertyText>{row.id}</PropertyText></LineContainer>
        </CellContainer>
      ),
    },
    {
      property: 'bedtype',
      label: 'Bed Type',
      display: (row) => (
        <CellContainer>
          <LineContainer><ValueText>Bed Type: </ValueText><PropertyText>{row.bedType}</PropertyText></LineContainer>
        </CellContainer>
      ),
    },
    {
      property: 'facilities',
      label: 'Facilities',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Facilities: </ValueText><PropertyText>{row.facilities}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'price',
      label: 'Price',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Price: </ValueText><PropertyText>{row.price}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'offerprice',
      label: 'Offer Price',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Offer Price: </ValueText><PropertyText>{row.offerprice}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'status',
      label: 'Status',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Status: </ValueText><PropertyText>{row.status}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
]
    return(
        <Wrapperdashboardcontainer width={width}>
        <RoomsNavContainer/>
        <Table cols={cols} data={rooms}/>
        </Wrapperdashboardcontainer>
    )
}

// export const Booked = () => {
//   return(
//     <SpanBooked>Booked</SpanBooked>
//   )
// }
// const SpanBooked = styled.span`
//   background-color: red;
//   color: white;
//   border-radius: 10px;
//   width: 80px;
//   height: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export const Available = () => {
//   return(
//     <SpanAvailable>Available</SpanAvailable>
//   )
// }
// const SpanAvailable = styled.span`
//   background-color: #3cae43;
//   color: white;
//   border-radius: 10px;
//   width: 80px;
//   height: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
