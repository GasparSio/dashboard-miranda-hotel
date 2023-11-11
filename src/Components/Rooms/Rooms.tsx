import { useEffect, useState } from "react";
import { deleteRoom, fetchRooms } from '../../features/rooms/roomSlice';
import { CellContainer, LineContainerComment, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import { FilterButton, Select, WrapperButton, Option } from '../StyledFilterButtons';
import Table from "../Table";
import styled from "styled-components";
import { Available, Booked } from "./StatusButton";
import { MdDelete } from "react-icons/md";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';
import image1 from '../../Img/room-1.avif';
import image2 from '../../Img/room-2.avif';
import image3 from '../../Img/room-3.avif';
import image7 from '../../Img/room-7.avif';
import image8 from '../../Img/room-8.avif';
import { colors } from "../theme";

export const Rooms = () => {
  const dispatch = useCustomDispatch()
  const rooms = useCustomSelector(state => state.rooms.rooms);
  const width = useCustomSelector(state => state.visual.width);


  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  const statusHandler = (row: Record<string, any>) => {
    if(row.status === 'booked'){
      return <Booked/> 
    }else{
      return <Available/>
    }
  }
  const onDeleteRoom = (roomId: number) => {
    dispatch(deleteRoom(roomId))
  }


  //filtrar por status
  const [filterNav, setFilterNav] = useState<string>('All Rooms');
  const filteredRooms = rooms.filter((room) => {
    switch(filterNav){
      case "All Rooms":
        return true;
      case "Booked":
        return room.status === "booked"
      case "Available":
        return room.status === "available"
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

  const images = [image1, image2, image3, image7, image8]

  const cols = [
    {
      property: 'roomname',
      label: 'Room Name',
      display: (row: Record<string, any>) => {
        // Mueve la generación del índice y la selección de la imagen aquí
        const getRandomIndex = () => Math.floor(Math.random() * images.length);
        const randomIndex = getRandomIndex();
        const selectedImage = images[randomIndex];
  
        return (
          <ImageContainer>
            <img src={selectedImage} alt="Room" />
            <TextContainer>
              <PropertyText>{row.roomNumber}</PropertyText>
              <PropertyText>Id: {row.id}</PropertyText>
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
          <PropertyText>{row.facilities}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'price',
      label: 'Price',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.price}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'offerprice',
      label: 'Offer Price',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.offerprice}</PropertyText>
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
          <DeleteIconContainer ><DeleteIcon onClick={() => onDeleteRoom(row.id)}/></DeleteIconContainer>
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
                  <NewButton >+ New Room</NewButton>
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
  justify-content: space-between;
  img{
    width: 50%;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
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
