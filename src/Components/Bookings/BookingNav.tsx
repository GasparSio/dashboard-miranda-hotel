import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FilterButton, Input, SearchIcon, Select, WrapperButton, WrapperInput, Option } from '../StyledFilterButtons';
import { colors } from '../theme';
import { ChangeEvent } from 'react';
import { useCustomSelector } from '../../hooks/redux';

interface BookingNavProps {
  onClientNameChange: (newClientName: string) => void;
  onFilterButtonClick: (filter: string) => void;
  filter: string;
}

export function BookingNav({ onClientNameChange, onFilterButtonClick, filter }: BookingNavProps) {
  const bookings = useCustomSelector(state => state.bookings.bookings);
  const [clientName, setClientName] = useState('');
  const [ bookingState, setBookingState ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ page, setPage] = useState(0);
  const [ perPage, setPerPage] = useState(0);
  const [orderBy, setOrderBy] = useState("none");

  const handleClientNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setClientName(newValue);
    onClientNameChange(newValue);
  };

    return (
      <WrapperBookingNavContainer>
        <LeftNavContainer>
          <WrapperButton >
            <FilterButton style={{
              color: filter === 'All Bookings' ? colors.filterGreenButton : undefined,
              borderBottom: filter === 'All Bookings' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filter === 'All Bookings' ? 600 : undefined,
            }} 
            onClick={() => onFilterButtonClick('All Bookings')}>All Bookings</FilterButton>
          </WrapperButton>
          <WrapperButton >
            <FilterButton style={{
              color: filter === 'Check In' ? colors.filterGreenButton : undefined,
              borderBottom: filter === 'Check In' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filter === 'Check In' ? 600 : undefined,
            }} 
            onClick={() => onFilterButtonClick('Check In')}>Check In</FilterButton>
          </WrapperButton>
          <WrapperButton >
            <FilterButton style={{
              color: filter === 'Check Out' ? colors.filterGreenButton : undefined,
              borderBottom: filter === 'Check Out' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filter === 'Check Out' ? 600 : undefined,
            }}
            onClick={() => onFilterButtonClick('Check Out')}>Check Out</FilterButton>
          </WrapperButton>
          <WrapperButton >
            <FilterButton style={{
              color: filter === 'In Progress' ? `${colors.filterGreenButton}` : undefined,
              borderBottom: filter === 'In Progress' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filter === 'In Progress' ? 600 : undefined,
            }} 
            onClick={() => onFilterButtonClick('In Progress')}>In Progress</FilterButton>
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
            <Select value={orderBy} 
            // onChange={event => onOrderByChange(event.target.value)} 
            >
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
