import React from "react";
import { useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { Reviews } from "../Dashboard/Reviews";
import { ContactNav } from "./ContactNav";
import Table from '../Table';
import { colors } from "../theme";
import usersData from '../../features/contact/ContactReviews.json';
import { deleteContact, fetchContacts } from "../../features/contact/contactSlice";


export const Contact = (props) => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contact.contacts);
  const width = useSelector(state => state.visual.width);

  const [ users, setUsers ] = useState()
  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  const cols = [
    {
      property: 'date',
      label: 'Date',
      display: (row) => (
        <CellContainer>
          <LineContainer><ValueText>Date: </ValueText><PropertyText>{row.date}</PropertyText></LineContainer>
          <LineContainer><ValueText>Id: </ValueText><PropertyText>{row.id}</PropertyText></LineContainer>
        </CellContainer>
      ),
    },
    {
      property: 'customers',
      label: 'Customers',
      display: (row) => (
        <CellContainer>
          <LineContainer><ValueText>Full Name: </ValueText><PropertyText>{row.fullname}</PropertyText></LineContainer>
          <LineContainer><ValueText>Email: </ValueText><PropertyText>{row.email}</PropertyText></LineContainer>
          <LineContainer><ValueText>Phone: </ValueText><PropertyText>{row.phone}</PropertyText></LineContainer>
        </CellContainer>
      ),
    },
    {
      property: 'comment',
      label: 'Comment',
      display: (row) => (
        <CellContainer>
          <LineContainerComment><ValueText>Subject: </ValueText><PropertyText>{row.asunto}</PropertyText></LineContainerComment>
          <LineContainerComment><ValueText>Comment: </ValueText><PropertyText>{row.comment}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'status',
      label: 'Action',
      display: (row) => (
        <CellContainer>
          <LineContainer><Archived>Archive</Archived></LineContainer>
        </CellContainer>
      ),
    },
  ]


  // const onDeleteRoom = (contactId) => {
  //   dispatch(deleteContact(contactId))
  // }

  return(
    <>
      <CustomWrapperStyles width={width}>
        <Reviews />
      </CustomWrapperStyles>
      <ContactNav/>
      <Table cols={cols} data={usersData}/>
    </>
  )
}
const CustomWrapperStyles = styled.section`
  height: 275px;
  top: 84px;
  right: 0;
  position: relative;
  // width: ${(props) => (props.width === '75%' ? '70%' : '96%')} 
`;
const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const LineContainer = styled.div`
  display: flex;
`;
const LineContainerComment = styled.div`
  display: flex;
  flex-direction: column;
`;
const ValueText = styled.span`
  font-size: 14px;
  font-weight: 600;
  font-family: Poppins;
  color: #393939;
  margin-right: 6px;
`;
const PropertyText = styled.span`
  font-size: 14px;
  font-weight: 400;
  font-family: Poppins;
  color: #393939;
`;

const Archived = styled.button`
  background-color: ${colors.primaryRed};
  color: white;
  font-family: Poppins;
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 10px;
  width: 80px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: transform;
  &:hover {
    transform: scale(1.05);
  }
`;

