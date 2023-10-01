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
          <PropertyText>{row.date}</PropertyText>
          <PropertyText>Id: {row.id}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'customers',
      label: 'Customers',
      display: (row) => (
        <CellContainer>
          <PropertyText>{row.fullname}</PropertyText>
          <PropertyText>{row.email}</PropertyText>
          <PropertyText>{row.phone}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'comment',
      label: 'Comment',
      display: (row) => (
        <SubjectContainer>
          <SubjecText>{row.asunto}</SubjecText>
          <PropertyText>{row.comment}</PropertyText>
        </SubjectContainer>
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
        <WrapperButton isactive={allContactActive}>
            <Button onClick={handleAllContact}>All Contacts</Button>
        </WrapperButton>
        <WrapperButton isactive={archivedActive}>
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
const SubjecText = styled.span`
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
  color: black;
`;
const SubjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto
`;