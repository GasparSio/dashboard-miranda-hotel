import React, { useState } from 'react'
import styled from 'styled-components';
import { WrapperButton, Button, WrapperInput, SearchIcon, Input, Select, Option } from '../StyledFilterButtons';
import { colors } from '../theme';

export function UsersNav({onUserNameChange, onFilterButtonClick, filter}) {
  const [userName, setuserName] = useState('');

  const handleUserNameChange = (event) => {
    const newValue = event.target.value;
    setuserName(newValue);
    onUserNameChange(newValue);
  };


    return (
      <WrapperBookingNavContainer>
        <LeftNavContainer>
          <WrapperButton >
            <Button style={{
              color: filter === 'All Employee' && `${colors.filterGreenButton}`,
              borderBottom: filter === 'All Employee' && `3px solid ${colors.filterGreenButton}`,
              fontWeight: filter === 'All Employee' && `600`,
            }} 
            onClick={() => onFilterButtonClick('All Employee')}>All Employee</Button>
          </WrapperButton>
          <WrapperButton>
            <Button style={{
              color: filter === 'Active Employee' && `${colors.filterGreenButton}`,
              borderBottom: filter === 'Active Employee' && `3px solid ${colors.filterGreenButton}`,
              fontWeight: filter === 'Active Employee' && `600`,
            }} 
            onClick={() => onFilterButtonClick('Active Employee')}>Active Employee</Button>
          </WrapperButton>
          <WrapperButton>
            <Button style={{
              color: filter === 'Inactive Employee' && `${colors.filterGreenButton}`,
              borderBottom: filter === 'Inactive Employee' && `3px solid ${colors.filterGreenButton}`,
              fontWeight: filter === 'Inactive Employee' && `600`,
            }} 
            onClick={() => onFilterButtonClick('Inactive Employee')}>Inactive Employee</Button>
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
