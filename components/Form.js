import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Instructions from "./Instruction";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
  max-width: 400px;
  width: 90%;
  margin: 0 0 5rem 0.25rem;
  padding: 2rem;
  background-color: ${(props) =>
    props.isDarkMode ? "var(--darkmode-primary)" : "var(--fourth)"};
  color: ${(props) => (props.isDarkMode ? "black" : "var(--primary)")};
  font-weight: bold;
  box-shadow: var(--primary-shadow);
  overflow-y: auto;
`;

const StyledInput = styled.input`
  border: 0.1rem solid #222c61;
  border-radius: 0.2rem;
  padding: 0.2rem;
  background-color: ${(props) =>
    props.isDarkMode ? "var(--primary)" : "var(--fourth)"};
  color: ${(props) =>
    props.isDarkMode ? "var(--secondary)" : "var(--primary)"};
`;
const StyledSelect = styled.select`
  background-color: ${(props) =>
    props.isDarkMode ? "var(--primary)" : "var(--fourth)"};
  color: ${(props) =>
    props.isDarkMode ? "var(--secondary)" : "var(--primary)"};
`;

const StyledFormButton = styled.button`
  width: 100px;
  background-color: var(--primary);
  color: var(--secondary);
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  border-radius: 0.3rem;
  border: none;
  
`;

const defaultRecipe = {
  title: "",
  description: "",
  image: "",
  difficulty: "easy",
  duration: 0,
  ingredients: "",
  instructions: [{ id: uuidv4(), step: "" }],
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export default function ServiceForm({
  recipe = defaultRecipe,
  onSubmit,
  isDarkMode,
}) {
  const [instructions, setInstructions] = useState(
    recipe.instructions ? recipe.instructions : [{ id: uuidv4(), value: "" }]
  );
  const [duration, setDuration] = useState("");
  const router = useRouter();

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
  }
  function onDurationChange(event) {
    setDuration(event.target.value);
  }

  function handleCancel(event) {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      router.push("/");
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit} isDarkMode={isDarkMode}>
        <label htmlFor="title">Title</label>
        <StyledInput
          id="title"
          name="title"
          defaultValue={recipe.title}
          isDarkMode={isDarkMode}
        />
        <label htmlFor="description">description</label>
        <StyledInput
          id="description"
          name="description"
          defaultValue={recipe.description}
          isDarkMode={isDarkMode}
        />
        <label htmlFor="image">Image</label>
        <StyledInput
          id="image"
          name="image"
          defaultValue={recipe.image}
          isDarkMode={isDarkMode}
        />
        <label htmlFor="difficulty">Difficulty</label>
        <StyledSelect
          id="difficulty"
          name="difficulty"
          defaultValue={recipe.difficulty}
          isDarkMode={isDarkMode}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </StyledSelect>
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
          isDarkMode={isDarkMode}
        />
        <Instructions
          instructions={instructions}
          onInstructionChange={handleInstructionChange}
          onAddInstruction={handleAddInstruction}
          onRemoveInstruction={handleRemoveInstruction}
          isDarkMode={isDarkMode}
        />
        <ButtonContainer>
          <StyledFormButton isDarkMode={isDarkMode} type="submit">
            Save <FontAwesomeIcon icon={faCheck} />
          </StyledFormButton>
          <StyledFormButton
            type="cancel"
            onClick={handleCancel}
            isDarkMode={isDarkMode}
          >
            Cancel
            <FontAwesomeIcon icon={faBan} />
          </StyledFormButton>
        </ButtonContainer>
      </StyledForm>
    </>
  );
}
