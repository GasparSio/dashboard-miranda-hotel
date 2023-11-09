import React from "react";
import styled from "styled-components";
import { dashboardData } from './dashboard-data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../styles/StyleSwiperButton.css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { useCustomSelector } from '../../hooks/redux/index';
import { ReviewCard, ReviewItem } from "./ReviewCard";


interface Wrapperdashboardcontainer {
    width: string;
};

export const Reviews = () => {
    const width = useCustomSelector(state => state.visual.width)
    const data: ReviewItem[] = dashboardData;

    return(
        <Wrapperdashboardcontainer width={width} >
            <Title>Latest Review by Customers</Title>
            <Swiper style={{width: '100%'}}
                modules={[Navigation, A11y]}
                slidesPerView={width === '75%' ? 3 : 4} // Número de tarjetas visibles por vez
                spaceBetween={0} // Espacio entre las tarjetas
                navigation
            >
            {data.map((item) => (
            <SwiperSlideContent key={item.email} width={width}>
                <ReviewCard item={item} />
            </SwiperSlideContent>
        ))}
            </Swiper >
        </Wrapperdashboardcontainer>
    )
}

const Wrapperdashboardcontainer = styled.section<Wrapperdashboardcontainer>`
    position: absolute;
    bottom: 0;
    right: 0;
    width: ${(props) => props.width === '75%' ? '75%' : '100%'};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-shadow: 0px 4px 4px #00000005;
    border-radius: 20px;
    background-color: #FFFFFF;
`;
const Title = styled.span`
    font-family: Poppins;
    font-size: 20px;
    font-weight: 400;
    color: #393939;
    margin-bottom: 20px;
    padding-left: 50px;
`;
const SwiperWrap = styled(Swiper)`
    width: 100%;
`;
const SwiperSlideContent = styled(SwiperSlide)<Wrapperdashboardcontainer>`
    width: ${(props) => props.width === '75%' ? '450px' : '500px'};
`;

