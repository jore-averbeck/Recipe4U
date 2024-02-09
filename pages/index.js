import { useState, useEffect } from "react";
import useSWR from "swr";
import Card from "../components/Card.js";
import styled, { createGlobalStyle } from "styled-components";
import Navigation from "@/components/Navigation.js";
import Header from "@/components/Header.js";
import Loader from "@/components/Loader.js";
import Fuse from "fuse.js";
import Searchbar from "@/components/Searchbar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

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
  position: relative;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h2`
  margin-left: 5rem;
`;

const CountContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  margin-bottom: -1rem;
`;

const Count = styled.div`
  align-self: center;
  font-size: 1.5rem;
  background-color: var(--primary);
  padding: 0.3rem;
  color: var(--fourth);
  border-radius: 0.5rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: var(--secondary);
`;

const StyledButton = styled.button`
  background: transparent;
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.isDarkMode ? "#1f1f1f" : "#ffffff")}; 
    color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")}; }
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
  const [searchClicked, setSearchClicked] = useState(false);
  const fuse = new Fuse(recipes, {
    keys: ["title"],
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [recipes, searchValue]);

  useEffect(() => {
    if (!searchClicked) {
      setSuggestions([]);
    }
  }, [searchClicked]);

  if (isLoading || showLoader) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  function handleClickEvent(value) {
    setSearchClicked(true);
    setSearchValue(value);
    const results = fuse.search(value);
    const filteredResults = results.filter((result) => {
      return result.item.title.toLowerCase() === value.toLowerCase();
    });
    setSearchResults(filteredResults.map((result) => result.item));
  }

  function handleInputChange(value) {
    setSearchClicked(false);
    setSearchValue(value);
    setSuggestions(fuse.search(value));
  }

  return (
    <Container>
      <GlobalStyle isDarkMode={isDarkMode} />
      <Header />
      <StyledButton onClick={toggleDarkMode}>
        {isDarkMode ? (
          <StyledIcon icon={faSun} />
        ) : (
          <StyledIcon icon={faMoon} />
        )}
      </StyledButton>
      <Searchbar
        suggestions={searchClicked ? suggestions : []}
        onInputChange={handleInputChange}
        onClickEvent={handleClickEvent}
      />
      <section>
        <CountContainer>
          {searchClicked ? (
            <>
              <Title>Search Results</Title>
              <Count>{searchResults.length}</Count>
            </>
          ) : (
            <>
              <Title>All Recipes</Title>
              <Count>{data.length}</Count>
            </>
          )}
        </CountContainer>
        <CardContainer>
          {(searchValue && searchResults.length > 0 ? searchResults : data).map(
            (recipe) => (
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
            )
          )}
        </CardContainer>
      </section>
      <Navigation />
    </Container>
  );
}
