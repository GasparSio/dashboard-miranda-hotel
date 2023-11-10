import React, { useState } from 'react';
import { GiExpand } from 'react-icons/gi';
import { BsCheckCircle } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import { ModalReview } from './ModalReview';
import styled from 'styled-components';

export const ReviewCard = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const [crossCircleVisible, setCrossCircleVisible] = useState(true);
  const [checkCircleVisible, setCheckCircleVisible] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
    setCrossCircleVisible(false);
    setCheckCircleVisible(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCrossCircleVisible(false);
    setCheckCircleVisible(true);
  };

  return (
    <CardContainer >
        <ContentContainer>
            <Title>{item.subject} </Title>
            <Text>{item.need} </Text>
        </ContentContainer>
        <ProfileContainer>
            <NameContainer>
                <NameText>{item.fullName}</NameText>
                <EmailText>{item.email}</EmailText>
                <Phone>{item.phone}</Phone>
            </NameContainer>
            <IconsContainer>
                <ExpandIcon onClick={handleOpenModal} />
                {checkCircleVisible && <CheckCircle />}
                {crossCircleVisible && <CrossCircled />}
                {openModal && (
                <ModalReview
                    review={item}
                    onClose={() => {
                    handleCloseModal();
                    }}
                />
                )}
            </IconsContainer> 
        </ProfileContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    border-radius: 20px;
    border: 1px solid #EBEBEB;
    height: 200px;
    justify-content: space-evenly;
    margin-left: 25px;
`;
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    border-radius: 20px;
    height: 65%;
    margin: auto;
`;
const IconsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 17%;
`;
const Title = styled.span`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #393939;
    font-family: Poppins;
    max-height: 50px;
    overflow: hidden;
`;
const Text = styled.span`
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
    color: #393939;
    font-family: Poppins;
    max-height: 50px;
    overflow: hidden;
`;
const CheckCircle = styled(BsCheckCircle)`
  color: #5ad07a;
  transition: transform;
  &:hover{
    transform: scale(1.2);
  }
`;
const ExpandIcon = styled(GiExpand)`
  color: black;
  transition: transform;
  &:hover{
    transform: scale(1.2);
  }
`;

const CrossCircled = styled(RxCrossCircled)`
  color: #e23428;
  transition: transform;
  &:hover{
    transform: scale(1.2);
  }
`;
const ProfileContainer = styled.div`
    display: flex;
    height: 35%;
    align-items: center;
    justify-content: space-evenly;
`;
const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
      width: 83%;
    align-items: center;
`;
const NameText = styled.span`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
    color: #262626;
`;
const EmailText = styled.span`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    color: #799283;
`;
const Phone = styled.span`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    color: #799283;
`;