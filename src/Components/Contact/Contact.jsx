import React from "react";
// import { useState, useEffect} from "react";
// import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { Reviews } from "../Dashboard/Reviews";
import { ContactNav } from "./ContactNav";
import { Table } from '../Table';
import data from '../../features/contact/ContactReviews.json';
// import { deleteContact, fetchContacts } from "../../features/contact/contactSlice";


export const Contact = () => {
  // const dispatch = useDispatch()
  // const contacts = useSelector(state => state.contact.contacts);
  const width = useSelector(state => state.visual.width);

  // useEffect(() => {
  //   dispatch(fetchContacts())
  // }, [dispatch])

  // const onDeleteRoom = (contactId) => {
  //   dispatch(deleteContact(contactId))
  // }

  //Pagination Logic
  // const rowsPerPage = 10; // Número de filas por página
  // const totalPages = Math.ceil(contacts.length / rowsPerPage); // Calcular el número total de páginas
  // const [currentPage, setCurrentPage] = useState(1);
  // const startIndex = (currentPage - 1) * rowsPerPage;
  // const endIndex = startIndex + rowsPerPage;
  // const currentData = contacts.slice(startIndex, endIndex);
  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };
  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

    const columnas = ['id', 'fullname', 'asunto'];
    const datos = data;
    return(
      <>
      <CustomWrapperStyles width={width}>
        <Reviews />
      </CustomWrapperStyles>
      <ContactNav/>
      <Table columnas={columnas} datos={datos}/>
        {/* <Wrapperdashboardcontainer width={width}>
        <ContactNavContainer/>
          <StyledTable>
              <TableHeader>
                  <TableRow>
                    <TableHeaderCellFirst>Order Id</TableHeaderCellFirst>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Customer</TableHeaderCell>
                    <TableHeaderCell>Comment</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                    <TableHeaderCellLast>Delete</TableHeaderCellLast>
                  </TableRow>
              </TableHeader>
              <tbody>
                  {currentData.map((item) => (
                    <TableRow key={item.id}>

                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>Name: {item.fullname} Email: {item.email} Phone: {item.phone} </TableCell>
                      <TableCell>Asunto: {item.asunto} Comment: {item.comment} </TableCell>
                      <TableCell>{item.archived ? <Published/> : <Archived/>}</TableCell>
                      <TableCell onClick={() => onDeleteRoom(item.id)}>Delete</TableCell>
                  </TableRow>
                  ))}
              </tbody>
          </StyledTable>
          <PaginationContainer>
            <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 1}>
              Prev
            </PaginationButton>
            <PaginationText>Page {currentPage} out of {totalPages}</PaginationText>
            <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </PaginationButton>
          </PaginationContainer>
        </Wrapperdashboardcontainer> */}
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

// export const Published = () => {
//   return(
//     <SpanBooked>Published</SpanBooked>
//   )
// }
// const SpanBooked = styled.span`
//   background-color: red;
//   color: white;
//   border-radius: 10px;
//   width: 80px;
//   height: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export const Archived = () => {
//   return(
//     <SpanAvailable>Archived</SpanAvailable>
//   )
// }
// const SpanAvailable = styled.span`
//   background-color: #3cae43;
//   color: white;
//   border-radius: 10px;
//   width: 80px;
//   height: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Wrapperdashboardcontainer = styled.section`
//   position: absolute;
//   top: 66px;
//   right: 2%;
//   width: ${(props) => (props.width === '75%' ? '70%' : '96%')};
//   z-index: 999;
//   background-color: #F8F8F8;
// `;

// const TableHeader = styled.thead`
//   height: 65px;
//   background-color: #FFFFFF;
// `;

// const StyledTable = styled.table`
//   width: 100%;
//   border-spacing: 0;
// `;
// const TableRow = styled.tr`
//     background-color: #FFFFFF;
//     height: 90px;
//     transition: transform 0.2s;
//   &:hover {
//     transform: scale(1.02); 
//     background-color: #effff0;
//   }
// `;
// const TableHeaderCell = styled.th`
//   text-align: left;
//   font-family: Poppins;
//   font-size: 16px;
//   font-family: 600;
//   color: #393939;
//   width: 10%;
//   padding-left: 20px;
// `;
// const TableCell = styled.td`
//   text-align: left;
//   font-family: Poppins;
//   font-size: 14px;
//   font-family: 400;
//   color: #799283;
//   width: 10%;
//   padding-left: 20px;
// `;
// const TableHeaderCellFirst = styled.th`
//   text-align: left;
//   font-family: Poppins;
//   font-size: 16px;
//   font-family: 600;
//   color: #393939;
//   width: 10%;
//   padding-left: 20px;
//   border-top-left-radius: 40px;
// `;
// const TableHeaderCellLast = styled.th`
//   text-align: left;
//   font-family: Poppins;
//   font-size: 16px;
//   font-family: 600;
//   color: #393939;
//   width: 10%;
//   padding-left: 20px;
//   border-top-right-radius: 40px;
// `;
// const PaginationContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: flex-end;
//   height: 55px;
//   align-items: center;
//   margin-top: 20px;
// `;
// const PaginationButton = styled.button`
//   width: 91px;
//   height: 53px;
//   border: 1px solid #799283;
//   border-radius: 12px;
//   background-color: #ffffff;
//   font-family: Poppins;
//   font-size: 16px;
//   color: #799283;
//   font-family: 400;
//   margin-right: 30px;
// `;
// const PaginationText = styled.span`
//   font-family: Poppins;
//   font-size: 16px;
//   color: #393939;
//   font-family: 600;
//   margin-right: 30px;
// `;
