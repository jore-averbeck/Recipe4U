import useSWR from "swr";
import { useRouter } from "next/router";
import Form from "../../../components/Form.js";
import styled from "styled-components";
import Header from "@/components/Header.js";
import Navigation from "@/components/Navigation.js";

const Container = styled.div`
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  color: ${(props) => (props.isDarkMode ? "#fafafa" : "var(--primary)")};
`;

export default function EditRecipe({ isDarkMode }) {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: recipe,
    isLoading,
    mutate,
  } = useSWR(id ? `/api/recipes/${id}` : null);

  if (isLoading) {
    return "Loading";
  }

  if (!recipe) {
    return "Not found";
  }
  

  async function onSubmit(data) {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update recipe: ${response.status} ${response.statusText}`);
      }
  
      mutate(`/api/recipes`);
      mutate(`/api/recipes/${id}`);
  
      router.push("/");
    } catch (error) {
      console.error("Error updating recipe:", error.message);
    }
  }
  

  return (
    <Container>
      <Header />
      <Title isDarkMode={isDarkMode}>Edit</Title>
      <Form recipe={recipe} onSubmit={onSubmit} isDarkMode={isDarkMode} />
      <Navigation isDarkMode={isDarkMode} />
    </Container>
  );
}
