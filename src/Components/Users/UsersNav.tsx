import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components';
import { WrapperButton, FilterButton, WrapperInput, SearchIcon, Input, Select, Option } from '../StyledFilterButtons';
import { colors } from '../theme';

interface UsersNavProps {
  onUserNameChange: (newUserName: string) => void;
  onFilterButtonClick: (filter: string) => void;
  filter: string;
}

export function UsersNav({onUserNameChange, onFilterButtonClick, filter}: UsersNavProps) {
  const [userName, setuserName] = useState('');

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setuserName(newValue);
    onUserNameChange(newValue);
  };


    return (
      <WrapperBookingNavContainer>
        <LeftNavContainer>
          <WrapperButton >
            <FilterButton style={{
              color: filter === 'All Employee' ? colors.filterGreenButton : undefined,
              borderBottom: filter === 'All Employee' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filter === 'All Employee' ? 600 : undefined,
            }} 
            onClick={() => onFilterButtonClick('All Employee')}>All Employee</FilterButton>
          </WrapperButton>
          <WrapperButton>
            <FilterButton style={{
              color: filter === 'Active Employee' ? colors.filterGreenButton : undefined,
              borderBottom: filter === 'Active Employee' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filter === 'Active Employee' ? 600 : undefined,
            }} 
            onClick={() => onFilterButtonClick('Active Employee')}>Active Employee</FilterButton>
          </WrapperButton>
          <WrapperButton>
            <FilterButton style={{
              color: filter === 'Inactive Employee' ? colors.filterGreenButton : undefined,
              borderBottom: filter === 'Inactive Employee' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filter === 'Inactive Employee' ? 600 : undefined,
            }} 
            onClick={() => onFilterButtonClick('Inactive Employee')}>Inactive Employee</FilterButton>
          </WrapperButton>
          <WrapperInput>
            <SearchIcon/>
            <Input 
              placeholder='Search Employee Name'
              value={userName}
              onChange={handleUserNameChange}
            />
          </WrapperInput>
        </LeftNavContainer>
        <RightNavContainer>
            <Select id="selectPrice" name="sort" >
                <Option value="none">Sort by</Option>
                <Option value="guest-asc">Name A-Z</Option>
                <Option value="guest-des">Name Z-A</Option>
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
