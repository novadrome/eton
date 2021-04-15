import React from 'react';
import styled from "styled-components";
import Timestamp from "./Timestamp";
import Entry from "./Entry";
import Trash from "./Trash";

const Line = (props:any) => {
    return(
        <LineElement id={props.id}>
            <Timestamp id={props.tsName}>{props.time}</Timestamp>
            <Entry id={props.entryName} />
            <Trash id={props.trashName} onClick={props.trashClick}/>
        </LineElement>
    )
}

const LineElement = styled.div`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    align-items: center;
    justify-content: center;
    margin-bottom: 2em;

    min-width: 400px;
    width: 100%;
    height: auto;
`;

export default Line;