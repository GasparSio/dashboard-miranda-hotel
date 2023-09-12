import React from "react";
import styled from 'styled-components';
import { useAuth } from "./auth";

const userCode = 'Gaspar';
const passCode = 'Sio';

export const Login = () => {
    const auth = useAuth();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login = (e) => {
        e.preventDefault();
        if(username === userCode && password === passCode){
            auth.login({ username });
        }else{
            alert('Wrong username or password')
        }
    }
    return(
        <Wrapper>
            <Formcontainer>
                <Title>Hello!</Title>
                <Form onSubmit={login}>
                    <Input 
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    <Input
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
                <Hardpasscontainer>
                    <Span>Username: Gaspar</Span>
                    <Span>Password: Sio</Span>
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