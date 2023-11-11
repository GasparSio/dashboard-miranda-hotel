import React, { ChangeEvent, useEffect, useState } from "react";
import { deleteUser, fetchUsers} from '../../features/users/userSlice';
import Table from "../Table";
import { CellContainer, LineContainerComment, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import { MdDelete } from "react-icons/md";
import { Active, Inactive } from "./StatusButton";
import styled from "styled-components";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';
import { WrapperButton, FilterButton, WrapperInput, SearchIcon, Input, Select, Option } from '../StyledFilterButtons';
import { colors } from '../theme';

export const Users = () => {
  const dispatch = useCustomDispatch()
  const users = useCustomSelector(state => state.users.users);
  const width = useCustomSelector(state => state.visual.width);
  
  useEffect(() => {
    dispatch(fetchUsers({}))
  }, [dispatch])
  
  const onDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId))
  }

  const statusHandler = (row: Record<string, any>) => {
    if(row.status === 'active'){
      return <Active/> 
    }else {
      return <Inactive/>
    }
  }

  const [userName, setuserName] = useState('');
  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setuserName(newValue);
  };
    const searchUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(userName.toLowerCase())
  );

  const [filterNav, setFilterNav] = useState('All Employee');
  const filteredUsers = users.filter((booking) => {
    switch(filterNav){
      case "All Employee":
        return true;
      case "Active Employee":
        return booking.status === "active"
      case "Inactive Employee":
        return booking.status === "inactive"
      default:
        return false;
    }
  })

  const [orderBy, setOrderBy] = useState("none");
  const [selected, setSelected] = useState("guest-asc");
  //Ordenar por...
  if (selected === "guest-asc") {
    filteredUsers.sort((a, b) => {
      const nombreA = a.fullname.toUpperCase();
      const nombreB = b.fullname.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
  } else if (selected === "guest-des") {
    filteredUsers.sort((a, b) => {
      const nombreA = a.fullname.toUpperCase();
      const nombreB = b.fullname.toUpperCase();
      if (nombreA > nombreB) {
        return -1;
      }
      if (nombreA < nombreB) {
        return 1;
      }
      return 0;
    });
  }



  const finalFilteredUsers = userName ? searchUsers : filteredUsers;

  const cols = [
    {
      property: 'name',
      label: 'Full Name',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.fullname}</PropertyText>
          <PropertyText>Id: {row.id}</PropertyText>
          <EmailText>{row.email}</EmailText>
        </CellContainer>
      ),
    },
    {
      property: 'startdate',
      label: 'Start Date',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.startdate}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'description',
      label: 'Description',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.description}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'contact',
      label: 'Contact',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.contact}</PropertyText>
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
          <DeleteIconContainer ><DeleteIcon onClick={() => onDeleteUser(row.id)}/></DeleteIconContainer>
        </CellContainer>
      ),
    },
]
    return(
      <>
        <Wrapperdashboardcontainer width={width}>
            <WrapperBookingNavContainer>
            <LeftNavContainer>
              <WrapperButton >
                <FilterButton style={{
                  color: filterNav === 'All Employee' ? colors.filterGreenButton : undefined,
                  borderBottom: filterNav === 'All Employee' ? `3px solid ${colors.filterGreenButton}` : undefined,
                  fontWeight: filterNav === 'All Employee' ? 600 : undefined,
                }} 
                onClick={() => setFilterNav('All Employee')}>All Employee</FilterButton>
              </WrapperButton>
              <WrapperButton>
                <FilterButton style={{
                  color: filterNav === 'Active Employee' ? colors.filterGreenButton : undefined,
                  borderBottom: filterNav === 'Active Employee' ? `3px solid ${colors.filterGreenButton}` : undefined,
                  fontWeight: filterNav === 'Active Employee' ? 600 : undefined,
                }} 
                onClick={() => setFilterNav('Active Employee')}>Active Employee</FilterButton>
              </WrapperButton>
              <WrapperButton>
                <FilterButton style={{
                  color: filterNav === 'Inactive Employee' ? colors.filterGreenButton : undefined,
                  borderBottom: filterNav === 'Inactive Employee' ? `3px solid ${colors.filterGreenButton}` : undefined,
                  fontWeight: filterNav === 'Inactive Employee' ? 600 : undefined,
                }} 
                onClick={() => setFilterNav('Inactive Employee')}>Inactive Employee</FilterButton>
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
                <Select 
                value={orderBy} 
                onInput={(event) => {
                  const selectedValue = (event.target as HTMLSelectElement).value;
                  setSelected(selectedValue);
                }}
                >
                    <Option value="none">Sort by</Option>
                    <Option value="guest-asc">Name A-Z</Option>
                    <Option value="guest-des">Name Z-A</Option>
                </Select>
            </RightNavContainer>
          </WrapperBookingNavContainer>
          <Table cols={cols} data={finalFilteredUsers}/>
        </Wrapperdashboardcontainer>
      </>
    )
}

const DeleteIcon = styled(MdDelete)`
  cursor: pointer;
  color: #bd2929;
  width: 20px;
  height: 20px;
  text-align: center;
`;
const DeleteIconContainer = styled.span`
  text-align: center;
`;
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

const EmailText = styled.span`
  font-size: 12px;
`;