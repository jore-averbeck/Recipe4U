import styled from "styled-components";

const StyledHeader = styled.header`
  margin-bottom: 2rem;
  justify-content: space-around;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  height: 13vh;
  min-height: 50px;
  color: #fafafa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #222c61;
`;

const Headline = styled.h1`
  padding-left: 50px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Headline>Cook-Yeah!</Headline>
    </StyledHeader>
  );
}
