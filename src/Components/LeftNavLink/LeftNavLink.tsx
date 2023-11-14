import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { colors } from '../theme';
import { MdVpnKey, MdEditCalendar, MdPhone, MdOutlinePermContactCalendar } from 'react-icons/md';
import { BsFillClipboardDataFill } from 'react-icons/bs';
import { UserProfile } from "./UserProfile";
import { AllRights } from "./AllRights";
import { useCustomSelector } from '../../hooks/redux/index';
import logo from '../../Img/icon-hotel.png';

interface Wrappersection {
    width: string;
}

export const LeftNavLink = () => {
    const width = useCustomSelector((state) => state.visual.width);

    return (
        <>
            <Wrappersection width={width}>
                <Wrappertitlecontainer>
                    <Wrapperimg>
                        <Logo src={logo} alt="Icon hotel" />
                    </Wrapperimg>
                    <Wrappertitle>
                        <Title>Travl</Title>
                    </Wrappertitle>
                </Wrappertitlecontainer>
                <Wrappernavlinks>
                    <Link
                        to='/home/dashboard'
                    >
                        <IconDashboard />
                        <Text>Dashboard</Text>
                    </Link>
                    <Link
                        to='/home/bookings'
                    >
                        <IconBooking />
                        <Text>Bookings</Text>
                    </Link>
                    <Link
                        to='/home/rooms'
                    >
                        <IconRooms />
                        <Text>Rooms</Text>
                    </Link>
                    <Link
                        to='/home/contacts'
                    >
                        <IconContact />
                        <Text>Contacts</Text>
                    </Link>
                    <Link
                        to='/home/users'
                    >
                        <IconUsers />
                        <Text >Users</Text>
                    </Link>
                </Wrappernavlinks>
                <UserProfile/>
                <AllRights/>
            </Wrappersection>
        </>
    )
}

const Wrappersection = styled.section<Wrappersection>`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 20%;
    height: 100vh;
    box-shadow: 13px 3px 40px #00000005;
    background-color: #ffffff;
    transition: width 1s ease;
    display: ${(props) => (props.width === '80%' ? 'block' : 'none')};
    z-index: 1;
`;
const Wrappertitlecontainer = styled.section`
    flex-direction: column;
    align-items: center;
    height: 70px;
    justify-content: space-evenly;
    width: 100%;
    display: flex;
    margin-top: 10px;
`;
const Wrapperimg = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrappertitle = styled.section`
    width: 60%;
    display: flex;
    justify-content: center;
`;
const Logo = styled.img`
    width: 50px;
    height: 50px;
`;
const Title = styled.span`
    font-size: 25px;
    letter-spacing: 3px;
    font-weight: 800;
`;
const Wrappernavlinks = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    height: 300px;
    justify-content: space-evenly;
`;
const IconDashboard = styled(BsFillClipboardDataFill)`
    color: inherit;
    width: 30%;
    height: 24px;
`;
const IconBooking = styled(MdEditCalendar)`
    color: inherit;
    width: 30%;
    height: 24px;
`;
const IconRooms = styled(MdVpnKey)`
    color: inherit;
    width: 30%;
    height: 24px;
`;
const IconContact = styled(MdPhone)`
    color: inherit;
    width: 30%;
    height: 24px;
`;
const IconUsers = styled(MdOutlinePermContactCalendar)`
    color: inherit;
    width: 30%;
    height: 24px;
`;
const Link = styled(NavLink)`
    display: flex;
    height: 50px;
    flex-direction: row;
    text-decoration: none;
    align-items: center;
    &.active {
        color: ${colors.primaryRed};
        border-left: 4px solid red;
    }
    &:not(.active) {
        color: ${colors.primaryGreen};
    }
    &:hover{
        color: #ec776f;
        border-left: 3px solid #ec776f;
    }
`;
const Text = styled.span`
    color: inherit;
    font-size: 16px;
    font-weight: 400;
    font-family: Poppins;
    &:hover{
        transform: scale(1.01);
    }
`;
