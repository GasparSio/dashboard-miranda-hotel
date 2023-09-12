import React from "react";
import styled from "styled-components";
import profileImage from '../Img/img-profile.png'
import { useAuth } from "./auth";

export const UserProfile = () => {
    const auth = useAuth()
    const onHandleClick = () => {
        auth.ModalOpen()
    }

    return(
        <Wrapperprofile  >
            <Wrapperimage>
                <Image src={profileImage} alt="User image" />
            </Wrapperimage>
            <Wrapperspan>
                <Name>Gaspar Sio</Name>
                <Email>sio.gaspar@gmail.com</Email>
            </Wrapperspan>
            <Wrapperbutton >
                <Button onClick={onHandleClick}>Edit</Button>
            </Wrapperbutton>
        </Wrapperprofile>
    )
}

const Wrapperprofile = styled.section`
    position: relative;
    width: 60%;
    margin: auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 30px 30px #00000036;
    border-radius: 18px;
    height: 185px;
`;
const Wrapperimage = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    top: -40px;
`;
const Image = styled.img`
    width: 75px;
    height: 75px;
    border-radius: 8px;
`;
const Wrapperspan = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 56px;
`;
const Name = styled.span`
    font-family: Poppins;
    font-weight: 400;
    font-size: 16px;
    color: #393939;
`;
const Email = styled.span`
    font-family: Poppins;
    font-weight: 300;
    font-size: 12px;
    color: #B2B2B2;
`;
const Wrapperbutton = styled.div`
    margin-top: 10px;
    width: 50%;
`;
const Button = styled.button`
    width: 158px;
    height: 47px;
    background-color: #EBF1EF;
    border-radius: 8px;
    color: #135846;
    font-size: 14px;
    font-family: Poppins;
    font-weight: 400;
    text-align: center;
    border: none;
    letter-spacing: 2px;
    width: 100%;
`;
