import useSWR from "swr";
import { useRouter } from "next/router";
import Form from "../../../components/Form.js";
import styled from "styled-components";

const Title = styled.h2`
  color: ${(props) => (props.isDarkMode ? "#fafafa" : "var(--primary)")};
`;

export default function EditRecipe() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: recipe,
    isLoading,
    mutate,
  } = useSWR(id ? `/api/recipes/${id}` : null);

  async function onSubmit(data) {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    mutate(`/api/recipes`);
    mutate(`/api/recipes/${id}`);
    router.push("/");
  }
  if (!recipe || isLoading) {
    return "Loading";
  }
  return (
    <>
      <Title isDarkMode={isDarkMode}>Edit</Title>
      <Form recipe={recipe} onSubmit={onSubmit} isDarkMode={isDarkMode} />
    </>
  );
}
