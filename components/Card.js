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
  background-color: ${(props) =>
    props.isDarkMode ? "var(--darkmode-primary)" : "var(--fourth)"};
  box-shadow: var(--primary-shadow);
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
  color: ${(props) => (props.isDarkMode ? "black" : "var(--primary)")};
  font-size: 1.2rem;
  position: absolute;
  bottom: 1rem;
  right: 2.5rem;
`;

const StyledTrash = styled(FontAwesomeIcon)`
  color: ${(props) => (props.isDarkMode ? "black" : "var(--primary)")};
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

const Title = styled.h3`
  padding-left: 0.5rem;
  max-width: 80%;
  margin-top: 0.1rem;
  color: ${(props) => (props.isDarkMode ? "black" : "var(--primary)")};
`;

const DefaultHeart = styled(FontAwesomeIcon)`
  font-size: 2rem;
  ${(props) => (props.isDarkMode ? "inherit" : "var(--primary)")};
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const RedHeart = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: var(--third);
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
  isDarkMode,
}) {
  const { mutate } = useSWR("/api/recipes", { fallbackData: [] });
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
      <Article isDarkMode={isDarkMode}>
        <StyledLink href={`/recipes/${id}`}>
          <StyledImage src={image} width={100} height={100} />
          <Title isDarkMode={isDarkMode}>{title}</Title>
        </StyledLink>
        <Container>
          <Link href={`/handleRecipe/${id}/edit`}>
            <StyledEdit icon={faPen} isDarkMode={isDarkMode} />
          </Link>
          <StyledButton onClick={() => handleDelete(id)}>
            <StyledTrash icon={faTrash} isDarkMode={isDarkMode} />
          </StyledButton>
          <StyledButton
            onClick={(event) => event && onToggleFavorites(id, event)}
          >
            {isFavorite ? (
              <RedHeart icon={Heart} />
            ) : (
              <DefaultHeart icon={Heart} isDarkMode={isDarkMode} />
            )}
          </StyledButton>
        </Container>
      </Article>
    </>
  );
}
