import { mutate } from "swr";
import { useRouter } from "next/router";
import Form from "../../components/Form.js";
import Navigation from "@/components/Navigation.js";
import Header from "@/components/Header.js";
import styled from "styled-components";

const Title = styled.h2``;

const Container = styled.div`
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function CreateRecipe() {
  const router = useRouter();

  async function onSubmit(data) {
    const response = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      mutate("/api/recipes");
    }

    router.push("/");
  }

  return (
    <Container>
      <Header />
      <Title>Create a Recipe</Title>
      <Form onSubmit={onSubmit} />
      <Navigation />
    </Container>
  );
}
