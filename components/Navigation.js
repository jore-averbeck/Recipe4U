import Link from "next/link";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const StyledNavigation = styled.nav`
  position: fixed;
  bottom: -0.1rem;
  width: 100%;
  height: 60px;
  box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.2);
  background-color: #fafafa;
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
  color: #222c61;
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
          <StyledLink href="/favorites">
            <StyledIcon icon={faHeart} />
          </StyledLink>
        </StyledListItem>
      </StyledUnorderedList>
    </StyledNavigation>
  );
}
