import React from 'react'
import styled from 'styled-components'
import { colors } from '../theme';

export const Booked = () => {
  return(
    <SpanBooked>Booked</SpanBooked>
  )
}
const SpanBooked = styled.span`
  display: flex;
  width: 70%;
  justify-content: center;
  background-color: ${colors.primaryRed};
  color: ${colors.backgroundWhite};
  border-radius: 7px;
  height: auto;
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Poppins';
  cursor: Pointer;
  transition: transform 0.5s;
  &:hover{
    transform: scale(1.03);
`;

export const Available = () => {
  return(
    <SpanAvailable>Available</SpanAvailable>
  )
}
const SpanAvailable = styled.span`
  display: flex;
  width: 70%;
  justify-content: center;
  background-color: #5AD07A;
  color: ${colors.backgroundWhite};
  border-radius: 7px;
  height: auto;
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Poppins';
  cursor: Pointer;
  transition: transform 0.5s;
  &:hover{
  transform: scale(1.03);
`;