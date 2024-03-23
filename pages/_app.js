import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import fetcher from "@/lib/fetcher";
import useLocalStorageState from "use-local-storage-state";
import useSWR from "swr";


export default function App({ Component, pageProps }) {
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false);
  const {
    data: recipes,
    error,
  } = useSWR("/api/recipes", fetcher, {
    fallbackData: [],
  });

  if (error) return <p>Error loading recipes</p>;

  
  function handleToggleFavorites(id, event) {
    event.preventDefault();
    if (favorites.includes(id)) {
      setFavorites(favorites?.filter((favorite) => favorite !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle isDarkMode={isDarkMode} />
        <Component
          {...pageProps}
          favorites={favorites}
          handleToggleFavorites={handleToggleFavorites}
          recipes={recipes}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      </SWRConfig>
    </>
  );
}
