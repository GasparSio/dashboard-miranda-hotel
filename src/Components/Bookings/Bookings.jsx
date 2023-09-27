import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking, fetchBookings } from '../../features/bookings/bookingSlice';
import { BookingNav } from './BookingNav';
import Table from "../Table";
import { CellContainer, LineContainer, LineContainerComment, ValueText, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';

export const Bookings = () => {
  const dispatch = useDispatch()
  const bookings = useSelector(state => state.bookings.bookings);
  const width = useSelector(state => state.visual.width);

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  const onDeleteRoom = (bookingId) => {
    dispatch(deleteBooking(bookingId))
  }
  const cols = [
    {
      property: 'guest',
      label: 'Guest',
      display: (row) => (
        <CellContainer>
          <LineContainer><ValueText>Full Name: </ValueText><PropertyText>{row.fullname}</PropertyText></LineContainer>
          <LineContainer><ValueText>Id: </ValueText><PropertyText>{row.id}</PropertyText></LineContainer>
        </CellContainer>
      ),
    },
    {
      property: 'orderdate',
      label: 'Order Date',
      display: (row) => (
        <CellContainer>
          <LineContainer><ValueText>Order Date: </ValueText><PropertyText>{row.orderdate}</PropertyText></LineContainer>
        </CellContainer>
      ),
    },
    {
      property: 'checkin',
      label: 'Check In',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Check In: </ValueText><PropertyText>{row.checkin}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'checkout',
      label: 'Check Out',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Check In: </ValueText><PropertyText>{row.checkout}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'specialrequest',
      label: 'Special Request',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Special Request: </ValueText><PropertyText>{row.specialrequest}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'roomtype',
      label: 'Room Type',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Room Type: </ValueText><PropertyText>{row.roomtype}</PropertyText></LineContainerComment>
          <LineContainerComment><ValueText>Room Number: </ValueText><PropertyText>{row.roominfo}</PropertyText></LineContainerComment>
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
      <BookingNav/>
      <Table cols={cols} data={bookings}/>
      </Wrapperdashboardcontainer>
  )
}