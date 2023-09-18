import React from "react";
import styled from "styled-components";

export const Guest = () => {
    return(
        <Wrapperdashboardcontainer>
            <h1>Guest page</h1>
        </Wrapperdashboardcontainer>
    )
}

const Wrapperdashboardcontainer = styled.section`
    position: absolute;
    top: 55px;
    left: 36%;
`;