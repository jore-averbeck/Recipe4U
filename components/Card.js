import Link from "next/link.js";
import Image from "next/image";

export default function Card({
  title,
  description,
  image,
  ingredients,
  steps,
  id,
}) {
  return (
    <article>
      <h2>{title}</h2>
      <Image src={image} width={100} height={100} />
      <p>{description}</p>
      <p>{ingredients}</p>
      <p>{steps}</p>
    </article>
  );
}
