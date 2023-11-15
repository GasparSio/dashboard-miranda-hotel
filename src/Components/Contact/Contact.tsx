import React from "react";
import { useState, useEffect} from "react";
import styled from "styled-components";
import { Reviews } from "../Dashboard/Reviews";
import { WrapperButton, FilterButton } from '../StyledFilterButtons';
import Table from '../Table';
import { fetchContacts, updateContact } from "../../features/contact/contactSlice";
import { CustomWrapperStyles, CellContainer, PropertyText } from '../StyledTable';
import { colors } from "../theme";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';

export const Contact = () => {
  
  const dispatch = useCustomDispatch()
  const contacts = useCustomSelector(state => state.contact.contacts);
  const width = useCustomSelector(state => state.visual.width);

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  const handleArchive = (contactId: string) => {
    dispatch(updateContact(contactId)
    );
    console.log(contactId);
  }
  const cols = [
    {
      property: 'date',
      label: 'Date',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <DateText>{row.date}</DateText>
          <IdText>Id: {row._id}</IdText>
        </CellContainer>
      ),
    },
    {
      property: 'customers',
      label: 'Customers',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <NameText>{row.full_name}</NameText>
          <EmailText>{row.email}</EmailText>
          <PhoneText>{row.phone_number}</PhoneText>
        </CellContainer>
      ),
    },
    {
      property: 'comment',
      label: 'Comment',
      display: (row: Record<string, any>) => (
        <SubjectContainer>
          <SubjecText>{row.subject_of_review}</SubjecText>
          <ReviewText>{row.review_body}</ReviewText>
        </SubjectContainer>
      ),
    },
    {
      property: 'status',
      label: 'Action',
      display: (row: Record<string, any>) => (
        <CellContainer>
          {row.status === 'Archived' ? (
            <Archived>Archived</Archived>
          ) : (
            <ArchiveButton onClick={() => handleArchive(row._id)} >
              Archive
            </ArchiveButton>
          )}
        </CellContainer>
      ),
    },
  ]

  const [filterNav, setFilterNav] = useState<string>('All Contacts');
  
  const onFilterButtonClick = (filter: string) => {
    setFilterNav(filter);
  };

  const filteredContacts = contacts.filter((contact) => {
    switch (filterNav) {
      case 'All Contacts':
        return true;
      case 'Archived':
        return contact.status === 'Archived';
      default:
        return false;
    }
  });

  return(
    <>
      <WrapperContactNav>
        <WrapperButton >
            <FilterButton style={{
              color: filterNav === 'All Contacts' ? colors.filterGreenButton : undefined,
              borderBottom: filterNav === 'All Contacts' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filterNav === 'All Contacts' ? 600 : undefined,
            }} 
            onClick={() => onFilterButtonClick('All Contacts')}>All Contacts</FilterButton>
        </WrapperButton>
        <WrapperButton>
            <FilterButton style={{
              color: filterNav === 'Archived' ? colors.filterGreenButton : undefined,
              borderBottom: filterNav === 'Archived' ? `3px solid ${colors.filterGreenButton}` : undefined,
              fontWeight: filterNav === 'Archived' ? 600 : undefined,
            }} 
            onClick={() => onFilterButtonClick('Archived')}>Archived</FilterButton>
        </WrapperButton>
      </WrapperContactNav>
      <Wrapperdashboardcontainer width={width}>
        <Table cols={cols} data={filteredContacts}/>
      </Wrapperdashboardcontainer>
    </>
  )
}
interface Wrapperdashboardcontainer {
  width?: string;
}
const Wrapperdashboardcontainer = styled.section<Wrapperdashboardcontainer>`
  position: absolute;
  top: 150px;
  right: 2%;
  width: ${(props) => (props.width === '80%' ? '75%' : '96%')};
  z-index: 999;
  background-color: #F8F8F8;
`;
const WrapperContactNav = styled.div`
    position: absolute;
    top: 50px;
    right: 47%;
    display: flex;
    flex-direction: row;
    width: 280px;
    height: 100px;
    justify-content: space-between;
    align-items: center;
`;
const SubjecText = styled.span`
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
  color: black;
  text-align: center;
`;
const ReviewText = styled.span`
  font-family: Poppins;
  width: 90%;
  font-weight: 400;
  font-size: 14px;
  color: #928d96;
  text-align: center;
`;
const DateText = styled.span`
  font-family: Poppins;
  font-weight: 400;
  font-size: 16px;
  color: black;
`;
const NameText = styled.span`
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
  color: black;
`;
const EmailText = styled.span`
  font-family: Poppins;
  font-weight: 400;
  font-size: 14px;
  color: #c08b8b;
`;
const PhoneText = styled.span`
  font-family: Poppins;
  font-weight: 400;
  font-size: 15px;
  color: #c08b8b;
`;
const IdText = styled.span`
  font-family: Poppins;
  font-weight: 400;
  font-size: 11px;
  color: #958383;
  text-overflow: ellipsis;
  width: 90px;
  overflow: hidden;
  white-space: nowrap;
`;
const SubjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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