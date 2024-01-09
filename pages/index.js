import Link from "next/link";
import useSWR from "swr";
import Card from "../components/Card.js";

export default function Homepage() {
  const { data, mutate } = useSWR("/api/recipes", { fallbackData: [] });

  async function handleDelete(id) {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await response.json();
      mutate(); // Refresh data after deletion
    } else {
      console.error(
        "Error deleting recipe:",
        response.status,
        response.statusText
      );
    }
  }

  console.log(data);
  return (
    <>
      <h1>Recipes</h1>
      <p>
        <Link href="/handleRecipe/create">New Recipe</Link>
      </p>
      <section>
        <h2>All Recipes</h2>
        <ul>
          {data.map((recipe) => (
            <li key={recipe._id}>
              <Card
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                ingredients={recipe.ingredients}
                steps={recipe.steps}
                id={recipe._id}
              />

              <Link href={`/handleRecipe/${recipe._id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(recipe._id)}>X</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
