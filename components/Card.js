import Link from "next/link.js";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faHeart as Heart,
} from "@fortawesome/free-solid-svg-icons";

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
  color: #222c61;
  font-size: 1.2rem;
  position: absolute;
  bottom: 1rem;
  right: 2.5rem;
`;

const StyledTrash = styled(FontAwesomeIcon)`
  color: #222c61;
  font-size: 1.2rem;
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;
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

const DefaultHeart = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: #222c61;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const RedHeart = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: red;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export default function Card({
  title,
  image,
  id,
  onToggleFavorites,
  favorites,
}) {
  const { data, mutate } = useSWR("/api/recipes", { fallbackData: [] });
  const isFavorite = favorites && favorites.includes(id);

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
          <StyledButton
            onClick={(event) => event && onToggleFavorites(id, event)}
          >
            {isFavorite ? (
              <RedHeart icon={Heart} />
            ) : (
              <DefaultHeart icon={Heart} />
            )}
          </StyledButton>
        </Container>
      </Article>
    </>
  );
}
