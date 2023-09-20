import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import logo from '../../Img/icon-hotel.png';
import { MdVpnKey, MdEditCalendar, MdPhone, MdOutlinePermContactCalendar } from 'react-icons/md';
import { BsFillClipboardDataFill } from 'react-icons/bs';
import { UserProfile } from "./UserProfile";

export const LeftNavLink = () => {

    return (
        <>
            <Wrappersection>
                <Wrappertitlecontainer>
                    <Wrapperimg>
                        <Logo src={logo} alt="Icon hotel" />
                    </Wrapperimg>
                    <Wrappertitle>
                        <Title>Travelboard</Title>
                        <Subtitle>Hotel Admin Dashboard</Subtitle>
                    </Wrappertitle>
                </Wrappertitlecontainer>
                <Wrappernavlinks>
                    <Wrapperlink>
                        <BsFillClipboardDataFillIcon />
                        <Link to='/home/dashboard' >Dashboard</Link>
                    </Wrapperlink>
                    <Wrapperlink>
                        <MdEditCalendarIcon />
                        <Link to='/home/bookings' >Bookings</Link>
                    </Wrapperlink>
                    <Wrapperlink>
                        <MdVpnKeyIcon />
                        <Link to='/home/rooms' >Rooms</Link>
                    </Wrapperlink>
                    <Wrapperlink>
                        <MdPhoneIcon />
                        <Link to='/home/contact' >Contact</Link>
                    </Wrapperlink>
                    <Wrapperlink>
                        <MdOutlinePermContactCalendarIcon />
                        <Link to='/home/users' >Users</Link>
                    </Wrapperlink>
                </Wrappernavlinks>
                <UserProfile/>
            </Wrappersection>

        </>
    )
}

const Wrappersection = styled.section`
    width: 30%;
    max-width: 340px;
    height: 100vh;
    box-shadow: 13px 3px 40px #00000005;
    background-color: #ffffff;
`;

const Wrappertitlecontainer = styled.section`
    width: 100%;
    display: flex;
    margin-top: 10px;
`;

const Wrapperimg = styled.section`
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrappertitle = styled.section`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Logo = styled.img`
    width: 60%;
    max-width: 40px;
`;

const Title = styled.span`
    font-size: 24px;
    font-weight: 600;
`;

const Subtitle = styled.span`
    font-size: 12px;
    color: #5D5449;
    font-weight: 300;
    font-family: Poppins;
`;

const Wrappernavlinks = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    
`;

const Wrapperlink = styled.div`
    height: 75px;
    display: flex;
    align-items: center;
    width: 100%;
`;

const Link = styled(NavLink)`
    text-decoration: none;
    font-size: 18px;
    font-weight: 400;
    font-family: Poppins;
    &.active {
        color: #E23428;
    }
    &:not(.active) {
        color: #799283;
    }
`;

const MdOutlinePermContactCalendarIcon = styled(MdOutlinePermContactCalendar)`
    height: 24px;
    width: 30%;
    color: green;
`;

const MdPhoneIcon = styled(MdPhone)`
    height: 24px;
    width: 30%;
    color: green;
`;

const MdVpnKeyIcon = styled(MdVpnKey)`
    height: 24px;
    width: 30%;
    color: green;
`;

const MdEditCalendarIcon = styled(MdEditCalendar)`
    height: 24px;
    width: 30%;
    color: green;
`;

const BsFillClipboardDataFillIcon = styled(BsFillClipboardDataFill)`
    height: 24px;
    width: 30%;
    color: green;
`;
