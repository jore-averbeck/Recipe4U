import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  width: 80%;
  margin-left: 1rem;
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
        <input id="title" name="title" defaultValue={recipe.title} />
        <label htmlFor="description">description</label>
        <input
          id="description"
          name="description"
          defaultValue={recipe.description}
        />
        <label htmlFor="image">Image</label>
        <input id="image" name="image" defaultValue={recipe.image} />
        <label htmlFor="ingredients">ingredients</label>
        <input
          id="ingredients"
          name="ingredients"
          defaultValue={recipe.ingredients}
        />
        <label htmlFor="steps">steps</label>
        <input id="steps" name="steps" defaultValue={recipe.steps} />
        <button>Save</button>
      </StyledForm>
    </>
  );
}
