import { useEffect, useState } from "react";
import { deleteOneRoom, fetchAllRooms } from '../../features/rooms/roomSlice';
import { CellContainer, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import { FilterButton, Select, WrapperButton, Option } from '../StyledFilterButtons';
import Table from "../Table";
import styled from "styled-components";
import { Available, Booked } from "./StatusButton";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';
import { BarLoader } from 'react-spinners';
import { colors } from "../theme";
import Swal from "sweetalert2";

export const Rooms = () => {
  const dispatch = useCustomDispatch()
  const rooms = useCustomSelector(state => state.rooms.rooms);
  const width = useCustomSelector(state => state.visual.width);
  const loadingStatus = useCustomSelector((state) => state.rooms.status);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllRooms())
  }, [dispatch])

  useEffect(() => {
        if(loadingStatus === 'pending'){
            setIsLoading(true)
        }else{
            setIsLoading(false)
        }
    }, [loadingStatus])
  
  const statusHandler = (row: Record<string, any>) => {
    if(row.status === 'Booked'){
      return <Booked/> 
    }else{
      return <Available/>
    }
  }


  const onDeleteRoom = (roomId: string) => {
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
        dispatch(deleteOneRoom(roomId));
        // Muestra la alerta de éxito después de eliminar
        Swal.fire({
          title: 'Deleted!',
          text: 'The room has been deleted.',
          icon: 'success',
        });
      }
    });
  }
  

  //filtrar por status
  const [filterNav, setFilterNav] = useState<string>('All Rooms');
  const filteredRooms = rooms.filter((room) => {
    switch(filterNav){
      case "All Rooms":
        return true;
      case "Booked":
        return room.status === "Booked"
      case "Available":
        return room.status === "Available"
      default:
        return false;
    }
  })


const [orderBy, setOrderBy] = useState("none");
const [selected, setSelected] = useState("Room-Number-Asc");

//Ordenar por...
if (selected === "Room-Number-Asc") {
  filteredRooms.sort((a, b) => {
    return a.roomNumber - b.roomNumber;
  });
} else if (selected === "Room-Number-Des") {
  filteredRooms.sort((a, b) => {
    return b.roomNumber - a.roomNumber;
  });
} else if (selected === "Price-Asc") {
  filteredRooms.sort((a, b) => {
    return a.offerprice - b.offerprice;
  });
} else if (selected === "Price-Desc") {
  filteredRooms.sort((a, b) => {
    return b.offerprice - a.offerprice;
  });
}

const getRandomFacilities = (facilitiesArray: string[], count: number): string[] => {
  const copiedArray = [...facilitiesArray]; // Crear una copia del array original
  const shuffledArray = copiedArray.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
};
  const cols = [
    {
      property: 'roomname',
      label: 'Room',
      display: (row: Record<string, any>) => {
         return (
          <ImageContainer>
            <img src={row.photo} alt="Room" />
            <TextContainer>
              <PropertyText>Room: {row.roomNumber}</PropertyText>
              <TextId>Id: {row._id}</TextId>
            </TextContainer>
          </ImageContainer>
        );
      },
    },
    {
      property: 'bedtype',
      label: 'Bed Type',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.bedType}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'facilities',
      label: 'Facilities',
      display: (row: Record<string, any>) => (
        <CellContainer>
          {row.facilities && getRandomFacilities(row.facilities, 4).map((facility, index) => (
            <AmenityText key={index}>{facility}</AmenityText>
          ))}
        </CellContainer>
      ),
    },
    {
      property: 'price',
      label: 'Price',
      display: (row: Record<string, any>) => (
        <OfferPriceContainer>
          <PriceText>{row.price}</PriceText><MdOutlineEuroSymbol/>
        </OfferPriceContainer>
      ),
    },
    {
      property: 'offerprice',
      label: 'Offer Price',
      display: (row: Record<string, any>) => {
        const discountedPrice = (row.price * 0.8).toFixed(0); // Redondear a cero decimales
        return (
          <OfferPriceContainer>
            <OfferPriceText>{discountedPrice}</OfferPriceText><MdOutlineEuroSymbol/>
          </OfferPriceContainer>
        );
      },
    },
    {
      property: 'status',
      label: 'Status',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <BotonStatusText>{statusHandler(row)}</BotonStatusText>
        </CellContainer>
      ),
    },
    {
      property: 'delete',
      label: '',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <DeleteIconContainer ><DeleteIcon onClick={() => onDeleteRoom(row._id)}/></DeleteIconContainer>
          
          
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
                color: filterNav === 'All Rooms' ? colors.filterGreenButton : undefined,
                borderBottom: filterNav === 'All Rooms' ? `3px solid ${colors.filterGreenButton}` : undefined,
                fontWeight: filterNav === 'All Rooms' ? 600 : undefined,
              }} 
              onClick={() => setFilterNav('All Rooms')}>All Rooms</FilterButton>
            </WrapperButton>
            <WrapperButton >
              <FilterButton style={{
                color: filterNav === 'Booked' ? colors.filterGreenButton : undefined,
                borderBottom: filterNav === 'Booked' ? `3px solid ${colors.filterGreenButton}` : undefined,
                fontWeight: filterNav === 'Booked' ? 600 : undefined,
              }} 
              onClick={() => setFilterNav('Booked')}>Booked</FilterButton>
            </WrapperButton>
            <WrapperButton >
              <FilterButton style={{
                color: filterNav === 'Available' ? colors.filterGreenButton : undefined,
                borderBottom: filterNav === 'Available' ? `3px solid ${colors.filterGreenButton}` : undefined,
                fontWeight: filterNav === 'Available' ? 600 : undefined,
              }}
              onClick={() => setFilterNav('Available')}>Available</FilterButton>
            </WrapperButton>
          </LeftNavContainer>
          <RightNavContainer>
                  {/* <NewButton >+ New Room</NewButton> */}
                  <Select 
                  value={orderBy} 
                  onInput={(event) => {
                    const selectedValue = (event.target as HTMLSelectElement).value;
                    setSelected(selectedValue);
                  }}
                  >
                      <Option value="none">Sort by:</Option>
                      <Option value="Price-Asc">Offer Price: Asc</Option>
                      <Option value="Price-Desc">Offer Price: Des</Option>
                      <Option value="Room-Number-Asc">Room: Asc</Option>
                      <Option value="Room-Number-Des">Room: Des</Option>
                  </Select>
              </RightNavContainer>
          </WrapperBookingNavContainer>
          <Table cols={cols} data={filteredRooms}/>
          {isLoading && (
          <LoaderContainer>
              <BarLoader color="#7884a3" />
          </LoaderContainer>
        )}
        </Wrapperdashboardcontainer>
    )
}
const WrapperBookingNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
`;
const LeftNavContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%;
    height: 40px;
    justify-content: space-between;
    align-items: center;
`;

const RightNavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
  align-items: center;
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
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    width: 95%;
    border-radius: 6px;
  }
`;
const TextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const NewButton = styled.button`
  color: #FFFFFF;
  border-radius: 12px;
  background-color: #135846;
  text-align: center;
  border: none;
  width: 143px;
  height: 35px;
  font-family: Poppins;
  font-weight: 400;
  font-size: 16px;
`;
const TextId = styled.span`
  text-overflow: ellipsis;
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
`;
const AmenityText = styled.span`
  width: 95%;
  background-color: #4759b7;
  margin-bottom: 5px;
  color: white;
  border-radius: 5px;
  text-align: center;
`;
const PriceText = styled.span`
  color: #8f8e8e;
  text-align: center;
  text-decoration: line-through;
`;
const OfferPriceText = styled.span`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
`;
const OfferPriceContainer = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  justify-content: space-evenly;
  width: 60px;
`;
const BotonStatusText = styled.span`
  width: 95%;
`;
const LoaderContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: -50%;
    transform: translate(-50%);
`;