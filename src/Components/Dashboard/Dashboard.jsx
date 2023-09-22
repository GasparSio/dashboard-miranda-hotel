import React from "react";
import { StatsCards } from "./StatsCards";
import { Reviews } from "./Reviews";
import { useSelector } from "react-redux";
import styled from "styled-components";



export const Dashboard = () => {
    const width = useSelector(state => state.visual.width)
    return(
        <WrapperDashboard width={width}>
            <StatsCards/>
            <Reviews />
        </WrapperDashboard>
    )
}

const WrapperDashboard = styled.section`
    width: ${(props) => props.width === '75%' ? '75%' : '100%'};
`


