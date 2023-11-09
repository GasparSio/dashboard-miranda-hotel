import React, { useEffect, useState } from "react";
import { deleteUser, fetchUsers} from '../../features/users/userSlice';
import { UsersNav } from "./UsersNav";
import Table from "../Table";
import { CellContainer, LineContainerComment, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import { MdDelete } from "react-icons/md";
import { Active, Inactive } from "./StatusButton";
import styled from "styled-components";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';

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
  const handleUserNameChange = (newUserName: string) => {
    setuserName(newUserName);
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

  const finalFilteredUsers = userName ? searchUsers : filteredUsers;

  const cols = [
    {
      property: 'name',
      label: 'Full Name',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.fullname}</PropertyText>
          <PropertyText>Id: {row.id}</PropertyText>
          <PropertyText>{row.email}</PropertyText>
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
<<<<<<< HEAD:src/Components/Users/Users.jsx
      property: 'statusDelete',
=======
      property: 'delete',
>>>>>>> with-typescript:src/Components/Users/Users.tsx
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
          <UsersNav 
            onUserNameChange={handleUserNameChange}
            onFilterButtonClick={setFilterNav} 
            filter={filterNav}
          />
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

