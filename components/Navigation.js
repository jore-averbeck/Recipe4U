import Link from "next/link";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const StyledNavigation = styled.nav`
  position: fixed;
  bottom: -0.1rem;
  width: 100%;
  height: 60px;
  box-shadow: var(--secondary-shadow);
  background-color: ${(props) =>
    props.isDarkMode ? "var(--darkmode-primary)" : "var(--secondary)"};
`;

const StyledUnorderedList = styled.ul`
  display: flex;
  list-style: none;
`;

const StyledListItem = styled.li`
  flex: 1;
  display: flex;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => (props.isDarkMode ? "black" : "var(--primary)")};
  font-size: 2rem;
`;

export default function Navigation({ isDarkMode }) {
  return (
    <StyledNavigation isDarkMode={isDarkMode}>
      <StyledUnorderedList>
        <StyledListItem>
          <StyledLink href="/">
            <StyledIcon icon={faHouse} isDarkMode={isDarkMode} />
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink href="/handleRecipe/create">
            <StyledIcon icon={faPlus} isDarkMode={isDarkMode} />
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink href="/favorites">
            <StyledIcon icon={faHeart} isDarkMode={isDarkMode} />
          </StyledLink>
        </StyledListItem>
      </StyledUnorderedList>
    </StyledNavigation>
  );
}
