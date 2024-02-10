import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Instructions from "./Instruction";

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
  const [instructions, setInstructions] = useState(
    recipe.instructions ? recipe.instructions : [{ id: uuidv4(), value: "" }]
  );
  const [duration, setDuration] = useState("");

  function handleInstructionChange(id, value) {
    const newInstructions = instructions.map((instruction) =>
      instruction.id === id ? { ...instruction, step: value } : instruction
    );
    setInstructions(newInstructions);
  }
  function handleAddInstruction() {
    const newInstruction = { id: uuidv4(), step: "" };
    setInstructions([...instructions, newInstruction]);
  }
  function handleRemoveInstruction(id) {
    const newInstructions = instructions.filter(
      (instruction) => instruction.id !== id
    );
    setInstructions(newInstructions);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));

    data.ingredients = data.ingredients.split(",").map((item) => item.trim());
    data.instructions = instructions
      .filter(
        (instruction) =>
          typeof instruction.step === "string" && instruction.step.trim() !== ""
      )
      .map((instruction, index) => ({
        id: `${data.id}.${index + 1}`,
        step: instruction.step.trim(),
      }));

    onSubmit(data);
    console.log(event.target.value);
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
        <Instructions
          instructions={instructions}
          onInstructionChange={handleInstructionChange}
          onAddInstruction={handleAddInstruction}
          onRemoveInstruction={handleRemoveInstruction}
        />

        <button>Save</button>
      </StyledForm>
    </>
  );
}
