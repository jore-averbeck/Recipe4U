import styled from "styled-components";
import { useState } from "react";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
  max-width: 400px;
  width: 90%;
  margin-left: 1rem;
  padding: 2rem;
  background-color: #fafafa;
  color: #222c61;
  font-weight: bold;
  box-shadow: var(--primary-shadow);
  overflow-y: auto;
`;

const StyledInput = styled.input`
  border: 0.1rem solid #222c61;
  border-radius: 0.2rem;
  padding: 0.2rem;
`;

export default function ServiceForm({ recipe = {}, onSubmit }) {
  const [duration, setDuration] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));

    data.ingredients = data.ingredients.split(",").map((item) => item.trim());
    data.steps = data.steps.split(",").map((item) => item.trim());

    onSubmit(data);
  }
  function onDurationChange(event) {
    setDuration(event.target.value);
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <StyledInput id="title" name="title" defaultValue={recipe.title} />
        <label htmlFor="description">description</label>
        <StyledInput
          id="description"
          name="description"
          defaultValue={recipe.description}
        />
        <label htmlFor="image">Image</label>
        <StyledInput id="image" name="image" defaultValue={recipe.image} />
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          defaultValue={recipe.difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>
        <label htmlFor="duration">Duration: {duration} minutes</label>
        <input
          type="range"
          id="duration"
          name="duration"
          min="0"
          max="120"
          defaultValue={recipe.duration}
          onChange={onDurationChange}
        />
        <label htmlFor="ingredients">ingredients</label>
        <StyledInput
          id="ingredients"
          name="ingredients"
          defaultValue={recipe.ingredients}
          placeholder="oats, sugar, salt..."
        />
        <label htmlFor="steps">steps</label>
        <StyledInput
          id="steps"
          name="steps"
          defaultValue={recipe.steps}
          placeholder="first, second, third..."
        />
        <button>Save</button>
      </StyledForm>
    </>
  );
}
