// Unlike the Input component based purely on the HTML input field, this PasswordInput component uses JSX so we need React.
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from './Input';

const PasswordInputWrapper = styled.div`
    display: flex;
    ~div { margin-bottom: 8px; }    // Add space below the div that is sibling to PasswordInputWrapper. This is the div which displays the password when 'Show' toggle is selected.
`;

// Override styles for Input component.
const PasswordInputStyled = styled(Input).attrs(() => ({
    type: 'password', placeholder: 'Password'
}))`
    border-top-right-radius: 0;         // Removes rounded top right corner so we have flat right edge for Show/Hide div.
    border-bottom-right-radius: 0;      // Likewise, this removes the rounded bottom right corner.

`;

const ToggleButton = styled.div`
    height: 40px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 0.9em;
    display: flex;
    padding: 8px;
    border-left: 0;         // Because we already have a border on right of PasswordStyled component.
    border-top-right-radius: 4px;       // Adds rounded top right corner to Show/Hide div.
    border-bottom-right-radius: 4px;    // Likewise, does so for the bottom right corner.
    background: white;
    font-weight: bold;
    cursor: pointer;
    user-select: none;      // Prevent user from being able to select the text 'Show' or 'Hide'.
    color: black;
`;

const PasswordInput = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <PasswordInputWrapper>
                <PasswordInputStyled {...props} />
                <ToggleButton onClick={() => setShowPassword(s => !s)}>
                    {showPassword ? 'Hide' : 'Show'}
                </ToggleButton>
            </PasswordInputWrapper>
            <div>{showPassword ? props.value : ''}</div>
        </>
    );
};

export { PasswordInput };
