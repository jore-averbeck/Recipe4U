import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";

const StyledHeader = styled.header`
  margin-bottom: 2rem;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  height: 13vh;
  min-height: 50px;
  color: var(--secondary);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: var(--primary);
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledIcon icon={faPizzaSlice} />
      <h1>Recipe4U</h1>
    </StyledHeader>
  );
}
