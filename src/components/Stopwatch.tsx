import styled from "styled-components";
import React from "react";

const Stopwatch = (props:any) => {
    return(
        <Button id={props.id} onClick={props.onClick}>{props.children}</Button>
    )
}

const Button = styled.div`
    padding: 3px;
    border: solid 2px #000;
    border-radius: 3px;
    width: auto;
    text-align: center;

    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:hover {
        cursor: pointer;
    }
`;

export default Stopwatch;