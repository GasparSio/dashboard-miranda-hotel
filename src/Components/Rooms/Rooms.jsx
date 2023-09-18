import React from "react";
import styled from "styled-components";

export const Rooms = ({data}) => {
    return(
        <Wrapperdashboardcontainer>
            <h1>Rooms page</h1>
            <StyledTable>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Check</TableHeaderCell>
                        <TableHeaderCell>Room Name</TableHeaderCell>
                        <TableHeaderCell>Bed Type</TableHeaderCell>
                        <TableHeaderCell>Room Floor</TableHeaderCell>
                        <TableHeaderCell>Facilities</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell><input type="checkbox" /></TableCell>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.bed_type}</TableCell>
                        <TableCell>{item.room_floor}</TableCell>
                        <TableCell>{item.facilities}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.status}</TableCell>
                    </TableRow>
                    ))}
                </tbody>
            </StyledTable>
        </Wrapperdashboardcontainer>
    )
}

const Wrapperdashboardcontainer = styled.section`
    position: absolute;
    top: 55px;
    left: 0%;
    width: 100%;
    z-index: -999;
`;

const TableHeader = styled.thead`
  height: 65px;
  border-radius: 20px;
  background-color: #FFFFFF;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const TableRow = styled.tr`
    background-color: #FFFFFF;
    border-radius: 20px;
    height: 121px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  width: 100%
  display: flex;
  padding: 10px;
  text-align: left;
  font-size: 16px;
  font-family: Poppins;
`;