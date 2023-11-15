import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import styled from 'styled-components';


interface ModalReviewProps {
  onClose: () => void; // Esta función no recibe argumentos y no devuelve nada
  review: {
    full_name: string;
    email: string;
    phone_number: string;
    subject_of_review: string;
    review_body: string;
    status: string;
  };
}

export const ModalReview: React.FC<ModalReviewProps> = ({onClose, review}) => {

  return (
    <ModalContainer>
        <TextContainer>
            <Title>{review.subject_of_review}</Title>
            <Text>{review.review_body}</Text>
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
    left: 6%;
    border-radius: 18px;
    z-index: 999;
    width: 313px;
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
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #393939;
    font-family: Poppins;
`;
const Text = styled.span`
    font-size: 12px;
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