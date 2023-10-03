import React from "react";
import { useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { Reviews } from "../Dashboard/Reviews";
import { WrapperButton, Button } from '../StyledFilterButtons';
import Table from '../Table';
import { fetchContacts, updateContact } from "../../features/contact/contactSlice";
import { CustomWrapperStyles, CellContainer, PropertyText } from '../StyledTable';
import { colors } from "../theme";

export const Contact = (props) => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contact.contacts);
  const width = useSelector(state => state.visual.width);

  useEffect(() => {
    dispatch(fetchContacts())

  }, [dispatch])

  const handleArchive = (contactId) => {
    dispatch(
      updateContact({
        contactId: contactId,
        update: { archived: true }, // Specify the property to update
      })
    );
  }
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
          {row.archived ? (
            <Archived>Archivado</Archived>
          ) : (
            <ArchiveButton onClick={() => handleArchive(row.id)} >
              Archive
            </ArchiveButton>
          )}
        </CellContainer>
      ),
    },
  ]


  const [filterNav, setFilterNav] = useState('All Contacts');
  
  const onFilterButtonClick = (filter) => {
    setFilterNav(filter);
  };

  const filteredContacts = contacts.filter((contact) => {
    switch (filterNav) {
      case 'All Contacts':
        return true;
      case 'Archived':
        return contact.archived === true;
      default:
        return false;
    }
  });

  return(
    <>
      <CustomWrapperStyles width={width}>
        <Reviews />
      </CustomWrapperStyles>
      <WrapperContactNav>
        <WrapperButton >
            <Button style={{
              color: filterNav === 'All Contacts' && `${colors.filterGreenButton}`,
              borderBottom: filterNav === 'All Contacts' && `3px solid ${colors.filterGreenButton}`,
              fontWeight: filterNav === 'All Contacts' && `600`,
            }} 
            onClick={() => onFilterButtonClick('All Contacts')}>All Contacts</Button>
        </WrapperButton>
        <WrapperButton>
            <Button style={{
              color: filterNav === 'Archived' && `${colors.filterGreenButton}`,
              borderBottom: filterNav === 'Archived' && `3px solid ${colors.filterGreenButton}`,
              fontWeight: filterNav === 'Archived' && `600`,
            }} 
            onClick={() => onFilterButtonClick('Archived')}>Archived</Button>
        </WrapperButton>
      </WrapperContactNav>
      <Wrapperdashboardcontainer width={width}>
       <Table cols={cols} data={filteredContacts}/>
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
const Archived = styled.span`
  background-color: ${colors.primaryGreen};
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
`
const ArchiveButton = styled.button`
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
`