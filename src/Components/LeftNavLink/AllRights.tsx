import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export function AllRights(): JSX.Element {
  return (
    <AllRightsWrapper>
        <Title>Travl Hotel Admin Dashboard</Title>
        <Paragraph>© 2023 All Rights Reserved</Paragraph>
        <Paragraph>Made with ♥ by <LinkTo to="https://github.com/GasparSio" target="_blank" rel="noopener noreferrer">Gaspar Sio</LinkTo></Paragraph>
    </AllRightsWrapper>
  )
}
const AllRightsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 120px;
`;
const Title = styled.h1`
    font-family: Poppins;
    font-size: 16px;
    color: #212121;
    font-family: 600;
`;
const Paragraph = styled.span`
    font-family: Poppins;
    font-size: 12px;
    color: #799283;
    font-family: 300;
`;
const LinkTo = styled(NavLink)`
    text-decoration: none;
    color: #799283;
    transition: transform 0.3s ease-in-out;
    &:hover{
        transform: scale(1.05);
        color: red;
    }
`;