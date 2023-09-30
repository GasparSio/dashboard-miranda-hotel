import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking, fetchBookings } from '../../features/bookings/bookingSlice';
import { BookingNav } from './BookingNav';
import Table from "../Table";
import { CellContainer, LineContainer, LineContainerComment, ValueText, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import styled from "styled-components";
import { RequestPopUp } from "./RequestPopUp";
import { CheckIn, CheckOut, InProgress } from "./StatusButton";
import { NavLink } from "react-router-dom";

export const Bookings = () => {
  const dispatch = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(false);
  const bookings = useSelector(state => state.bookings.bookings);
  const width = useSelector(state => state.visual.width);

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  const onDeleteRoom = (bookingId) => {
    dispatch(deleteBooking(bookingId))
  }
  const handleOpenPopUp = () => {
    setOpenPopUp(true)
  }
  const handleClosePopUp = () => {
    setOpenPopUp(false)
  }
  const statusHandler = (row) => {
    if(row.status === 'check in'){
      return <CheckIn/> 
    }else if(row.status === 'check out'){
      return <CheckOut/>
    }else{
      return <InProgress/>
    }
  }
  const cols = [
    {
      property: 'guest',
      label: 'Guest',
      display: (row) => (
        <CellContainer>
          <span>{row.fullname}</span>
          <Link to={`/home/bookings/${row.id}`} >ID: {row.id}</Link>
        </CellContainer>
      ),
    },
    {
      property: 'orderdate',
      label: 'Order Date',
      display: (row) => (
        <PropertyText>{row.orderdate}</PropertyText>
      ),
    },
    {
      property: 'checkin',
      label: 'Check In',
      display: (row) => (
        <CellContainer>
          <PropertyText>{row.checkin}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'checkout',
      label: 'Check Out',
      display: (row) => (
        <CellContainer>
          <PropertyText>{row.checkout}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'specialrequest',
      label: 'Special Request',
      display: (row) => (
        <CellContainer>
          <Button onClick={handleOpenPopUp}>View Notes</Button>
          {(openPopUp) && 
          <RequestPopUp
            data={row.specialrequest}
            onClose={() => {
            handleClosePopUp();
          }}
      />}
        </CellContainer>
      ),
    },
    {
      property: 'roomtype',
      label: 'Room Type',
      display: (row) => (
        <CellContainer>
          <PropertyText>{row.roomtype} - {row.roominfo}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'status',
      label: 'Status',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><PropertyText>{statusHandler(row)}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
]

  return(
      <Wrapperdashboardcontainer width={width}>
        <BookingNav/>
        <Table cols={cols} data={bookings}/>
      </Wrapperdashboardcontainer>
  )
}

const Link = styled(NavLink)`
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: green;
  color: #799283;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Poppins';
`;
const Button = styled.button`
  border-radius: 7px;
  height: 35px;
  border: 1px solid #799283;
  background-color: white;
  color: #799283;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Poppins';
  cursor: Pointer;
  transition: transform 0.5s;
  &:hover{
    transform: scale(1.03);
  }
`