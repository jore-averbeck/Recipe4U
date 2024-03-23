import styled from "styled-components";

const InstructionContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  border: 0.1rem solid #222c61;
  border-radius: 0.2rem;
  padding: 0.2rem;
  background-color: ${(props) =>
    props.isDarkMode ? "var(--primary)" : "var(--fourth)"};
  color: ${(props) =>
    props.isDarkMode ? "var(--secondary)" : "var(--primary)"};
    min-height: 4rem;	
`;

const StyledButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Instructions = ({
  instructions,
  onInstructionChange,
  onAddInstruction,
  onRemoveInstruction,
  isDarkMode,
}) => {
  return (
    <>
      {instructions.map((instruction, index) => (
        <InstructionContainer key={instruction.id}>
          <StyledTextarea
            placeholder={`Step ${index + 1}`}
            value={instruction.step}
            onChange={(e) =>
              onInstructionChange(instruction.id, e.target.value)
            }
            isDarkMode={isDarkMode}
          />
          {index === instructions.length - 1 && (
            <StyledButton type="button" onClick={onAddInstruction}>
              +
            </StyledButton>
          )}
          <StyledButton onClick={() => onRemoveInstruction(instruction.id)}>
            -
          </StyledButton>
        </InstructionContainer>
      ))}
    </>
  );
};

export default Instructions;
