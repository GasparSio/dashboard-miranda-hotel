import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import styled from 'styled-components';
import { IoArchiveSharp } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";

interface ModalReviewProps {
  onClose: () => void; // Esta función no recibe argumentos y no devuelve nada
  onArchive: () => void; // Esta función no recibe argumentos y no devuelve nada
  review: {
    full_name: string;
    email: string;
    phone_number: string;
    subject_of_review: string;
    review_body: string;
    status: string;
  };
}

export const ModalReview: React.FC<ModalReviewProps> = ({onClose, onArchive, review}) => {

  return (
    <ModalContainer>
        <TextContainer>
            <Title>{review.subject_of_review}</Title>
            <Text>{review.review_body}</Text>
        </TextContainer>
        <IconContainer>
            <ButtonBack onClick={onClose}/>
            <ArchivedIcon onClick={onArchive}/>
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
    height: 80%;
`;
const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 15%;
`;
const Title = styled.span`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #393939;
    font-family: Poppins;
    text-align: center;
`;
const Text = styled.span`
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 10px;
    color: #393939;
    font-family: Poppins;
    text-align: center;
`;
const ArchivedIcon = styled(IoArchiveSharp)`
  color: #e23428;
  cursor: pointer;
  transition: transform;
  &:hover{
    transform: scale(1.2);
  }
`;
const ButtonBack = styled(IoChevronBackOutline)`
  color: #000000;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: transform;
  &:hover{
    transform: scale(1.2);
  }
`;