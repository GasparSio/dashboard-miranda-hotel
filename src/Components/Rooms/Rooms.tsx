import React, { useEffect } from "react";
import { deleteRoom, fetchRooms } from '../../features/rooms/roomSlice';
import { RoomsNavContainer } from "./RoomsNavContainer";
import { CellContainer, LineContainerComment, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import Table from "../Table";
import roomImage from '../../Img/room-1.avif';
import styled from "styled-components";
import { Available, Booked } from "./StatusButton";
import { MdDelete } from "react-icons/md";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';


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

  const cols = [
    {
      property: 'roomname',
      label: 'Room Name',
      display: (row: Record<string, any>) => (
        <ImageContainer>
          <img src={roomImage} alt="Room" />
          <TextContainer>
            <PropertyText>{row.roomNumber}</PropertyText>
            <PropertyText>Id: {row.id}</PropertyText>
          </TextContainer>
        </ImageContainer>
      ),
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
        <RoomsNavContainer/>
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


