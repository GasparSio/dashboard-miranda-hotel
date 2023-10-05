import React, { useEffect, useState } from "react";
import { deleteBooking, fetchBookings } from '../../features/bookings/bookingSlice';
import { BookingNav } from './BookingNav';
import Table from "../Table";
import { CellContainer, LineContainerComment, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import styled from "styled-components";
import { RequestPopUp } from "./RequestPopUp";
import { CheckIn, CheckOut, InProgress } from "./StatusButton";
import { MdDelete } from 'react-icons/md';
import { NavLink } from "react-router-dom";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';

export const Bookings = () => {
  const dispatch = useCustomDispatch();
  const bookings = useCustomSelector(state => state.bookings.bookings);
  const width = useCustomSelector(state => state.visual.width);

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  const onDeleteBooking = (bookingId) => {
    dispatch(deleteBooking(bookingId))
  }

// Mantener un objeto para rastrear el estado del popup para cada reserva
const [popUpStates, setPopUpStates] = useState({});

// Función para abrir el popup de una reserva específica
const handleOpenPopUp = (bookingId) => {
  setPopUpStates({ ...popUpStates, [bookingId]: true });
}

// Función para cerrar el popup de una reserva específica
const handleClosePopUp = (bookingId) => {
  setPopUpStates({ ...popUpStates, [bookingId]: false });
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
  
  const [clientName, setClientName] = useState('');
  const handleClientNameChange = (newClientName) => {
    setClientName(newClientName);
  };

  const searchBookings = bookings.filter((booking) =>
    booking.fullname.toLowerCase().includes(clientName.toLowerCase())
  );
  
  const [filterNav, setFilterNav] = useState('All Bookings');
  
  const filteredBookings = bookings.filter((booking) => {
    switch(filterNav){
      case "All Bookings":
        return true;
      case "Check In":
        return booking.status === "check in"
      case "Check Out":
        return booking.status === "check out"
      case "In Progress":
        return booking.status === "in progress"
      default:
        return false;
    }
  })

  const finalFilteredBookings = clientName ? searchBookings : filteredBookings;

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
          <Button onClick={() => handleOpenPopUp(row.id)}>View Notes</Button>
          {popUpStates[row.id] && 
          <RequestPopUp
            data={row.specialrequest}
            onClose={() => {
              handleClosePopUp(row.id);
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
          <PropertyText>
            {row.roomtype}
            Room Numer: {row.roominfo}
          </PropertyText>
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
    {
      property: 'delete',
      label: '',
      display: (row) => (
        <CellContainer>
          <DeleteIconContainer ><DeleteIcon onClick={() => onDeleteBooking(row.id)}/></DeleteIconContainer>
        </CellContainer>
      ),
    },
]

  return(
      <Wrapperdashboardcontainer width={width}>
        <BookingNav onClientNameChange={handleClientNameChange} onFilterButtonClick={setFilterNav} filter={filterNav}/>
        <Table cols={cols} data={finalFilteredBookings}/>
      </Wrapperdashboardcontainer>
  )
}

const Link = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  color: #799283;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Poppins';
`;
const DeleteIconContainer = styled.span`
  text-align: center;
`;
const DeleteIcon = styled(MdDelete)`
  cursor: pointer;
  color: #bd2929;
  width: 20px;
  height: 20px;
  text-align: center;
`;
const Button = styled.button`
  border-radius: 7px;
  height: auto;
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