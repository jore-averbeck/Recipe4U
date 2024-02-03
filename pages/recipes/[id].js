import { useRouter } from "next/router.js";
import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollTop";

const Article = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: 1.7rem;
  margin: 2rem auto;
  margin-bottom: 5rem;
  width: 90%;
  max-height: 60%;
  max-width: 500px;
  overflow: auto;
  background-color: #222c61;
  color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
`;

const StyledImage = styled(Image)`
  max-width: 100%;
  max-height: 100%;
  height: 300px;
  width: 310px;
  border-radius: 0.2rem;
  justify-self: center;
`;

const Title = styled.h2`
  justify-self: center;
  height: 10px;
  text-align: center;
`;

const Description = styled.p`
  justify-self: center;
  font-size: 1rem;
  padding: 0.5rem;
  text-align: justify;
`;

const Steps = styled.ol`
  background-color: #fafafa;
  color: #222c61;
  margin-bottom: -0.1rem;
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: recipe, isLoading, error } = useSWR(`/api/recipes/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  const { steps } = recipe;

  return (
    <>
      <Header />
      <Article>
        <Title>{recipe.title}</Title>
        <StyledImage src={recipe.image} width={100} height={100} />
        <Description>{recipe.description}</Description>
        <Steps>
          {steps.map((step) => (
            <li>
              <p>{step}</p>
            </li>
          ))}
        </Steps>
      </Article>
      <Navigation />
      <ScrollToTop />
    </>
  );
}
