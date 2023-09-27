import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers} from '../../features/users/userSlice';
import { UsersNav } from "./UsersNav";
import Table from "../Table";
import { CellContainer, LineContainer, LineContainerComment, ValueText, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';

export const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users);
  const width = useSelector(state => state.visual.width);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  // const onDeleteRoom = (userId) => {
  //   dispatch(deleteUser(userId))
  // }
  const cols = [
    {
      property: 'name',
      label: 'Full Name',
      display: (row) => (
        <CellContainer>
          <LineContainer><ValueText>Name: </ValueText><PropertyText>{row.fullname}</PropertyText></LineContainer>
          <LineContainer><ValueText>Id: </ValueText><PropertyText>{row.id}</PropertyText></LineContainer>
          <LineContainer><ValueText>Email: </ValueText><PropertyText>{row.email}</PropertyText></LineContainer>
        </CellContainer>
      ),
    },
    {
      property: 'startdate',
      label: 'Start Date',
      display: (row) => (
        <CellContainer>
          <LineContainer><ValueText>Start Date: </ValueText><PropertyText>{row.startdate}</PropertyText></LineContainer>
        </CellContainer>
      ),
    },
    {
      property: 'description',
      label: 'Description',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Description: </ValueText><PropertyText>{row.description}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'contact',
      label: 'Contact',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Phone: </ValueText><PropertyText>{row.contact}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'status',
      label: 'Status',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Status: </ValueText><PropertyText>{row.status}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
]
    return(
      <>
        <Wrapperdashboardcontainer width={width}>
          <UsersNav/>
          <Table cols={cols} data={users}/>
        </Wrapperdashboardcontainer>
      </>
    )
}