import { ChangeEvent, useEffect, useState } from "react";
import { deleteBooking, fetchBookings } from '../../features/bookings/bookingSlice';
import Table from "../Table";
import { CellContainer, LineContainerComment, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import styled from "styled-components";
import { RequestPopUp } from "./RequestPopUp";
import { CheckIn, CheckOut, InProgress } from "./StatusButton";
import { MdDelete } from 'react-icons/md';
import { NavLink } from "react-router-dom";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';
import { FilterButton, Input, SearchIcon, Select, WrapperButton, WrapperInput, Option } from '../StyledFilterButtons';
import { colors } from '../theme';

interface PopUpStates {
  [bookingId: number]: boolean;
}

export const Bookings = () => {
  const dispatch = useCustomDispatch();
  const bookings = useCustomSelector(state => state.bookings.bookings);
  const width = useCustomSelector(state => state.visual.width);
  const [orderBy, setOrderBy] = useState("none");

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  const onDeleteBooking = (bookingId: number) => {
    dispatch(deleteBooking(bookingId))
  }

// Función para abrir el popup de una reserva específica
const initialPopUpStates: PopUpStates = {};
const [popUpStates, setPopUpStates] = useState<PopUpStates>(initialPopUpStates);
const handleOpenPopUp = (bookingId: number) => {
  setPopUpStates({ ...popUpStates, [bookingId]: true });
}

// Función para cerrar el popup de una reserva específica
const handleClosePopUp = (bookingId: number) => {
  setPopUpStates({ ...popUpStates, [bookingId]: false });
}


  const statusHandler = (row: Record<string, any>) => {
    if(row.status === 'check in'){
      return <CheckIn/> 
    }else if(row.status === 'check out'){
      return <CheckOut/>
    }else{
      return <InProgress/>
    }
  }

  //Search by name guest
  const [clientName, setClientName] = useState('');
  const handleClientNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setClientName(newValue);
  };

  const searchBookings = bookings.filter((booking) =>
    booking.fullname.toLowerCase().includes(clientName.toLowerCase())
  );


  
  //filtrar por status
  const [filterNav, setFilterNav] = useState<string>('All Bookings');
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

  const [selected, setSelected] = useState("Orderdate");
//Ordenar por...
if (selected === "Orderdate") {
  filteredBookings.sort((a, b) => {
    const dateA = new Date(a.orderdate);
    const dateB = new Date(b.orderdate);
    return dateB.getTime() - dateA.getTime();
  });
} else if (selected === "Checkin") {
  filteredBookings.sort((a, b) => {
    const dateA = new Date(a.checkin);
    const dateB = new Date(b.checkin);
    return dateB.getTime() - dateA.getTime();
  });
} else if (selected === "Checkout") {
  filteredBookings.sort((a, b) => {
    const dateA = new Date(a.checkout);
    const dateB = new Date(b.checkout);
    return dateB.getTime() - dateA.getTime();
  });
} else if (selected === "Guest") {
  filteredBookings.sort((a, b) => {
    const nombreA = a.fullname.toUpperCase();
    const nombreB = b.fullname.toUpperCase();
    if (nombreA < nombreB) {
      return -1;
    }
    if (nombreA > nombreB) {
      return 1;
    }
    return 0;
  });
}

//Data que traemos dependiendo los filtros
  const finalFilteredBookings = clientName ? searchBookings : filteredBookings;

  const cols = [
    {
      property: 'guest',
      label: 'Guest',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <span>{row.fullname}</span>
          <Link to={`/home/bookings/${row.id}`} >ID: {row.id}</Link>
        </CellContainer>
      ),
    },
    {
      property: 'orderdate',
      label: 'Order Date',
      display: (row: Record<string, any>) => (
        <PropertyText>{row.orderdate}</PropertyText>
      ),
    },
    {
      property: 'checkin',
      label: 'Check In',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.checkin}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'checkout',
      label: 'Check Out',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.checkout}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'specialrequest',
      label: 'Special Request',
      display: (row: Record<string, any>) => (
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
      display: (row: Record<string, any>) => (
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
      display: (row: Record<string, any>) => (
        <CellContainer>
          <LineContainerComment><PropertyText>{statusHandler(row)}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'delete',
      label: '',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <DeleteIconContainer ><DeleteIcon onClick={() => onDeleteBooking(row.id)}/></DeleteIconContainer>
        </CellContainer>
      ),
    },
]

  return(
      <Wrapperdashboardcontainer width={width}>
        <WrapperBookingNavContainer>
        <LeftNavContainer>
          <WrapperButton >
            <FilterButton style={{
              color: filterNav === 'All Bookings' ? colors.filterGreenButton : undefined,
              borderBottom: filterNav === 'All Bookings' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filterNav === 'All Bookings' ? 600 : undefined,
            }} 
            onClick={() => setFilterNav('All Bookings')}>All Bookings</FilterButton>
          </WrapperButton>
          <WrapperButton >
            <FilterButton style={{
              color: filterNav === 'Check In' ? colors.filterGreenButton : undefined,
              borderBottom: filterNav === 'Check In' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filterNav === 'Check In' ? 600 : undefined,
            }} 
            onClick={() => setFilterNav('Check In')}>Check In</FilterButton>
          </WrapperButton>
          <WrapperButton >
            <FilterButton style={{
              color: filterNav === 'Check Out' ? colors.filterGreenButton : undefined,
              borderBottom: filterNav === 'Check Out' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filterNav === 'Check Out' ? 600 : undefined,
            }}
            onClick={() => setFilterNav('Check Out')}>Check Out</FilterButton>
          </WrapperButton>
          <WrapperButton >
            <FilterButton style={{
              color: filterNav === 'In Progress' ? `${colors.filterGreenButton}` : undefined,
              borderBottom: filterNav === 'In Progress' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filterNav === 'In Progress' ? 600 : undefined,
            }} 
            onClick={() => setFilterNav('In Progress')}>In Progress</FilterButton>
          </WrapperButton>
            <WrapperInput>
              <SearchIcon/>
              <Input 
                placeholder='Search Client Name'
                value={clientName}
                onChange={handleClientNameChange}
              />
            </WrapperInput>
        </LeftNavContainer>
        <RightNavContainer>
            <Select 
            value={orderBy} 
            onInput={(event) => {
              const selectedValue = (event.target as HTMLSelectElement).value;
              setSelected(selectedValue);
            }}
            >
                <Option value="none">Sort by</Option>
                <Option value="Guest">Guest A-Z</Option>
                <Option value="Orderdate">Order Date</Option>
                <Option value="Checkin">Check In</Option>
                <Option value="Checkout">Check out</Option>
            </Select>
        </RightNavContainer>
      
      </WrapperBookingNavContainer>
        <Table cols={cols} data={finalFilteredBookings}/>
      </Wrapperdashboardcontainer>
  )
}

const Link = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  color: #799283;
  font-size: 12px;
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
`;

const WrapperBookingNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
`;
const LeftNavContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 85%;
    height: 40px;
    justify-content: space-between;
    align-items: center;
`;

const RightNavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 15%;
  align-items: center;
`;

