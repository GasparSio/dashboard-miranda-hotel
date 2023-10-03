import React, { useState } from 'react'
import styled from 'styled-components';
import { Button, Input, SearchIcon, Select, WrapperButton, WrapperInput, Option } from '../StyledFilterButtons';
import { colors } from '../theme';

export function BookingNav({ onClientNameChange, onFilterButtonClick, filter }) {
  const [clientName, setClientName] = useState('');
  
  const handleClientNameChange = (event) => {
    const newValue = event.target.value;
    setClientName(newValue);
    onClientNameChange(newValue);
  };

    return (
      <WrapperBookingNavContainer>
        <LeftNavContainer>
          <WrapperButton >
            <Button style={{
              color: filter === 'All Bookings' && `${colors.filterGreenButton}`,
              borderBottom: filter === 'All Bookings' && `3px solid ${colors.filterGreenButton}`,
              fontWeight: filter === 'All Bookings' && `600`,
            }} 
            onClick={() => onFilterButtonClick('All Bookings')}>All Bookings</Button>
          </WrapperButton>
          <WrapperButton >
            <Button style={{
              color: filter === 'Check In' && `${colors.filterGreenButton}`,
              borderBottom: filter === 'Check In' && `3px solid ${colors.filterGreenButton}`,
              fontWeight: filter === 'Check In' && `600`,
            }} 
            onClick={() => onFilterButtonClick('Check In')}>Check In</Button>
          </WrapperButton>
          <WrapperButton >
            <Button style={{
              color: filter === 'Check Out' && `${colors.filterGreenButton}`,
              borderBottom: filter === 'Check Out' && `3px solid ${colors.filterGreenButton}`,
              fontWeight: filter === 'Check Out' && `600`,
            }} 
            onClick={() => onFilterButtonClick('Check Out')}>Check Out</Button>
          </WrapperButton>
          <WrapperButton >
            <Button style={{
              color: filter === 'In Progress' && `${colors.filterGreenButton}`,
              borderBottom: filter === 'In Progress' && `3px solid ${colors.filterGreenButton}`,
              fontWeight: filter === 'In Progress' && `600`,
            }} 
            onClick={() => onFilterButtonClick('In Progress')}>In Progress</Button>
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

