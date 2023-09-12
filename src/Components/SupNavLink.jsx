import React from "react";
import { MdMarkEmailUnread, MdLogout } from 'react-icons/md';
import { LuBellRing } from 'react-icons/lu';
import { PiArrowsLeftRightFill } from 'react-icons/pi';
import styled from 'styled-components';
import { useAuth } from './auth';


export const SupNavLink = ({ togglesidebar, sidebarvisible }) => {
    const auth = useAuth();
    
    const logout = () => {
        auth.logout();
    }
    return(
        <Wrappersupnavlink sidebarvisible={sidebarvisible}>
            <Wrapperhambmenu>
                <PiArrowsLeftRightFillicon onClick={togglesidebar}/>
                <Title>Dashboard</Title>
            </Wrapperhambmenu>
            <Wrappernavicons>
                <MdMarkEmailUnreadicon/>
                <LuBellRingicon/>
                <MdLogouticon
                    onClick={logout}
                />
            </Wrappernavicons>
        </Wrappersupnavlink>
    )
}

const Wrappersupnavlink = styled.section`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    width: ${(props) => (props.sidebarvisible ? '100%' : '70%')};
    box-shadow: 0px 3px 10px #00000005;
    transition: all 0.2s;
`;
const Wrapperhambmenu = styled.section`
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: space-evenly;
`;
const PiArrowsLeftRightFillicon = styled(PiArrowsLeftRightFill)`
    width: 11%;
`
const Title = styled.h1`
    width: 77%;
    font-family: Poppins;
    font-weight: 600;
`
const Wrappernavicons = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 36%;
`
const MdLogouticon = styled(MdLogout)`
    color: #799283;
    &:hover{
        transform: scale(1.1);
    }
`;
const LuBellRingicon = styled(LuBellRing)`
    color: #799283;
    &:hover{
        transform: scale(1.1);
    }
`;
const MdMarkEmailUnreadicon = styled(MdMarkEmailUnread)`
    color: #799283;
    &:hover{
        transform: scale(1.1);
    }
`;


