import { useState, useEffect } from "react";
import useSWR from "swr";
import Card from "../components/Card.js";
import styled from "styled-components";
import Navigation from "@/components/Navigation.js";
import Header from "@/components/Header.js";
import Loader from "@/components/Loader.js";

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

const Container = styled.div`
  margin-bottom: 5rem;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default function Homepage() {
  const { data, mutate, isLoading } = useSWR("/api/recipes", {
    fallbackData: [],
  });

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showLoader) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await response.json();
      mutate();
    } else {
      console.error(
        "Error deleting recipe:",
        response.status,
        response.statusText
      );
    }
  }

  return (
    <Container>
      <Header />

      <section>
        <h2>All Recipes</h2>

        <CardContainer>
          {data.map((recipe) => (
            <StyledList key={recipe._id}>
              <Card
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                ingredients={recipe.ingredients}
                steps={recipe.steps}
                id={recipe._id}
              />
            </StyledList>
          ))}
        </CardContainer>
      </section>
      <Navigation />
    </Container>
  );
}
