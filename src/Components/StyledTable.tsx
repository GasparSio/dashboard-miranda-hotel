import styled from "styled-components";

interface CustomWrapperStylesProps {
  width?: string; // O el tipo correcto de width que esperas
}

export const CustomWrapperStyles = styled.section<CustomWrapperStylesProps>`
  height: 275px;
  top: 45px;
  right: 0;
  position: relative;
  // width: ${(props) => (props.width === '75%' ? '70%' : '96%')} 
  max-height: 786px;
  overflow-y: auto;
  overflow-x: hidden;
`;
export const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const LineContainer = styled.div`
  display: flex;
`;
export const LineContainerComment = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ValueText = styled.span`
  font-size: 14px;
  font-weight: 600;
  font-family: Poppins;
  color: #393939;
  margin-right: 6px;
`;
export const PropertyText = styled.span`
  font-size: 14px;
  font-weight: 400;
  font-family: Poppins;
  color: #393939;
`;