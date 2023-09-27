import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import styled from 'styled-components';

export const ModalReview = ({onClose, review}) => {

  return (
    <ModalContainer>
        <TextContainer>
            <Title>{review.subject}</Title>
            <Text>{review.need}</Text>
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
    top: 0%;
    left: 0%;
    border-radius: 18px;
    z-index: 999;
    width: 385px;
    height: 160px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
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