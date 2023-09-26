import React from "react";
import styled from "styled-components";
import { colors } from '../theme';
import { FaBed } from 'react-icons/fa';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { TbLogin2 } from 'react-icons/tb';
import { TbLogout2 } from 'react-icons/tb';
import { useSelector } from "react-redux";

export const StatsCards = () => {
    const width = useSelector(state => state.visual.width)

    return (
        <Wrapperdashboardcontainer width={width}>
            <CardContainer>
                <IconBedContainer>
                    <IconBed />
                </IconBedContainer>
                <StatsContainer>
                    <NumberDetail>8461</NumberDetail>
                    <TextDetail>New Booking</TextDetail>
                </StatsContainer>
            </CardContainer>
            <CardContainer>
                <IconCalendarContainer>
                    <IconCalendar />
                </IconCalendarContainer>
                <StatsContainer>
                    <NumberDetail>963</NumberDetail>
                    <TextDetail>Scheduled Room</TextDetail>
                </StatsContainer>
            </CardContainer>
            <CardContainer>
                <IconCheckInContainer>
                    <IconCkeckIn />
                </IconCheckInContainer>
                <StatsContainer>
                    <NumberDetail>753</NumberDetail>
                    <TextDetail>Check in</TextDetail>
                </StatsContainer>
            </CardContainer>
            <CardContainer>
                <IconCheckOutContainer>
                    <IconCkeckOut />
                </IconCheckOutContainer>
                <StatsContainer>
                    <NumberDetail>516</NumberDetail>
                    <TextDetail>Check out</TextDetail>
                </StatsContainer>
            </CardContainer>
        </Wrapperdashboardcontainer>
    )
}

const Wrapperdashboardcontainer = styled.section`
    position: absolute;
    top: 110px;
    right: 0%;
    width: ${(props) => props.width === '75%' ? '75%' : '100%'};
    display: flex;
    justify-content: space-evenly;
`;
const CardContainer = styled.div`
    display: flex;
    height: 125px;
    align-items: center;
    width: 300px;
    box-shadow: 0px 4px 4px #00000005;
    background-color: #FFFFFF;
    justify-content: space-evenly;
    border-radius: 10px;
`;
const IconBedContainer = styled.div`
    width: 20%;
    height: 61px;
    background-color: #FFEDEC;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const IconBed = styled(FaBed)`
    color: ${colors.primaryRed};
    width: 20px;
`;
const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;
const NumberDetail = styled.span`
    font-family: Poppins;
    font-weight: 600;
    font-size: 30px;
    color: #393939;
`;
const TextDetail = styled.span`
    font-family: Poppins;
    font-weight: 300;
    font-size: 14px;
    color: ${colors.textGrey};
`;
const IconCalendarContainer = styled.div`
    width: 20%;
    height: 61px;
    background-color: ${colors.primaryRed};
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const IconCalendar = styled(BsFillCalendar2CheckFill)`
    color: ${colors.backgroundWhite};
    width: 20px;
`;
const IconCheckInContainer = styled.div`
    width: 20%;
    height: 61px;
    background-color: ${colors.backgroundPinkButton};
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const IconCkeckIn = styled(TbLogin2)`
    color: ${colors.primaryRed};
    width: 20px;
`;
const IconCheckOutContainer = styled.div`
    width: 20%;
    height: 61px;
    background-color: ${colors.primaryRed};
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const IconCkeckOut = styled(TbLogout2)`
    color: ${colors.backgroundWhite};
    width: 20px;
`;