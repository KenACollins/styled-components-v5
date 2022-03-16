// Spinner - rotating half circle in a pinkish-red color
import styled, { keyframes } from "styled-components";

const rotation = keyframes`
    from { 
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
    height: 30px;
    width: 30px;
    border: 1px solid #F8049C;
    border-radius: 50%;
    border-top: none;
    border-right: none;
    margin: 16px auto;
    animation: ${rotation} 1s linear infinite;  // One full rotation takes a second, continue rotating without stopping.
`;

export { Spinner };