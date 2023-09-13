import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "./auth";
import { AvatarProfile } from "./AvatarProfile";


export const UserModal = () => {
    const auth = useAuth()
    const [name, setName] = useState(auth.authName)
    const [email, setEmail] = useState(auth.authEmail)
    const [selectedAvatarUrl, setSelectedAvatarUrl] = useState("");

    const onSubmitModal = (event) => {
        event.preventDefault();
        if (name !== auth.authName || email !== auth.authEmail || selectedAvatarUrl) {
            if (name !== auth.authName) {
              auth.ChangeName({ name });
            }
            if (email !== auth.authEmail) {
              auth.ChangeEmail({ email });
            }
            if (selectedAvatarUrl) {
              auth.AvatarImageProfile({ avatarUrl: selectedAvatarUrl });
            }
          }
          auth.ModalClose();
    }

    return(
        <Wrapper>
        <Formcontainer>
            <Form onSubmit={onSubmitModal}>
            <Title>Hello!</Title>
            <AvatarProfile setSelectedAvatarUrl={setSelectedAvatarUrl}/>
            <input 
                type='text' 
                placeholder="Name" 
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <input 
                type='text' 
                placeholder="Email" 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
                <Button type="submit">Edit</Button>
            </Form>
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

const Form = styled.form`

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

