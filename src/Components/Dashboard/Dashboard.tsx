import { useEffect, useState } from "react";
import { StatsCards } from "./StatsCards";
import { Reviews } from "./Reviews";
import styled from "styled-components";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';
import { fetchContacts } from "../../features/contact/contactSlice";
import { DotLoader } from 'react-spinners';

interface WrapperDashboard {
    width: string;
};

export const Dashboard = () => {
    const width = useCustomSelector(state => state.visual.width)
    const dispatch = useCustomDispatch();
    const loadingStatus = useCustomSelector((state) => state.contact.status);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    useEffect(() => {
        if(loadingStatus === 'pending'){
            setIsLoading(true)
        }else{
            setIsLoading(false)
        }
    }, [loadingStatus])

    
    return(
        <WrapperDashboard width={width}>
            <StatsCards/>
            {isLoading && (
            <LoaderContainer>
                <DotLoader color="#7884a3" />
            </LoaderContainer>
            )}
            <Reviews />
        </WrapperDashboard>
    )
}

const WrapperDashboard = styled.section<WrapperDashboard>`
    width: ${(props) => props.width === '80%' ? '80%' : '100%'};
`;
const LoaderContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 36%;
    transform: translate(-50%);
`;