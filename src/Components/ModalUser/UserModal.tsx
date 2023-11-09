import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../Login-Logout/auth";
import { AvatarProfile } from "./AvatarProfile";

export const UserModal = () => {
    const auth = useAuth();
    const { authState, updateUser, ModalClose } = auth;
    
    const [name, setName] = useState(authState.username || "");
    const [email, setEmail] = useState(authState.email || "");
    const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(authState.image);

      const onSubmitModal = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (
          name !== authState?.username ||
          email !== authState?.email ||
          selectedAvatarUrl !== authState?.image
      ) {
          updateUser(name || "", email || "", selectedAvatarUrl || "");
      }

      ModalClose();
      console.log("onsubmitmodal, photo: ", selectedAvatarUrl);
  }

    return(
        <Wrapper>
            <Form onSubmit={onSubmitModal}>
            <Title>Hello!</Title>
            <AvatarProfile setSelectedAvatarUrl={setSelectedAvatarUrl}/>
            <InputContainer>
              <Label htmlFor="name">Name</Label>
              <Input 
                  id="name"
                  type='text' 
                  placeholder="Write your name" 
                  value={name || ""}
                  onChange={(event) => setName(event.target.value)}
              />
              <Label htmlFor='email'>Email</Label>
              <Input 
                  id='email'
                  type='text' 
                  placeholder="Write your email" 
                  value={email || ""}
                  onChange={(event) => setEmail(event.target.value)}
              />
            </InputContainer>
                <Button type="submit">Edit and Close</Button>
            </Form>
        </Wrapper>
)
}

const Wrapper = styled.section`
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 402px;
    box-shadow: 13px 3px 40px #00000033;
    z-index: 999;
`;
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    margin: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Title = styled.h1`
  color: #262626;
  font-size: 28px;
  font-weight: 600;
  font-family: Poppins;
`;  

const Label = styled.label`
  margin-top: 20px;

`;  
const Input = styled.input`
  margin-top: 10px;
  width: 100%;
  border: none;
  border-bottom: 1px solid #135846;
  &:focus{
    outline: none;
    border-bottom: 2px solid #135846;
  } 
`;  

const Button = styled.button`
  width: 50%;
  margin: auto;
  height: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
  border: none;
  background-color: #EBF1EF;
  color: #135846;
  font-size: 15px;
  font-weight: 400;
  padding: 0;
  border-radius: 4px;
  font-family: Poppins;
  margin-top: 15px;
`;

