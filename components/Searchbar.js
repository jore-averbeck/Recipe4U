import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const SearchbarContainer = styled.div`
  /* background-color: var(--secondary); */
  background-color: ${(props) =>
    props.isDarkMode ? "#3648a3" : "var(--secondary)"};
  box-shadow: var(--third-shadow);
  margin-left: 2rem;
  width: 60%;
  padding: 0.1rem;
  display: flex;
  justify-content: space-between;
  border-radius: 0.8rem;
`;

const SearchInput = styled.input`
  padding: 0.2rem;
  margin-left: 0.3rem;
  margin-bottom: 0.1rem;
  width: 82%;
  border: none;
  background-color: ${(props) =>
    props.isDarkMode ? "#3648a3" : "var(--secondary)"};

  &:active {
    border-color: blue;
  }
`;

const StyledButton = styled.button`
  background: var(--primary);
  border: none;
  height: 1.7rem;
  border-radius: 0.8rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: var(--secondary);
  font-size: 1.1rem;
  color: ${(props) => (props.isDarkMode ? "inherit" : "var(--secondary)")};
`;

export default function Searchbar({ onInputChange, onClickEvent, isDarkMode }) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  function handleChangeEvent(e) {
    onInputChange(e.target.value);
    setInputValue(e.target.value);
    setShowSuggestions(true);
  }
  function handleReset() {
    setInputValue("");
    router.reload();
  }
  function handleSearch() {
    setShowSuggestions(false);
    onClickEvent(inputValue);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <SearchbarContainer isDarkMode={isDarkMode}>
        <SearchInput
          placeholder="Search"
          value={inputValue}
          onChange={handleChangeEvent}
          onKeyDown={handleKeyDown}
          isDarkMode={isDarkMode}
        />
        {showSuggestions ? (
          <StyledButton onClick={handleSearch}>
            <StyledIcon icon={faSearch} />
          </StyledButton>
        ) : (
          <StyledButton onClick={handleReset}>
            <StyledIcon icon={faArrowsRotate} isDarkMode={isDarkMode} />
          </StyledButton>
        )}
      </SearchbarContainer>
    </>
  );
}
