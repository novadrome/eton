import styled from "styled-components";

const Entry = (props:any) => {
    return(
        <TextBox id={props.id} contentEditable="true"/>
    ) 
}

const TextBox = styled.div`

    border: solid 1px var(--secondary-color);
    background-color: var(--entry-background-color);
    color: var(--secondary-color);
    outline: none;

    font-size: 14pt;
    font-family: "century-gothic";
    overflow-wrap: break-word;
    overflow: auto;
    white-space: normal;	
            
    width: 50%;
    max-width: 50%;

    min-height: 1em;
    height: auto;
    overflow-y: auto;

    resize: none;
    padding: 1em;

    transition: all 0.1s ease-in-out;
`;

export default Entry;
