import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import logo from '../../Img/icon-hotel.png';
import { colors } from '../theme';
import { MdVpnKey, MdEditCalendar, MdPhone, MdOutlinePermContactCalendar } from 'react-icons/md';
import { BsFillClipboardDataFill } from 'react-icons/bs';
import { UserProfile } from "./UserProfile";
import { useSelector } from "react-redux";
import { AllRights } from "./AllRights";

export const LeftNavLink = () => {
    const width = useSelector((state) => state.visual.width);

    return (
        <>
            <Wrappersection width={width}>
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
                        to='/home/contact'
                    >
                        <IconContact />
                        <Text>Contact</Text>
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

const Wrappersection = styled.section`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 25%;
    height: 100vh;
    box-shadow: 13px 3px 40px #00000005;
    background-color: #ffffff;
    transition: width 1s ease;
    display: ${(props) => (props.width === '75%' ? 'block' : 'none')};
    z-index: 1;
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
    margin-bottom: 110px;
`;
const IconDashboard = styled(BsFillClipboardDataFill)`
    color: inherit;
    width: 30%;
    height: 30px;
`;
const IconBooking = styled(MdEditCalendar)`
    color: inherit;
    width: 30%;
    height: 30px;
`;
const IconRooms = styled(MdVpnKey)`
    color: inherit;
    width: 30%;
    height: 30px;
`;
const IconContact = styled(MdPhone)`
    color: inherit;
    width: 30%;
    height: 30px;
`;
const IconUsers = styled(MdOutlinePermContactCalendar)`
    color: inherit;
    width: 30%;
    height: 30px;
`;

const Link = styled(NavLink)`
    display: flex;
    height: 70px;
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
`;
const Text = styled.span`
    color: inherit;
    font-size: 18px;
    font-weight: 400;
    font-family: Poppins;
`;
