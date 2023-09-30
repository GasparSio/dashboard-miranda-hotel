import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RxCrossCircled } from "react-icons/rx";
import { colors } from '../theme';


export const BookingDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams();

  const Handleback = () => {
    navigate(-1)
  };

  return (
    <WrapperBookingDetail>
      {/* <h2>Detalles del Booking #{id}</h2> */}
      <LeftContainer>
        <NameContainer>
          <span>Roberto Mansini</span>
          <p>ID 1</p>
        </NameContainer>
        <DateContainer>
          <CheckInContainer>
            <span>Check in</span>
            <p>2023-12-24 - 13:00pm</p>
          </CheckInContainer>
          <CheckOutContainer>
            <span>Check out</span>
            <p>2023-12-29 - 11:00am</p>
          </CheckOutContainer>
        </DateContainer>
        <Line></Line>
        <RoomContainer>
          <CheckInContainer>
            <span>Room Info</span>
            <p>Deluxe - Single Bed</p>
          </CheckInContainer>
          <CheckInContainer>
            <span>Price</span>
            <p>$ 145 /night</p>
          </CheckInContainer>
        </RoomContainer>
        <RequestContainer>
          <span>Special Request: ad nostrud ipsum mollit et adipisicing laborum consectetur quis amet dolor anim duis dolorad nostrud ipsum mollit et adipisicing laborum consectetur quis amet dolor anim duis dolorad nostrud ipsum mollit et adipisicing laborum consectetur quis amet dolor anim duis dolorad nostrud ipsum mollit et adipisicing laborum consectetur quis amet dolor anim duis dolorad nostrud ipsum mollit et adipisicing laborum consectetur quis amet dolor anim duis dolor</span>
        </RequestContainer>
        <FacilitiesContainer>
          <h1>Facilities</h1>
          <Amenities>
            <span>Free Wifi</span>
            <span>24 hours guard</span>
            <span>Air Conditioner</span>
            <span>TV</span>
          </Amenities>
        </FacilitiesContainer>
        <ButtonBack onClick={Handleback}/>
      </LeftContainer>
      <RightContainer>
        <Photo></Photo>
        <RoomTypeContainer>
          <span>Bed Type</span>
          <span>Status</span>
        </RoomTypeContainer>
      </RightContainer>
    </WrapperBookingDetail>
  );
}

const WrapperBookingDetail = styled.div`
    position: absolute;
    right: 2%;
    top: 105px;
    display: flex;
    width: 70%;
    border-radius: 25px;
    background-color: white;
`;
const LeftContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
`;
const ButtonBack = styled(RxCrossCircled)`
  position: absolute;
  top: 3%;
  right: 3%;
  color: ${colors.primaryRed};
  width: 20px;
  height: 20px;
`;
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  span {
    font-family: Poppins;
    font-weight: 600;
    font-size: 22px;
    color: #212121;
  }
  p {
    font-family: Poppins;
    font-weight: 400;
    font-size: 14px;
    color: #799283;
  }
`;
const DateContainer = styled.div`
  display: flex;
  height: 10%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 40px;
`;
const CheckInContainer = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-family: Poppins;
    font-weight: 600;
    font-size: 18px;
    color: #212121;
  }
  span {
    font-family: Poppins;
    font-weight: 400;
    font-size: 14px;
    color: #799283;
  }
`;
const CheckOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-family: Poppins;
    font-weight: 600;
    font-size: 18px;
    color: #212121;
  }
  span {
    font-family: Poppins;
    font-weight: 400;
    font-size: 14px;
    color: #799283;
  }
`;

const Line = styled.div`
  height: 1px;
  background-color: #cecece;
  width: 90%;
  margin: 0 auto;
`;

const RoomContainer = styled.div`
  display: flex;
  height: 10%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
`;
const RequestContainer = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  span {
    font-family: Poppins;
    font-weight: 400;
    font-size: 14px;
    color: #363636;
  }

`;
const FacilitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
  h1{
    font-family: Poppins;
    font-weight: 400;
    font-size: 14px;
    color: #363636;
  }
  `;
  const Amenities = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    height: 105px;
  span {
    width: 135px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    color: #067231;
    background-color: #EEF9F2;
  }
`
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const Photo = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: grey;
  border-radius: 0 25px 25px 0;
`;

const RoomTypeContainer = styled.div`
  display: flex;
`;