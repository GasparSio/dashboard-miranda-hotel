import React, { useState } from 'react'
import styled from 'styled-components';
import { WrapperButton, Button } from '../StyledFilterButtons';

export const ContactNav = () => {
    const [allContactActive, setallContactActive] = useState(false);
    const [archivedActive, setarchivedActive] = useState(false);

    const handleAllContact = () => {
        setallContactActive(true)
        setarchivedActive(false)
    }
    const handleArchived = () => {
        setallContactActive(false)
        setarchivedActive(true)
    }
  return (
    <Wrapper>
        <WrapperButton isActive={allContactActive}>
            <Button onClick={handleAllContact}>All Contacts</Button>
        </WrapperButton>
        <WrapperButton isActive={archivedActive}>
            <Button onClick={handleArchived}>Archived</Button>
        </WrapperButton>
    </Wrapper>
  )
}
const Wrapper = styled.div`
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
// const WrapperButton = styled.div`
//     border-bottom: ${(props) => props.isActive ? '3px solid #135846' : 'none'};
//     height: 42px;
//     width: 130px;
//     display: flex;
//     justify-content: center;
// `;
// const Button = styled.button`
//     border: none;
//     background-color: transparent;
//     color: ${(props) => props.isActive ? '#135846' : '#6E6E6E'};
//     font-family: Poppins;
//     font-size: 16px;
// `;