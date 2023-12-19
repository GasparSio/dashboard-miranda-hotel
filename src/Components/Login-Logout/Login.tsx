import React, { FormEvent, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { colors } from '../theme';
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import logoHotel from '../../Img/icon-hotel.png';
import { PacmanLoader } from 'react-spinners';
import { useCustomDispatch, useCustomSelector } from "../../hooks/redux";
import { resetStatus, userLogin } from "../../features/login/loginSlice";

export const Login: React.FC = () => {
const navigate = useNavigate();
const auth = useAuth();
const { authState, login } = auth;
const loginStatus = useCustomSelector((state) => state.login.status);
const [email, setEmail] = useState<string>('sio.gaspar@gmail.com');
const [password, setPassword] = useState<string>('admin');
const [wrongUser, setwrongUser] = useState<boolean>(false);
const [isButtonDisabled, setButtonDisabled] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const dispatch = useCustomDispatch();

    useEffect(() => {
        if (authState.isAuthenticated) {
            navigate('/home/dashboard');
        }else{
            navigate('/login')
        }
        if(loginStatus === 'fulfilled'){
            login({email, password})
            setwrongUser(false)
            dispatch(resetStatus())
            setIsLoading(false);
        }else if(loginStatus === 'pending'){
            setIsLoading(true);
        }
        else if(loginStatus === 'rejected'){
            setwrongUser(true)
            setTimeout(() => {
                setwrongUser(false)
            }, 300)
            setIsLoading(false);
        }
    }, [authState.isAuthenticated, navigate, loginStatus]);
    
    
    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        dispatch(userLogin({email: email, password: password}))
        setButtonDisabled(true);
        setIsLoading(true);
        setButtonDisabled(false);
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
                    <Button type="submit" disabled={isButtonDisabled || isLoading}>
                    {isLoading ? (
                        <PacmanLoader color="#36d7b7" size={14} />
                        ) : (
                        'Submit'
                    )}
                    </Button>
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
    background-color: #EBF1EF;
    color: ${colors.primaryGreen};
    font-size: 15px;
    font-weight: 400;
    padding: 0;
    border-radius: 4px;
    font-family: Poppins;
    transition: transform;
    border: 1px solid #799283;
    &:hover{
        cursor: pointer;
    }
    &:disabled{
        background-color: #ebefeb;
        color: #c6d0ca;
        cursor: not-allowed;
    }
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
