import Link from "next/link";
import useSWR from "swr";
import Card from "../components/Card.js";

export default function Homepage() {
  const { data } = useSWR("/api/recipes", { fallbackData: [] });

  console.log(data);
  return (
    <>
      <h1>Recipes</h1>
      <p>
        <Link href="/new">New Recipe</Link>
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
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
