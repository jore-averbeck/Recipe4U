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

function Instruction({ index, instruction, onChange, onRemove }) {
  return (
    <li>
      <span>{index + 1}. </span>
      <textarea
        type="text"
        placeholder="instructions"
        value={instruction.step || ""}
        onChange={(e) => onChange(instruction.id, e.target.value)}
        required
        minLength={1}
        maxLength={150}
        wrap="hard"
        rows={5}
      />
      <div>
        <button type="button" onClick={onRemove}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </li>
  );
}

export default function Instructions({
  instructions,
  onInstructionChange,
  onAddInstruction,
  onRemoveInstruction,
}) {
  return (
    <StyledInstructions>
      <label htmlFor="instructions">steps</label>
      <ul>
        {instructions.map((instruction, index) => (
          <Instruction
            key={instruction.id}
            index={index}
            instruction={instruction}
            onChange={onInstructionChange}
            onRemove={() => onRemoveInstruction(instruction.id)}
          />
        ))}
      </ul>
      <button type="button" onClick={onAddInstruction}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </StyledInstructions>
  );
}
