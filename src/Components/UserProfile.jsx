import React, {useState} from "react";
import styled from "styled-components";
import profileImage from '../Img/foto-perfil1.jpg'
import { UserModal } from "./UserModal";

export const UserProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const onHandleClick = () => {
        setOpenModal(true)
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
            {openModal && <UserModal setOpenModal={setOpenModal}/>}
        </Wrapperprofile>
    )
}

const Wrapperprofile = styled.section`
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
    position: relative;
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
