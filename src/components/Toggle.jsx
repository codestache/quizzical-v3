import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as SunIcon } from 'images/sun.svg';
import { ReactComponent as MoonIcon } from 'images/half-moon.svg';
import { ThemeContext } from 'context/ThemeStore';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.5rem;
  margin-left: auto;
  margin-right: 15px;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 3.5rem;
  height: 2.1rem;

  svg {
    height: auto;
    width: 1rem;
    transition: all 0.3s linear;

    // sun icon
    &:nth-child(1) {
      transform: ${({ lightTheme }) =>
        lightTheme ? 'translateY(0)' : 'translateY(100px)'};
    }

    // moon icon
    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? 'translateY(-100px)' : 'translateY(0)'};
    }
  }
`;

const Toggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLight = theme === 'light'; //return a boolean value depending on current theme.
  return (
    <>
      <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
        <SunIcon />
        <MoonIcon />
      </ToggleContainer>
    </>
  );
};

export default Toggle;
