import React, { useState } from 'react'
import styled from 'styled-components';
import { WrapperButton, Button, WrapperInput, SearchIcon, Input, Select, Option } from '../StyledFilterButtons';

export function UsersNav({onUserNameChange}) {
  const [activeButton, setActiveButton] = useState(null);
  const [userName, setuserName] = useState('');

  const toggle = (activeState) => {
    setActiveButton(activeState);
  };

  const handleUserNameChange = (event) => {
    const newValue = event.target.value;
    setuserName(newValue);
    onUserNameChange(newValue);
  };

  const allEmployee = activeButton === 'allEmployee';
  const isActiveEmployee = activeButton === 'activeEmployee';
  const isInactiveEmployee = activeButton === 'inactiveEmployee';
    return (
      <WrapperBookingNavContainer>
        <LeftNavContainer>
          <WrapperButton isactive={allEmployee}>
            <Button onClick={() => toggle('allEmployee')}>All Employee</Button>
          </WrapperButton>
          <WrapperButton isactive={isActiveEmployee}>
            <Button onClick={() => toggle('activeEmployee')}>Active Employee</Button>
          </WrapperButton>
          <WrapperButton isactive={isInactiveEmployee}>
            <Button onClick={() => toggle('inactiveEmployee')}>Inactive Employee</Button>
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
