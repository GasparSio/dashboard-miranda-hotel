import React, { FormEvent, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { colors } from '../theme';
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import logoHotel from '../../Img/icon-hotel.png';
import { useCustomDispatch, useCustomSelector } from "../../hooks/redux";
import { resetStatus, userLogin } from "../../features/login/loginSlice";

export const Login: React.FC = () => {
const navigate = useNavigate();
const auth = useAuth();
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');
const [wrongUser, setwrongUser] = useState<boolean>(false);
const { authState, login } = auth;
const loginStatus = useCustomSelector((state) => state.login.status);

    useEffect(() => {
        if (authState.isAuthenticated) {
            navigate('/home/dashboard');
        }else{
            navigate('/login')
        }
        if(loginStatus === 'fulfilled'){
            login({email, password})
            setwrongUser(false)
            // localStorage.setItem("loggedInUser", JSON.stringify({ email, password }))
            dispatch(resetStatus())
        }else if(loginStatus === 'rejected'){
            setwrongUser(true)
            setTimeout(() => {
                setwrongUser(false)
            }, 300)
        }
      }, [authState.isAuthenticated, navigate, loginStatus]);

const dispatch = useCustomDispatch();

const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userLogin({email: email, password: password}))
    console.log(email, password);
};

if (wrongUser) {
Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Wrong Username or Password',
    timer: 2000,
    });
}
    return(
            <Wrapper>
            <Formcontainer>
                <Wrapperimg>
                    <Logo src={logoHotel} alt="Icon hotel" />
                </Wrapperimg>
                <Title>Hello!</Title>
                <Form onSubmit={handleLogin}>
                    <Input 
                        value={email}
                        data-cy="username-input"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <Input
                        type="password"
                        value={password}
                        data-cy="email-input"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
                <Hardpasscontainer>
                    <Span>Email: sio.gaspar@gmail.com</Span>
                    <Span>Password: admin</Span>
                </Hardpasscontainer>
            </Formcontainer>
        </Wrapper>
    )
}
const Wrapperimg = styled.section`
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Logo = styled.img`
    width: 70%;
    max-width: 50px;
`;
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
    width: 40%;
    max-width: 600px;
    height: 550px;
    margin: auto;
    box-shadow: 13px 3px 40px #00000033;
    background-color: #ffffff;
    border-radius: 15px;
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
    font-size: 20px;
    &:focus {
        outline: 2px solid ${colors.primaryGreen};
    }
`;
const Button = styled.button`
    width: 50%;
    margin: auto;
    height: 30px;
    margin-bottom: 15px;
    border: none;
    background-color: #EBF1EF;
    color: ${colors.primaryGreen};
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
color: ${colors.primaryGreen};
    margin-bottom: 10px;
    font-weight: 300;
    font-family: Poppins;
    margin-top: 10px;
`;
const SpanWrong = styled.span`
    color: ${colors.primaryRed};
    margin-bottom: 10px;
    font-weight: 300;
    font-family: Poppins;
    text-align: center;
    margin-top: 25px;
    position: absolute;
    bottom: 7%;
`;