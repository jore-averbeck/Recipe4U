import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Searchbar({
  suggestions,
  onInputChange,
  onClickEvent,
}) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
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

  return (
    <>
      <div>
        <input
          placeholder="Search for titles "
          value={inputValue}
          onChange={handleChangeEvent}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>reset</button>
      </div>
      <ul>
        {showSuggestions &&
          suggestions.map(({ item }, index) => (
            <li key={index}>
              <Link href={`/recipes/${item._id}`}>{item.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
