import React from 'react'
import styled from 'styled-components';
// import { createRoom } from '../../features/rooms/roomSlice';
// import { useDispatch } from 'react-redux';

export function RoomsNavContainer() {
    // const dispatch = useDispatch()
    const newRoomHandler = () => {
        // dispatch(createRoom())
    }
    return (
    <Container>
        <NewButton onClick={newRoomHandler}>+ New Room</NewButton>
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
  )
}

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