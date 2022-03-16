import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link as OriginalLink, useLocation } from 'react-router-dom';    // Reassign the real Link component to a new name for workaround described below.
import { Toggle } from './Toggle';

const HeaderWrapper = styled.header`
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    padding: 0 16px;
    position: fixed;
    top: 0;
    background-image: linear-gradient(to right, ${props => props.theme.primaryColor}, ${props => props.theme.secondaryColor});
    border-bottom: 3px solid ${props => props.theme.secondaryColor};
`;

const Menu = styled.nav`
    display: ${props => props.open ? 'block' : 'none'};     // Default setting for mobile. Reset to flex when screen width >= 768px.
    font-family: 'Open Sans';
    position: absolute;
    width: 100%;
    top: 60px;
    left: 0;
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 3px solid ${props => props.theme.secondaryColor};
    background: ${p => p.theme.bodyBackgroundColor};
    
    @media(min-width: 768px) {  // This is our breakpoint for deciding user is on a desktop computer.
        display: flex;
        background: none;
        width: initial;         // Any CSS attribute set to initial just means default, but we will be targeting these properties in the mobile styling.
        top: initial;
        left: initial;
        margin: auto 0 auto auto;   // Zero on right and auto on left pushes menu to right side of screen.
        border-bottom: none;
        position: relative;
    }
`;

// Technique for creating a styled component (MenuAlt) that inherits styling from another styled component (Menu) and then can override some styles. 
// This is just FYI, we are not referencing <MenuAlt>...</MenuAlt> tag in our code.
const MenuAlt = styled(Menu)`
    border-top: 5px solid black;
`;

// Our own custom Link component is a workaround since we can't technically pass our own isActive prop to the real Link component,
// renamed OriginalLink, because that would mean we are passing an unsupported isActive prop to the anchor tag that is actually 
// rendered in the DOM. The props we pass to OriginalLink avoid isActive.
const Link = ({ isActive, children, ...props }) => {
    return (
        <OriginalLink {...props}>{children}</OriginalLink>
    );
};

// Same technique as described for MenuAlt applies to styling unstyled React components, e.g., Link.
// In this case, we are passing our own custom isActive prop to StyledLink.
const StyledLink = styled(Link)`
    padding: 4px 8px;
    display: block;
    text-align: center;
    box-sizing: border-box;
    margin: auto 0;
    font-weight: ${props => props.isActive ? 'bold' : 'normal'};
    color: ${p => p.theme.bodyFontColor};
`;

// Hamburger menu icon.
const MobileMenuIcon = styled.div`
    margin: auto 0 auto auto;
    width: 25px;
    min-width: 25px;
    padding: 5px;

    > div { // CSS selector for all div tags one level down, and no further, from parent.
        height: 3px;
        background: ${p => p.theme.bodyFontColor};
        margin: 5px 0;
        width: 100%;
    }

    @media(min-width: 768px) {  // Hide hamburger menu on desktop computers.
        display: none;
    }
`;

export const Header = () => {
    const pathname = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // We don't want the menu open by default = mobile state.
    const { id, setTheme } = useContext(ThemeContext);

    return (
        <HeaderWrapper>
            <MobileMenuIcon onClick={() => setIsMenuOpen(s => !s)}>
                <div />
                <div />
                <div />
            </MobileMenuIcon>
            <Menu open={isMenuOpen}>
                <StyledLink to="/" isActive={pathname === '/'}>Home</StyledLink>
                <StyledLink to="/login" isActive={pathname === '/login'}>Login</StyledLink>
                <Toggle isActive={id === 'dark'} onToggle={setTheme} />
            </Menu>
        </HeaderWrapper>
    );
};