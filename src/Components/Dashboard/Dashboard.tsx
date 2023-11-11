import React from "react";
import { StatsCards } from "./StatsCards";
import { Reviews } from "./Reviews";
import styled from "styled-components";
import { useCustomSelector } from '../../hooks/redux/index';

interface WrapperDashboard {
    width: string;
};

export const Dashboard = () => {
    const width = useCustomSelector(state => state.visual.width)
    return(
        <WrapperDashboard width={width}>
            <StatsCards/>
            <Reviews />
        </WrapperDashboard>
    )
}

const WrapperDashboard = styled.section<WrapperDashboard>`
    width: ${(props) => props.width === '80%' ? '80%' : '100%'};
`;