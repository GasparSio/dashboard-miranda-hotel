import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import styled from 'styled-components';

interface RequestPopUpProps {
  onClose: () => void;
  data: string;
}

export const RequestPopUp = ({onClose, data}: RequestPopUpProps) => {
  return (
    <ModalContainer>
        <TextContainer>
            <Title>Special Request</Title>
            <Text>{data}</Text>
        </TextContainer>
        <IconContainer>
            <CrossCircled onClick={onClose}/>
        </IconContainer>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
    background-color: #ebebeb;
    border: 1px solid #ccc;
    padding: 20px;
    top: 50%;
    left: 50%;
    border-radius: 18px;
    z-index: 800;
    width: 385px;
    height: 160px;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    transform: translate(-50%, -50%);
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90%;
`;
const IconContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    width: 100%;
    height: 10%;
`;
const Title = styled.span`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #393939;
    font-family: Poppins;
`;
const Text = styled.span`
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
    color: #393939;
    font-family: Poppins;
`;
const CrossCircled = styled(RxCrossCircled)`
  color: #e23428;
  cursor: pointer;
  transition: transform;
  &:hover{
    transform: scale(1.2);
  }
`;