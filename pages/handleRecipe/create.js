import { mutate } from "swr";
import { useRouter } from "next/router";
import Form from "../../components/Form.js";

export default function CreateRecipe() {
  const router = useRouter();

  //Submit der Form
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
    <>
      <h2>Create a Recipe</h2>
      <Form onSubmit={onSubmit} />
    </>
  );
}
