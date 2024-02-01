import Link from "next/link.js";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  padding-bottom: 1rem;
  background-color: #fafafa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
`;

const StyledImage = styled(Image)`
  max-width: 100%;
  max-height: 100%;
  height: 270px;
  width: 300px;
  border-radius: 0.2rem;
  position: relative;
`;

const StyledEdit = styled(FontAwesomeIcon)`
  color: black;
  font-size: 1.2rem;
  position: absolute;
`;

const StyledTrash = styled(FontAwesomeIcon)`
  color: black;
  font-size: 1.2rem;
  position: absolute;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
  gap: 2rem;
  margin-top: -3rem;
`;

const StyledButton = styled.button`
  background: transparent;
  padding: 0.5rem;
  border: none;
  height: 10px;
`;

const Title = styled.h2`
  padding-left: 0.5rem;
`;

export default function Card({ title, image, id }) {
  const { data, mutate } = useSWR("/api/recipes", { fallbackData: [] });

  async function handleDelete(id) {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await response.json();
      mutate();
    } else {
      console.error(
        "Error deleting recipe:",
        response.status,
        response.statusText
      );
    }
  }
  return (
    <>
      <Article>
        <StyledLink href={`/recipes/${id}`}>
          <StyledImage src={image} width={100} height={100} />
          <Title>{title}</Title>
        </StyledLink>
        <Container>
          <Link href={`/handleRecipe/${id}/edit`}>
            <StyledEdit icon={faPen} />
          </Link>
          <StyledButton onClick={() => handleDelete(id)}>
            <StyledTrash icon={faTrash} />
          </StyledButton>
        </Container>
      </Article>
    </>
  );
}
