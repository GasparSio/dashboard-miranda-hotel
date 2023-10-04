import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MdArrowBack } from "react-icons/md";
import { colors } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBooking } from '../../features/bookings/bookingSlice';


export const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const booking = useSelector(state => state.bookings.booking);
  const bookingId = parseInt(id, 10);
  
  console.log(booking);
  
  useEffect(() => {
    // Llama a la acción fetchBooking para cargar los detalles de la reserva
    dispatch(fetchBooking(bookingId));
  }, [dispatch, bookingId]);
  

  if (!booking) {
    navigate('/home/bookings'); 
    return null;
  }

  const Handleback = () => {
    navigate(-1)
  };

  return (
    <WrapperBookingDetail>
      <LeftContainer>
        <NameContainer>
          <span>{booking.fullname}</span>
          <p>ID: {booking.id}</p>
        </NameContainer>
        <DateContainer>
          <CheckInContainer>
            <span>Check in</span>
            <p>{booking.checkin}</p>
          </CheckInContainer>
          <CheckOutContainer>
            <span>Check out</span>
            <p>{booking.checkout}</p>
          </CheckOutContainer>
        </DateContainer>
        <Line></Line>
        <RoomContainer>
          <CheckInContainer>
            <span>Room Info</span>
            <p>{booking.roomtype}</p>
          </CheckInContainer>
          <CheckInContainer>
            <span>Price</span>
            <p>{booking.price}</p>
          </CheckInContainer>
        </RoomContainer>
        <RequestContainer>
          <span>{booking.specialrequest}</span>
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
        <Photo>
          <img src={booking.photo}/>
        </Photo>
        <RoomTypeContainer>
          <span>{booking.roomtype}</span>
          {/* <span>{booking.status}</span> */}
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
    border: 1px solid #c5d6c7;
`;
const LeftContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
`;
const ButtonBack = styled(MdArrowBack)`
  position: absolute;
  top: 3%;
  left: 3%;
  color: #000000;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: transform;
  &:hover{
    transform: scale(1.1);
  }
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
  position: relative;
`;
const Photo = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 0 25px 25px 0;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 25px 25px 0;
  }
`;

const RoomTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 24%;
  span{
    color: white;
    font-size: 26px;
    font-family: Poppins;
    font-weight: 600;
  }
`;