import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Card from "@/components/Card";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 5rem;
  position: relative;
`;

const CardContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
  list-style-type: none;
  padding: 0;
  margin: 2rem 0rem 0rem 1rem;
  justify-content: center;
`;

const StyledList = styled.li`
  box-sizing: border-box;
  border-radius: 0.5rem;
  margin-left: 0.7rem;
  margin-bottom: 0.1rem;
  padding: 1rem;
  width: 300px;
  height: 362px;
`;

export default function Favorites({
  recipes,
  handleToggleFavorites,
  favorites,
  isDarkMode,
}) {
  const recipesToDisplay = recipes.filter((recipe) =>
    favorites.includes(recipe._id)
  );

  console.log(recipes);
  return (
    <Container>
      <Header />
      <CardContainer>
        {recipesToDisplay.map((recipe) => (
          <StyledList key={recipe._id}>
            <Card
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              ingredients={recipe.ingredients}
              steps={recipe.steps}
              id={recipe._id}
              onToggleFavorites={handleToggleFavorites}
              favorites={favorites}
              isDarkMode={isDarkMode}
            />
          </StyledList>
        ))}
      </CardContainer>
      <Navigation isDarkMode={isDarkMode} />
    </Container>
  );
}
