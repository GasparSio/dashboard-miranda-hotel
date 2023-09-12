import React from "react";
import styled from "styled-components";
import { useAuth } from "./auth";


export const UserModal = () => {
    const auth = useAuth()

    const onHandleClick = () => {
        auth.ModalClose();
    }
    return(
        <Wrapper>
        <Formcontainer>
            <Title>Hello!</Title>
            <input type="file" />
                <Button onClick={onHandleClick}>Close</Button>
        </Formcontainer>
        </Wrapper>
)
}

const Wrapper = styled.section`
    background-color: #ffffff;
    position: absolute;
    top: 25%;
    right: 20%;
    width: 402px;
`;

const Formcontainer = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: auto;
box-shadow: 13px 3px 40px #00000033;
background-color: #ffffff;
`;

const Title = styled.h1`
color: #262626;
font-size: 28px;
font-weight: 600;
font-family: Poppins;

`;  

const Button = styled.button`
width: 50%;
margin: auto;
height: 30px;
margin-bottom: 15px;
border: none;
background-color: #EBF1EF;
color: #135846;
font-size: 15px;
font-weight: 400;
padding: 0;
border-radius: 4px;
font-family: Poppins;
`;

