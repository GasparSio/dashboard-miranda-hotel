import React from "react";
import { useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { Reviews } from "../Dashboard/Reviews";
import { WrapperButton, Button } from '../StyledFilterButtons';
import Table from '../Table';
import { fetchContacts, updateContact } from "../../features/contact/contactSlice";
import { CustomWrapperStyles, CellContainer, LineContainer, LineContainerComment, ValueText, PropertyText, Archived } from '../StyledTable';

export const Contact = (props) => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contact.contacts);
  const width = useSelector(state => state.visual.width);

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
          <LineContainer><Archived >Archive</Archived></LineContainer>
        </CellContainer>
      ),
    },
  ]

  const [allContactActive, setallContactActive] = useState(false);
  const [archivedActive, setarchivedActive] = useState(false);

  const handleAllContact = () => {
      setallContactActive(true)
      setarchivedActive(false)
      dispatch(updateContact())
  }
  const handleArchived = () => {
      setallContactActive(false)
      setarchivedActive(true)
  }

  return(
    <>
      <CustomWrapperStyles width={width}>
        <Reviews />
      </CustomWrapperStyles>
      <WrapperContactNav>
        <WrapperButton isActive={allContactActive}>
            <Button onClick={handleAllContact}>All Contacts</Button>
        </WrapperButton>
        <WrapperButton isActive={archivedActive}>
            <Button onClick={handleArchived}>Archived</Button>
        </WrapperButton>
      </WrapperContactNav>
      <Wrapperdashboardcontainer width={width}>
       <Table cols={cols} data={contacts}/>
      </Wrapperdashboardcontainer>
    </>
  )
}
const Wrapperdashboardcontainer = styled.section`
  position: absolute;
  top: 53%;
  right: 2%;
  width: ${(props) => (props.width === '75%' ? '70%' : '96%')};
  z-index: 999;
  background-color: #F8F8F8;
`;
const WrapperContactNav = styled.div`
    position: absolute;
    top: 46%;
    right: 47%;
    display: flex;
    flex-direction: row;
    width: 280px;
    height: 40px;
    justify-content: space-between;
    align-items: center;
`;