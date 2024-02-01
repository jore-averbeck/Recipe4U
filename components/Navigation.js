import Link from "next/link";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const StyledNavigation = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;

  background-color: #222c61;
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
  padding: 0.5rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 2rem;
`;

export default function Navigation() {
  return (
    <StyledNavigation>
      <StyledUnorderedList>
        <StyledListItem>
          <StyledLink href="/">
            <StyledIcon icon={faHouse} />
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink href="/handleRecipe/create">
            <StyledIcon icon={faPlus} />
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink href="/favourites">
            <StyledIcon icon={faHeart} />
          </StyledLink>
        </StyledListItem>
      </StyledUnorderedList>
    </StyledNavigation>
  );
}
