import React, { useState } from 'react'
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai'

export function UsersNavContainer() {
  const [activeButton, setActiveButton] = useState(null);

  const toggle = (activeState) => {
    setActiveButton(activeState);
  };

  const allEmployee = activeButton === 'allEmployee';
  const isActiveEmployee = activeButton === 'activeEmployee';
  const isInactiveEmployee = activeButton === 'inactiveEmployee';
    return (
      <WrapperBookingNavContainer>
        <LeftNavContainer>
          <WrapperButton isActive={allEmployee}>
            <Button onClick={() => toggle('allEmployee')}>All Employee</Button>
          </WrapperButton>
          <WrapperButton isActive={isActiveEmployee}>
            <Button onClick={() => toggle('activeEmployee')}>Active Employee</Button>
          </WrapperButton>
          <WrapperButton isActive={isInactiveEmployee}>
            <Button onClick={() => toggle('inactiveEmployee')}>Inactive Employee</Button>
          </WrapperButton>
          <WrapperInput>
            <SearchIcon/>
            <Input 
              placeholder='Employee Name'/>
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
const WrapperButton = styled.div`
    border-bottom: ${(props) => props.isActive ? '3px solid #135846' : 'none'};
    height: 42px;
    width: 180px;
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