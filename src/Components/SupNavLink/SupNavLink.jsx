import React from "react";
import { MdMarkEmailUnread, MdLogout } from 'react-icons/md';
import { LuBellRing } from 'react-icons/lu';
import { PiArrowsLeftRightFill } from 'react-icons/pi';
import styled from 'styled-components';
import { useAuth } from '../Login-Logout/auth';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { incrementWidthSupNav, decrementWidthSupNav } from '../../features/visual/visualSlice'

export const SupNavLink = () => {
    const dispatch = useDispatch();
    const width = useSelector((state) => state.visual.width);
    const location = useLocation(); // Obtiene la ubicación actual
    const sectionName = location.pathname.split('/').pop(); // Obtiene el último segmento de la ruta
    const { logout } = useAuth();
    
    const onlogoutUser = () => {
        logout();
    }
    const handleWidthChange = () => {
        if (width === '75%'){
            dispatch(incrementWidthSupNav())
            console.log('increment');
        }else{
            dispatch(decrementWidthSupNav())
            console.log('decrement');
        }
    }
    return(
        <Wrappersupnavlink width={width}>
            <Wrapperhambmenu>
                <PiArrowsLeftRightFillicon onClick={handleWidthChange}/>
                <Title>{sectionName}</Title>
            </Wrapperhambmenu>
            <Wrappernavicons>
                <MdMarkEmailUnreadicon/>
                <LuBellRingicon/>
                <MdLogouticon
                    onClick={onlogoutUser}
                />
            </Wrappernavicons>
        </Wrappersupnavlink>
    )
}

const Wrappersupnavlink = styled.section`
    position: absolute;
    top: 0;
    right: 0;
    width: ${(props) => props.width};
    display: flex;
    box-shadow: 0px 3px 10px #00000005;
    transition: all 0.2s;
    background-color: #ffffff;
`;
const Wrapperhambmenu = styled.section`
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: space-evenly;
`;
const PiArrowsLeftRightFillicon = styled(PiArrowsLeftRightFill)`
    width: 11%;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
`;
const Title = styled.h1`
    width: 77%;
    font-family: Poppins;
    font-weight: 600;
`
const Wrappernavicons = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 40%;
`
const MdLogouticon = styled(MdLogout)`
    color: #799283;
    cursor: pointer;
    &:hover{
        transform: scale(1.1);
    }
`;
const LuBellRingicon = styled(LuBellRing)`
    color: #799283;
    cursor: pointer;
    &:hover{
        transform: scale(1.1);
    }
`;
const MdMarkEmailUnreadicon = styled(MdMarkEmailUnread)`
    color: #799283;
    cursor: pointer;
    &:hover{
        transform: scale(1.1);
    }
`;


