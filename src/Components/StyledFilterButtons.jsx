import styled from "styled-components";
import { colors } from './theme';
import { AiOutlineSearch } from "react-icons/ai";

export const WrapperButton = styled.div`
    border-bottom: ${(props) => props.isActive ? `3px solid ${colors.filterGreenButton}` : 'none'};
    height: 42px;
    width: 180px;
    display: flex;
    justify-content: center;
`;

export const Button = styled.button`
    border: none;
    background-color: transparent;
    color: ${(props) => props.isActive ? `${colors.filterGreenButton}` : `${colors.filterGreyButton}`};
    font-family: Poppins;
    font-size: 16px;
`;

export const WrapperInput = styled.div`
  display: flex;
  position: relative;
  height: 35px;
`
export const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  left: 8px;
  top: 8px;
`
export const Input = styled.input`
  border-radius: 12px;
  border: 1px solid ${colors.filterGreenButton};
  color: ${colors.filterGreyButton};
  font-family: Poppins;
  font-size: 13px;
  padding-left: 30px;
`
export const Select = styled.select`
  color: ${colors.filterGreenButton};
  border-radius: 12px;
  background-color:  ${colors.backgroundWhite};
  text-align: center;
  border: 1px solid ${colors.filterGreenButton};
  width: 143px;
  height: 35px;
  font-family: Poppins;
  font-weight: 400;
  font-size: 14px;
  margin-left: 30px;
`;
export const Option = styled.option`
  color: ${colors.filterGreenButton};
  border-radius: 12px;
  background-color:  ${colors.backgroundWhite};
  text-align: center;
  border: 1px solid ${colors.filterGreenButton};
  width: 143px;
  height: 35px;
  font-family: Poppins;
  font-weight: 400;
  font-size: 16px;
  margin-left: 25px;
`;