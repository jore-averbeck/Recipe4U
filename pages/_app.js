import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import fetcher from "@/lib/fetcher";
import useLocalStorageState from "use-local-storage-state";
import useSWR from "swr";

export default function App({ Component, pageProps }) {
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  const {
    data: recipes,
    isLoading,
    error,
  } = useSWR("/api/ideas", fetcher, {
    fallbackData: [],
  });

  function handleToggleFavorites(id, event) {
    event.preventDefault();
    if (favorites.includes(id)) {
      setFavorites(favorites?.filter((favorite) => favorite !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Component
          {...pageProps}
          favorites={favorites}
          handleToggleFavorites={handleToggleFavorites}
        />
      </SWRConfig>
    </>
  );
}
