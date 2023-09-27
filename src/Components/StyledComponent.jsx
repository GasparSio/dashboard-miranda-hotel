import styled from "styled-components";

export const Wrapperdashboardcontainer = styled.section`
  position: absolute;
  top: 66px;
  right: 2%;
  width: ${(props) => (props.width === '75%' ? '70%' : '96%')};
  z-index: 999;
  background-color: #F8F8F8;
`;