import React, { useState } from 'react'
import styled from 'styled-components';
import { Button, Input, SearchIcon, Select, WrapperButton, WrapperInput, Option } from '../StyledFilterButtons';

export function BookingNav({ onClientNameChange }) {
  const [activeButton, setActiveButton] = useState('allBookings');
  const [clientName, setClientName] = useState('');
  
  const toggle = (activeState) => {
    setActiveButton(activeState);
  };

  const handleClientNameChange = (event) => {
    const newValue = event.target.value;
    setClientName(newValue);
    onClientNameChange(newValue);
  };

  const isAllBookingsActive = activeButton === 'allBookings';
  const isCheckInActive = activeButton === 'checkIn';
  const isCheckOutActive = activeButton === 'checkOut';
  const isProgressActive = activeButton === 'progress';
    return (
      <WrapperBookingNavContainer>
        <LeftNavContainer>
          <WrapperButton isactive={isAllBookingsActive }>
            <Button onClick={() => toggle('allBookings')}>All Bookings</Button>
          </WrapperButton>
          <WrapperButton isactive={isCheckInActive }>
            <Button onClick={() => toggle('checkIn')}>Check In</Button>
          </WrapperButton>
          <WrapperButton isactive={isCheckOutActive }>
            <Button onClick={() => toggle('checkOut')}>Check Out</Button>
          </WrapperButton>
          <WrapperButton isactive={isProgressActive }>
            <Button onClick={() => toggle('progress')}>In Progress</Button>
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

const RightNavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 15%;
  align-items: center;
`;

