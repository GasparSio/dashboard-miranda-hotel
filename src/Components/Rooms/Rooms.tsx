import React, { useEffect } from "react";
import { deleteRoom, fetchRooms } from '../../features/rooms/roomSlice';
import { CellContainer, LineContainerComment, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
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
  const images = [image1, image2, image3, image7, image8]
  const getRandomIndex = () => Math.floor(Math.random() * images.length);
  const randomIndex = getRandomIndex();
  const selectedImage = images[randomIndex];
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
              <Container>
                <NewButton >+ New Room</NewButton>
                <Select id="selectStatus" name="status" >
                    <Option value="none">Sort by status:</Option>
                    <Option value="status-asc">Status: Empty</Option>
                    <Option value="status-desc">Status: Busy</Option>
                </Select>
                <Select id="selectPrice" name="price" >
                    <Option value="none">Sort by price:</Option>
                    <Option value="price-asc">Price: Ascending</Option>
                    <Option value="price-desc">Price: Descending</Option>
                </Select>
            </Container>
          <Table cols={cols} data={rooms}/>
        </Wrapperdashboardcontainer>
    )
}
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

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: flex-end;
  width: 100%;
  margin-top: 30px;
  align-items: center;
  height: 60px;
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
const Select = styled.select`
  color: #135846;
  border-radius: 12px;
  background-color:  #FFFFFF;
  text-align: center;
  border: 1px solid #135846;
  width: 143px;
  height: 35px;
  font-family: Poppins;
  font-weight: 400;
  font-size: 14px;
  margin-left: 30px;
`;
const Option = styled.option`
  color: #135846;
  border-radius: 12px;
  background-color:  #FFFFFF;
  text-align: center;
  border: 1px solid #135846;
  width: 143px;
  height: 35px;
  font-family: Poppins;
  font-weight: 400;
  font-size: 16px;
  margin-left: 25px;
`;
