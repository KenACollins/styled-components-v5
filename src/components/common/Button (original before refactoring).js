import styled, { css } from "styled-components";

const Button = styled.button`
    color: white;
    background: ${props => props.secondary ? props.theme.secondaryColor : props.theme.primaryColor};
    font-weight: bold;

    // Technique demonstrates css helper that allows use of ternary ?: operator to set styles in if/then/else structure. 
    ${props => props.large ? css`
    padding: 10px;
    border-radius: 5px;
    font-size: 1.5em;    
    ` : css`
    padding: 8px;
    border-radius: 4px;
    font-size: 1em;
    `}
    box-shadow: none;
    border: none;
    width: 100%;
    display: block;
    white-space: none;

    &:disabled {
    background: #eee;
    color: #666;
}
`;

export { Button };