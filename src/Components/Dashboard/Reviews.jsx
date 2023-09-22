import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";
import styled from "styled-components";

export const Reviews = () => {
    const width = useSelector(state => state.visual.width)
    return(
        <Wrapperdashboardcontainer width={width}>
            <Title>Latest Review by Customers</Title>
            <CardContainer>
                <ContentContainer>
                    <ContentText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</ContentText>
                </ContentContainer>
                <ProfileContainer>
                    <ProfileImg></ProfileImg>
                    <NameContainer>
                        <NameText>Gaspar Sio</NameText>
                        <HourText>4m ago</HourText>
                    </NameContainer>
                    <IconsContainer>
                        <CheckCircle/>
                        <CrossCircled/>
                    </IconsContainer>
                </ProfileContainer>
            </CardContainer>
        </Wrapperdashboardcontainer>
    )
}

const Wrapperdashboardcontainer = styled.section`
    position: absolute;
    bottom: 0;
    right: 0;
    width: ${(props) => props.width === '75%' ? '75%' : '100%'};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-shadow: 0px 4px 4px #00000005;
    border-radius: 20px;
    background-color: #FFFFFF;
`;
const Title = styled.span`
    font-family: Poppins;
    font-size: 20px;
    font-weight: 400;
    color: #393939;
    margin-bottom: 20px;
`;
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
    width: 400px;
    border-radius: 20px;
    height: 55%;
`;
const ContentText = styled.span`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    color: #4E4E4E;
`;
const ProfileContainer = styled.div`
    display: flex;
    height: 25%;
    align-items: center;
`;
const ProfileImg = styled.div`
    width: 50px;
    height: 50px;
    background-color: #C5C5C5;
`;
const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    align-items: center;
`;
const NameText = styled.span`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
    color: #262626;
`;
const HourText = styled.span`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    color: #799283;
`;
const IconsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 17%;
`;
const CheckCircle = styled(BsCheckCircle)`
    color: #5AD07A;
`;
const CrossCircled = styled(RxCrossCircled)`
    color: #E23428;
`;