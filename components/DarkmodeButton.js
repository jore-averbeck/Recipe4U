import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const StyledButton = styled.button`
  background: transparent;
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: var(--secondary);
`;

export default function DarkmodeButton({ isDarkMode, toggleDarkMode }) {
  return (
    <StyledButton onClick={toggleDarkMode}>
      {isDarkMode ? <StyledIcon icon={faSun} /> : <StyledIcon icon={faMoon} />}
    </StyledButton>
  );
}
