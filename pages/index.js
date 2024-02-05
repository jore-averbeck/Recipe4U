import { useState, useEffect } from "react";
import useSWR from "swr";
import Card from "../components/Card.js";
import styled from "styled-components";
import Navigation from "@/components/Navigation.js";
import Header from "@/components/Header.js";
import Loader from "@/components/Loader.js";
import Fuse from "fuse.js";
import Searchbar from "@/components/Searchbar.js";

const CardContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
  list-style-type: none;
  padding: 0;
  margin: 2rem 0rem 0rem 1rem;
  justify-content: center;
`;

const StyledList = styled.li`
  box-sizing: border-box;
  border-radius: 0.5rem;
  margin-left: 0.7rem;
  margin-bottom: 0.1rem;
  padding: 1rem;
  width: 300px;
  height: 362px;
`;

const Container = styled.div`
  margin-bottom: 5rem;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h2`
  /* text-align: center; */
  margin-left: 5rem;
`;

const CountContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Count = styled.div`
  align-self: center;
  font-size: 1.5rem;
  background-color: #222c61;
  padding: 0.5rem;
  color: white;
  border-radius: 0.5rem;
`;

export default function Homepage({
  handleToggleFavorites,
  favorites,
  recipes,
}) {
  const { data, isLoading } = useSWR("/api/recipes", {
    fallbackData: [],
  });
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const fuse = new Fuse(recipes, {
    keys: ["title"],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [recipes, searchValue]); // Update showLoader when recipes or searchValue change

  if (isLoading || showLoader) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  }

  function handleClickEvent(value) {
    setSearchValue(value);
    const results = fuse.search(value);
    const filteredResults = results.filter((result) => {
      return result.item.title.toLowerCase() === value.toLowerCase();
    });
    setSearchResults(filteredResults.map((result) => result.item));
  }

  function handleInputChange(value) {
    setSearchValue(value);
    setSuggestions(fuse.search(value));
  }

  return (
    <Container>
      <Header />
      <Searchbar
        suggestions={suggestions}
        onInputChange={handleInputChange}
        onClickEvent={handleClickEvent}
      />
      <section>
        <CountContainer>
          <Title>{searchValue ? "Search Results" : "All Recipes"}</Title>
          <Count>{searchValue ? searchResults.length : data.length}</Count>
        </CountContainer>
        <CardContainer>
          {(searchValue ? searchResults : data).map((recipe) => (
            <StyledList key={recipe._id}>
              <Card
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                ingredients={recipe.ingredients}
                steps={recipe.steps}
                id={recipe._id}
                onToggleFavorites={handleToggleFavorites}
                favorites={favorites}
              />
            </StyledList>
          ))}
        </CardContainer>
      </section>
      <Navigation />
    </Container>
  );
}
