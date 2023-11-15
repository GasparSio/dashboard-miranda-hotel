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
import Swal from "sweetalert2";


export const Bookings = () => {
  const dispatch = useCustomDispatch();
  const bookings = useCustomSelector(state => state.bookings.bookings);
  const width = useCustomSelector(state => state.visual.width);
  const [orderBy, setOrderBy] = useState("none");

useEffect(() => {
  dispatch(fetchBookings())
}, [dispatch])

const onDeleteBooking = (bookingId: string) => {
  // Muestra la alerta de confirmación antes de eliminar
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      // Si el usuario confirma, ejecuta la eliminación
      dispatch(deleteBooking(bookingId));
      // Muestra la alerta de éxito después de eliminar
      Swal.fire({
        title: 'Deleted!',
        text: 'The booking has been deleted.',
        icon: 'success',
      });
    }
  });
};

interface PopUpStates {
  [bookingId: string]: boolean;
}
// Función para abrir el popup de una reserva específica
const initialPopUpStates: PopUpStates = {};
const [popUpStates, setPopUpStates] = useState<PopUpStates>(initialPopUpStates);
const handleOpenPopUp = (bookingId: string) => {
  setPopUpStates({ ...popUpStates, [bookingId]: true });
}

// Función para cerrar el popup de una reserva específica
const handleClosePopUp = (bookingId: string) => {
  setPopUpStates({ ...popUpStates, [bookingId]: false });
}

//Dependiendo el status me muestra uno de los botones estilizados.
  const statusHandler = (row: Record<string, any>) => {
    if(row.status === 'Check In'){
      return <CheckIn/> 
    }else if(row.status === 'Check Out'){
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
  booking.guest?.toLowerCase().includes(clientName.toLowerCase())
);

  //filtrar por status
  const [filterNav, setFilterNav] = useState<string>('All Bookings');
  const filteredBookings = bookings.filter((booking) => {
    switch(filterNav){
      case "All Bookings":
        return true;
      case "Check In":
        return booking.status === "Check In"
      case "Check Out":
        return booking.status === "Check Out"
      case "In Progress":
        return booking.status === "In Progress"
      default:
        return false;
    }
  })


const [selected, setSelected] = useState("Orderdate");
//Ordenar por...
if (selected === "Orderdate") {
  filteredBookings.sort((a, b) => {
    const dateA = new Date(a.order_date);
    const dateB = new Date(b.order_date);
    return dateB.getTime() - dateA.getTime();
  });
} else if (selected === "Checkin") {
  filteredBookings.sort((a, b) => {
    const dateA = new Date(a.check_in);
    const dateB = new Date(b.check_in);
    return dateB.getTime() - dateA.getTime();
  });
} else if (selected === "Checkout") {
  filteredBookings.sort((a, b) => {
    const dateA = new Date(a.check_out);
    const dateB = new Date(b.check_out);
    return dateB.getTime() - dateA.getTime();
  });
} else if (selected === "Guest") {
  filteredBookings.sort((a, b) => {
    const nombreA = a.guest.toUpperCase();
    const nombreB = b.guest.toUpperCase();
    if (nombreA < nombreB) {
      return -1;
    }
    if (nombreA > nombreB) {
      return 1;
    }
    return 0;
  });
}

// if (orderBy === "guest") {
//   filteredArray.sort((a: BookingsInterface, b: BookingsInterface) =>
//     a.guest.localeCompare(b.guest, undefined, { sensitivity: "base" })
//   );

//Data que traemos dependiendo los filtros
  const finalFilteredBookings = clientName ? searchBookings : filteredBookings;

  const cols = [
    {
      property: 'guest',
      label: 'Guest',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <span>{row.guest}</span>
          <Link to={`/home/bookings/${row._id}`} >ID: {row._id}</Link>
        </CellContainer>
      ),
    },
    {
      property: 'orderdate',
      label: 'Order Date',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <OrderDateText>{row.order_date.replace(
            /\d{2}:\d{2}:\d{2} GMT\+0000 \(GMT\)/,''
          )}
          </OrderDateText>
        </CellContainer>
      ),
    },
    {
      property: 'checkin',
      label: 'Check In',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <CheckInText>{row.check_in.replace(
						/\d{2}:\d{2}:\d{2} GMT\+0000 \(GMT\)/,
						''
					)}</CheckInText>
        </CellContainer>
      ),
    },
    {
      property: 'checkout',
      label: 'Check Out',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <CheckOutText>{row.check_out.replace(
						/\d{2}:\d{2}:\d{2} GMT\+0000 \(GMT\)/,
						''
					)}</CheckOutText>
        </CellContainer>
      ),
    },
    {
      property: 'specialrequest',
      label: 'Special Request',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <Button onClick={() => handleOpenPopUp(row._id)}>View Notes</Button>
          {popUpStates[row._id] && 
          <RequestPopUp
            data={row.special_request}
            onClose={() => {
              handleClosePopUp(row._id);
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
            {row.room_type}
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
          <DeleteIconContainer ><DeleteIcon onClick={() => onDeleteBooking(row._id)}/></DeleteIconContainer>
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
  color: #787f9d;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Poppins';
  text-overflow: ellipsis;
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
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
const OrderDateText = styled.span`
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  background-color: #7884a3;
  border-radius: 3px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 0.4px;
`;
const CheckInText = styled.span`
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  background-color: #7884a3;
  border-radius: 3px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 0.4px;
`;
const CheckOutText = styled.span`
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  background-color: #7884a3;
  border-radius: 3px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 0.4px;
`;

