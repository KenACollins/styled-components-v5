import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

// Make the code in the styled button more readable by putting this CSS conditional logic in a function. 
const largeStyles = ({ large }) => {
    if (large) {
        return css`     // Technique demonstrates css helper to return CSS properties when used in if/then/else logic.
            padding: 10px;
            border-radius: 5px;
            font-size: 1.5em;    
        `;
    }
    else {
        return css`
            padding: 8px;
            border-radius: 4px;
            font-size: 1em;
        `
    }
};

const Button = styled.button`
    color: white;
    background: ${props => props.secondary ? props.theme.secondaryColor : props.theme.primaryColor};
    font-weight: bold;

    ${largeStyles}

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

Button.propTypes = {
    large: PropTypes.bool,
    secondary: PropTypes.bool
};

export { Button };