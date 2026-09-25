import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === product.id);

      if (exists) {
        return prevFavorites.filter((item) => item.id !== product.id);
      }

      return [...prevFavorites, product];
    });
  };

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === product.id);

      if (exists) {
        return prevFavorites;
      }

      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== productId),
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
