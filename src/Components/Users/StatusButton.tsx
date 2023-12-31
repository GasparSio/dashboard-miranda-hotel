import React from 'react'
import styled from 'styled-components'

export const Active = () => {
  return (
    <ActiveButton>Active</ActiveButton>
  )
}

const ActiveButton = styled.button`
    border-radius: 7px;
    height: auto;
    border: 1px solid #E8FFEE;
    background-color: #E8FFEE;
    color: #5AD07A;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Poppins';
    cursor: Pointer;
    transition: transform 0.5s;
    &:hover{
    transform: scale(1.03);
}
`
export const Inactive = () => {
  return (
    <InactiveButton>Inactive</InactiveButton>
  )
}

const InactiveButton = styled.button`
    border-radius: 7px;
    height: auto;
    border: 1px solid #FFEDEC;
    background-color: #FFEDEC;
    color: #E23428;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Poppins';
    cursor: Pointer;
    transition: transform 0.5s;
    &:hover{
    transform: scale(1.03);
}
`
export const InProgress = () => {
  return (
    <InProgressButton>In Progress</InProgressButton>
  )
}

const InProgressButton = styled.button`
    border-radius: 7px;
    height: auto;
    border: 1px solid #faff8c;
    background-color: #faff8c;
    color: #3f3f3f;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Poppins';
    cursor: Pointer;
    transition: transform 0.5s;
    &:hover{
    transform: scale(1.03);
}
`