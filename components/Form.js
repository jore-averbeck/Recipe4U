import styled from "styled-components";

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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
`;

const StyledInput = styled.input`
  border: 0.1rem solid #222c61;
  border-radius: 0.2rem;
  padding: 0.2rem;
`;

export default function ServiceForm({ recipe = {}, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));

    data.ingredients = data.ingredients.split(",").map((item) => item.trim());
    data.steps = data.steps.split(",").map((item) => item.trim());

    onSubmit(data);
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
