    import React from "react";
    import styled from "styled-components";
    import reviewsData from './dashboard-data.json';
    import { useSelector } from "react-redux";
    import { BsCheckCircle } from "react-icons/bs";
    import { RxCrossCircled } from "react-icons/rx";
    import { Swiper, SwiperSlide } from 'swiper/react';
    import { Navigation } from 'swiper/modules';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/scrollbar';
    import 'swiper/css/autoplay';

    export const Reviews = () => {
        const width = useSelector(state => state.visual.width)
        const data = reviewsData;
        console.log(data);
        return(
            <Wrapperdashboardcontainer width={width} >
                <Title>Latest Review by Customers</Title>
                <SwiperWrap
                    modules={[Navigation]}
                    slidesPerView={width === '75%' ? 2 : 3} // Número de tarjetas visibles por vez
                    spaceBetween={1} // Espacio entre las tarjetas
                    navigation
                    autoplay
                >
                {data.map(item => (
                    <SwiperSlideContent key={item.email} >
                    <CardContainer >
                        <ContentContainer>
                            <ContentText>{item.subject} </ContentText>
                            <ContentText>{item.need} </ContentText>
                        </ContentContainer>
                        <ProfileContainer>
                            <ProfileImg></ProfileImg>
                            <NameContainer>
                                <NameText>{item.fullName}</NameText>
                                <EmailText>{item.email}</EmailText>
                                <Phone>{item.phone}</Phone>
                            </NameContainer>
                            <IconsContainer>
                                {item.status === true ? <CheckCircle/> : <CrossCircled/>}
                            </IconsContainer>
                        </ProfileContainer>
                    </CardContainer>
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
    const CardContainer = styled.div`
        display: flex;
        flex-direction: column;
        width: 400px;
        border-radius: 20px;
        border: 1px solid #EBEBEB;
        height: 200px;
        justify-content: space-evenly;
        margin-left: 25px;
    `;
    const ContentContainer = styled.div`
        display: flex;
        flex-direction: column;
        width: 95%;
        border-radius: 20px;
        height: 75%;
        margin: auto;
    `;
    const ContentText = styled.span`
        font-family: Poppins;
        font-size: 14px;
        font-weight: 400;
        color: #4E4E4E;
    `;
    const ProfileContainer = styled.div`
        display: flex;
        height: 35%;
        align-items: center;
        justify-content: space-evenly;
    `;
    const ProfileImg = styled.div`
        width: 50px;
        height: 50px;
        background-color: #C5C5C5;
    `;
    const NameContainer = styled.div`
        display: flex;
        flex-direction: column;
        width: 60%;
        align-items: center;
    `;
    const NameText = styled.span`
        font-family: Poppins;
        font-size: 16px;
        font-weight: 600;
        color: #262626;
    `;
    const EmailText = styled.span`
        font-family: Poppins;
        font-size: 14px;
        font-weight: 400;
        color: #799283;
    `;
    const Phone = styled.span`
        font-family: Poppins;
        font-size: 14px;
        font-weight: 400;
        color: #799283;
    `;
    const IconsContainer = styled.div`
        display: flex;
        justify-content: space-around;
        width: 17%;
    `;
    const CheckCircle = styled(BsCheckCircle)`
        color: #5AD07A;
    `;
    const CrossCircled = styled(RxCrossCircled)`
        color: #E23428;
    `;