import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const StyledInstructions = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
  }
`;

const StyledTextarea = styled.textarea`
  background-color: ${(props) =>
    props.isDarkMode ? "var(--primary)" : "var(--fourth)"};
  color: ${(props) =>
    props.isDarkMode ? "var(--secondary)" : "var(--primary)"};

  width: 250px;
`;

const Container = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  background: transparent;
  border: none;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
`;

function Instruction({ index, instruction, onChange, isDarkMode }) {
  return (
    <li>
      <span>{index + 1}. </span>
      <StyledTextarea
        type="text"
        placeholder="instructions"
        value={instruction.step || ""}
        onChange={(e) => onChange(instruction.id, e.target.value)}
        required
        minLength={1}
        maxLength={150}
        wrap="hard"
        rows={5}
        isDarkMode={isDarkMode}
      />
    </li>
  );
}

export default function Instructions({
  instructions,
  onInstructionChange,
  onAddInstruction,
  onRemoveInstruction,
  isDarkMode,
  onRemove,
}) {
  return (
    <StyledInstructions>
      <label htmlFor="instructions">steps</label>

      {instructions.map((instruction, index) => (
        <Container>
          <Instruction
            key={instruction.id}
            index={index}
            instruction={instruction}
            onChange={onInstructionChange}
            onRemove={() => onRemoveInstruction(instruction.id)}
            isDarkMode={isDarkMode}
          />
          <div>
            <StyledButton type="button" onClick={onAddInstruction}>
              <StyledIcon icon={faPlus} />
            </StyledButton>
            <StyledButton type="button" onClick={onRemove}>
              <StyledIcon icon={faMinus} />
            </StyledButton>
          </div>
        </Container>
      ))}
    </StyledInstructions>
  );
}
