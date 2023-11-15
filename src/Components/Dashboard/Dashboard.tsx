import React, { useEffect } from "react";
import { StatsCards } from "./StatsCards";
import { Reviews } from "./Reviews";
import styled from "styled-components";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';
import { fetchContacts } from "../../features/contact/contactSlice";

interface WrapperDashboard {
    width: string;
};

export const Dashboard = () => {
    const width = useCustomSelector(state => state.visual.width)
    const dispatch = useCustomDispatch();

    useEffect(() => {
        dispatch(fetchContacts())
      }, [dispatch])
    
    
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