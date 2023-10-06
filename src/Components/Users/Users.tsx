import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers} from '../../features/users/userSlice';
import { UsersNav } from "./UsersNav";
import Table from "../Table";
import { CellContainer, LineContainerComment, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import { MdDelete } from "react-icons/md";
import { Active, Inactive } from "./StatusButton";
import styled from "styled-components";

export const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users);
  const width = useSelector(state => state.visual.width);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const onDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
  }

  const statusHandler = (row) => {
    if(row.status === 'active'){
      return <Active/> 
    }else {
      return <Inactive/>
    }
  }

  const [userName, setuserName] = useState('');
  const handleUserNameChange = (newUserName) => {
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
      display: (row) => (
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
      display: (row) => (
        <CellContainer>
          <PropertyText>{row.startdate}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'description',
      label: 'Description',
      display: (row) => (
        <CellContainer>
          <PropertyText>{row.description}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'contact',
      label: 'Contact',
      display: (row) => (
        <CellContainer>
          <PropertyText>{row.contact}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'status',
      label: 'Status',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><PropertyText>{statusHandler(row)}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'status',
      label: '',
      display: (row) => (
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

