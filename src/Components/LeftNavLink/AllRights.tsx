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
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 215px;
`;
const Title = styled.h1`
    font-family: Poppins;
    font-size: 16px;
    color: #212121;
    font-family: 600;
`;
const Paragraph = styled.span`
    font-family: Poppins;
    font-size: 14px;
    color: #799283;
    font-family: 300;
`;
const LinkTo = styled(NavLink)`
    text-decoration: none;
    color: #799283;
`;