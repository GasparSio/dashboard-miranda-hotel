import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../Login-Logout/useReducer";

const userCode = 'gas';
const emailCode = 'sio';

export const Login = () => {
    const navigate = useNavigate();
    const { authState, login } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (authState.isAuthenticated) {
            navigate('/home/dashboard');
        }
      }, [authState.isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === userCode && email === emailCode) {
      login({ username, email });
      localStorage.setItem("loggedInUser", JSON.stringify({ username, email }));
      console.log('Datos guardados en localstorage al hace rlogin', username, email);
    } else {
      alert('Wrong username or password');
    }
  };
    return(
        <Wrapper>
            <Formcontainer>
                <Title>Hello!</Title>
                <Form onSubmit={handleLogin}>
                    <Input 
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    <Input
                        type="password"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
                <Hardpasscontainer>
                    <Span>Username: Gaspar</Span>
                    <Span>Email: Sio</Span>
                </Hardpasscontainer>
            </Formcontainer>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    background-color: #ffffff;
    width: 100%;
    margin: auto;
`;

const Formcontainer = styled.section`
    position: absolute;
    top: 50%;
    left: 50%; 
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    max-width: 600px;
    height: 400px;
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
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 60%;
`;  

const Input = styled.input`
    border-radius: 2px;
    width: 75%;
    margin: auto;
    border-color: #80808036;
    height: 30px;
    margin-bottom: 15px;
    padding-left: 10px;
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
const Hardpasscontainer = styled.section`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    width: 50%;
    margin: 0 auto;
`;
const Span = styled.span`
    color: #135846;
    margin-bottom: 10px;
    font-weight: 300;
    font-family: Poppins;
`;