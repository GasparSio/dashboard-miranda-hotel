import styled from "styled-components";

interface WrapperdashboardcontainerProps {
  width?: string;
}

export const Wrapperdashboardcontainer = styled.section<WrapperdashboardcontainerProps>`
  position: absolute;
  top: 66px;
  right: 2%;
  width: ${(props) => (props.width === '80%' ? '75%' : '96%')};
  z-index: 999;
  background-color: #F8F8F8;
`;