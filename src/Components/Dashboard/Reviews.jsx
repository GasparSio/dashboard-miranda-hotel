import React from "react";
import styled from "styled-components";
import reviewsData from './dashboard-data.json';
import { ReviewCard } from "./ReviewCard";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../styles/StyleSwiperButton.css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export const Reviews = () => {
    const width = useSelector(state => state.visual.width)
    const data = reviewsData;

    return(
        <Wrapperdashboardcontainer width={width} >
            <Title>Latest Review by Customers</Title>
            <SwiperWrap
                modules={[Navigation]}
                slidesPerView={width === '75%' ? 3 : 4} // Número de tarjetas visibles por vez
                spaceBetween={1} // Espacio entre las tarjetas
                navigation
            >
            {data.map((item) => (
            <SwiperSlideContent key={item.email} >
                <ReviewCard item={item} />
            </SwiperSlideContent>
        ))}
            </SwiperWrap >
        </Wrapperdashboardcontainer>
    )
}

const Wrapperdashboardcontainer = styled.section`
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
const SwiperSlideContent = styled(SwiperSlide)`
    display: flex;
    flex-direction: row;
    width: ${(props) => props.width === '75%' ? '450px' : '500px'};
`;
