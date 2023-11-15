import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../styles/StyleSwiperButton.css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';
import { ReviewCard } from "./ReviewCard";
import { useEffect } from "react";
import { fetchContacts } from "../../features/contact/contactSlice";
import { ToastContainer } from "react-toastify";


interface Wrapperdashboardcontainer {
    width: string;
};

export const Reviews = () => {
    const width = useCustomSelector(state => state.visual.width)
    const data = useCustomSelector(state => state.contact.contacts)
    const dispatch = useCustomDispatch()

    useEffect(() => {
        dispatch(fetchContacts())
      }, [dispatch])

    return(
        <Wrapperdashboardcontainer width={width} >
            <Title>Latest Reviews by Customers</Title>
            <SwiperWrap
                modules={[Navigation, A11y]}
                slidesPerView={width === '80%' ? 3 : 4} // Número de tarjetas visibles por vez
                spaceBetween={1} // Espacio entre las tarjetas
                navigation
            >
            {data
                .filter((item) => item.status !== 'Archived') // Filtra los contactos con status diferente a 'Archived'
                .map((item) => (
            <SwiperSlideContent key={item.email} width={width}>
              <ReviewCard item={item} />
            </SwiperSlideContent>
          ))}
            </SwiperWrap >
            <ToastContainer />
        </Wrapperdashboardcontainer>
    )
}

const Wrapperdashboardcontainer = styled.section<Wrapperdashboardcontainer>`
    position: absolute;
    bottom: 0;
    right: 0;
    width: ${(props) => props.width === '80%' ? '80%' : '100%'};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-shadow: 0px 4px 4px #00000005;
    border-radius: 20px;
    background-color: #FFFFFF;
    height: 309px;
`;
const Title = styled.span`
    font-family: Poppins;
    font-size: 17px;
    font-weight: 400;
    color: #393939;
    padding-left: 50px;
`;
const SwiperWrap = styled(Swiper)`
    width: 100%;
`;
const SwiperSlideContent = styled(SwiperSlide)<Wrapperdashboardcontainer>`
    width: ${(props) => props.width === '80%' ? '400px' : '450px'};
`;

