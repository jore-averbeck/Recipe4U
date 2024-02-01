import styled from "styled-components";

const Headline = styled.h1`
  padding-left: 50px;
`;

export default function Header() {
  return (
    <header>
      <Headline>Cook-Yeah!</Headline>
    </header>
  );
}
