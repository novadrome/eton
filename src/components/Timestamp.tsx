import styled from "styled-components";
import React from "react";

const Timestamp = (props:any) => {
    return(
        <Time id={props.id}>{props.children}</Time>
    )
}

const Time = styled.span`
    font-size: 14pt;
    text-align: right;
    user-select: none; 
    
    padding-right: 1em;
    width: auto;
    height: 100%;

    color: var(--secondary-color);

    transition: color 0.1s ease-in-out;
`;

export default Timestamp;