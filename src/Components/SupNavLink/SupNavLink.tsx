import React from "react";
import styled from 'styled-components';
import {colors} from '../theme';
import { MdMarkEmailUnread, MdLogout } from 'react-icons/md';
import { LuBellRing } from 'react-icons/lu';
import { useAuth } from '../Login-Logout/auth';
import { useLocation } from "react-router-dom";
import { incrementWidthSupNav, decrementWidthSupNav } from '../../features/visual/visualSlice';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';
import { HamburgIcon } from "./HamburgIcon";

interface HeaderContainerProps {
    width: string;
}

export const SupNavLink = () => {
    const dispatch = useCustomDispatch();
    const width = useCustomSelector((state) => state.visual.width);
    const location = useLocation(); 
    const sectionName = location.pathname ? location.pathname.split('/').pop()?.toUpperCase().replace(/-/g, ' ') : '';
    const auth = useAuth();
    
    if (!auth) {
        // Manejo de caso donde auth es nulo.
        return <div>Autenticación no disponible</div>;
    }
    const { logout } = auth;

    const onlogoutUser = () => {
        logout();
    }
    const handleWidthChange = () => {
        if (width === '80%'){
            dispatch(incrementWidthSupNav())
        }else{
            dispatch(decrementWidthSupNav())
        }
    }

    return(
        <Wrappersupnavlink width={width}>
            <Wrapperhambmenu>
                <HamburgIcon onClick={handleWidthChange} />
                <Title>{sectionName}</Title>
            </Wrapperhambmenu>
            <Wrappernavicons>
                {/* <MdMarkEmailUnreadicon/>
                <LuBellRingicon/> */}
                <MdLogouticon
                    onClick={onlogoutUser}
                />
            </Wrappernavicons>
        </Wrappersupnavlink>
    )
}

const Wrappersupnavlink = styled.section<HeaderContainerProps>`
    position: absolute;
    top: 0;
    right: 0;
    width: ${(props) => props.width};
    display: flex;
    box-shadow: 0px 3px 10px #00000005;
    transition: width 0.5s ease;
    background-color: #ffffff;
    height: 45px;
`;
const Wrapperhambmenu = styled.section`
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: space-evenly;
`;
const Title = styled.h1`
    width: 77%;
    font-family: Poppins;
    font-weight: 600;
    font-size: 15px;
`;
const Wrappernavicons = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 40%;
`;
const MdLogouticon = styled(MdLogout)`
    color: ${colors.primaryGreen};
    cursor: pointer;
    width: 20px;
    height: 20px;   
    &:hover{
        transform: scale(1.1);
    }
`;
const LuBellRingicon = styled(LuBellRing)`
    color: ${colors.primaryGreen};
    cursor: pointer;
    width: 20px;
    height: 20px;
    &:hover{
        transform: scale(1.1);
    }
`;
const MdMarkEmailUnreadicon = styled(MdMarkEmailUnread)`
    color: ${colors.primaryGreen};
    cursor: pointer;
    width: 20px;
    height: 20px;
    &:hover{
        transform: scale(1.1);
    }
`;


