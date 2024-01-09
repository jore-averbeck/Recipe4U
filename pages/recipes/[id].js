import { useRouter } from "next/router.js";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link.js";

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: recipe, isLoading, error } = useSWR(`/api/recipes/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  const { steps } = recipe;

  return (
    <article>
      <title>{recipe.title}</title>
      <Image src={recipe.image} width={100} height={100} />
      <p>{recipe.description}</p>
      <ul>
        {steps.map((step) => (
          <li>
            <p>{step}</p>
          </li>
        ))}
      </ul>
      <Link href="/">back</Link>
    </article>
  );
}
