import React, { useState } from 'react'
import styled from 'styled-components';
import { createRoom } from '../../features/rooms/roomSlice';
// import { useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai'

export function BookingNavContainer() {
  // const dispatch = useDispatch()
  const [activeButton, setActiveButton] = useState(null);

  const toggle = (activeState) => {
    setActiveButton(activeState);
  };

  const isAllBookingsActive = activeButton === 'allBookings';
  const isCheckInActive = activeButton === 'checkIn';
  const isCheckOutActive = activeButton === 'checkOut';
  const isProgressActive = activeButton === 'progress';
    return (
      <WrapperBookingNavContainer>
        <LeftNavContainer>
          <WrapperButton isActive={isAllBookingsActive}>
            <Button onClick={() => toggle('allBookings')}>All Bookings</Button>
          </WrapperButton>
          <WrapperButton isActive={isCheckInActive}>
            <Button onClick={() => toggle('checkIn')}>Check In</Button>
          </WrapperButton>
          <WrapperButton isActive={isCheckOutActive}>
            <Button onClick={() => toggle('checkOut')}>Check Out</Button>
          </WrapperButton>
          <WrapperButton isActive={isProgressActive}>
            <Button onClick={() => toggle('progress')}>In Progress</Button>
          </WrapperButton>
            <WrapperInput>
              <SearchIcon/>
              <Input 
                placeholder='Client Name'/>
            </WrapperInput>
        </LeftNavContainer>
        <RightNavContainer>
            <Select id="selectPrice" name="sort" >
                <Option value="none">Sort by</Option>
                <Option value="guest-asc">Guest A-Z</Option>
                <Option value="date-asc">Order Date</Option>
                <Option value="date-asc">Check In</Option>
                <Option value="date-asc">Check out</Option>
            </Select>
        </RightNavContainer>
      
      </WrapperBookingNavContainer>
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
    width: 85%;
    height: 40px;
    justify-content: space-between;
    align-items: center;
`;
const WrapperButton = styled.div`
    border-bottom: ${(props) => props.isActive ? '3px solid #135846' : 'none'};
    height: 42px;
    width: 130px;
    display: flex;
    justify-content: center;
`;
const WrapperInput = styled.div`
  display: flex;
  position: relative;
  height: 35px;
`
const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  left: 8px;
  top: 8px;
`
const Input = styled.input`
  border-radius: 12px;
  border: 1px solid #135846;
  color: #6E6E6E;
  font-family: Poppins;
  font-size: 13px;
  padding-left: 30px;
`
const Button = styled.button`
    border: none;
    background-color: transparent;
    color: ${(props) => props.isActive ? '#135846' : '#6E6E6E'};
    font-family: Poppins;
    font-size: 16px;
`;


const RightNavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 15%;
  align-items: center;
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