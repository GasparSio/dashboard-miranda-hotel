import React from 'react'
import { CgMenuLeft } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { colors } from '../theme';


export const HamburgIcon = ({onClick}) => {
    const width = useSelector((state) => state.visual.width);

  return (
    <Button onClick={onClick} width={width} data-testid="hamburg-icon"></Button>
  )
}

const Button = styled(CgMenuLeft)`
    cursor: pointer;
    width: 25px;
    height: 25px;
    color: ${props => props.width === '75%'? `${colors.primaryRed}` : `${colors.filterGreenButton}`};
    &:hover {
        transform: scale(1.2);
    }
`;
