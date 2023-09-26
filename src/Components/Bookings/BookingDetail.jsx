import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export const BookingDetail = () => {
  const { id } = useParams();

  return (
    <Wrapper>
      <h2>Detalles del Booking #{id}</h2>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    position: absolute;
    right: 0;
    top: 105px;
`;